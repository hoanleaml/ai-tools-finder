#!/bin/bash

# Test Script for Story 4.5: Bulk Operations for Tools
# Tests: Bulk selection, bulk actions, confirmation dialogs

set -e

echo "=========================================="
echo "Testing Story 4.5: Bulk Operations for Tools"
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

# Test 1: Bulk operations API route exists
test "Bulk operations API route exists"
if [ -f "app/api/admin/tools/bulk/route.ts" ]; then
    pass "Bulk operations API route exists"
else
    fail "Bulk operations API route not found"
fi

# Test 2: Bulk operations API uses requireAdmin
test "Bulk operations API uses requireAdmin"
if grep -q "requireAdmin" app/api/admin/tools/bulk/route.ts; then
    pass "Bulk operations API uses requireAdmin"
else
    fail "Bulk operations API does not use requireAdmin"
fi

# Test 3: Bulk operations API supports delete action
test "Bulk operations API supports delete action"
if grep -q "delete\|DELETE" app/api/admin/tools/bulk/route.ts; then
    pass "Bulk operations API supports delete action"
else
    fail "Bulk operations API does not support delete action"
fi

# Test 4: Bulk operations API supports update_status action
test "Bulk operations API supports update_status action"
if grep -q "update_status\|status" app/api/admin/tools/bulk/route.ts; then
    pass "Bulk operations API supports update_status action"
else
    fail "Bulk operations API does not support update_status action"
fi

# Test 5: Bulk operations API supports update_category action
test "Bulk operations API supports update_category action"
if grep -q "update_category\|category" app/api/admin/tools/bulk/route.ts; then
    pass "Bulk operations API supports update_category action"
else
    fail "Bulk operations API does not support update_category action"
fi

# Test 6: Bulk operations API supports update_pricing action
test "Bulk operations API supports update_pricing action"
if grep -q "update_pricing\|pricing" app/api/admin/tools/bulk/route.ts; then
    pass "Bulk operations API supports update_pricing action"
else
    fail "Bulk operations API does not support update_pricing action"
fi

# Test 7: BulkActionsBar component exists
test "BulkActionsBar component exists"
if [ -f "components/admin/bulk-actions-bar.tsx" ]; then
    pass "BulkActionsBar component file exists"
else
    fail "BulkActionsBar component file not found"
fi

# Test 8: BulkActionsBar shows selected count
test "BulkActionsBar shows selected count"
if grep -q "selectedCount\|selected.*tool" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar shows selected count"
else
    fail "BulkActionsBar does not show selected count"
fi

# Test 9: BulkActionsBar has delete button
test "BulkActionsBar has delete button"
if grep -q "Delete\|Trash2\|delete" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar has delete button"
else
    fail "BulkActionsBar does not have delete button"
fi

# Test 10: BulkActionsBar has update status button
test "BulkActionsBar has update status button"
if grep -q "Update Status\|Archive\|status" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar has update status button"
else
    fail "BulkActionsBar does not have update status button"
fi

# Test 11: BulkActionsBar has update category button
test "BulkActionsBar has update category button"
if grep -q "Update Category\|Tag\|category" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar has update category button"
else
    fail "BulkActionsBar does not have update category button"
fi

# Test 12: BulkActionsBar has update pricing button
test "BulkActionsBar has update pricing button"
if grep -q "Update Pricing\|DollarSign\|pricing" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar has update pricing button"
else
    fail "BulkActionsBar does not have update pricing button"
fi

# Test 13: BulkActionsBar uses Dialog component
test "BulkActionsBar uses Dialog component"
if grep -q "Dialog\|DialogContent\|DialogHeader\|DialogTitle" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar uses Dialog component"
else
    fail "BulkActionsBar does not use Dialog component"
fi

# Test 14: BulkActionsBar has confirmation dialogs
test "BulkActionsBar has confirmation dialogs"
if grep -q "Confirm\|Are you sure\|DialogDescription" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar has confirmation dialogs"
else
    fail "BulkActionsBar does not have confirmation dialogs"
fi

# Test 15: BulkActionsBar calls bulk API
test "BulkActionsBar calls bulk API"
if grep -q "/api/admin/tools/bulk\|fetch.*bulk" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar calls bulk API"
else
    fail "BulkActionsBar does not call bulk API"
fi

# Test 16: BulkActionsBar handles loading state
test "BulkActionsBar handles loading state"
if grep -q "isLoading\|loading\|Loader2" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar handles loading state"
else
    fail "BulkActionsBar does not handle loading state"
fi

# Test 17: BulkActionsBar shows success message
test "BulkActionsBar shows success message"
if grep -q "Success\|success\|alert" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar shows success message"
else
    fail "BulkActionsBar does not show success message"
fi

# Test 18: BulkActionsBar handles errors
test "BulkActionsBar handles errors"
if grep -q "catch\|error\|Error" components/admin/bulk-actions-bar.tsx; then
    pass "BulkActionsBar handles errors"
else
    fail "BulkActionsBar does not handle errors"
fi

# Test 19: ToolsTable integrates BulkActionsBar
test "ToolsTable integrates BulkActionsBar"
if grep -q "BulkActionsBar" components/admin/tools-table.tsx; then
    pass "ToolsTable integrates BulkActionsBar"
else
    fail "ToolsTable does not integrate BulkActionsBar"
fi

# Test 20: Dialog component installed
test "Dialog component installed"
if [ -f "components/ui/dialog.tsx" ]; then
    pass "Dialog component installed"
else
    fail "Dialog component not installed"
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

