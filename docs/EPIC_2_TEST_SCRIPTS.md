# Epic 2 Test Scripts Documentation

## Summary

This document summarizes all automated test scripts for Epic 2 stories.

## Test Scripts Overview

| Script | Story | Tests | Status |
|--------|-------|-------|--------|
| `test-story-2.1.sh` | Story 2.1: Tool Listing Page with Pagination | 20 | ✅ |
| `test-story-2.2.sh` | Story 2.2: Tool Search Functionality | 12 | ✅ |
| `test-story-2.3.sh` | Story 2.3: Tool Filtering System | 15 | ✅ |
| `test-story-2.4.sh` | Story 2.4: Tool Detail Page | 25 | ✅ |
| `test-story-2.5.sh` | Story 2.5: Affiliate Link Tracking & Redirect | 25 | ✅ |

**Total Tests: 97**

---

## Story 2.4: Tool Detail Page

**Script:** `scripts/test-story-2.4.sh`  
**Tests:** 25

### Coverage

- ✅ Dynamic route `/tools/[slug]/page.tsx` exists
- ✅ `getToolBySlug` function implementation
- ✅ `getRelatedTools` function implementation
- ✅ SEO metadata (`generateMetadata`)
- ✅ Structured data (JSON-LD)
- ✅ Breadcrumb navigation
- ✅ Tool information display (name, description, features)
- ✅ Action buttons (Visit Website, Share)
- ✅ Related tools section
- ✅ Loading state (`loading.tsx`)
- ✅ Error state (`not-found.tsx`)
- ✅ TypeScript compilation

### Usage

```bash
./scripts/test-story-2.4.sh
```

### Expected Output

```
==========================================
Testing Story 2.4: Tool Detail Page
==========================================

Test 1: getToolBySlug function exists... ✅ PASS
Test 2: getRelatedTools function exists... ✅ PASS
...
Test 25: TypeScript files compile (basic check)... ✅ PASS

==========================================
Test Results
==========================================
Passed: 25
Failed: 0
Total: 25

✅ All tests passed!
```

---

## Story 2.5: Affiliate Link Tracking & Redirect

**Script:** `scripts/test-story-2.5.sh`  
**Tests:** 25

### Coverage

- ✅ `affiliate_clicks` table migration
- ✅ Migration includes indexes and RLS policies
- ✅ `getAffiliateLink` function implementation
- ✅ API endpoint `/api/affiliate/click` exists
- ✅ Click tracking logic (IP, user agent, referrer)
- ✅ Redirect functionality
- ✅ Error handling
- ✅ Integration with tool detail page
- ✅ Fallback to `website_url` when no affiliate link
- ✅ TypeScript compilation

### Usage

```bash
./scripts/test-story-2.5.sh
```

### Expected Output

```
==========================================
Testing Story 2.5: Affiliate Link Tracking & Redirect
==========================================

Test 1: affiliate_clicks migration exists... ✅ PASS
Test 2: Migration creates affiliate_clicks table... ✅ PASS
...
Test 25: TypeScript files compile (basic check)... ✅ PASS

==========================================
Test Results
==========================================
Passed: 25
Failed: 0
Total: 25

✅ All tests passed!
```

---

## Running All Epic 2 Tests

To run all tests for Epic 2:

```bash
# Run all tests sequentially
./scripts/test-story-2.1.sh && \
./scripts/test-story-2.2.sh && \
./scripts/test-story-2.3.sh && \
./scripts/test-story-2.4.sh && \
./scripts/test-story-2.5.sh

# Or run individually
./scripts/test-story-2.1.sh
./scripts/test-story-2.2.sh
./scripts/test-story-2.3.sh
./scripts/test-story-2.4.sh
./scripts/test-story-2.5.sh
```

---

## Test Maintenance

### Adding New Tests

When adding new features to Epic 2 stories:

1. **Update the test script** for the relevant story
2. **Add test cases** following the existing pattern:
   ```bash
   run_test "Test description" \
     "command_to_check_feature"
   ```
3. **Update this documentation** with new test count
4. **Run the test script** to verify it passes

### Common Test Patterns

- **File existence:** `test -f path/to/file`
- **Content check:** `grep -q "pattern" file`
- **Function check:** `grep -q "function_name" file`
- **Import check:** `grep -q "import.*module" file`

---

## Notes

- All test scripts use `set -e` to exit on first error
- Tests are designed to be fast and non-destructive
- Tests check code structure and implementation, not runtime behavior
- For runtime testing, use manual browser testing or E2E tests

---

## Related Documentation

- [Story 2.1 Documentation](../sprint-artifacts/2-1-tool-listing-page-with-pagination.md)
- [Story 2.2 Documentation](../sprint-artifacts/2-2-tool-search-functionality.md)
- [Story 2.3 Documentation](../sprint-artifacts/2-3-tool-filtering-system.md)
- [Story 2.4 Documentation](../sprint-artifacts/2-4-tool-detail-page.md)
- [Story 2.5 Documentation](../sprint-artifacts/2-5-affiliate-link-tracking-redirect.md)
