# AI Tools Finder UX Design Specification

_Created on 2025-01-27 by Hoan_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

**Project Vision:** AI Tools Finder là một website tổng hợp các công cụ AI giúp người dùng tìm kiếm dễ dàng theo nhu cầu của họ. Hệ thống tự động cập nhật danh sách công cụ từ FutureTools.io, tích hợp affiliate marketing, và cung cấp nội dung AI News và Blog để tăng traffic và engagement.

**Core Experience:** Khám phá và tìm kiếm công cụ AI nhanh chóng - người dùng có thể dễ dàng tìm thấy công cụ phù hợp với nhu cầu của họ thông qua tìm kiếm và filter mạnh mẽ.

**Desired Emotional Response:** Trustworthy - Người dùng cảm thấy đáng tin cậy và chuyên nghiệp khi sử dụng platform. Giao diện cần thể hiện sự chuyên nghiệp, đáng tin cậy, và dễ sử dụng.

**Platform:** Web Application (Next.js 16) - Responsive design cho cả desktop và mobile.

**Inspiration:** aitoolfinder.io - Tham khảo giao diện và UX patterns từ platform tương tự.

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Recommended: shadcn/ui**

**Rationale:**

- Modern, customizable component library built on Radix UI primitives
- Excellent accessibility (WCAG compliant) - phù hợp với yêu cầu "trustworthy"
- Tailwind CSS based - dễ customize và maintain
- TypeScript support - phù hợp với Next.js 16
- Copy-paste components - full control over code
- Active community và documentation tốt

**Components Provided:**

- Form components (Input, Select, Checkbox, Radio, Switch)
- Navigation (Tabs, Navigation Menu, Breadcrumb)
- Overlays (Dialog, Dropdown Menu, Popover, Tooltip)
- Feedback (Alert, Toast, Progress, Skeleton)
- Data Display (Table, Card, Badge, Avatar)
- Layout (Separator, Scroll Area)

**Custom Components Needed:**

- Tool Card (custom layout cho tool information)
- Filter Sidebar (advanced filtering UI)
- Search Bar với autocomplete
- Affiliate Link Button (custom styling)
- News/Blog Card components

**Version:** Latest stable (v0.x)

---

## 2. Core User Experience

### 2.1 Defining Experience

**The ONE Experience:** "Discover AI tools effortlessly through powerful search and smart filtering"

**Core Interaction:**

- User lands on homepage → sees featured tools or search bar
- User searches or browses → sees filtered results instantly
- User clicks tool → views detailed information
- User clicks affiliate link → redirected with tracking

**What Makes It Effortless:**

- Instant search results (no page reload)
- Smart filters that combine seamlessly
- Clear tool information hierarchy
- One-click access to tools via affiliate links

### 2.2 Core Experience Principles

**Speed:** Key actions (search, filter, view tool) should feel instant (< 500ms feedback)

**Guidance:** Clear visual hierarchy guides users to discover tools - search bar prominent, filters accessible, tool cards scannable

**Flexibility:** Users can browse freely or search specifically - both paths lead to value

**Feedback:** Subtle but clear - loading states, search results count, filter active indicators

---

## 3. Visual Foundation

### 3.1 Color System

**Theme Direction: Professional & Trustworthy**

**Primary Colors:**

- Primary: `#2563eb` (Blue 600) - Trust, professionalism, technology
- Primary Dark: `#1e40af` (Blue 800) - Hover states, emphasis
- Primary Light: `#3b82f6` (Blue 500) - Active states

**Secondary Colors:**

- Secondary: `#64748b` (Slate 500) - Supporting elements
- Accent: `#10b981` (Emerald 500) - Success, affiliate links, positive actions

**Semantic Colors:**

- Success: `#10b981` (Emerald 500)
- Warning: `#f59e0b` (Amber 500)
- Error: `#ef4444` (Red 500)
- Info: `#3b82f6` (Blue 500)

**Neutral Colors:**

- Background: `#ffffff` (White) - Light mode primary
- Background Secondary: `#f8fafc` (Slate 50) - Cards, sections
- Text Primary: `#0f172a` (Slate 900) - Main text
- Text Secondary: `#64748b` (Slate 500) - Supporting text
- Border: `#e2e8f0` (Slate 200) - Dividers, borders

**Color Psychology Rationale:**

- Blue (Primary): Conveys trust, professionalism, technology - perfect for AI tools platform
- Emerald (Accent): Growth, success, positive actions - ideal for affiliate links and success states
- Slate (Neutrals): Clean, modern, professional - supports trustworthy feeling

### 3.2 Typography

**Font Families:**

- Headings: `Inter` (Modern, clean, professional)
- Body: `Inter` (Consistent, readable)
- Monospace: `JetBrains Mono` (Code snippets, technical content)

**Type Scale:**

- H1: `2.25rem` (36px) / `2.75rem` line-height - Page titles
- H2: `1.875rem` (30px) / `2.25rem` line-height - Section headers
- H3: `1.5rem` (24px) / `2rem` line-height - Subsection headers
- H4: `1.25rem` (20px) / `1.75rem` line-height - Card titles
- Body: `1rem` (16px) / `1.5rem` line-height - Main content
- Small: `0.875rem` (14px) / `1.25rem` line-height - Supporting text
- Tiny: `0.75rem` (12px) / `1rem` line-height - Labels, captions

**Font Weights:**

- Regular (400): Body text, descriptions
- Medium (500): Buttons, labels, emphasis
- Semibold (600): Headings, important text
- Bold (700): Strong emphasis, CTAs

### 3.3 Spacing & Layout

**Base Unit:** 4px (consistent spacing system)

**Spacing Scale:**

- xs: `0.25rem` (4px)
- sm: `0.5rem` (8px)
- md: `1rem` (16px)
- lg: `1.5rem` (24px)
- xl: `2rem` (32px)
- 2xl: `3rem` (48px)
- 3xl: `4rem` (64px)

**Layout Grid:**

- Desktop: 12-column grid with 24px gutters
- Tablet: 8-column grid with 16px gutters
- Mobile: 4-column grid with 16px gutters

**Container Widths:**

- Desktop: `1280px` max-width (centered)
- Tablet: `100%` with padding
- Mobile: `100%` with padding

---

## 4. Design Direction

### 4.1 Chosen Design Approach

**Direction: "Clean Discovery"**

**Layout Pattern:**

- Top navigation bar (sticky) với logo, search bar, và menu
- Main content area với sidebar filters (desktop) / collapsible filters (mobile)
- Tool cards in grid layout (responsive: 3-4 columns desktop, 2 tablet, 1 mobile)
- Spacious but information-rich - balance between breathing room and content density

**Visual Hierarchy:**

- **Density:** Balanced - enough white space for readability, but shows sufficient information
- **Header Emphasis:** Moderate - clear but not overwhelming
- **Content Focus:** Text-focused với imagery support (tool logos, screenshots)

**Interaction Patterns:**

- **Primary Actions:** Inline expansion (tool details expand in place or modal)
- **Information Disclosure:** Progressive disclosure (filters collapse/expand, advanced options hidden by default)
- **User Control:** Flexible - users can browse freely or use guided search

**Visual Style:**

- **Weight:** Minimal to Balanced - clean, modern, professional
- **Depth Cues:** Subtle elevation (cards with light shadows, hover states)
- **Border Style:** Subtle (light borders, mostly using background contrast)

**Rationale:**

- Clean, professional appearance supports "trustworthy" emotional goal
- Spacious layout reduces cognitive load, making discovery effortless
- Grid layout with cards makes tools scannable and comparable
- Progressive disclosure keeps interface uncluttered while providing power features

---

## 5. User Journey Flows

### 5.1 Critical User Paths

#### Journey 1: Tool Discovery & Selection

**User Goal:** Find an AI tool for a specific task

**Flow Approach:** Single-screen với progressive disclosure

**Flow Steps:**

1. **Entry Point - Homepage**
   - User sees: Featured tools carousel, search bar prominent, category quick links
   - User does: Types search query or clicks category
   - System responds: Shows instant search results or filters by category

2. **Browse/Filter**
   - User sees: Tool cards in grid, sidebar filters (desktop) or filter button (mobile)
   - User does: Applies filters (category, pricing, features), scrolls through results
   - System responds: Updates results instantly, shows result count, highlights active filters

3. **View Tool Details**
   - User sees: Tool detail page/modal với full information
   - User does: Reads description, checks features, views pricing
   - System responds: Shows related tools, affiliate link button prominent

4. **Access Tool**
   - User sees: Affiliate link button với clear CTA
   - User does: Clicks affiliate link
   - System responds: Tracks click, redirects to tool website

**Decision Points:**

- Search vs Browse: Both paths available, user chooses
- Filter combinations: Multiple filters can be active simultaneously
- Tool comparison: User can open multiple tool details

**Error States:**

- No results: Shows "No tools found" với suggestions to adjust filters
- Search error: Shows error message với retry option

**Success State:**

- Tool found: Clear visual feedback, easy access via affiliate link

#### Journey 2: Admin Tool Management

**User Goal:** Admin manages tools and affiliate links

**Flow Approach:** Dashboard với dedicated management screens

**Flow Steps:**

1. **Login**
   - User sees: Login form với email/password
   - User does: Enters credentials
   - System responds: Validates, redirects to admin dashboard

2. **Dashboard Overview**
   - User sees: Statistics (total tools, new tools, affiliate status), quick actions
   - User does: Reviews stats, clicks "Manage Tools"
   - System responds: Shows tools management table

3. **Manage Tools**
   - User sees: Table với all tools, filters, search, bulk actions
   - User does: Filters, searches, edits tool, updates affiliate link
   - System responds: Saves changes, shows success message

4. **Affiliate Management**
   - User sees: Affiliate links list với status (active, pending, expired)
   - User does: Reviews auto-detected programs, confirms or rejects
   - System responds: Updates status, tracks confirmations

**Decision Points:**

- Manual vs Auto-detected: Admin reviews auto-detections before confirming
- Bulk operations: Admin can select multiple tools for batch actions

**Error States:**

- Save error: Shows validation errors inline, prevents save until fixed
- Network error: Shows error message với retry option

**Success State:**

- Changes saved: Toast notification confirms success

---

## 6. Component Library

### 6.1 Component Strategy

**From Design System (shadcn/ui):**

- Button, Input, Select, Checkbox, Radio, Switch
- Card, Badge, Avatar, Separator
- Dialog, Dropdown Menu, Popover, Tooltip
- Table, Tabs, Navigation Menu
- Alert, Toast, Progress, Skeleton
- Scroll Area

**Custom Components Needed:**

#### Tool Card Component

**Purpose:** Display tool information in scannable card format

**Anatomy:**

- Tool logo/image (top)
- Tool name (heading)
- Brief description (1-2 lines)
- Key features (tags/badges)
- Pricing indicator
- Affiliate badge (if available)
- "View Details" button

**States:**

- Default: Card với hover elevation
- Hover: Slight elevation, cursor pointer
- Loading: Skeleton state
- Error: Error state với retry option

**Variants:**

- Compact: Smaller card for dense listings
- Featured: Larger card với more details for homepage
- Detailed: Full card với all information expanded

**Behavior:**

- Click card → Opens tool detail page/modal
- Hover → Shows preview tooltip (optional)

**Accessibility:**

- ARIA role: article
- Keyboard: Tab to focus, Enter to open
- Screen reader: Announces tool name, description, features

#### Filter Sidebar Component

**Purpose:** Provide advanced filtering options

**Anatomy:**

- Filter sections (Categories, Pricing, Features)
- Checkboxes/Radio buttons for each filter option
- "Clear filters" button
- Active filter count badge

**States:**

- Collapsed: Shows section headers only
- Expanded: Shows all filter options
- Active: Highlights selected filters

**Variants:**

- Desktop: Fixed sidebar
- Mobile: Collapsible drawer/modal

**Behavior:**

- Select filter → Updates results instantly
- Clear filters → Resets all selections
- Mobile: Tap filter button → Opens drawer

**Accessibility:**

- ARIA expanded state for collapsible sections
- Keyboard navigation for all filter options
- Screen reader announces filter changes

#### Search Bar với Autocomplete

**Purpose:** Enable fast tool discovery

**Anatomy:**

- Search input field
- Search icon
- Autocomplete dropdown
- Recent searches (optional)

**States:**

- Default: Empty input
- Typing: Shows autocomplete suggestions
- Focus: Highlights input, shows suggestions
- Loading: Shows loading indicator in dropdown
- No results: Shows "No matches" message

**Variants:**

- Header: Compact search bar in navigation
- Hero: Large search bar on homepage
- Mobile: Full-width với icon button

**Behavior:**

- Type → Shows autocomplete suggestions
- Select suggestion → Navigates to tool
- Enter → Shows full search results
- Clear → Clears input và suggestions

**Accessibility:**

- ARIA autocomplete="list"
- Keyboard: Arrow keys navigate suggestions, Enter selects
- Screen reader announces suggestions và results

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules

#### Button Hierarchy

**Primary Action:**

- Style: Solid blue background (`#2563eb`), white text, medium weight
- Usage: Main CTAs (Search, View Tool, Get Started)
- Size: Default (h-10, px-4) for most cases, Large (h-12, px-6) for hero CTAs

**Secondary Action:**

- Style: Outline với blue border (`#2563eb`), blue text, transparent background
- Usage: Secondary actions (Cancel, Learn More, View All)
- Size: Default (h-10, px-4)

**Tertiary Action:**

- Style: Text-only với blue text, no border
- Usage: Less important actions (Skip, Dismiss)
- Size: Default (h-10, px-4)

**Destructive Action:**

- Style: Solid red background (`#ef4444`), white text
- Usage: Delete, Remove, Archive actions
- Size: Default (h-10, px-4)

#### Feedback Patterns

**Success:**

- Pattern: Toast notification (top-right, auto-dismiss after 3s)
- Visual: Green background (`#10b981`), checkmark icon, white text
- Usage: Confirmations (Tool saved, Link updated)

**Error:**

- Pattern: Inline error messages below form fields + Toast for critical errors
- Visual: Red text (`#ef4444`), error icon
- Usage: Validation errors, API errors

**Warning:**

- Pattern: Alert banner (top of page or inline)
- Visual: Amber background (`#f59e0b`), warning icon
- Usage: Important notices, unsaved changes

**Info:**

- Pattern: Toast notification hoặc inline info box
- Visual: Blue background (`#3b82f6`), info icon
- Usage: Helpful tips, system messages

**Loading:**

- Pattern: Skeleton screens for content, Spinner for actions
- Visual: Gray shimmer effect (skeleton), animated spinner (actions)
- Usage: Data fetching, form submission

#### Form Patterns

**Label Position:** Above input (clear, accessible)

**Required Field Indicator:** Asterisk (\*) + "Required" text in label

**Validation Timing:** onBlur (when user leaves field) + onSubmit (final check)

**Error Display:** Inline below field với error message + icon

**Help Text:** Tooltip icon next to label, shows on hover/click

#### Modal Patterns

**Size Variants:**

- Small: `400px` width - Confirmations, simple forms
- Medium: `600px` width - Tool details, forms với multiple fields
- Large: `800px` width - Complex content, data tables
- Full-screen: Mobile only - Large forms, complex workflows

**Dismiss Behavior:** Click outside closes (non-destructive), Escape key closes, explicit Close button

**Focus Management:** Auto-focus first interactive element, trap focus within modal

**Stacking:** Multiple modals stack với backdrop dimming

#### Navigation Patterns

**Active State Indication:** Blue underline + blue text color for current page

**Breadcrumb Usage:** Shown on tool detail pages, admin management pages (shows hierarchy)

**Back Button Behavior:** Browser back button for navigation history, in-app back button for modal/drawer dismissal

**Deep Linking:** All tool pages, filter states, search queries support direct URLs

#### Empty State Patterns

**First Use:**

- Guidance: Welcome message với "Get Started" CTA
- Visual: Illustration hoặc icon, friendly message
- CTA: "Explore Tools" button

**No Results:**

- Message: "No tools found matching your criteria"
- Suggestions: "Try adjusting filters" hoặc "Clear filters"
- Visual: Search icon, helpful illustration

**Cleared Content:**

- Message: "All filters cleared"
- Option: "Restore previous filters" (if applicable)

#### Confirmation Patterns

**Delete:**

- Always confirm với modal: "Are you sure? This action cannot be undone."
- Two buttons: "Cancel" (secondary) và "Delete" (destructive)

**Leave Unsaved:**

- Warn với modal: "You have unsaved changes. Are you sure you want to leave?"
- Options: "Stay" (primary), "Leave" (secondary)

**Irreversible Actions:**

- Always require explicit confirmation
- Show consequences clearly

#### Notification Patterns

**Placement:** Top-right corner, stacked vertically

**Duration:** Auto-dismiss after 3s (success/info), 5s (warning), Manual dismiss (errors)

**Stacking:** New notifications appear above existing ones, max 3 visible

**Priority Levels:**

- Critical: Red, persistent until dismissed
- Important: Amber, longer duration
- Info: Blue, standard duration

#### Search Patterns

**Trigger:** Auto-search as user types (debounced 300ms)

**Results Display:** Instant dropdown với autocomplete, full results page on Enter

**Filters:** Sidebar filters (desktop), drawer filters (mobile), always visible when results shown

**No Results:** Shows "No matches" với suggestions to refine search

#### Date/Time Patterns

**Format:** Relative for recent (e.g., "2 hours ago"), Absolute for older (e.g., "Jan 15, 2025")

**Timezone:** User's local timezone (detected from browser)

**Pickers:** Calendar dropdown cho date selection, time picker for time (if needed)

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

**Breakpoints:**

- Mobile: `0-768px` (single column, bottom navigation hoặc hamburger menu)
- Tablet: `768px-1024px` (2-column grid, simplified navigation)
- Desktop: `1024px+` (3-4 column grid, sidebar navigation)

**Adaptation Patterns:**

**Navigation:**

- Desktop: Top horizontal nav với logo, search, menu items
- Tablet: Simplified top nav, hamburger menu for secondary items
- Mobile: Bottom navigation bar với key actions, hamburger menu for full menu

**Sidebar Filters:**

- Desktop: Fixed left sidebar (280px width)
- Tablet: Collapsible sidebar (drawer)
- Mobile: Full-screen drawer triggered by filter button

**Tool Cards:**

- Desktop: 3-4 columns grid
- Tablet: 2 columns grid
- Mobile: Single column, full-width cards

**Tables (Admin):**

- Desktop: Full table với all columns
- Tablet: Horizontal scroll với sticky first column
- Mobile: Card view (each row becomes a card)

**Modals:**

- Desktop/Tablet: Centered modal với max-width
- Mobile: Full-screen modal

**Forms:**

- Desktop: Multi-column layout where appropriate
- Mobile: Single column, full-width inputs

### 8.2 Accessibility Strategy

**WCAG Compliance Target: Level AA**

**Key Requirements:**

**Color Contrast:**

- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

**Keyboard Navigation:**

- All interactive elements accessible via Tab key
- Logical tab order (top to bottom, left to right)
- Skip links for main content
- Focus indicators visible (2px blue outline)

**Focus Indicators:**

- Visible focus states on all interactive elements
- 2px solid blue outline (`#2563eb`)
- High contrast (meets WCAG AA)

**ARIA Labels:**

- Meaningful labels for all interactive elements
- ARIA roles where semantic HTML insufficient
- ARIA live regions for dynamic content updates
- ARIA expanded states for collapsible sections

**Alt Text:**

- Descriptive alt text for all meaningful images
- Decorative images have empty alt=""
- Tool logos: "{{Tool Name}} logo"
- Screenshots: "{{Tool Name}} interface screenshot"

**Form Labels:**

- All inputs have associated labels
- Labels positioned above inputs
- Error messages associated với inputs (aria-describedby)
- Required fields clearly indicated

**Error Identification:**

- Clear, descriptive error messages
- Errors announced to screen readers
- Inline error display below fields
- Error summary at top of form (if multiple errors)

**Touch Target Size:**

- Minimum 44x44px for all interactive elements (mobile)
- Adequate spacing between touch targets (8px minimum)

**Testing Strategy:**

- Automated: Lighthouse accessibility audit, axe DevTools
- Manual: Keyboard-only navigation testing
- Screen reader: NVDA (Windows) và VoiceOver (Mac) testing
- Color contrast: WebAIM Contrast Checker

---

## 9. Implementation Guidance

### 9.1 Completion Summary

**Design System:** shadcn/ui với custom components cho Tool Cards, Filter Sidebar, và Search Bar

**Visual Foundation:** Professional blue color theme (`#2563eb` primary) với clean typography (Inter font) và balanced spacing (4px base unit)

**Design Direction:** "Clean Discovery" - Spacious, scannable grid layout với progressive disclosure, supporting effortless tool discovery

**User Journeys:** 2 critical flows designed - Tool Discovery & Selection, và Admin Tool Management - với clear steps, decision points, và error handling

**UX Patterns:** 10 pattern categories defined - Button hierarchy, Feedback, Forms, Modals, Navigation, Empty states, Confirmations, Notifications, Search, Date/Time - ensuring consistent experience

**Responsive Strategy:** 3 breakpoints (mobile, tablet, desktop) với adaptation patterns for navigation, filters, cards, tables, modals, và forms

**Accessibility:** WCAG 2.1 Level AA compliance target với comprehensive requirements for color contrast, keyboard navigation, focus indicators, ARIA labels, alt text, form labels, error identification, và touch targets

**Next Steps:**

- Designers can create high-fidelity mockups from this foundation
- Developers can implement với clear UX guidance và rationale
- All design decisions documented với reasoning for future reference

---

## Appendix

### Related Documents

- Product Requirements: `docs/prd.md`
- Epic Breakdown: `docs/epics.md`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: `ux-color-themes.html` (to be generated)
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: `ux-design-directions.html` (to be generated)
  - Interactive HTML với 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Version History

| Date       | Version | Changes                         | Author |
| ---------- | ------- | ------------------------------- | ------ |
| 2025-01-27 | 1.0     | Initial UX Design Specification | Hoan   |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._
