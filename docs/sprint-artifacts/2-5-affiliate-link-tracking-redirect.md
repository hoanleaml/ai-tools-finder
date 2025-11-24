# Story 2.5: Affiliate Link Tracking & Redirect

**Status:** in-progress  
**Epic:** Epic 2 - Tool Discovery & Browsing  
**Prerequisites:** Story 2.4, Story 1.2

---

## Story Description

As a **user**,  
I want **to click affiliate links that track my clicks**,  
So that **the platform can earn revenue from my tool usage**.

---

## Acceptance Criteria

**Given** a tool has an affiliate link  
**When** I click the affiliate link button  
**Then** the system should:

- ✅ Track the click (log to database)
- ✅ Redirect to the tool's website with affiliate parameters
- ✅ Open in new tab/window
- ✅ Show loading state during redirect
- ✅ Handle errors gracefully (if link is invalid)

**And** the tracking should:

- ✅ Record click timestamp, tool ID, user session (if available)
- ✅ Not block the redirect (async tracking)
- ✅ Support different affiliate link formats
- ✅ Preserve original affiliate parameters

---

## Technical Notes

- Create click tracking API endpoint
- Store clicks in database (affiliate_clicks table)
- Use Next.js API route for tracking
- Implement redirect with proper HTTP status (302)
- Add analytics event tracking (optional)

---

## Implementation Tasks

- [ ] Create affiliate_clicks table migration (if not exists)
- [ ] Create API endpoint /api/affiliate/click
- [ ] Create affiliate link component
- [ ] Update tool detail page to use affiliate links
- [ ] Implement click tracking logic
- [ ] Handle redirect with affiliate parameters
- [ ] Add loading state during redirect
- [ ] Test affiliate link tracking

---

## Completion Notes

_To be filled after completion_

