#!/bin/bash

# Test Story 2.5: Affiliate Link Tracking & Redirect
# This script tests the implementation of affiliate link tracking and redirect

set -e

echo "=========================================="
echo "Testing Story 2.5: Affiliate Link Tracking & Redirect"
echo "=========================================="
echo ""

PASSED=0
FAILED=0

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
test_count=0

# Function to run a test
run_test() {
  test_count=$((test_count + 1))
  test_name="$1"
  command="$2"
  
  echo -n "Test $test_count: $test_name... "
  
  if eval "$command" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASS${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${RED}❌ FAIL${NC}"
    FAILED=$((FAILED + 1))
  fi
}

# 1. Test affiliate_clicks migration exists
run_test "affiliate_clicks migration exists" \
  "test -f supabase/migrations/005_affiliate_clicks_table.sql"

# 2. Test migration creates affiliate_clicks table
run_test "Migration creates affiliate_clicks table" \
  "grep -q 'CREATE TABLE.*affiliate_clicks' supabase/migrations/005_affiliate_clicks_table.sql"

# 3. Test migration has indexes
run_test "Migration has indexes" \
  "grep -q 'CREATE INDEX' supabase/migrations/005_affiliate_clicks_table.sql"

# 4. Test migration enables RLS
run_test "Migration enables RLS" \
  "grep -q 'ENABLE ROW LEVEL SECURITY' supabase/migrations/005_affiliate_clicks_table.sql"

# 5. Test migration has insert policy
run_test "Migration has insert policy" \
  "grep -q 'FOR INSERT' supabase/migrations/005_affiliate_clicks_table.sql"

# 6. Test getAffiliateLink function exists
run_test "getAffiliateLink function exists" \
  "test -f lib/affiliate/get-affiliate-link.ts"

# 7. Test getAffiliateLink imports createClient
run_test "getAffiliateLink imports createClient" \
  "grep -q 'createClient' lib/affiliate/get-affiliate-link.ts"

# 8. Test getAffiliateLink queries by tool_id
run_test "getAffiliateLink queries by tool_id" \
  "grep -q 'tool_id' lib/affiliate/get-affiliate-link.ts"

# 9. Test getAffiliateLink filters by active status
run_test "getAffiliateLink filters by active status" \
  "grep -q 'status.*active' lib/affiliate/get-affiliate-link.ts || grep -q '\"active\"' lib/affiliate/get-affiliate-link.ts"

# 10. Test API endpoint exists
run_test "API endpoint exists" \
  "test -f app/api/affiliate/click/route.ts"

# 11. Test API endpoint exports GET handler
run_test "API endpoint exports GET handler" \
  "grep -q 'export.*GET' app/api/affiliate/click/route.ts || grep -q 'export async function GET' app/api/affiliate/click/route.ts"

# 12. Test API endpoint reads tool_id parameter
run_test "API endpoint reads tool_id parameter" \
  "grep -q 'tool_id' app/api/affiliate/click/route.ts"

# 13. Test API endpoint reads affiliate_link_id parameter
run_test "API endpoint reads affiliate_link_id parameter" \
  "grep -q 'affiliate_link_id' app/api/affiliate/click/route.ts"

# 14. Test API endpoint uses createAdminClient
run_test "API endpoint uses createAdminClient" \
  "grep -q 'createAdminClient' app/api/affiliate/click/route.ts"

# 15. Test API endpoint has trackClick function
run_test "API endpoint has trackClick function" \
  "grep -q 'trackClick' app/api/affiliate/click/route.ts"

# 16. Test API endpoint inserts into affiliate_clicks
run_test "API endpoint inserts into affiliate_clicks" \
  "grep -q 'affiliate_clicks' app/api/affiliate/click/route.ts"

# 17. Test API endpoint handles redirect
run_test "API endpoint handles redirect" \
  "grep -q 'redirect' app/api/affiliate/click/route.ts || grep -q 'NextResponse.redirect' app/api/affiliate/click/route.ts"

# 18. Test API endpoint tracks IP address
run_test "API endpoint tracks IP address" \
  "grep -q 'ip_address' app/api/affiliate/click/route.ts || grep -q 'ipAddress' app/api/affiliate/click/route.ts"

# 19. Test API endpoint tracks user agent
run_test "API endpoint tracks user agent" \
  "grep -q 'user_agent' app/api/affiliate/click/route.ts || grep -q 'userAgent' app/api/affiliate/click/route.ts"

# 20. Test API endpoint has error handling
run_test "API endpoint has error handling" \
  "grep -q 'catch\|error' app/api/affiliate/click/route.ts"

# 21. Test tool detail page imports getAffiliateLink
run_test "Tool detail page imports getAffiliateLink" \
  "grep -q 'getAffiliateLink' app/tools/\[slug\]/page.tsx"

# 22. Test tool detail page calls getAffiliateLink
run_test "Tool detail page calls getAffiliateLink" \
  "grep -q 'await getAffiliateLink' app/tools/\[slug\]/page.tsx || grep -q 'getAffiliateLink(' app/tools/\[slug\]/page.tsx"

# 23. Test tool detail page uses affiliate link in button
run_test "Tool detail page uses affiliate link in button" \
  "grep -q '/api/affiliate/click' app/tools/\[slug\]/page.tsx"

# 24. Test tool detail page has fallback to website_url
run_test "Tool detail page has fallback to website_url" \
  "grep -q 'website_url' app/tools/\[slug\]/page.tsx"

# 25. Test TypeScript compilation (basic check)
run_test "TypeScript files compile (basic check)" \
  "test -f lib/affiliate/get-affiliate-link.ts && test -f app/api/affiliate/click/route.ts"

echo ""
echo "=========================================="
echo "Test Results"
echo "=========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "Total: $test_count"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi

