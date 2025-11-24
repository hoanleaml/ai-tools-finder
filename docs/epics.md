# AI Tools Finder - Epic Breakdown

**Author:** Hoan
**Date:** 2025-01-27
**Project Level:** Medium
**Target Scale:** 1000+ tools, 10,000+ daily visitors

---

## Overview

This document provides the complete epic and story breakdown for AI Tools Finder, decomposing the requirements from the [PRD](./prd.md) into implementable stories.

**Living Document Notice:** This is the initial version. It will be updated after UX Design and Architecture workflows add interaction and technical details to stories.

### Epic Summary

1. **Epic 1: Foundation & Infrastructure** - Project setup, database schema, authentication, deployment pipeline
2. **Epic 2: Tool Discovery & Browsing** - Users can browse, search, and filter AI tools
3. **Epic 3: Tool Details & Affiliate Links** - Users can view detailed tool information and use affiliate links
4. **Epic 4: Admin Dashboard** - Admin can manage tools, affiliate links, and system settings
5. **Epic 5: Scraping & Sync System** - System automatically syncs tools from FutureTools.io
6. **Epic 6: AI News System** - Users can read AI news aggregated from multiple sources
7. **Epic 7: AI Blog System** - Users can read AI-generated blog posts
8. **Epic 8: Advanced Affiliate Management** - System auto-detects and manages affiliate programs

---

## Functional Requirements Inventory

- **FR1.1-FR1.8**: Tool Discovery & Synchronization (8 requirements)
- **FR2.1-FR2.7**: User-Facing Tool Discovery (7 requirements)
- **FR3.1-FR3.10**: Admin Dashboard & Management (10 requirements)
- **FR4.1-FR4.8**: AI News System (8 requirements)
- **FR5.1-FR5.10**: AI Blog System (10 requirements)
- **FR6.1-FR6.9**: Affiliate Management (9 requirements)
- **FR7.1-FR7.6**: Search & Filter System (6 requirements)
- **FR8.1-FR8.5**: Data Management (5 requirements)

**Total: 63 Functional Requirements**

---

## FR Coverage Map

- **Epic 1 (Foundation)**: Enables all FRs (infrastructure)
- **Epic 2 (Tool Discovery)**: FR2.1, FR2.2, FR2.3, FR7.1, FR7.2, FR7.3, FR7.4, FR7.5, FR7.6
- **Epic 3 (Tool Details)**: FR2.4, FR2.5, FR2.6, FR2.7, FR6.9
- **Epic 4 (Admin Dashboard)**: FR3.1, FR3.2, FR3.3, FR3.4, FR3.5, FR3.6, FR3.7, FR3.8, FR3.9, FR3.10
- **Epic 5 (Scraping & Sync)**: FR1.1, FR1.2, FR1.3, FR1.4, FR1.5, FR1.6, FR1.7, FR1.8
- **Epic 6 (AI News)**: FR4.1, FR4.2, FR4.3, FR4.4, FR4.5, FR4.6, FR4.7, FR4.8
- **Epic 7 (AI Blog)**: FR5.1, FR5.2, FR5.3, FR5.4, FR5.5, FR5.6, FR5.7, FR5.8, FR5.9, FR5.10
- **Epic 8 (Advanced Affiliate)**: FR6.1, FR6.2, FR6.3, FR6.4, FR6.5, FR6.6, FR6.7, FR6.8

---

## Epic 1: Foundation & Infrastructure

**Goal:** Establish the technical foundation for the AI Tools Finder platform, including project setup, database schema, authentication system, and deployment pipeline. This epic enables all subsequent development work.

### Story 1.1: Project Setup & Next.js Configuration

As a **developer**,
I want **a properly configured Next.js 16 project with TypeScript and essential dependencies**,
So that **I have a solid foundation to build the application**.

**Acceptance Criteria:**

**Given** a new project repository
**When** I run the setup commands
**Then** the project should have:
- Next.js 16 with App Router configured
- TypeScript with strict mode enabled
- Tailwind CSS or CSS Modules for styling
- ESLint and Prettier configured
- Git repository initialized with .gitignore

**And** the project structure should follow Next.js 16 conventions:
- `/app` directory for App Router
- `/components` for reusable components
- `/lib` for utilities and helpers
- `/types` for TypeScript types

**Prerequisites:** None (first story)

**Technical Notes:**
- Use `create-next-app@latest` with TypeScript template
- Configure tsconfig.json with strict mode
- Set up Tailwind CSS or choose CSS Modules
- Add essential dev dependencies (ESLint, Prettier, TypeScript)

---

### Story 1.2: Supabase Project Setup & Database Schema

As a **developer**,
I want **Supabase project configured with database schema for tools, categories, affiliate links, news, and blog posts**,
So that **the application has a proper data structure to store all information**.

**Acceptance Criteria:**

**Given** a Supabase project created
**When** I set up the database schema
**Then** the following tables should exist:
- `tools` (id, name, description, website_url, logo_url, category_id, pricing_model, features, created_at, updated_at)
- `categories` (id, name, slug, description)
- `affiliate_links` (id, tool_id, affiliate_url, program_name, commission_rate, status, created_at, updated_at)
- `news_articles` (id, title, summary, content, source_url, source_name, image_url, published_at, created_at)
- `blog_posts` (id, title, slug, content, excerpt, author_id, status, published_at, created_at, updated_at)
- `scraping_jobs` (id, source_url, status, error_message, tools_found, created_at, completed_at)

**And** all tables should have:
- Primary keys and foreign key relationships
- Indexes on frequently queried columns (name, category_id, status)
- Timestamps (created_at, updated_at)
- Proper data types and constraints

**Prerequisites:** Story 1.1

**Technical Notes:**
- Create Supabase project and get API keys
- Use Supabase SQL editor or migrations
- Set up Row Level Security (RLS) policies
- Create indexes for performance (tool name, category, status)

---

### Story 1.3: Supabase Authentication Setup

As an **admin user**,
I want **to authenticate using Supabase Auth**,
So that **I can securely access the admin dashboard**.

**Acceptance Criteria:**

**Given** Supabase Auth is configured
**When** an admin attempts to log in
**Then** the system should:
- Support email/password authentication
- Validate credentials against Supabase Auth
- Create secure session tokens
- Redirect to admin dashboard on success
- Show error messages on failure

**And** the authentication should:
- Support session persistence across page reloads
- Handle token refresh automatically
- Log out functionality that clears session
- Protect admin routes with middleware

**Prerequisites:** Story 1.2

**Technical Notes:**
- Configure Supabase Auth in project
- Set up email/password provider
- Create Next.js middleware for route protection
- Use Supabase client for auth operations
- Store session in cookies or localStorage securely

---

### Story 1.4: Basic UI Components & Design System

As a **developer**,
I want **a set of reusable UI components and design system**,
So that **I can build consistent user interfaces efficiently**.

**Acceptance Criteria:**

**Given** a design system is established
**When** I build UI components
**Then** the following components should exist:
- Button (primary, secondary, outline variants)
- Input (text, email, password, search)
- Card (for tool listings)
- Modal/Dialog
- Loading spinner
- Error message display
- Navigation header
- Footer

**And** all components should:
- Follow consistent styling (colors, spacing, typography)
- Be responsive (mobile, tablet, desktop)
- Support dark mode (optional for MVP)
- Be accessible (WCAG 2.1 AA)
- Use TypeScript for type safety

**Prerequisites:** Story 1.1

**Technical Notes:**
- Consider using shadcn/ui or similar component library
- Define design tokens (colors, spacing, typography)
- Use Tailwind CSS for styling
- Create component storybook or documentation
- Ensure components are server-side compatible

---

### Story 1.5: Deployment Pipeline & Environment Configuration

As a **developer**,
I want **a deployment pipeline configured for Vercel**,
So that **I can deploy the application easily and automatically**.

**Acceptance Criteria:**

**Given** a Vercel account is connected
**When** I push code to the repository
**Then** the system should:
- Automatically build the Next.js application
- Run linting and type checking
- Deploy to preview environment for PRs
- Deploy to production on main branch merge
- Show deployment status and logs

**And** environment variables should be:
- Configured in Vercel dashboard
- Secured and not exposed in code
- Different for development, staging, and production
- Include Supabase keys, API keys, etc.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Connect GitHub repository to Vercel
- Configure build settings (Node.js version, build command)
- Set up environment variables
- Configure custom domain (optional)
- Set up monitoring and error tracking (Sentry optional)

---

## Epic 2: Tool Discovery & Browsing

**Goal:** Enable users to discover AI tools through browsing, searching, and filtering. Users can explore the tool catalog and find tools that match their needs.

### Story 2.1: Tool Listing Page with Pagination

As a **user**,
I want **to browse a paginated list of AI tools**,
So that **I can explore available tools systematically**.

**Acceptance Criteria:**

**Given** tools exist in the database
**When** I visit the tools listing page
**Then** I should see:
- Grid or list layout displaying tools (cards with name, logo, brief description)
- Pagination controls (previous/next, page numbers)
- 20-30 tools per page
- Loading state while fetching data
- Empty state if no tools exist

**And** the page should:
- Load in < 2 seconds (NFR1.1)
- Be responsive (mobile, tablet, desktop)
- Show tool count and current page info
- Support URL-based pagination (/tools?page=2)

**Prerequisites:** Story 1.2, Story 1.4

**Technical Notes:**
- Use Next.js Server Components for data fetching
- Implement pagination with Supabase query (limit/offset or cursor-based)
- Use Next.js Image component for optimized images
- Implement loading.tsx and error.tsx for better UX
- Cache data appropriately (ISR or static generation)

---

### Story 2.2: Tool Search Functionality

As a **user**,
I want **to search for tools by name, description, or keywords**,
So that **I can quickly find specific tools**.

**Acceptance Criteria:**

**Given** I'm on the tools page
**When** I type in the search box
**Then** the system should:
- Show search results in real-time (as I type)
- Search across tool names, descriptions, and features
- Display results in < 500ms (NFR1.2)
- Highlight matching terms
- Show "No results found" if no matches
- Support fuzzy search for typos

**And** the search should:
- Update URL with query parameter (/tools?search=keyword)
- Preserve search state on page navigation
- Clear search functionality
- Show search suggestions/autocomplete (optional for MVP)

**Prerequisites:** Story 2.1

**Technical Notes:**
- Use Supabase full-text search or PostgreSQL text search
- Implement debouncing for search input (300ms delay)
- Create search index on tool name and description columns
- Use client-side filtering for instant feedback
- Consider Algolia or similar for advanced search (post-MVP)

---

### Story 2.3: Tool Filtering System

As a **user**,
I want **to filter tools by category, pricing model, and features**,
So that **I can narrow down tools to my specific needs**.

**Acceptance Criteria:**

**Given** I'm on the tools page
**When** I apply filters
**Then** I should be able to filter by:
- Category (dropdown or checkbox list)
- Pricing model (Free, Freemium, Paid, One-time)
- Features (API access, Browser extension, Mobile app, etc.)
- Multiple filters simultaneously

**And** the filtering should:
- Update results immediately
- Show active filters with remove option
- Update URL with filter parameters (/tools?category=text&pricing=free)
- Show count of filtered results
- Clear all filters option
- Persist filter state in URL for sharing

**Prerequisites:** Story 2.1

**Technical Notes:**
- Use Supabase query filters (eq, in, contains)
- Implement filter state management (URL params or state)
- Create filter UI components (checkboxes, dropdowns)
- Combine filters with AND logic
- Cache filter options (categories, features) for performance

---

### Story 2.4: Tool Detail Page

As a **user**,
I want **to view detailed information about a specific tool**,
So that **I can make an informed decision about using it**.

**Acceptance Criteria:**

**Given** I click on a tool from the listing
**When** I view the tool detail page
**Then** I should see:
- Tool name and logo (large, prominent)
- Full description
- Key features list
- Pricing information
- Website link
- Affiliate link button (if available)
- Screenshots/demos (if available)
- Related tools suggestions
- Social share buttons

**And** the page should:
- Load in < 1.5 seconds (NFR1.3)
- Be SEO optimized (meta tags, structured data)
- Support social sharing (Open Graph, Twitter Cards)
- Be responsive and mobile-friendly
- Have breadcrumb navigation

**Prerequisites:** Story 2.1, Story 1.4

**Technical Notes:**
- Use Next.js dynamic routes (/tools/[slug])
- Generate static paths for SEO (ISR or SSG)
- Add structured data (JSON-LD) for rich snippets
- Implement image optimization with Next.js Image
- Create related tools query (same category, similar features)

---

### Story 2.5: Affiliate Link Tracking & Redirect

As a **user**,
I want **to click affiliate links that track my clicks**,
So that **the platform can earn revenue from my tool usage**.

**Acceptance Criteria:**

**Given** a tool has an affiliate link
**When** I click the affiliate link button
**Then** the system should:
- Track the click (log to database)
- Redirect to the tool's website with affiliate parameters
- Open in new tab/window
- Show loading state during redirect
- Handle errors gracefully (if link is invalid)

**And** the tracking should:
- Record click timestamp, tool ID, user session (if available)
- Not block the redirect (async tracking)
- Support different affiliate link formats
- Preserve original affiliate parameters

**Prerequisites:** Story 2.4, Story 1.2

**Technical Notes:**
- Create click tracking API endpoint
- Store clicks in database (affiliate_clicks table)
- Use Next.js API route for tracking
- Implement redirect with proper HTTP status (302)
- Add analytics event tracking (optional)

---

## Epic 3: Tool Details & Affiliate Links

**Goal:** Provide comprehensive tool information pages and enable affiliate link functionality. Users can learn about tools in detail and access them through tracked affiliate links.

### Story 3.1: Enhanced Tool Detail Page with Rich Content

As a **user**,
I want **to see rich, detailed information about tools**,
So that **I can thoroughly evaluate tools before using them**.

**Acceptance Criteria:**

**Given** I'm viewing a tool detail page
**When** the page loads
**Then** I should see:
- Hero section with tool name, logo, tagline
- Detailed description (formatted text, bullet points)
- Feature highlights with icons
- Pricing breakdown (free tier, paid plans, one-time cost)
- Screenshot gallery or demo videos
- Use cases and examples
- Pros and cons (if available)
- Related tools section
- Social proof (if available)

**And** the content should:
- Be well-formatted and readable
- Support markdown or rich text
- Load images lazily for performance
- Be mobile-responsive
- Support sharing on social media

**Prerequisites:** Story 2.4

**Technical Notes:**
- Enhance tool data model to support rich content
- Use markdown or rich text editor for descriptions
- Implement image gallery component
- Add structured data for SEO
- Create content templates for consistency

---

### Story 3.2: Related Tools Suggestions

As a **user**,
I want **to see related tools**,
So that **I can discover alternative or complementary tools**.

**Acceptance Criteria:**

**Given** I'm viewing a tool detail page
**When** I scroll to the related tools section
**Then** I should see:
- 4-6 related tools displayed
- Tools from the same category
- Tools with similar features
- Tools with similar pricing
- Clickable cards linking to tool detail pages

**And** the suggestions should:
- Be relevant (not random)
- Update dynamically based on tool attributes
- Show tool name, logo, brief description
- Be visually distinct from main tool

**Prerequisites:** Story 2.4

**Technical Notes:**
- Create related tools query (category match, feature similarity)
- Use Supabase query with similarity scoring
- Cache related tools for performance
- Implement fallback if no related tools found

---

### Story 3.3: Social Sharing Functionality

As a **user**,
I want **to share tools on social media**,
So that **I can recommend tools to others**.

**Acceptance Criteria:**

**Given** I'm viewing a tool detail page
**When** I click a social share button
**Then** I should be able to share to:
- Twitter/X
- Facebook
- LinkedIn
- Copy link to clipboard

**And** the shared content should include:
- Tool name and description
- Tool image/logo
- Link to tool detail page
- Pre-filled text with tool name

**Prerequisites:** Story 2.4

**Technical Notes:**
- Use Web Share API for native sharing (mobile)
- Implement share buttons with proper URLs
- Add Open Graph and Twitter Card meta tags
- Create share tracking (optional analytics)

---

## Epic 4: Admin Dashboard

**Goal:** Provide admin users with a comprehensive dashboard to manage tools, affiliate links, and system settings. Admins can control all aspects of the platform.

### Story 4.1: Admin Dashboard Overview

As an **admin**,
I want **to see an overview dashboard with key statistics**,
So that **I can understand the current state of the platform**.

**Acceptance Criteria:**

**Given** I'm logged in as admin
**When** I access the admin dashboard
**Then** I should see:
- Total tools count
- New tools added today/this week
- Tools with affiliate programs (count and percentage)
- Pending reviews/approvals count
- Recent activity feed
- Quick action buttons

**And** the dashboard should:
- Load statistics quickly (< 1 second)
- Update in real-time or on refresh
- Be visually clear with charts/graphs (optional)
- Show trends over time (optional for MVP)

**Prerequisites:** Story 1.3, Story 1.4

**Technical Notes:**
- Create admin dashboard route (/admin)
- Use Supabase queries with aggregations (COUNT, GROUP BY)
- Cache statistics for performance
- Implement real-time updates with Supabase Realtime (optional)

---

### Story 4.2: Tools Management Table

As an **admin**,
I want **to view and manage all tools in a table format**,
So that **I can efficiently browse and manage the tool catalog**.

**Acceptance Criteria:**

**Given** I'm on the admin tools page
**When** I view the tools table
**Then** I should see:
- Table with columns: Name, Category, Status, Affiliate, Actions
- Sortable columns (name, date added)
- Pagination (20-50 items per page)
- Search/filter functionality
- Bulk selection checkbox
- Row actions (edit, delete, view)

**And** the table should:
- Load efficiently with pagination
- Support filtering by status, category, affiliate
- Show loading states
- Handle large datasets (1000+ tools)

**Prerequisites:** Story 4.1

**Technical Notes:**
- Use a table component (shadcn/ui DataTable or similar)
- Implement server-side pagination and filtering
- Use Supabase queries with proper indexing
- Add row selection state management

---

### Story 4.3: Tool Creation & Editing Form

As an **admin**,
I want **to create and edit tools through a form**,
So that **I can manually add or update tool information**.

**Acceptance Criteria:**

**Given** I'm creating or editing a tool
**When** I fill out the form
**Then** I should be able to input:
- Tool name (required)
- Description (rich text or markdown)
- Website URL (required, validated)
- Logo URL or upload
- Category selection (dropdown)
- Pricing model (dropdown)
- Features (multi-select or tags)
- Affiliate link (optional)

**And** the form should:
- Validate all required fields
- Show validation errors clearly
- Auto-save drafts (optional)
- Preview tool card before saving
- Handle image uploads (if implemented)
- Support both create and edit modes

**Prerequisites:** Story 4.2

**Technical Notes:**
- Create form component with validation (react-hook-form + zod)
- Use Supabase Storage for image uploads (if needed)
- Implement form state management
- Add confirmation dialog for delete actions
- Handle form submission with error handling

---

### Story 4.4: Affiliate Link Management

As an **admin**,
I want **to manage affiliate links for tools**,
So that **I can update and track affiliate programs**.

**Acceptance Criteria:**

**Given** I'm managing a tool's affiliate link
**When** I update the affiliate information
**Then** I should be able to:
- Add affiliate link URL
- Update existing affiliate link
- Set affiliate program name
- Set commission rate (optional)
- Enable/disable affiliate link
- View affiliate link status

**And** the management should:
- Validate affiliate URL format
- Test affiliate link (optional, open in new tab)
- Show affiliate link status (active, pending, expired)
- Track affiliate link changes (audit log)

**Prerequisites:** Story 4.3

**Technical Notes:**
- Create affiliate link form/component
- Validate URL format
- Update affiliate_links table
- Add status field (active, pending, expired)
- Implement audit logging (optional)

---

### Story 4.5: Bulk Operations for Tools

As an **admin**,
I want **to perform bulk operations on tools**,
So that **I can efficiently manage multiple tools at once**.

**Acceptance Criteria:**

**Given** I've selected multiple tools in the table
**When** I choose a bulk action
**Then** I should be able to:
- Bulk delete tools (with confirmation)
- Bulk update category
- Bulk update status (active, archived)
- Bulk enable/disable affiliate links
- Export selected tools (CSV/JSON)

**And** the bulk operations should:
- Show confirmation dialog with count
- Process operations in background (if many)
- Show progress indicator
- Handle errors gracefully (partial success)
- Provide undo option (optional)

**Prerequisites:** Story 4.2

**Technical Notes:**
- Implement bulk selection UI
- Create bulk action API endpoints
- Use Supabase batch operations or transactions
- Add progress tracking for large operations
- Implement error handling and rollback

---

## Epic 5: Scraping & Sync System

**Goal:** Automatically discover and sync AI tools from FutureTools.io. The system should detect new tools daily and add them to the database without manual intervention.

### Story 5.1: FutureTools.io Scraper Implementation

As a **system**,
I want **to scrape tool listings from FutureTools.io**,
So that **I can discover new AI tools automatically**.

**Acceptance Criteria:**

**Given** FutureTools.io is accessible
**When** the scraper runs
**Then** it should:
- Fetch the tools listing page (sorted by go-live-date descending)
- Parse HTML to extract tool information:
  - Tool name
  - Description
  - Website URL
  - Logo/image URL
  - Category
  - Launch date
- Handle pagination (if multiple pages)
- Respect rate limiting (delay between requests)
- Handle errors gracefully (network errors, parsing errors)

**And** the scraper should:
- Log all scraping activities
- Store raw HTML/data for debugging (optional)
- Retry on failures (exponential backoff)
- Respect robots.txt (if applicable)

**Prerequisites:** Story 1.2

**Technical Notes:**
- Use Cheerio or Puppeteer for HTML parsing
- Implement rate limiting (1 request per 2-3 seconds)
- Create scraping service/utility
- Add error handling and retry logic
- Store scraping logs in database

---

### Story 5.2: Newly Added Tools Detection

As a **system**,
I want **to check FutureTools.io/newly-added page daily**,
So that **I can detect and add new tools as they're published**.

**Acceptance Criteria:**

**Given** a daily cron job is scheduled
**When** the job runs
**Then** it should:
- Fetch the newly-added page from FutureTools.io
- Parse all tools listed on that page
- Compare with existing tools in database
- Identify new tools (not in database)
- Create new tool entries for detected tools
- Log the sync results (tools found, tools added, errors)

**And** the detection should:
- Run automatically once per day (configurable)
- Handle duplicate detection (by name, URL, or unique identifier)
- Skip tools that already exist
- Continue processing even if some tools fail

**Prerequisites:** Story 5.1

**Technical Notes:**
- Use Vercel Cron Jobs or external cron service
- Create API route for scraping job (/api/cron/sync-tools)
- Implement duplicate detection logic (fuzzy matching by name/URL)
- Add job status tracking in scraping_jobs table
- Send notifications on completion (optional)

---

### Story 5.3: Tool Data Auto-Generation

As a **system**,
I want **to auto-generate tool metadata when tools are scraped**,
So that **I can create complete tool entries similar to aitoolfinder.io**.

**Acceptance Criteria:**

**Given** a new tool is detected from scraping
**When** the tool is added to database
**Then** the system should:
- Extract available information from scraped data
- Generate tool slug from name
- Set default category if not found
- Extract features from description (if possible)
- Set default pricing model (if not specified)
- Create basic tool entry with available data

**And** the auto-generation should:
- Fill in missing fields with defaults
- Mark tool as "needs review" if data is incomplete
- Use AI (optional) to enhance descriptions
- Preserve original scraped data for reference

**Prerequisites:** Story 5.2

**Technical Notes:**
- Create tool data transformation service
- Implement slug generation (URL-friendly)
- Add default values for missing fields
- Mark incomplete tools for admin review
- Store original scraped data in separate field (optional)

---

### Story 5.4: Scraping Job Management & Monitoring

As an **admin**,
I want **to monitor scraping jobs and their results**,
So that **I can ensure the sync system is working correctly**.

**Acceptance Criteria:**

**Given** scraping jobs are running
**When** I view the scraping jobs page
**Then** I should see:
- List of all scraping jobs (date, status, tools found, errors)
- Job status (running, completed, failed)
- Tools discovered in each job
- Error messages if job failed
- Ability to manually trigger a scraping job
- Ability to retry failed jobs

**And** the monitoring should:
- Show real-time status (if job is running)
- Provide job logs for debugging
- Send alerts on failures (optional)
- Show job history (last 30 days)

**Prerequisites:** Story 5.2, Story 4.1

**Technical Notes:**
- Create scraping_jobs table to track jobs
- Add admin UI for job management
- Implement job status updates
- Add manual trigger endpoint
- Create job logs viewer

---

## Epic 6: AI News System

**Goal:** Aggregate and display AI news from multiple reputable sources. Users can stay updated with the latest AI developments through automatically updated news content.

### Story 6.1: News Source Integration

As a **system**,
I want **to fetch news from 2-3 reputable AI news sources**,
So that **I can aggregate the latest AI news automatically**.

**Acceptance Criteria:**

**Given** news sources are configured
**When** the news fetcher runs
**Then** it should:
- Fetch news from TechCrunch AI section (or similar)
- Fetch news from The Verge AI section (or similar)
- Fetch news from AI News website (or similar)
- Parse RSS feeds or scrape HTML
- Extract article information:
  - Title
  - Summary/excerpt
  - Full content (if available)
  - Source URL
  - Published date
  - Image URL
- Handle different source formats (RSS, HTML, API)

**And** the integration should:
- Run every 2-4 hours automatically
- Handle rate limiting per source
- Retry on failures
- Log all fetch operations

**Prerequisites:** Story 1.2

**Technical Notes:**
- Use RSS parser library (rss-parser) for RSS feeds
- Implement HTML scraping for sources without RSS
- Create news fetching service
- Add source configuration (URLs, formats, intervals)
- Store source information in database

---

### Story 6.2: News Article Processing & Deduplication

As a **system**,
I want **to process and deduplicate news articles**,
So that **I avoid showing duplicate news to users**.

**Acceptance Criteria:**

**Given** news articles are fetched from sources
**When** articles are processed
**Then** the system should:
- Check for duplicates (by title similarity, URL)
- Skip articles that already exist
- Extract and clean article content
- Store articles in news_articles table
- Mark articles with source information
- Set published_at timestamp

**And** the processing should:
- Use fuzzy matching for duplicate detection
- Handle articles with similar titles but different sources
- Clean HTML and format content
- Extract and store images
- Preserve original source URL

**Prerequisites:** Story 6.1

**Technical Notes:**
- Implement duplicate detection algorithm (string similarity)
- Create news processing service
- Add content cleaning/formatting
- Store processed articles in database
- Add indexes for efficient duplicate checking

---

### Story 6.3: News Feed Display

As a **user**,
I want **to browse a feed of AI news articles**,
So that **I can stay updated with latest AI developments**.

**Acceptance Criteria:**

**Given** news articles exist in database
**When** I visit the news page
**Then** I should see:
- List of news articles (cards or list layout)
- Article title, excerpt, source, date
- Article image (if available)
- Pagination or infinite scroll
- Filter by source (optional)
- Sort by date (newest first)

**And** the feed should:
- Load quickly (< 2 seconds)
- Be responsive (mobile-friendly)
- Show loading states
- Handle empty state (no news)
- Support sharing individual articles

**Prerequisites:** Story 6.2, Story 1.4

**Technical Notes:**
- Create news listing page (/news)
- Use Next.js Server Components for data fetching
- Implement pagination or infinite scroll
- Add image optimization
- Cache news feed (ISR with 1-hour revalidation)

---

### Story 6.4: News Article Detail Page

As a **user**,
I want **to read full news articles**,
So that **I can get complete information about AI news**.

**Acceptance Criteria:**

**Given** I click on a news article
**When** I view the article detail page
**Then** I should see:
- Full article title
- Article content (formatted, readable)
- Source name and link
- Published date
- Article image (if available)
- Related articles section
- Social share buttons

**And** the page should:
- Be SEO optimized (meta tags, structured data)
- Load quickly
- Be mobile-responsive
- Support reading mode (optional)
- Have back navigation

**Prerequisites:** Story 6.3

**Technical Notes:**
- Create dynamic route (/news/[slug])
- Generate static paths for SEO
- Add structured data (Article schema)
- Implement related articles query
- Add social sharing meta tags

---

## Epic 7: AI Blog System

**Goal:** Automatically generate and publish AI-related blog posts to drive traffic and provide value to users. Blog posts are AI-generated but reviewed by admins before publishing.

### Story 7.1: Blog Post Auto-Generation with AI

As a **system**,
I want **to automatically generate blog posts using AI**,
So that **I can create content without manual writing**.

**Acceptance Criteria:**

**Given** AI API is configured
**When** blog generation is triggered
**Then** the system should:
- Generate blog posts on topics:
  - Tool reviews (review specific AI tools)
  - Best practices (how to use AI tools effectively)
  - Tool comparisons (compare similar tools)
  - Industry trends (AI trends and insights)
  - How-to guides (tutorials for using tools)
- Create complete blog post with:
  - Title (SEO-optimized)
  - Slug (URL-friendly)
  - Excerpt/summary
  - Full content (structured, formatted)
  - Meta description
  - Suggested tags/categories
- Schedule generation (2-3 posts per week)

**And** the generation should:
- Use OpenAI GPT-4 or Anthropic Claude API
- Generate unique content (not duplicates)
- Follow SEO best practices
- Be formatted in markdown or HTML
- Save as draft (pending admin review)

**Prerequisites:** Story 1.2

**Technical Notes:**
- Integrate OpenAI or Anthropic API
- Create blog generation service
- Implement prompt engineering for different topics
- Add content templates for consistency
- Store generated posts in blog_posts table with "draft" status

---

### Story 7.2: Blog Post Review & Approval Workflow

As an **admin**,
I want **to review and approve AI-generated blog posts**,
So that **I can ensure content quality before publishing**.

**Acceptance Criteria:**

**Given** AI-generated blog posts exist as drafts
**When** I review a blog post
**Then** I should be able to:
- View the full blog post content
- Edit title, content, excerpt
- Add or modify tags/categories
- Approve and publish the post
- Reject and delete the post
- Request revisions (regenerate with modifications)
- Schedule publication date

**And** the workflow should:
- Show draft posts in admin dashboard
- Highlight posts pending review
- Save edits automatically (optional)
- Show post preview before publishing
- Send notifications on approval (optional)

**Prerequisites:** Story 7.1, Story 4.1

**Technical Notes:**
- Create blog post editor component
- Add rich text editor (Tiptap or similar)
- Implement approval workflow (status: draft → review → approved → published)
- Add admin UI for post management
- Store post revisions (optional)

---

### Story 7.3: Blog Listing & Detail Pages

As a **user**,
I want **to browse and read blog posts**,
So that **I can learn about AI tools and best practices**.

**Acceptance Criteria:**

**Given** published blog posts exist
**When** I visit the blog page
**Then** I should see:
- List of blog posts (cards with title, excerpt, date, author)
- Featured posts section (optional)
- Categories/tags filter
- Pagination
- Search functionality (optional)

**And** when I click a blog post:
- Full blog post content (formatted, readable)
- Author information
- Publication date
- Tags/categories
- Related posts
- Social share buttons
- Reading time estimate

**Prerequisites:** Story 7.2, Story 1.4

**Technical Notes:**
- Create blog listing page (/blog)
- Create blog post detail page (/blog/[slug])
- Use Next.js ISR for SEO
- Add structured data (BlogPosting schema)
- Implement related posts query
- Add reading time calculation

---

### Story 7.4: Blog SEO Optimization

As a **system**,
I want **blog posts to be SEO optimized**,
So that **they rank well in search engines and drive organic traffic**.

**Acceptance Criteria:**

**Given** a blog post is published
**When** the post is indexed by search engines
**Then** it should have:
- SEO-optimized title (60 characters, includes keywords)
- Meta description (150-160 characters, compelling)
- Proper heading structure (H1, H2, H3)
- Alt text for images
- Internal links to related content
- Schema markup (BlogPosting)
- Sitemap inclusion
- Robots.txt configuration

**And** the SEO should:
- Use target keywords naturally
- Have readable URLs (slug-based)
- Load quickly (performance)
- Be mobile-friendly
- Have social sharing meta tags

**Prerequisites:** Story 7.3

**Technical Notes:**
- Generate meta tags dynamically
- Add structured data (JSON-LD)
- Create sitemap.xml with blog posts
- Optimize images (alt text, lazy loading)
- Implement internal linking strategy
- Add Open Graph and Twitter Card tags

---

## Epic 8: Advanced Affiliate Management

**Goal:** Automatically detect affiliate programs and provide comprehensive affiliate link management. The system helps identify monetization opportunities and tracks affiliate performance.

### Story 8.1: Affiliate Program Auto-Detection

As a **system**,
I want **to automatically detect affiliate programs for tools**,
So that **I can identify monetization opportunities without manual research**.

**Acceptance Criteria:**

**Given** a tool website URL exists
**When** the affiliate detector runs
**Then** it should:
- Crawl the tool's website
- Look for affiliate program pages (common patterns: /affiliate, /partners, /referral)
- Search for affiliate-related keywords in page content
- Extract affiliate program information:
  - Program name
  - Affiliate link format
  - Commission rate (if available)
  - Sign-up URL
- Store detected programs with "pending confirmation" status

**And** the detection should:
- Handle different website structures
- Respect robots.txt and rate limiting
- Retry on failures
- Log detection results
- Mark tools with detected programs

**Prerequisites:** Story 1.2, Story 5.1

**Technical Notes:**
- Use web scraping (Cheerio/Puppeteer) to crawl tool websites
- Implement pattern matching for affiliate pages
- Create affiliate detection service
- Store detection results in database
- Add detection job scheduling (daily or weekly)

---

### Story 8.2: Admin Affiliate Confirmation Workflow

As an **admin**,
I want **to review and confirm auto-detected affiliate programs**,
So that **I can verify and activate legitimate affiliate opportunities**.

**Acceptance Criteria:**

**Given** affiliate programs are auto-detected
**When** I review detected programs
**Then** I should be able to:
- View list of pending affiliate detections
- See detection details (source URL, detected info, confidence score)
- Visit the detected affiliate page (open in new tab)
- Confirm and activate the affiliate program
- Reject false positives
- Manually add affiliate link if detection missed it
- Edit affiliate link details before confirming

**And** the workflow should:
- Show detection confidence/score
- Highlight tools with pending detections
- Send notifications for new detections (optional)
- Track confirmation history

**Prerequisites:** Story 8.1, Story 4.1

**Technical Notes:**
- Create admin UI for affiliate review
- Add confirmation status field
- Implement confidence scoring for detections
- Add manual override capability
- Store confirmation audit trail

---

### Story 8.3: Affiliate Link Analytics & Reporting

As an **admin**,
I want **to view analytics and reports for affiliate links**,
So that **I can track performance and optimize revenue**.

**Acceptance Criteria:**

**Given** affiliate links are being used
**When** I view affiliate analytics
**Then** I should see:
- Total clicks per affiliate link
- Click-through rate (CTR)
- Conversion tracking (if available from affiliate network)
- Revenue estimates (based on commission rates)
- Top performing tools (by clicks/revenue)
- Trends over time (daily, weekly, monthly)
- Export reports (CSV, PDF)

**And** the analytics should:
- Update in real-time or near real-time
- Show date range filters
- Display charts/graphs for visualization
- Compare performance across tools
- Identify best performing affiliate programs

**Prerequisites:** Story 2.5, Story 4.4

**Technical Notes:**
- Create analytics dashboard
- Query affiliate_clicks table with aggregations
- Implement date range filtering
- Add charting library (recharts or similar)
- Create export functionality
- Add revenue calculation logic

---

## FR Coverage Matrix

| FR ID | Description | Epic | Story |
|-------|-------------|------|-------|
| FR1.1 | Scrape tools from FutureTools.io | Epic 5 | Story 5.1 |
| FR1.2 | Daily sync from newly-added | Epic 5 | Story 5.2 |
| FR1.3 | Compare and detect new tools | Epic 5 | Story 5.2 |
| FR1.4 | Auto-create tool entries | Epic 5 | Story 5.3 |
| FR1.5 | Auto-generate tool metadata | Epic 5 | Story 5.3 |
| FR1.6 | Store scraping history | Epic 5 | Story 5.4 |
| FR1.7 | Handle scraping errors | Epic 5 | Story 5.1 |
| FR1.8 | Rate limiting for scraping | Epic 5 | Story 5.1 |
| FR2.1 | Browse tool listings | Epic 2 | Story 2.1 |
| FR2.2 | Search tools | Epic 2 | Story 2.2 |
| FR2.3 | Filter tools | Epic 2 | Story 2.3 |
| FR2.4 | View tool details | Epic 2, Epic 3 | Story 2.4, Story 3.1 |
| FR2.5 | Click affiliate links | Epic 2 | Story 2.5 |
| FR2.6 | Share tools | Epic 3 | Story 3.3 |
| FR2.7 | View related tools | Epic 3 | Story 3.2 |
| FR3.1 | Admin login | Epic 4 | Story 4.1 (via Story 1.3) |
| FR3.2 | Dashboard overview | Epic 4 | Story 4.1 |
| FR3.3 | View tools table | Epic 4 | Story 4.2 |
| FR3.4 | Filter tools in admin | Epic 4 | Story 4.2 |
| FR3.5 | Create tools manually | Epic 4 | Story 4.3 |
| FR3.6 | Edit tools | Epic 4 | Story 4.3 |
| FR3.7 | Delete tools | Epic 4 | Story 4.3 |
| FR3.8 | Update affiliate links | Epic 4 | Story 4.4 |
| FR3.9 | Bulk operations | Epic 4 | Story 4.5 |
| FR3.10 | Manage scraping jobs | Epic 4 | Story 5.4 |
| FR4.1 | Fetch news from sources | Epic 6 | Story 6.1 |
| FR4.2 | Update news every 2-4 hours | Epic 6 | Story 6.1 |
| FR4.3 | Parse news content | Epic 6 | Story 6.2 |
| FR4.4 | Detect duplicates | Epic 6 | Story 6.2 |
| FR4.5 | View news feed | Epic 6 | Story 6.3 |
| FR4.6 | View news detail | Epic 6 | Story 6.4 |
| FR4.7 | Filter news | Epic 6 | Story 6.3 |
| FR4.8 | Moderate news | Epic 6 | Story 6.1 (optional) |
| FR5.1 | Auto-generate blog posts | Epic 7 | Story 7.1 |
| FR5.2 | Generate on multiple topics | Epic 7 | Story 7.1 |
| FR5.3 | Schedule blog posts | Epic 7 | Story 7.1 |
| FR5.4 | SEO-optimize content | Epic 7 | Story 7.4 |
| FR5.5 | Admin review workflow | Epic 7 | Story 7.2 |
| FR5.6 | Approve/reject posts | Epic 7 | Story 7.2 |
| FR5.7 | Manual blog creation | Epic 7 | Story 7.2 |
| FR5.8 | View blog listings | Epic 7 | Story 7.3 |
| FR5.9 | View blog detail | Epic 7 | Story 7.3 |
| FR5.10 | Share blog posts | Epic 7 | Story 7.3 |
| FR6.1 | Auto-detect affiliate programs | Epic 8 | Story 8.1 |
| FR6.2 | Admin confirmation | Epic 8 | Story 8.2 |
| FR6.3 | Review detected programs | Epic 8 | Story 8.2 |
| FR6.4 | Manually add affiliate links | Epic 4 | Story 4.4 |
| FR6.5 | Update affiliate links | Epic 4 | Story 4.4 |
| FR6.6 | Track clicks | Epic 2 | Story 2.5 |
| FR6.7 | Generate reports | Epic 8 | Story 8.3 |
| FR6.8 | View analytics | Epic 8 | Story 8.3 |
| FR6.9 | Handle redirects | Epic 2 | Story 2.5 |
| FR7.1 | Index tool data | Epic 2 | Story 2.2 |
| FR7.2 | Full-text search | Epic 2 | Story 2.2 |
| FR7.3 | Fuzzy search | Epic 2 | Story 2.2 |
| FR7.4 | Filter combinations | Epic 2 | Story 2.3 |
| FR7.5 | URL state management | Epic 2 | Story 2.3 |
| FR7.6 | Search suggestions | Epic 2 | Story 2.2 (optional) |
| FR8.1 | Store tool data | Epic 1 | Story 1.2 |
| FR8.2 | Handle relationships | Epic 1 | Story 1.2 |
| FR8.3 | Backup data | Epic 1 | Story 1.2 (via Supabase) |
| FR8.4 | Export data | Epic 4 | Story 4.5 |
| FR8.5 | Import data | Epic 4 | Story 4.3 (via form) |

**Coverage: 100% - All 63 FRs mapped to stories**

---

## Summary

This epic breakdown decomposes the AI Tools Finder PRD into 8 epics and 35+ stories, organized by user value delivery:

1. **Foundation (5 stories)** - Establishes technical infrastructure
2. **Tool Discovery (5 stories)** - Enables users to find tools
3. **Tool Details (3 stories)** - Provides rich tool information
4. **Admin Dashboard (5 stories)** - Empowers admin management
5. **Scraping System (4 stories)** - Automates tool discovery
6. **AI News (4 stories)** - Delivers news content
7. **AI Blog (4 stories)** - Generates blog content
8. **Advanced Affiliate (3 stories)** - Optimizes monetization

**Total Stories: 33+ stories** (exact count depends on implementation details)

Each epic delivers incremental user value, and stories are sized for single dev agent completion. The breakdown will be enhanced with UX Design and Architecture details in subsequent workflows.

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document will be updated after UX Design and Architecture workflows to incorporate interaction details and technical decisions._

