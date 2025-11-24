# Epic 5: Scraping & Sync System - Test Scripts

This document describes the automated test scripts for Epic 5.

## Overview

Epic 5 includes 4 stories, each with its own test script:
- Story 5.1: FutureTools.io Scraper Implementation
- Story 5.2: Newly Added Tools Detection
- Story 5.3: Tool Data Auto-Generation
- Story 5.4: Scraping Job Management & Monitoring

## Running Tests

### Run All Epic 5 Tests

```bash
./scripts/test-epic-5.sh
```

### Run Individual Story Tests

```bash
# Story 5.1
./scripts/test-story-5.1.sh

# Story 5.2
./scripts/test-story-5.2.sh

# Story 5.3
./scripts/test-story-5.3.sh

# Story 5.4
./scripts/test-story-5.4.sh
```

## Prerequisites

1. **Dev server running**: `npm run dev`
2. **Python 3**: Required for JSON parsing in tests
3. **curl**: For API testing
4. **Environment variables**: 
   - `CRON_SECRET` (optional, defaults to "test" for local testing)

## Test Details

### Story 5.1: FutureTools.io Scraper Implementation

**File**: `scripts/test-story-5.1.sh`

**Tests**:
1. ✅ Scrape page 1 (no save) - Verifies scraper can fetch tools
2. ✅ Check tool data structure - Validates required fields (name, description, websiteUrl, sourceUrl)
3. ✅ Check for duplicate tools - Ensures no duplicates in results
4. ✅ Check error handling - Tests invalid page handling

**API Endpoint**: `GET /api/scraper/futuretools?page=1`

**Expected Results**:
- Tools found: > 0
- All tools have name, websiteUrl, sourceUrl
- No duplicates (unique sourceUrls)
- Error handling works

### Story 5.2: Newly Added Tools Detection

**File**: `scripts/test-story-5.2.sh`

**Tests**:
1. ✅ GET endpoint (manual trigger) - Tests manual job trigger
2. ✅ Check response structure - Validates jobId, scrape, save, duration fields
3. ✅ Check save results - Verifies saved, skipped, errors counts
4. ✅ Check unauthorized access - Tests authentication
5. ✅ Verify /newly-added page scraping - Confirms correct page is scraped

**API Endpoint**: `GET /api/cron/sync-tools?secret=CRON_SECRET`

**Expected Results**:
- Job triggered successfully
- Response contains jobId, scrape data, save data, duration
- Save results show saved/skipped/errors counts
- /newly-added page is scraped correctly

### Story 5.3: Tool Data Auto-Generation

**File**: `scripts/test-story-5.3.sh`

**Tests**:
1. ✅ Scrape and save (check auto-generation) - Tests auto-generation during save
2. ✅ Check database for auto-generated fields - Verifies slug, features, status
3. ✅ Check feature extraction - Validates features extracted from descriptions
4. ✅ Check pricing model inference - Tests pricing model detection
5. ✅ Check slug generation - Verifies slug can be generated from names

**API Endpoint**: `GET /api/scraper/futuretools?page=1&save=true&skipDuplicates=true`

**Expected Results**:
- Tools saved with auto-generated metadata
- Database contains slug, features, status fields
- Features extracted from descriptions
- Slugs generated correctly

### Story 5.4: Scraping Job Management & Monitoring

**File**: `scripts/test-story-5.4.sh`

**Tests**:
1. ✅ Check API endpoint structure - Verifies endpoint exists and requires auth
2. ✅ Check admin page exists - Tests page accessibility
3. ✅ Check page content structure - Validates page content
4. ✅ Check API response structure - Tests response format
5. ✅ Check manual trigger endpoint - Verifies trigger functionality

**API Endpoint**: `GET /api/admin/scraping-jobs`
**Page**: `http://localhost:3000/admin/scraping-jobs`

**Expected Results**:
- API endpoint exists and requires authentication
- Admin page exists and is accessible (with auth)
- Response structure is correct
- Manual trigger works

## Test Results

### Sample Output

```
==========================================
🧪 Testing Epic 5: Scraping & Sync System
==========================================

Story 5.1: ✅ 4/4 tests passed
Story 5.2: ✅ 5/5 tests passed
Story 5.3: ✅ 5/5 tests passed
Story 5.4: ✅ 5/5 tests passed

📊 Epic 5 Test Summary
Stories Tested: 4
Passed: 4
Failed: 0

🎉 All Epic 5 tests passed!
```

## Troubleshooting

### Tests Fail with "Server not running"
- Start dev server: `npm run dev`
- Wait for server to be ready (check http://localhost:3000)

### Tests Fail with "Unauthorized"
- For Story 5.2: Set `CRON_SECRET` environment variable or use default "test"
- For Story 5.4: Login as admin first

### Tests Fail with "No tools found"
- Check if FutureTools.io is accessible
- Verify scraper selectors are correct
- Check network connectivity

### Python JSON Parsing Errors
- Ensure Python 3 is installed: `python3 --version`
- Check JSON response format

## Manual Testing

For comprehensive manual testing:

1. **Story 5.1**: Visit `/admin/scraper-test` and run scraper
2. **Story 5.2**: Trigger sync job and check results
3. **Story 5.3**: Check saved tools in database for auto-generated fields
4. **Story 5.4**: Visit `/admin/scraping-jobs` and view job history

## Integration with CI/CD

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Test Epic 5
  run: |
    npm run dev &
    sleep 10
    ./scripts/test-epic-5.sh
```

## Notes

- Tests require a running dev server
- Some tests require admin authentication
- Tests use Python 3 for JSON parsing (fallback to basic checks if unavailable)
- Tests are designed to be non-destructive (use skipDuplicates=true)

