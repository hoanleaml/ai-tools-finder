# Epic Technical Specification: Foundation & Infrastructure

Date: 2025-11-24
Author: Hoan
Epic ID: 1
Status: Draft

---

## Overview

Epic 1 establishes the technical foundation for the AI Tools Finder platform, enabling all subsequent development work. This epic focuses on project initialization, database schema setup, authentication system, basic UI components, and deployment pipeline configuration. According to the PRD, this epic is critical as it provides the infrastructure that supports all other features including tool discovery, admin dashboard, scraping system, AI news, blog generation, and affiliate management.

The goal is to create a solid, scalable foundation using Next.js 16 with TypeScript, Supabase for database and authentication, and Vercel for deployment. This foundation will support the target scale of 1000+ tools and 10,000+ daily visitors as specified in the PRD.

## Objectives and Scope

**In Scope:**

- Next.js 16 project setup with TypeScript and App Router
- Supabase project configuration and database schema creation
- Supabase Authentication setup for admin access
- Basic UI component library and design system (shadcn/ui)
- Vercel deployment pipeline with CI/CD
- Environment configuration and management
- Project structure following Next.js 16 conventions

**Out of Scope:**

- User-facing features (covered in Epic 2-3)
- Admin dashboard functionality (covered in Epic 4)
- Scraping system (covered in Epic 5)
- AI News system (covered in Epic 6)
- AI Blog system (covered in Epic 7)
- Advanced affiliate features (covered in Epic 8)

## System Architecture Alignment

This epic aligns with the architecture document's core technology decisions:

- **Framework**: Next.js 16 with App Router (Architecture Section: Project Initialization)
- **Database**: Supabase (PostgreSQL) for all data storage (Architecture Section: Backend & Database)
- **Authentication**: Supabase Auth for admin authentication (Architecture Section: Authentication)
- **Styling**: Tailwind CSS 3.x with shadcn/ui design system (Architecture Section: Design System)
- **Deployment**: Vercel platform (Architecture Section: Deployment)

The project structure follows the architecture's defined conventions:

- `/app` directory for App Router routes
- `/components` for reusable components
- `/lib` for utilities and helpers
- `/types` for TypeScript type definitions

Key constraints from architecture:

- TypeScript strict mode enabled
- Server Components by default, Client Components only when needed
- Consistent error handling patterns
- Environment variables managed securely

## Detailed Design

### Services and Modules

| Module                      | Responsibility                             | Inputs                | Outputs                       | Owner                  |
| --------------------------- | ------------------------------------------ | --------------------- | ----------------------------- | ---------------------- |
| **Project Setup**           | Initialize Next.js project with TypeScript | None                  | Configured project structure  | Developer              |
| **Supabase Client**         | Database connection and queries            | Environment variables | Supabase client instances     | lib/supabase/          |
| **Supabase Server Client**  | Server-side database operations            | Request cookies       | Authenticated Supabase client | lib/supabase/server.ts |
| **Supabase Browser Client** | Client-side database operations            | Browser session       | Supabase client               | lib/supabase/client.ts |
| **Auth Middleware**         | Route protection for admin routes          | Request headers       | Redirect or allow             | middleware.ts          |
| **UI Components**           | Reusable UI elements                       | Props                 | React components              | components/ui/         |
| **Design System**           | Design tokens and styling                  | Tailwind config       | Consistent styling            | tailwind.config.js     |

### Data Models and Contracts

**Database Schema (Supabase PostgreSQL):**

```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tools table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website_url VARCHAR(500) NOT NULL,
  logo_url VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  pricing_model VARCHAR(50), -- 'free', 'freemium', 'paid', 'one-time'
  features JSONB, -- Array of feature strings
  slug VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'pending', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Affiliate links table
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  affiliate_url TEXT NOT NULL,
  program_name VARCHAR(255),
  commission_rate DECIMAL(5,2), -- Percentage
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'pending', 'expired'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News articles table
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  summary TEXT,
  content TEXT,
  source_url TEXT NOT NULL,
  source_name VARCHAR(255),
  image_url VARCHAR(500),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID, -- References auth.users
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'review', 'published'
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scraping jobs table
CREATE TABLE scraping_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  error_message TEXT,
  tools_found INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Affiliate clicks tracking table
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_link_id UUID REFERENCES affiliate_links(id),
  tool_id UUID REFERENCES tools(id),
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  user_session_id VARCHAR(255), -- Optional session tracking
  ip_address VARCHAR(45), -- IPv6 compatible
  user_agent TEXT
);
```

**Indexes:**

```sql
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_name_search ON tools USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_affiliate_links_tool ON affiliate_links(tool_id);
CREATE INDEX idx_affiliate_links_status ON affiliate_links(status);
CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_published ON blog_posts(published_at DESC);
CREATE INDEX idx_scraping_jobs_status ON scraping_jobs(status);
CREATE INDEX idx_affiliate_clicks_tool ON affiliate_clicks(tool_id);
CREATE INDEX idx_affiliate_clicks_date ON affiliate_clicks(clicked_at DESC);
```

**TypeScript Types:**

```typescript
// types/database.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: string;
  name: string;
  description?: string;
  website_url: string;
  logo_url?: string;
  category_id?: string;
  pricing_model?: "free" | "freemium" | "paid" | "one-time";
  features?: string[];
  slug?: string;
  status?: "active" | "pending" | "archived";
  created_at: string;
  updated_at: string;
}

export interface AffiliateLink {
  id: string;
  tool_id: string;
  affiliate_url: string;
  program_name?: string;
  commission_rate?: number;
  status?: "active" | "pending" | "expired";
  created_at: string;
  updated_at: string;
}
```

### APIs and Interfaces

**Supabase Client Interface:**

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Supabase Server Client Interface:**

```typescript
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
```

**Auth Middleware Interface:**

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Implementation for route protection
}
```

**Environment Variables:**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key  # For future Epic 7
```

### Workflows and Sequencing

**Story 1.1: Project Setup**

1. Run `npx create-next-app@latest` with TypeScript template
2. Configure `tsconfig.json` with strict mode
3. Install and configure Tailwind CSS
4. Set up ESLint and Prettier
5. Initialize Git repository with `.gitignore`
6. Create project structure (`/app`, `/components`, `/lib`, `/types`)

**Story 1.2: Database Schema**

1. Create Supabase project
2. Run SQL migrations to create tables
3. Set up indexes for performance
4. Configure Row Level Security (RLS) policies
5. Test database connections

**Story 1.3: Authentication**

1. Configure Supabase Auth with email/password provider
2. Create authentication middleware
3. Set up protected admin routes
4. Implement login/logout functionality
5. Test session persistence and token refresh

**Story 1.4: UI Components**

1. Install shadcn/ui CLI
2. Add base components (Button, Input, Card, etc.)
3. Configure design tokens in Tailwind
4. Create layout components (Header, Footer)
5. Ensure accessibility compliance (WCAG 2.1 AA)

**Story 1.5: Deployment**

1. Connect GitHub repository to Vercel
2. Configure build settings
3. Set up environment variables
4. Test preview deployments
5. Configure production deployment

## Non-Functional Requirements

### Performance

- **Page Load Time**: Homepage and tool listings must load in < 2 seconds (NFR1.1 from PRD)
- **Database Queries**: All queries must be optimized with proper indexing (NFR1.5)
- **Build Time**: Next.js build should complete in < 5 minutes
- **Image Optimization**: Use Next.js Image component for automatic optimization (NFR1.6)

**Performance Targets:**

- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1

### Security

- **Authentication**: Secure admin authentication using Supabase Auth (NFR4.1)
- **API Security**: Rate limiting on API endpoints (NFR4.2)
- **Input Validation**: All user inputs validated and sanitized (NFR4.3)
- **XSS Protection**: Prevent XSS attacks in user-generated content (NFR4.4)
- **CSRF Protection**: CSRF protection for admin actions (NFR4.5)
- **SQL Injection**: Use parameterized queries (Supabase handles this) (NFR4.6)
- **HTTPS Only**: All communications over HTTPS (NFR4.8)

**Security Measures:**

- Row Level Security (RLS) policies on all tables
- Environment variables secured in Vercel
- Admin routes protected by middleware
- Session tokens stored securely in HTTP-only cookies

### Reliability/Availability

- **Uptime Target**: > 99.5% uptime (NFR3.1)
- **Error Handling**: Graceful error handling with retry logic (NFR3.2)
- **Monitoring**: Error logging and monitoring setup (NFR3.3)
- **Backup Strategy**: Daily database backups via Supabase (NFR3.5)
- **Fallback Mechanisms**: Fallback for external API failures (NFR3.6)

**Reliability Measures:**

- Vercel's built-in redundancy and CDN
- Supabase managed database with automatic backups
- Error boundaries in React components
- Comprehensive error logging

### Observability

- **Logging**: Comprehensive logging for debugging (NFR5.2)
- **Error Monitoring**: Error monitoring and alerting (NFR5.3)
- **Metrics**: Track key performance metrics
- **Tracing**: Request tracing for debugging

**Observability Tools:**

- Vercel Analytics for performance metrics
- Supabase logs for database operations
- Console logging for development
- Optional: Sentry for error tracking (future)

## Dependencies and Integrations

**Core Dependencies:**

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/ssr": "^0.1.0",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.0.0"
  }
}
```

**Design System Dependencies:**

- shadcn/ui components (installed via CLI as needed)
- Radix UI primitives (peer dependency of shadcn/ui)
- Tailwind CSS plugins: `@tailwindcss/typography` (optional)

**External Services:**

- Supabase (Database + Auth)
- Vercel (Hosting + CI/CD)
- GitHub (Version Control)

**Future Dependencies (Not in Epic 1):**

- OpenAI API (Epic 7)
- Cheerio/Puppeteer (Epic 5)
- RSS Parser (Epic 6)

## Acceptance Criteria (Authoritative)

1. **AC1.1**: Next.js 16 project initialized with TypeScript strict mode enabled
2. **AC1.2**: Project structure follows Next.js 16 conventions (`/app`, `/components`, `/lib`, `/types`)
3. **AC1.3**: Tailwind CSS configured and working
4. **AC1.4**: ESLint and Prettier configured and passing
5. **AC1.5**: Git repository initialized with appropriate `.gitignore`
6. **AC1.6**: Supabase project created and accessible
7. **AC1.7**: All database tables created with proper schema (tools, categories, affiliate_links, news_articles, blog_posts, scraping_jobs, affiliate_clicks)
8. **AC1.8**: Database indexes created on frequently queried columns
9. **AC1.9**: Row Level Security (RLS) policies configured
10. **AC1.10**: Supabase Auth configured with email/password provider
11. **AC1.11**: Admin authentication working (login/logout)
12. **AC1.12**: Admin routes protected by middleware
13. **AC1.13**: Session persistence working across page reloads
14. **AC1.14**: Token refresh handled automatically
15. **AC1.15**: Basic UI components created (Button, Input, Card, Modal, Loading, Error, Header, Footer)
16. **AC1.16**: Components follow design system (shadcn/ui)
17. **AC1.17**: Components are responsive (mobile, tablet, desktop)
18. **AC1.18**: Components meet WCAG 2.1 AA accessibility standards
19. **AC1.19**: Vercel project connected to GitHub repository
20. **AC1.20**: Build pipeline configured (linting, type checking)
21. **AC1.21**: Preview deployments working for PRs
22. **AC1.22**: Production deployment working on main branch merge
23. **AC1.23**: Environment variables configured securely in Vercel
24. **AC1.24**: All environment variables documented in `.env.example`

## Traceability Mapping

| AC ID         | Spec Section    | Component/API              | Test Idea                                                           |
| ------------- | --------------- | -------------------------- | ------------------------------------------------------------------- |
| AC1.1-AC1.5   | Project Setup   | Project structure          | Verify Next.js project structure, TypeScript config, Tailwind setup |
| AC1.6-AC1.9   | Database Schema | Supabase tables            | Verify all tables exist, indexes created, RLS policies active       |
| AC1.10-AC1.14 | Authentication  | Supabase Auth + Middleware | Test login/logout, route protection, session persistence            |
| AC1.15-AC1.18 | UI Components   | components/ui/             | Verify components render, responsive, accessible                    |
| AC1.19-AC1.24 | Deployment      | Vercel pipeline            | Test deployments, environment variables, build process              |

**PRD Traceability:**

- FR8.1-FR8.3 (Data Management) → AC1.6-AC1.9 (Database Schema)
- FR3.1 (Admin Login) → AC1.10-AC1.14 (Authentication)
- NFR1.1 (Page Load) → Performance targets
- NFR4.1-NFR4.8 (Security) → Security measures

**Architecture Traceability:**

- Architecture: Project Initialization → AC1.1-AC1.5
- Architecture: Database → AC1.6-AC1.9
- Architecture: Authentication → AC1.10-AC1.14
- Architecture: Design System → AC1.15-AC1.18
- Architecture: Deployment → AC1.19-AC1.24

## Risks, Assumptions, Open Questions

**Risks:**

- **R1**: Supabase project setup delays → Mitigation: Set up Supabase project early, test connection immediately
- **R2**: Environment variable misconfiguration → Mitigation: Use `.env.example`, document all variables, test in preview
- **R3**: RLS policies too restrictive or too permissive → Mitigation: Test policies thoroughly, start restrictive and relax as needed
- **R4**: Vercel deployment issues → Mitigation: Test preview deployments first, check build logs

**Assumptions:**

- **A1**: Supabase account available and accessible
- **A2**: Vercel account available and GitHub repository accessible
- **A3**: Domain name available (optional, can use Vercel default)
- **A4**: Team familiar with Next.js 16 App Router

**Open Questions:**

- **Q1**: Should we use Supabase migrations or SQL editor? → Decision: Use SQL editor for initial setup, migrations for future changes
- **Q2**: What monitoring solution should we use? → Decision: Start with Vercel Analytics, add Sentry later if needed
- **Q3**: Should we set up staging environment? → Decision: Use Vercel preview deployments for staging, production for main branch

## Test Strategy Summary

**Unit Tests:**

- Test utility functions in `/lib/utils/`
- Test TypeScript types compile correctly
- Test component rendering (optional, can use Storybook)

**Integration Tests:**

- Test Supabase client connections (server and browser)
- Test database queries return expected data
- Test authentication flow (login/logout)
- Test middleware route protection

**E2E Tests (Optional for Epic 1):**

- Test complete authentication flow
- Test admin route access control
- Test deployment pipeline

**Manual Testing:**

- Verify all UI components render correctly
- Test responsive design on different screen sizes
- Test accessibility with screen readers
- Verify environment variables load correctly
- Test deployment process end-to-end

**Test Coverage Target:**

- Critical paths: 80%+ coverage
- Utility functions: 90%+ coverage
- Components: Visual testing (Storybook) acceptable

**Testing Tools:**

- Jest + React Testing Library (for unit/integration tests)
- Playwright (for E2E tests, optional)
- Storybook (for component visual testing, optional)
- Manual testing checklist
