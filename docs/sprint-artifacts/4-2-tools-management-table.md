# Story 4.2: Tools Management Table

**Status:** backlog  
**Epic:** Epic 4 - Admin Dashboard  
**Prerequisites:** Story 4.1

---

## Story Description

As an **admin**,  
I want **to view and manage all tools in a table format**,  
So that **I can efficiently browse and manage the tool catalog**.

---

## Acceptance Criteria

**Given** I'm on the admin dashboard  
**When** I navigate to the tools management page  
**Then** I should see:

- ✅ Table displaying all tools
- ✅ Columns: Name, Category, Pricing, Status, Created Date, Actions
- ✅ Sortable columns
- ✅ Search/filter functionality
- ✅ Pagination (20-50 tools per page)
- ✅ Bulk selection checkbox
- ✅ Action buttons (Edit, Delete, View)

**And** the table should:

- ✅ Load quickly (< 2 seconds)
- ✅ Support server-side pagination
- ✅ Support server-side sorting
- ✅ Support server-side filtering
- ✅ Show loading states
- ✅ Handle errors gracefully

---

## Technical Notes

- Use shadcn/ui Table component
- Implement server-side pagination, sorting, filtering
- Use Supabase queries with limit/offset
- Add URL query parameters for state
- Create reusable table component
- Add confirmation dialogs for delete actions

---

## Implementation Tasks

- [ ] Create tools management page route (/admin/tools)
- [ ] Create tools table component
- [ ] Implement server-side data fetching with pagination
- [ ] Add sorting functionality
- [ ] Add filtering functionality
- [ ] Add search functionality
- [ ] Add bulk selection
- [ ] Add action buttons (Edit, Delete, View)
- [ ] Add confirmation dialogs
- [ ] Implement delete functionality
- [ ] Add loading and error states
- [ ] Test table functionality

---

## Completion Notes

_To be filled after completion_

