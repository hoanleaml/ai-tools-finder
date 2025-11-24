#!/bin/bash

# Test Script for Story 4.1: Admin Dashboard Overview
# Tests: Admin authentication, dashboard statistics, admin layout

set -e

echo "=========================================="
echo "Testing Story 4.1: Admin Dashboard Overview"
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

# Test 1: requireAdmin function exists
test "requireAdmin function exists"
if [ -f "lib/auth/require-admin.ts" ]; then
    pass "requireAdmin function file exists"
else
    fail "requireAdmin function file not found"
fi

# Test 2: requireAdmin checks admin role
test "requireAdmin checks admin role"
if grep -q "role.*admin\|user.*role\|admin.*role" lib/auth/require-admin.ts; then
    pass "requireAdmin checks admin role"
else
    fail "requireAdmin does not check admin role"
fi

# Test 3: getDashboardStats function exists
test "getDashboardStats function exists"
if [ -f "lib/admin/get-dashboard-stats.ts" ]; then
    pass "getDashboardStats function file exists"
else
    fail "getDashboardStats function file not found"
fi

# Test 4: getDashboardStats returns correct structure
test "getDashboardStats returns correct structure"
if grep -q "totalTools\|newToolsToday\|toolsWithAffiliate" lib/admin/get-dashboard-stats.ts; then
    pass "getDashboardStats returns correct structure"
else
    fail "getDashboardStats does not return correct structure"
fi

# Test 5: AdminLayout component exists
test "AdminLayout component exists"
if [ -f "components/admin/admin-layout.tsx" ]; then
    pass "AdminLayout component file exists"
else
    fail "AdminLayout component file not found"
fi

# Test 6: AdminLayout checks admin role
test "AdminLayout checks admin role"
if grep -q "requireAdmin\|getSession\|session" components/admin/admin-layout.tsx; then
    pass "AdminLayout checks admin role"
else
    fail "AdminLayout does not check admin role"
fi

# Test 7: AdminLayout has sidebar navigation
test "AdminLayout has sidebar navigation"
if grep -q "sidebar\|Sidebar\|nav\|Navigation" components/admin/admin-layout.tsx; then
    pass "AdminLayout has sidebar navigation"
else
    fail "AdminLayout does not have sidebar navigation"
fi

# Test 8: StatCard component exists
test "StatCard component exists"
if [ -f "components/admin/stat-card.tsx" ]; then
    pass "StatCard component file exists"
else
    fail "StatCard component file not found"
fi

# Test 9: StatCard accepts props
test "StatCard accepts props"
if grep -q "title\|value\|description\|icon" components/admin/stat-card.tsx; then
    pass "StatCard accepts required props"
else
    fail "StatCard does not accept required props"
fi

# Test 10: Admin dashboard page exists
test "Admin dashboard page exists"
if [ -f "app/admin/page.tsx" ]; then
    pass "Admin dashboard page exists"
else
    fail "Admin dashboard page not found"
fi

# Test 11: Admin dashboard uses requireAdmin
test "Admin dashboard uses requireAdmin"
if grep -q "requireAdmin" app/admin/page.tsx; then
    pass "Admin dashboard uses requireAdmin"
else
    fail "Admin dashboard does not use requireAdmin"
fi

# Test 12: Admin dashboard uses getDashboardStats
test "Admin dashboard uses getDashboardStats"
if grep -q "getDashboardStats" app/admin/page.tsx; then
    pass "Admin dashboard uses getDashboardStats"
else
    fail "Admin dashboard does not use getDashboardStats"
fi

# Test 13: Admin dashboard uses AdminLayout
test "Admin dashboard uses AdminLayout"
if grep -q "AdminLayout" app/admin/page.tsx; then
    pass "Admin dashboard uses AdminLayout"
else
    fail "Admin dashboard does not use AdminLayout"
fi

# Test 14: Admin dashboard uses StatCard
test "Admin dashboard uses StatCard"
if grep -q "StatCard" app/admin/page.tsx; then
    pass "Admin dashboard uses StatCard"
else
    fail "Admin dashboard does not use StatCard"
fi

# Test 15: Dashboard shows total tools
test "Dashboard shows total tools"
if grep -q "Total Tools\|totalTools" app/admin/page.tsx; then
    pass "Dashboard shows total tools"
else
    fail "Dashboard does not show total tools"
fi

# Test 16: Dashboard shows new tools this week
test "Dashboard shows new tools this week"
if grep -q "New This Week\|newToolsThisWeek" app/admin/page.tsx; then
    pass "Dashboard shows new tools this week"
else
    fail "Dashboard does not show new tools this week"
fi

# Test 17: Dashboard shows affiliate count
test "Dashboard shows affiliate count"
if grep -q "With Affiliate\|toolsWithAffiliate" app/admin/page.tsx; then
    pass "Dashboard shows affiliate count"
else
    fail "Dashboard does not show affiliate count"
fi

# Test 18: Dashboard shows pending reviews
test "Dashboard shows pending reviews"
if grep -q "Pending Reviews\|pendingReviews" app/admin/page.tsx; then
    pass "Dashboard shows pending reviews"
else
    fail "Dashboard does not show pending reviews"
fi

# Test 19: Quick actions section exists
test "Quick actions section exists"
if grep -q "Quick Actions\|quick.*action" app/admin/page.tsx; then
    pass "Quick actions section exists"
else
    fail "Quick actions section not found"
fi

# Test 20: Recent activity section exists
test "Recent activity section exists"
if grep -q "Recent Activity\|recent.*activity" app/admin/page.tsx; then
    pass "Recent activity section exists"
else
    fail "Recent activity section not found"
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

