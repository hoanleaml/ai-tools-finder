# Story 2.1: Tool Listing Page with Pagination

Status: in-progress

## Story

As a **user**,
I want **to browse a paginated list of AI tools**,
So that **I can explore available tools systematically**.

## Acceptance Criteria

1. **AC1**: Grid or list layout displaying tools (cards with name, logo, brief description)
2. **AC2**: Pagination controls (previous/next, page numbers)
3. **AC3**: 20-30 tools per page
4. **AC4**: Loading state while fetching data
5. **AC5**: Empty state if no tools exist
6. **AC6**: Page loads in < 2 seconds (NFR1.1)
7. **AC7**: Responsive design (mobile, tablet, desktop)
8. **AC8**: Show tool count and current page info
9. **AC9**: Support URL-based pagination (/tools?page=2)

## Tasks / Subtasks

- [x] **Task 1: Create Tools Listing Page Route** (AC: 1, 6, 7, 9) ✅ COMPLETED
  - [x] Create `app/tools/page.tsx` route ✅
  - [x] Implement Server Component for data fetching ✅
  - [x] Add URL search params handling for pagination ✅
  - [x] Ensure responsive layout structure ✅

- [x] **Task 2: Create Tool Card Component** (AC: 1, 7) ✅ COMPLETED
  - [x] Create `components/tools/tool-card.tsx` ✅
  - [x] Display tool name, logo, description ✅
  - [x] Add link to tool detail page ✅
  - [x] Ensure responsive card layout ✅
  - [x] Add hover states and transitions ✅

- [x] **Task 3: Implement Data Fetching** (AC: 1, 3, 6) ✅ COMPLETED
  - [x] Create `lib/tools/get-tools.ts` utility function ✅
  - [x] Use Supabase client to fetch tools ✅
  - [x] Implement pagination query (limit/offset) ✅
  - [x] Add error handling ✅
  - [x] Optimize query performance ✅

- [x] **Task 4: Create Pagination Component** (AC: 2, 8, 9) ✅ COMPLETED
  - [x] Create `components/tools/pagination.tsx` ✅
  - [x] Implement previous/next buttons ✅
  - [x] Add page number buttons ✅
  - [x] Handle URL parameter updates ✅
  - [x] Show current page and total pages ✅
  - [x] Display tool count ✅

- [x] **Task 5: Add Loading State** (AC: 4) ✅ COMPLETED
  - [x] Create `app/tools/loading.tsx` ✅
  - [x] Add skeleton loading UI ✅
  - [x] Match card layout structure ✅

- [x] **Task 6: Add Empty State** (AC: 5) ✅ COMPLETED
  - [x] Create empty state component ✅
  - [x] Display when no tools found ✅
  - [x] Add helpful message ✅

- [x] **Task 7: Add Error Handling** (AC: 6) ✅ COMPLETED
  - [x] Create `app/tools/error.tsx` ✅
  - [x] Handle data fetching errors gracefully ✅
  - [x] Provide retry mechanism ✅

- [x] **Task 8: Optimize Performance** (AC: 6) ✅ COMPLETED
  - [x] Implement Server Components for data fetching ✅
  - [x] Add image optimization with Next.js Image ✅
  - [x] Use Suspense for better UX ✅
  - [x] Build verification passed ✅

- [ ] **Task 9: Test Implementation** (AC: All) ⏳ IN PROGRESS
  - [ ] Test pagination navigation
  - [ ] Test responsive design on different screen sizes
  - [ ] Test loading states
  - [ ] Test empty state
  - [ ] Test error handling
  - [ ] Verify performance requirements

## Dev Notes

### Requirements Context Summary

This story implements the main tools listing page where users can browse all available AI tools. According to the PRD and Architecture, this is a critical user-facing feature that enables tool discovery.

**Key Requirements:**
- Paginated tool listing (Architecture: Data Fetching)
- Responsive design (Architecture: UI/UX)
- Performance optimization (Architecture: Performance)
- Server-side rendering (Architecture: Next.js App Router)

**Prerequisites:**
- Story 1.2: Supabase project setup and database schema must be complete
- Story 1.4: UI components must be available

**Technical Approach:**
- Use Next.js Server Components for data fetching
- Implement pagination with Supabase query (limit/offset)
- Use Next.js Image component for optimized images
- Implement loading.tsx and error.tsx for better UX
- Cache data appropriately (ISR or static generation)

### References

- **Epic Details**: [Source: docs/epics.md#Story-2.1-Tool-Listing-Page-with-Pagination]
- **Database Schema**: [Source: docs/sprint-artifacts/1-2-supabase-project-setup-database-schema.md]

### Database Schema Reference

**Tools Table:**
- `id` (UUID, primary key)
- `name` (VARCHAR)
- `description` (TEXT)
- `website_url` (VARCHAR)
- `logo_url` (VARCHAR)
- `category_id` (UUID, foreign key)
- `pricing_model` (VARCHAR)
- `features` (JSONB)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### Implementation Notes

- Use `@/lib/supabase/server` for server-side data fetching
- Pagination: Default 24 tools per page (configurable)
- Sort: Default by `created_at DESC` (newest first)
- Image optimization: Use Next.js `Image` component with proper sizing

