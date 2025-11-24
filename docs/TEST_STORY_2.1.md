# Story 2.1: Browser Testing Guide

**Story:** Tool Listing Page with Pagination  
**Date:** 2025-01-27

---

## 🚀 Quick Start

### 1. Start Development Server

```bash
npm run dev
```

Server will run at: `http://localhost:3000`

---

## 🧪 Test Scenarios

### Test 1: Access Tools Listing Page

**Steps:**
1. Open browser → `http://localhost:3000/tools`
2. **Expected Result:**
   - ✅ Page loads successfully
   - ✅ See tools listing (if data exists) or empty state
   - ✅ Page title: "AI Tools"
   - ✅ Description: "Discover the best AI tools to enhance your workflow"

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 2: Tool Cards Display

**Steps:**
1. Navigate to `/tools`
2. **Expected Result:**
   - ✅ Tool cards displayed in grid layout
   - ✅ Each card shows:
     - Tool logo (or placeholder icon)
     - Tool name
     - Pricing badge (if available)
     - Description (truncated to 150 chars)
     - Features badges (if available)
   - ✅ Cards are clickable (link to detail page)

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 3: Responsive Design

**Steps:**
1. Open `/tools` page
2. Test different screen sizes:
   - **Mobile** (< 640px): 1 column
   - **Tablet** (640px - 1024px): 2 columns
   - **Desktop** (1024px - 1280px): 3 columns
   - **Large Desktop** (> 1280px): 4 columns
3. **Expected Result:**
   - ✅ Layout adapts correctly to screen size
   - ✅ Cards remain readable and clickable
   - ✅ No horizontal scrolling

**Screenshot/Notes:**
- [ ] Mobile: PASS/FAIL
- [ ] Tablet: PASS/FAIL
- [ ] Desktop: PASS/FAIL
- [ ] Large Desktop: PASS/FAIL

---

### Test 4: Pagination Functionality

**Prerequisites:** Need at least 25 tools in database to test pagination

**Steps:**
1. Navigate to `/tools`
2. Scroll to bottom of page
3. **Expected Result:**
   - ✅ Pagination controls visible
   - ✅ Shows "Showing 1-24 of X tools"
   - ✅ Previous button disabled on page 1
   - ✅ Page numbers displayed
   - ✅ Next button enabled (if more pages exist)

**Test Navigation:**
1. Click "Next" button
2. **Expected Result:**
   - ✅ URL updates to `/tools?page=2`
   - ✅ Page loads with next set of tools
   - ✅ Previous button now enabled
   - ✅ Current page highlighted

3. Click a page number (e.g., page 3)
4. **Expected Result:**
   - ✅ URL updates to `/tools?page=3`
   - ✅ Page loads correct tools
   - ✅ Correct page number highlighted

5. Click "Previous" button
6. **Expected Result:**
   - ✅ Navigate back to previous page
   - ✅ URL updates correctly

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 5: Loading State

**Steps:**
1. Navigate to `/tools`
2. Open browser DevTools → Network tab
3. Throttle network to "Slow 3G"
4. Reload page
5. **Expected Result:**
   - ✅ Skeleton loading UI displayed
   - ✅ Loading state matches card layout
   - ✅ Smooth transition to content when loaded

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 6: Empty State

**Prerequisites:** No tools in database OR filter returns no results

**Steps:**
1. Navigate to `/tools` (with no data)
2. **Expected Result:**
   - ✅ Empty state component displayed
   - ✅ Shows "No tools found" message
   - ✅ Shows helpful text
   - ✅ "View all tools" button (if filtered)

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 7: Error Handling

**Steps:**
1. Navigate to `/tools`
2. Simulate error (disconnect network or invalid Supabase connection)
3. **Expected Result:**
   - ✅ Error page displayed
   - ✅ Shows "Something went wrong" message
   - ✅ "Try again" button available
   - ✅ Clicking "Try again" retries loading

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 8: URL-Based Pagination

**Steps:**
1. Navigate directly to `/tools?page=2`
2. **Expected Result:**
   - ✅ Page loads with page 2 content
   - ✅ Pagination shows page 2 as active
   - ✅ Correct tools displayed

3. Navigate to `/tools?page=999` (non-existent page)
4. **Expected Result:**
   - ✅ Handles gracefully (shows empty state or redirects)

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

### Test 9: Performance

**Steps:**
1. Navigate to `/tools`
2. Open DevTools → Network tab
3. Reload page
4. **Expected Result:**
   - ✅ Page loads in < 2 seconds (NFR1.1)
   - ✅ Images optimized (check Network tab)
   - ✅ No unnecessary API calls

**Performance Metrics:**
- [ ] Load time: _____ seconds
- [ ] Images optimized: YES/NO
- [ ] API calls: _____ requests

---

### Test 10: Accessibility

**Steps:**
1. Navigate to `/tools`
2. Test with keyboard navigation:
   - Tab through tool cards
   - Navigate pagination with keyboard
   - Activate buttons with Enter/Space
3. **Expected Result:**
   - ✅ All interactive elements focusable
   - ✅ Focus indicators visible
   - ✅ ARIA labels present
   - ✅ Screen reader friendly

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (note error)

---

## 📊 Test Results Summary

| Test | Status | Notes |
|------|--------|-------|
| Test 1: Access Page | ⬜ | |
| Test 2: Tool Cards | ⬜ | |
| Test 3: Responsive | ⬜ | |
| Test 4: Pagination | ⬜ | |
| Test 5: Loading State | ⬜ | |
| Test 6: Empty State | ⬜ | |
| Test 7: Error Handling | ⬜ | |
| Test 8: URL Pagination | ⬜ | |
| Test 9: Performance | ⬜ | |
| Test 10: Accessibility | ⬜ | |

**Legend:**
- ✅ = Pass
- ❌ = Fail
- ⬜ = Not tested

---

## 🐛 Common Issues & Solutions

### Issue: No tools displayed

**Possible causes:**
- Database empty
- Supabase connection issue
- RLS policies blocking access

**Solution:**
- Check Supabase dashboard for tools
- Verify environment variables
- Check RLS policies allow SELECT

---

### Issue: Pagination not working

**Possible causes:**
- Less than 25 tools in database
- URL parameters not updating
- JavaScript errors

**Solution:**
- Add more sample data
- Check browser console for errors
- Verify pagination component renders

---

### Issue: Images not loading

**Possible causes:**
- Invalid logo URLs
- CORS issues
- Next.js Image optimization error

**Solution:**
- Check logo URLs in database
- Verify Next.js Image config
- Check browser console for errors

---

## 📝 Notes

- **Sample Data:** If database is empty, you may need to add sample tools via Supabase dashboard or SQL editor
- **Performance:** Use Chrome DevTools Lighthouse to measure performance
- **Accessibility:** Use browser accessibility tools or screen reader to test

---

**Last Updated:** 2025-01-27

