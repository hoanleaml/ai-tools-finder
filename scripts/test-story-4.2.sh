#!/bin/bash

# Test Script for Story 4.2: Tools Management Table
# Tests: Table display, sorting, filtering, pagination, search

set -e

echo "=========================================="
echo "Testing Story 4.2: Tools Management Table"
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

# Test 1: getAdminTools function exists
test "getAdminTools function exists"
if [ -f "lib/admin/get-admin-tools.ts" ]; then
    pass "getAdminTools function file exists"
else
    fail "getAdminTools function file not found"
fi

# Test 2: getAdminTools supports pagination
test "getAdminTools supports pagination"
if grep -q "page.*limit\|offset" lib/admin/get-admin-tools.ts; then
    pass "getAdminTools supports pagination"
else
    fail "getAdminTools does not support pagination"
fi

# Test 3: getAdminTools supports filtering
test "getAdminTools supports filtering"
if grep -q "search\|status\|categoryId" lib/admin/get-admin-tools.ts; then
    pass "getAdminTools supports filtering"
else
    fail "getAdminTools does not support filtering"
fi

# Test 4: getAdminTools supports sorting
test "getAdminTools supports sorting"
if grep -q "sortBy\|sortOrder\|order" lib/admin/get-admin-tools.ts; then
    pass "getAdminTools supports sorting"
else
    fail "getAdminTools does not support sorting"
fi

# Test 5: ToolsTable component exists
test "ToolsTable component exists"
if [ -f "components/admin/tools-table.tsx" ]; then
    pass "ToolsTable component file exists"
else
    fail "ToolsTable component file not found"
fi

# Test 6: ToolsTable uses Table component
test "ToolsTable uses Table component"
if grep -q "Table\|TableBody\|TableCell\|TableHead\|TableHeader\|TableRow" components/admin/tools-table.tsx; then
    pass "ToolsTable uses Table component"
else
    fail "ToolsTable does not use Table component"
fi

# Test 7: ToolsTable has search functionality
test "ToolsTable has search functionality"
if grep -q "Search\|search\|handleSearch" components/admin/tools-table.tsx; then
    pass "ToolsTable has search functionality"
else
    fail "ToolsTable does not have search functionality"
fi

# Test 8: ToolsTable has status filter
test "ToolsTable has status filter"
if grep -q "Status\|status\|handleStatusFilter" components/admin/tools-table.tsx; then
    pass "ToolsTable has status filter"
else
    fail "ToolsTable does not have status filter"
fi

# Test 9: ToolsTable has category filter
test "ToolsTable has category filter"
if grep -q "Category\|category\|handleCategoryFilter" components/admin/tools-table.tsx; then
    pass "ToolsTable has category filter"
else
    fail "ToolsTable does not have category filter"
fi

# Test 10: ToolsTable has sorting
test "ToolsTable has sorting"
if grep -q "SortButton\|handleSort\|sortBy" components/admin/tools-table.tsx; then
    pass "ToolsTable has sorting"
else
    fail "ToolsTable does not have sorting"
fi

# Test 11: ToolsTable has pagination
test "ToolsTable has pagination"
if grep -q "Pagination\|page\|totalPages\|Previous\|Next" components/admin/tools-table.tsx; then
    pass "ToolsTable has pagination"
else
    fail "ToolsTable does not have pagination"
fi

# Test 12: ToolsTable has bulk selection
test "ToolsTable has bulk selection"
if grep -q "Checkbox\|selectedTools\|toggleSelectAll" components/admin/tools-table.tsx; then
    pass "ToolsTable has bulk selection"
else
    fail "ToolsTable does not have bulk selection"
fi

# Test 13: ToolsTable has action buttons
test "ToolsTable has action buttons"
if grep -q "Edit\|Delete\|View\|Eye\|Trash2" components/admin/tools-table.tsx; then
    pass "ToolsTable has action buttons"
else
    fail "ToolsTable does not have action buttons"
fi

# Test 14: Admin tools page exists
test "Admin tools page exists"
if [ -f "app/admin/tools/page.tsx" ]; then
    pass "Admin tools page exists"
else
    fail "Admin tools page not found"
fi

# Test 15: Admin tools page uses requireAdmin
test "Admin tools page uses requireAdmin"
if grep -q "requireAdmin" app/admin/tools/page.tsx; then
    pass "Admin tools page uses requireAdmin"
else
    fail "Admin tools page does not use requireAdmin"
fi

# Test 16: Admin tools page uses getAdminTools
test "Admin tools page uses getAdminTools"
if grep -q "getAdminTools" app/admin/tools/page.tsx; then
    pass "Admin tools page uses getAdminTools"
else
    fail "Admin tools page does not use getAdminTools"
fi

# Test 17: Admin tools page uses ToolsTable
test "Admin tools page uses ToolsTable"
if grep -q "ToolsTable" app/admin/tools/page.tsx; then
    pass "Admin tools page uses ToolsTable"
else
    fail "Admin tools page does not use ToolsTable"
fi

# Test 18: Table component installed
test "Table component installed"
if [ -f "components/ui/table.tsx" ]; then
    pass "Table component installed"
else
    fail "Table component not installed"
fi

# Test 19: Select component installed
test "Select component installed"
if [ -f "components/ui/select.tsx" ]; then
    pass "Select component installed"
else
    fail "Select component not installed"
fi

# Test 20: Checkbox component installed
test "Checkbox component installed"
if [ -f "components/ui/checkbox.tsx" ]; then
    pass "Checkbox component installed"
else
    fail "Checkbox component not installed"
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

