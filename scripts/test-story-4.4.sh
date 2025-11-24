#!/bin/bash

# Test Script for Story 4.4: Affiliate Link Management
# Tests: CRUD operations, click statistics, filtering

set -e

echo "=========================================="
echo "Testing Story 4.4: Affiliate Link Management"
echo "=========================================="
echo ""

BASE_URL="${BASE_URL:-http://localhost:3000}"
TEST_COUNT=0
PASS_COUNT=0
FAIL_COUNT=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
test() {
    TEST_COUNT=$((TEST_COUNT + 1))
    echo "[Test $TEST_COUNT] $1"
}

pass() {
    PASS_COUNT=$((PASS_COUNT + 1))
    echo -e "${GREEN}✅ PASS${NC}: $1"
}

fail() {
    FAIL_COUNT=$((FAIL_COUNT + 1))
    echo -e "${RED}❌ FAIL${NC}: $1"
}

# Check if server is running
echo "🔍 Checking if server is running..."
if ! curl -s "$BASE_URL" > /dev/null; then
    echo -e "${RED}❌ Server is not running at $BASE_URL${NC}"
    echo "Please start the development server: npm run dev"
    exit 1
fi
echo -e "${GREEN}✅ Server is running${NC}"
echo ""

# Test 1: getAffiliateLinks function exists
test "getAffiliateLinks function exists"
if [ -f "lib/admin/get-affiliate-links.ts" ]; then
    pass "getAffiliateLinks function file exists"
else
    fail "getAffiliateLinks function file not found"
fi

# Test 2: getAffiliateLinks supports pagination
test "getAffiliateLinks supports pagination"
if grep -q "page.*limit\|offset" lib/admin/get-affiliate-links.ts; then
    pass "getAffiliateLinks supports pagination"
else
    fail "getAffiliateLinks does not support pagination"
fi

# Test 3: getAffiliateLinks supports filtering
test "getAffiliateLinks supports filtering"
if grep -q "toolId\|status\|search" lib/admin/get-affiliate-links.ts; then
    pass "getAffiliateLinks supports filtering"
else
    fail "getAffiliateLinks does not support filtering"
fi

# Test 4: getAffiliateLinks includes click count
test "getAffiliateLinks includes click count"
if grep -q "click_count\|affiliate_clicks\|clickCounts" lib/admin/get-affiliate-links.ts; then
    pass "getAffiliateLinks includes click count"
else
    fail "getAffiliateLinks does not include click count"
fi

# Test 5: affiliateLinkSchema exists
test "affiliateLinkSchema exists"
if [ -f "lib/admin/affiliate-link-schema.ts" ]; then
    pass "affiliateLinkSchema file exists"
else
    fail "affiliateLinkSchema file not found"
fi

# Test 6: affiliateLinkSchema validates URL
test "affiliateLinkSchema validates URL"
if grep -q "affiliate_url.*url\|url.*Invalid" lib/admin/affiliate-link-schema.ts; then
    pass "affiliateLinkSchema validates URL"
else
    fail "affiliateLinkSchema does not validate URL"
fi

# Test 7: createAffiliateLink function exists
test "createAffiliateLink function exists"
if [ -f "lib/admin/create-affiliate-link.ts" ]; then
    pass "createAffiliateLink function file exists"
else
    fail "createAffiliateLink function file not found"
fi

# Test 8: createAffiliateLink prevents duplicate active links
test "createAffiliateLink prevents duplicate active links"
if grep -q "existingLink\|already has.*active" lib/admin/create-affiliate-link.ts; then
    pass "createAffiliateLink prevents duplicate active links"
else
    fail "createAffiliateLink does not prevent duplicate active links"
fi

# Test 9: updateAffiliateLink function exists
test "updateAffiliateLink function exists"
if [ -f "lib/admin/update-affiliate-link.ts" ]; then
    pass "updateAffiliateLink function file exists"
else
    fail "updateAffiliateLink function file not found"
fi

# Test 10: deleteAffiliateLink function exists
test "deleteAffiliateLink function exists"
if [ -f "lib/admin/delete-affiliate-link.ts" ]; then
    pass "deleteAffiliateLink function file exists"
else
    fail "deleteAffiliateLink function file not found"
fi

# Test 11: getAffiliateLinkById function exists
test "getAffiliateLinkById function exists"
if [ -f "lib/admin/get-affiliate-link-by-id.ts" ]; then
    pass "getAffiliateLinkById function file exists"
else
    fail "getAffiliateLinkById function file not found"
fi

# Test 12: AffiliateLinkForm component exists
test "AffiliateLinkForm component exists"
if [ -f "components/admin/affiliate-link-form.tsx" ]; then
    pass "AffiliateLinkForm component file exists"
else
    fail "AffiliateLinkForm component file not found"
fi

# Test 13: AffiliateLinkForm uses react-hook-form
test "AffiliateLinkForm uses react-hook-form"
if grep -q "useForm\|react-hook-form" components/admin/affiliate-link-form.tsx; then
    pass "AffiliateLinkForm uses react-hook-form"
else
    fail "AffiliateLinkForm does not use react-hook-form"
fi

# Test 14: AffiliateLinkForm has tool selection
test "AffiliateLinkForm has tool selection"
if grep -q "tool_id\|Tool\|Select" components/admin/affiliate-link-form.tsx; then
    pass "AffiliateLinkForm has tool selection"
else
    fail "AffiliateLinkForm does not have tool selection"
fi

# Test 15: AffiliateLinkForm has affiliate URL field
test "AffiliateLinkForm has affiliate URL field"
if grep -q "affiliate_url\|Affiliate URL" components/admin/affiliate-link-form.tsx; then
    pass "AffiliateLinkForm has affiliate URL field"
else
    fail "AffiliateLinkForm does not have affiliate URL field"
fi

# Test 16: AffiliateLinkForm has test link button
test "AffiliateLinkForm has test link button"
if grep -q "Test Link\|test.*link" components/admin/affiliate-link-form.tsx; then
    pass "AffiliateLinkForm has test link button"
else
    fail "AffiliateLinkForm does not have test link button"
fi

# Test 17: AffiliateLinksTable component exists
test "AffiliateLinksTable component exists"
if [ -f "components/admin/affiliate-links-table.tsx" ]; then
    pass "AffiliateLinksTable component file exists"
else
    fail "AffiliateLinksTable component file not found"
fi

# Test 18: AffiliateLinksTable shows click count
test "AffiliateLinksTable shows click count"
if grep -q "click_count\|Clicks" components/admin/affiliate-links-table.tsx; then
    pass "AffiliateLinksTable shows click count"
else
    fail "AffiliateLinksTable does not show click count"
fi

# Test 19: Admin affiliates page exists
test "Admin affiliates page exists"
if [ -f "app/admin/affiliates/page.tsx" ]; then
    pass "Admin affiliates page exists"
else
    fail "Admin affiliates page not found"
fi

# Test 20: Admin affiliates page uses requireAdmin
test "Admin affiliates page uses requireAdmin"
if grep -q "requireAdmin" app/admin/affiliates/page.tsx; then
    pass "Admin affiliates page uses requireAdmin"
else
    fail "Admin affiliates page does not use requireAdmin"
fi

# Test 21: Create affiliate link page exists
test "Create affiliate link page exists"
if [ -f "app/admin/affiliates/new/page.tsx" ]; then
    pass "Create affiliate link page exists"
else
    fail "Create affiliate link page not found"
fi

# Test 22: Edit affiliate link page exists
test "Edit affiliate link page exists"
if [ -f "app/admin/affiliates/[id]/edit/page.tsx" ]; then
    pass "Edit affiliate link page exists"
else
    fail "Edit affiliate link page not found"
fi

# Test 23: Delete affiliate link API route exists
test "Delete affiliate link API route exists"
if [ -f "app/api/admin/affiliate-links/[id]/route.ts" ]; then
    pass "Delete affiliate link API route exists"
else
    fail "Delete affiliate link API route not found"
fi

# Test 24: Delete API route uses requireAdmin
test "Delete API route uses requireAdmin"
if grep -q "requireAdmin" app/api/admin/affiliate-links/\[id\]/route.ts; then
    pass "Delete API route uses requireAdmin"
else
    fail "Delete API route does not use requireAdmin"
fi

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo "Total Tests: $TEST_COUNT"
echo -e "${GREEN}Passed: $PASS_COUNT${NC}"
echo -e "${RED}Failed: $FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi

