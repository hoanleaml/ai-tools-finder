# AI Tools Finder - Architecture Document

**Author:** Hoan  
**Date:** 2025-01-27  
**Version:** 1.0

---

## Executive Summary

This architecture document defines the technical decisions and implementation patterns for AI Tools Finder, a web application that aggregates AI tools with automated content generation and affiliate marketing capabilities. The architecture is designed to ensure consistency across AI agent implementations and prevent conflicts during development.

**Key Architectural Principles:**

- **Consistency First**: All agents follow the same patterns and technologies
- **Scalability**: Designed to handle 1000+ tools and 10,000+ daily visitors
- **Reliability**: Robust error handling, retry logic, and monitoring
- **Performance**: Optimized for fast page loads and search results
- **Maintainability**: Clean code structure with comprehensive documentation

---

## Project Initialization

### Starter Template

**Decision:** Use `create-next-app@latest` with TypeScript and App Router

**Command:**

```bash
npx create-next-app@latest ai-tools-finder --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**What This Establishes:**

- Next.js 16 with App Router (latest stable)
- TypeScript with strict mode configuration
- Tailwind CSS for styling (aligns with UX design system choice)
- ESLint and Prettier configured
- Project structure following Next.js conventions

**Rationale:**

- Next.js 16 App Router provides excellent performance with Server Components
- TypeScript ensures type safety across all implementations
- Tailwind CSS aligns with shadcn/ui design system choice
- Standard Next.js structure prevents confusion for AI agents

---

## Decision Summary

| Category           | Decision                          | Version       | Affects Epics | Rationale                                            |
| ------------------ | --------------------------------- | ------------- | ------------- | ---------------------------------------------------- |
| Framework          | Next.js                           | 16.x (latest) | All           | Server Components, App Router, excellent performance |
| Language           | TypeScript                        | 5.x (latest)  | All           | Type safety, better IDE support, prevents errors     |
| Styling            | Tailwind CSS                      | 3.x (latest)  | All           | Aligns with shadcn/ui, utility-first approach        |
| Design System      | shadcn/ui                         | Latest        | Epic 2-8      | Accessible, customizable, TypeScript support         |
| Database           | Supabase (PostgreSQL)             | Latest        | All           | Managed PostgreSQL, built-in auth, real-time support |
| Authentication     | Supabase Auth                     | Latest        | Epic 1, 4     | Secure, managed auth solution                        |
| Scraping           | Cheerio + Puppeteer               | Latest        | Epic 5        | HTML parsing and browser automation                  |
| AI Content         | OpenAI API                        | Latest        | Epic 7        | GPT-4 for blog generation                            |
| Deployment         | Vercel                            | Latest        | All           | Optimized for Next.js, edge functions                |
| Package Manager    | npm                               | Latest        | All           | Standard Node.js package manager                     |
| State Management   | React Server Components + Zustand | Latest        | Epic 2-8      | Server-first with client state where needed          |
| Form Handling      | React Hook Form + Zod             | Latest        | Epic 4        | Type-safe form validation                            |
| HTTP Client        | Native Fetch API                  | Built-in      | All           | No additional dependency needed                      |
| Image Optimization | Next.js Image                     | Built-in      | Epic 2-3      | Automatic optimization and lazy loading              |
| Caching            | Next.js Caching + Vercel KV       | Latest        | Epic 2-6      | ISR, SWR, and Redis for dynamic data                 |

---

## Project Structure

```
ai-tools-finder/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (no auth required)
│   │   ├── page.tsx              # Homepage
│   │   ├── tools/                # Tool discovery pages
│   │   │   ├── page.tsx          # Tool listing
│   │   │   └── [slug]/           # Tool detail pages
│   │   ├── news/                 # AI News section
│   │   │   ├── page.tsx          # News listing
│   │   │   └── [slug]/           # News article pages
│   │   └── blog/                 # AI Blog section
│   │       ├── page.tsx          # Blog listing
│   │       └── [slug]/           # Blog post pages
│   ├── (admin)/                  # Admin routes (auth required)
│   │   ├── admin/                # Admin dashboard
│   │   │   ├── page.tsx          # Dashboard overview
│   │   │   ├── tools/            # Tool management
│   │   │   ├── affiliate/        # Affiliate management
│   │   │   └── scraping/         # Scraping job management
│   │   └── layout.tsx            # Admin layout with auth check
│   ├── api/                      # API routes
│   │   ├── tools/                # Tool CRUD endpoints
│   │   ├── search/               # Search endpoint
│   │   ├── affiliate/           # Affiliate tracking
│   │   ├── scraping/            # Scraping job endpoints
│   │   ├── news/                # News management
│   │   ├── blog/                # Blog management
│   │   └── cron/                # Cron job endpoints
│   │       └── sync-tools/      # Daily tool sync
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                    # React components
│   ├── ui/                       # shadcn/ui components
│   ├── tool/                     # Tool-specific components
│   │   ├── tool-card.tsx
│   │   ├── tool-detail.tsx
│   │   └── tool-filter.tsx
│   ├── search/                   # Search components
│   │   ├── search-bar.tsx
│   │   └── search-results.tsx
│   ├── admin/                    # Admin components
│   │   ├── dashboard-stats.tsx
│   │   ├── tool-table.tsx
│   │   └── affiliate-manager.tsx
│   └── layout/                   # Layout components
│       ├── header.tsx
│       ├── footer.tsx
│       └── sidebar.tsx
├── lib/                          # Utility functions
│   ├── supabase/                 # Supabase client and helpers
│   │   ├── client.ts             # Client-side Supabase client
│   │   ├── server.ts             # Server-side Supabase client
│   │   └── middleware.ts         # Auth middleware
│   ├── scraping/                 # Scraping utilities
│   │   ├── futuretools.ts       # FutureTools.io scraper
│   │   ├── affiliate-detector.ts # Affiliate detection
│   │   └── parser.ts             # HTML parsing utilities
│   ├── ai/                        # AI content generation
│   │   ├── openai.ts             # OpenAI client
│   │   └── blog-generator.ts     # Blog post generation
│   ├── news/                     # News aggregation
│   │   ├── fetcher.ts            # News fetching
│   │   └── processor.ts          # News processing
│   ├── utils/                     # General utilities
│   │   ├── cn.ts                 # className utility (shadcn)
│   │   ├── format.ts             # Formatting utilities
│   │   └── validation.ts         # Validation helpers
│   └── constants/                # Constants
│       ├── categories.ts
│       └── config.ts
├── types/                         # TypeScript types
│   ├── database.ts                # Supabase database types
│   ├── tool.ts                    # Tool-related types
│   ├── affiliate.ts               # Affiliate types
│   └── index.ts                   # Re-exports
├── hooks/                         # React hooks
│   ├── use-tools.ts               # Tool data hooks
│   ├── use-search.ts              # Search hooks
│   └── use-admin.ts               # Admin hooks
├── store/                         # Zustand stores (client state)
│   ├── search-store.ts            # Search state
│   └── filter-store.ts            # Filter state
├── public/                        # Static assets
│   ├── images/
│   └── icons/
├── .env.local                     # Environment variables (gitignored)
├── .env.example                   # Example env file
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                      # Project documentation
```

---

## Epic to Architecture Mapping

| Epic                       | Key Architectural Components         | Technologies                                    |
| -------------------------- | ------------------------------------ | ----------------------------------------------- |
| Epic 1: Foundation         | Project setup, Supabase schema, Auth | Next.js, Supabase, TypeScript                   |
| Epic 2: Tool Discovery     | Search, Filter, Tool Cards           | Server Components, Supabase queries, shadcn/ui  |
| Epic 3: Tool Details       | Detail pages, Affiliate tracking     | Dynamic routes, API routes, Supabase            |
| Epic 4: Admin Dashboard    | Admin UI, CRUD operations            | Protected routes, Supabase Admin API, shadcn/ui |
| Epic 5: Scraping & Sync    | Scraping jobs, Cron jobs             | Vercel Cron, Cheerio/Puppeteer, Background jobs |
| Epic 6: AI News            | News aggregation, RSS parsing        | RSS parser, Background jobs, Supabase           |
| Epic 7: AI Blog            | Blog generation, Content management  | OpenAI API, Background jobs, Markdown           |
| Epic 8: Advanced Affiliate | Affiliate detection, Analytics       | Web scraping, Supabase queries, Analytics       |

---

## Technology Stack Details

### Core Technologies

#### Frontend Framework

**Next.js 16 (App Router)**

- **Version:** Latest stable (16.x)
- **Rationale:**
  - Server Components for optimal performance
  - Built-in routing and API routes
  - Image optimization and caching
  - Excellent TypeScript support
- **Usage:** All frontend pages and API routes

#### Language

**TypeScript 5.x**

- **Version:** Latest stable (5.x)
- **Rationale:**
  - Type safety prevents runtime errors
  - Better IDE support and autocomplete
  - Self-documenting code
- **Configuration:** Strict mode enabled in tsconfig.json

#### Styling

**Tailwind CSS 3.x**

- **Version:** Latest stable (3.x)
- **Rationale:**
  - Utility-first approach aligns with shadcn/ui
  - Excellent performance with JIT compilation
  - Easy customization
- **Configuration:** Custom theme matching UX design colors

#### Design System

**shadcn/ui**

- **Version:** Latest
- **Rationale:**
  - Accessible components (WCAG compliant)
  - Copy-paste approach (full control)
  - Built on Radix UI primitives
  - TypeScript support
- **Installation:** Components added via CLI as needed

### Backend & Database

#### Database

**Supabase (PostgreSQL)**

- **Version:** Latest managed service
- **Rationale:**
  - Managed PostgreSQL (no infrastructure management)
  - Built-in authentication
  - Real-time subscriptions (if needed)
  - Row Level Security (RLS) for data protection
  - REST and GraphQL APIs auto-generated
- **Usage:** All data storage and queries

#### Authentication

**Supabase Auth**

- **Version:** Latest
- **Rationale:**
  - Secure, managed authentication
  - Supports email/password, OAuth
  - Session management built-in
  - JWT tokens for API authentication
- **Usage:** Admin authentication only

### External Services

#### AI Content Generation

**OpenAI API (GPT-4)**

- **Version:** Latest API version
- **Rationale:**
  - High-quality content generation
  - Reliable API with good documentation
  - Cost-effective for blog generation
- **Usage:** Blog post generation (Epic 7)

#### Scraping

**Cheerio + Puppeteer**

- **Versions:** Latest stable
- **Rationale:**
  - Cheerio: Fast HTML parsing (server-side)
  - Puppeteer: Browser automation for complex pages
  - Both: Mature, well-documented libraries
- **Usage:** Tool scraping (Epic 5), Affiliate detection (Epic 8)

#### News Aggregation

**RSS Parser + Native Fetch**

- **Versions:** Latest RSS parser library
- **Rationale:**
  - RSS parser: Handles RSS feed parsing
  - Native Fetch: No additional HTTP client needed
- **Usage:** News fetching (Epic 6)

### Deployment

#### Hosting

**Vercel**

- **Version:** Latest platform
- **Rationale:**
  - Optimized for Next.js
  - Edge functions for global performance
  - Built-in CI/CD
  - Cron job support
  - Analytics and monitoring
- **Usage:** Production deployment

---

## Integration Points

### Supabase Integration

**Client Setup:**

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
```

**Server Setup:**

```typescript
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
```

### OpenAI Integration

```typescript
// lib/ai/openai.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogPost(
  topic: string,
  type: "review" | "guide" | "comparison"
) {
  // Implementation
}
```

### Scraping Integration

```typescript
// lib/scraping/futuretools.ts
import * as cheerio from "cheerio";

export async function scrapeFutureTools() {
  const response = await fetch(
    "https://www.futuretools.io/?sort-desc=go-live-date"
  );
  const html = await response.text();
  const $ = cheerio.load(html);
  // Parse and extract tools
}
```

---

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### 1. Data Fetching Pattern

**Server Components (Default):**

```typescript
// app/tools/page.tsx
export default async function ToolsPage() {
  const supabase = createClient()
  const { data: tools } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false })

  return <ToolList tools={tools} />
}
```

**Client Components (When Needed):**

```typescript
// components/tool/tool-list.tsx
"use client";

import { useEffect, useState } from "react";

export function ToolList({ initialTools }: { initialTools: Tool[] }) {
  const [tools, setTools] = useState(initialTools);
  // Client-side updates
}
```

**Rationale:** Server Components by default for performance, Client Components only when interactivity needed.

### 2. API Route Pattern

```typescript
// app/api/tools/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = supabase.from("tools").select("*");
  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
```

**Rationale:** Consistent error handling, type-safe responses, proper HTTP status codes.

### 3. Form Handling Pattern

```typescript
// components/admin/tool-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const toolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  website_url: z.string().url("Invalid URL"),
});

export function ToolForm() {
  const form = useForm({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      name: "",
      description: "",
      website_url: "",
    },
  });

  // Form implementation
}
```

**Rationale:** Type-safe validation, consistent error handling, reusable patterns.

### 4. Error Handling Pattern

```typescript
// lib/utils/error-handler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Log unexpected errors
  console.error("Unexpected error:", error);
  return {
    error: "An unexpected error occurred",
    code: "UNKNOWN",
    statusCode: 500,
  };
}
```

**Rationale:** Consistent error structure, proper logging, user-friendly messages.

### 5. Authentication Pattern

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Rationale:** Centralized auth check, protects admin routes, redirects unauthenticated users.

### 6. Caching Pattern

```typescript
// app/tools/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function ToolsPage() {
  const tools = await getTools() // Cached automatically
  return <ToolList tools={tools} />
}
```

**Rationale:** ISR for static content, reduces database load, improves performance.

---

## Consistency Rules

### Naming Conventions

**Files:**

- Components: `kebab-case.tsx` (e.g., `tool-card.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)
- Types: `kebab-case.ts` (e.g., `tool-types.ts`)
- Hooks: `use-kebab-case.ts` (e.g., `use-tools.ts`)

**Components:**

- PascalCase for component names (e.g., `ToolCard`)
- Props interface: `ComponentNameProps` (e.g., `ToolCardProps`)

**Functions:**

- camelCase for functions (e.g., `getTools`, `formatDate`)
- Async functions: descriptive names (e.g., `fetchTools`, `generateBlogPost`)

**Constants:**

- UPPER_SNAKE_CASE for constants (e.g., `MAX_TOOLS_PER_PAGE`)
- Enums: PascalCase (e.g., `ToolCategory`)

**Database:**

- Tables: `snake_case` (e.g., `tools`, `affiliate_links`)
- Columns: `snake_case` (e.g., `created_at`, `website_url`)

### Code Organization

**Component Structure:**

```typescript
// 1. Imports (external, then internal)
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tool } from '@/types/tool'

// 2. Types/Interfaces
interface ToolCardProps {
  tool: Tool
  onSelect?: (tool: Tool) => void
}

// 3. Component
export function ToolCard({ tool, onSelect }: ToolCardProps) {
  // 4. Hooks
  const [isLoading, setIsLoading] = useState(false)

  // 5. Handlers
  const handleClick = () => {
    onSelect?.(tool)
  }

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

**File Organization:**

- One component per file
- Related utilities in same directory
- Shared types in `/types` directory
- Hooks in `/hooks` directory

### Error Handling

**API Routes:**

- Always return proper HTTP status codes
- Include error messages in response body
- Log errors server-side
- Never expose sensitive error details to client

**Client Components:**

- Use try-catch for async operations
- Show user-friendly error messages
- Log errors to error tracking service (Sentry)

**Server Components:**

- Handle errors gracefully
- Return error pages for critical failures
- Use error.tsx files for error boundaries

### Logging Strategy

**Server-side:**

```typescript
// lib/utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to error tracking service
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

**Client-side:**

- Use console for development
- Send errors to error tracking service in production
- Don't log sensitive data

---

## Data Architecture

### Database Schema

**Tables:**

```sql
-- Tools table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  website_url VARCHAR(500) NOT NULL,
  logo_url VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  pricing_model VARCHAR(50), -- 'free', 'freemium', 'paid', 'one-time'
  features JSONB, -- Array of feature strings
  metadata JSONB, -- Additional flexible data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate links table
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  affiliate_url VARCHAR(500) NOT NULL,
  program_name VARCHAR(255),
  commission_rate DECIMAL(5,2),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'active', 'expired'
  detection_method VARCHAR(50), -- 'manual', 'auto-detected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate clicks tracking
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_link_id UUID REFERENCES affiliate_links(id),
  tool_id UUID REFERENCES tools(id),
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- News articles table
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  source_url VARCHAR(500) NOT NULL,
  source_name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id),
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'review', 'published'
  topic VARCHAR(100), -- 'review', 'guide', 'comparison', 'trends'
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scraping jobs table
CREATE TABLE scraping_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_url VARCHAR(500) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  tools_found INTEGER DEFAULT 0,
  tools_added INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**

```sql
-- Performance indexes
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_created_at ON tools(created_at DESC);
CREATE INDEX idx_affiliate_links_tool_id ON affiliate_links(tool_id);
CREATE INDEX idx_affiliate_links_status ON affiliate_links(status);
CREATE INDEX idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Full-text search indexes
CREATE INDEX idx_tools_search ON tools USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

**Row Level Security (RLS):**

```sql
-- Tools: Public read, Admin write
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tools are viewable by everyone" ON tools
  FOR SELECT USING (true);

CREATE POLICY "Tools are editable by admins" ON tools
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Similar policies for other tables
```

---

## API Contracts

### Public APIs

**GET /api/tools**

- Query params: `category`, `pricing`, `search`, `page`, `limit`
- Response: `{ data: Tool[], count: number, page: number }`
- Caching: ISR with 1-hour revalidation

**GET /api/tools/[slug]**

- Response: `{ data: Tool }`
- Caching: ISR with 1-hour revalidation

**GET /api/search**

- Query params: `q` (search query)
- Response: `{ data: Tool[], count: number }`
- Caching: No cache (dynamic search)

**POST /api/affiliate/click**

- Body: `{ affiliate_link_id: string, tool_id: string }`
- Response: `{ success: boolean, redirect_url: string }`
- Purpose: Track affiliate clicks before redirect

### Admin APIs

**GET /api/admin/tools**

- Auth: Required (admin role)
- Query params: `status`, `category`, `has_affiliate`, `page`, `limit`
- Response: `{ data: Tool[], count: number }`

**POST /api/admin/tools**

- Auth: Required (admin role)
- Body: Tool creation data
- Response: `{ data: Tool }`

**PUT /api/admin/tools/[id]**

- Auth: Required (admin role)
- Body: Tool update data
- Response: `{ data: Tool }`

**DELETE /api/admin/tools/[id]**

- Auth: Required (admin role)
- Response: `{ success: boolean }`

**POST /api/admin/scraping/trigger**

- Auth: Required (admin role)
- Response: `{ job_id: string }`
- Purpose: Manually trigger scraping job

### Cron Jobs

**GET /api/cron/sync-tools**

- Auth: Vercel Cron secret header
- Purpose: Daily tool sync from FutureTools.io
- Runs: Daily at configured time

---

## Security Architecture

### Authentication & Authorization

**Admin Authentication:**

- Supabase Auth với email/password
- JWT tokens stored in HTTP-only cookies
- Session validation on every admin request
- Role-based access control (admin role required)

**API Security:**

- Rate limiting: 100 requests/minute per IP
- Input validation: Zod schemas for all inputs
- SQL injection prevention: Parameterized queries only (Supabase handles this)
- XSS prevention: React's built-in escaping, sanitize user inputs
- CSRF protection: SameSite cookies, token validation

### Data Protection

**Sensitive Data:**

- Affiliate links: Encrypted at rest (Supabase encryption)
- API keys: Stored in environment variables only
- User data: Minimal collection, GDPR compliant

**Row Level Security:**

- All tables have RLS enabled
- Public tables: Read-only for anonymous users
- Admin tables: Full access for admin role only

---

## Performance Considerations

### Frontend Performance

**Server Components:**

- Default to Server Components for all pages
- Client Components only when interactivity needed
- Reduces JavaScript bundle size

**Image Optimization:**

- Next.js Image component với automatic optimization
- WebP format với fallback
- Lazy loading for below-fold images
- CDN delivery via Vercel

**Code Splitting:**

- Automatic route-based code splitting
- Dynamic imports for heavy components
- Tree shaking enabled

### Backend Performance

**Database Optimization:**

- Proper indexes on frequently queried columns
- Pagination for all list queries
- Connection pooling (Supabase handles this)

**Caching Strategy:**

- ISR for static content (tools, news, blog)
- SWR for client-side data fetching
- Vercel KV for dynamic caching (if needed)
- Cache invalidation on data updates

**Query Optimization:**

- Select only needed columns
- Use Supabase query builder efficiently
- Avoid N+1 queries
- Batch operations when possible

---

## Deployment Architecture

### Environment Setup

**Environments:**

- Development: Local với Supabase local (optional)
- Staging: Vercel preview deployments
- Production: Vercel production

**Environment Variables:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Vercel Cron
CRON_SECRET=

# App
NEXT_PUBLIC_APP_URL=
```

### Deployment Process

**CI/CD:**

- GitHub Actions (optional) hoặc Vercel Git integration
- Automatic deployments on push to main
- Preview deployments for PRs
- Automated tests before deployment

**Database Migrations:**

- Supabase migrations via SQL files
- Version controlled in repository
- Applied via Supabase dashboard hoặc CLI

**Monitoring:**

- Vercel Analytics for performance
- Sentry for error tracking (optional)
- Supabase logs for database queries

---

## Development Environment

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm
- Git
- Supabase account
- OpenAI API key (for blog generation)

### Setup Commands

```bash
# Clone repository
git clone <repository-url>
cd ai-tools-finder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Development Workflow

1. Create feature branch from main
2. Implement feature following architecture patterns
3. Write tests (if applicable)
4. Run type checking and linting
5. Create PR với description
6. Code review và merge to main
7. Automatic deployment to Vercel

---

## Architecture Decision Records (ADRs)

### ADR-001: Next.js App Router over Pages Router

**Decision:** Use Next.js 16 App Router instead of Pages Router

**Rationale:**

- Server Components provide better performance
- Improved data fetching patterns
- Better TypeScript support
- Future-proof (App Router is the future of Next.js)

**Consequences:**

- Learning curve for developers unfamiliar with App Router
- Some libraries may not support App Router yet (mitigated by using established libraries)

---

### ADR-002: Supabase over Self-Hosted PostgreSQL

**Decision:** Use Supabase managed PostgreSQL instead of self-hosted database

**Rationale:**

- No infrastructure management required
- Built-in authentication
- Automatic backups and scaling
- Real-time capabilities if needed
- Cost-effective for MVP and growth stages

**Consequences:**

- Vendor lock-in (mitigated by using standard PostgreSQL, can migrate)
- Less control over database configuration (acceptable for this project)

---

### ADR-003: Server Components by Default

**Decision:** Use Server Components as default, Client Components only when needed

**Rationale:**

- Better performance (less JavaScript sent to client)
- Improved SEO (content rendered on server)
- Reduced client-side complexity
- Lower hosting costs (less compute on client)

**Consequences:**

- Some interactivity requires Client Components (acceptable trade-off)
- Need to understand Server/Client Component boundaries

---

### ADR-004: shadcn/ui over Material UI or Chakra UI

**Decision:** Use shadcn/ui component library

**Rationale:**

- Copy-paste approach (full control over code)
- Built on Radix UI (accessible primitives)
- Tailwind CSS based (aligns with styling choice)
- TypeScript support
- No runtime overhead (components are code, not library)

**Consequences:**

- Need to manually add components (acceptable for customization needs)
- Less pre-built components than Material UI (mitigated by custom components)

---

### ADR-005: Vercel Cron over External Cron Service

**Decision:** Use Vercel Cron Jobs for scheduled tasks

**Rationale:**

- Integrated with deployment platform
- No additional service to manage
- Free tier sufficient for MVP
- Easy to configure và monitor

**Consequences:**

- Limited to Vercel platform (acceptable since using Vercel for hosting)
- Less flexible than dedicated cron services (acceptable for current needs)

---

### ADR-006: Cheerio + Puppeteer for Scraping

**Decision:** Use Cheerio for simple parsing, Puppeteer for complex pages

**Rationale:**

- Cheerio: Fast, lightweight for static HTML
- Puppeteer: Handles JavaScript-rendered content
- Both: Mature, well-documented libraries
- Cost-effective (no external scraping service)

**Consequences:**

- Need to handle rate limiting manually (implemented in code)
- May need to update selectors if source changes (acceptable maintenance)

---

_Generated by BMAD Decision Architecture Workflow v1.0_  
_Date: 2025-01-27_  
_For: Hoan_
