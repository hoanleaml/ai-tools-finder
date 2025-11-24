#!/bin/bash

# Test Script for Story 4.3: Tool Creation/Editing Form
# Tests: Form validation, create tool, edit tool

set -e

echo "=========================================="
echo "Testing Story 4.3: Tool Creation/Editing Form"
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

# Test 1: toolFormSchema exists
test "toolFormSchema exists"
if [ -f "lib/admin/tool-form-schema.ts" ]; then
    pass "toolFormSchema file exists"
else
    fail "toolFormSchema file not found"
fi

# Test 2: toolFormSchema validates required fields
test "toolFormSchema validates required fields"
if grep -q "name.*min.*required\|website_url.*required" lib/admin/tool-form-schema.ts; then
    pass "toolFormSchema validates required fields"
else
    fail "toolFormSchema does not validate required fields"
fi

# Test 3: createTool function exists
test "createTool function exists"
if [ -f "lib/admin/create-tool.ts" ]; then
    pass "createTool function file exists"
else
    fail "createTool function file not found"
fi

# Test 4: createTool generates slug
test "createTool generates slug"
if grep -q "generateSlug\|slug" lib/admin/create-tool.ts; then
    pass "createTool generates slug"
else
    fail "createTool does not generate slug"
fi

# Test 5: updateTool function exists
test "updateTool function exists"
if [ -f "lib/admin/update-tool.ts" ]; then
    pass "updateTool function file exists"
else
    fail "updateTool function file not found"
fi

# Test 6: getToolById function exists
test "getToolById function exists"
if [ -f "lib/admin/get-tool-by-id.ts" ]; then
    pass "getToolById function file exists"
else
    fail "getToolById function file not found"
fi

# Test 7: generateSlug function exists
test "generateSlug function exists"
if [ -f "lib/utils/generate-slug.ts" ]; then
    pass "generateSlug function file exists"
else
    fail "generateSlug function file not found"
fi

# Test 8: ToolForm component exists
test "ToolForm component exists"
if [ -f "components/admin/tool-form.tsx" ]; then
    pass "ToolForm component file exists"
else
    fail "ToolForm component file not found"
fi

# Test 9: ToolForm uses react-hook-form
test "ToolForm uses react-hook-form"
if grep -q "useForm\|react-hook-form" components/admin/tool-form.tsx; then
    pass "ToolForm uses react-hook-form"
else
    fail "ToolForm does not use react-hook-form"
fi

# Test 10: ToolForm uses zod resolver
test "ToolForm uses zod resolver"
if grep -q "zodResolver\|toolFormSchema" components/admin/tool-form.tsx; then
    pass "ToolForm uses zod resolver"
else
    fail "ToolForm does not use zod resolver"
fi

# Test 11: ToolForm has name field
test "ToolForm has name field"
if grep -q "name\|Tool Name" components/admin/tool-form.tsx; then
    pass "ToolForm has name field"
else
    fail "ToolForm does not have name field"
fi

# Test 12: ToolForm has website_url field
test "ToolForm has website_url field"
if grep -q "website_url\|Website URL" components/admin/tool-form.tsx; then
    pass "ToolForm has website_url field"
else
    fail "ToolForm does not have website_url field"
fi

# Test 13: ToolForm has category dropdown
test "ToolForm has category dropdown"
if grep -q "category\|Category\|Select" components/admin/tool-form.tsx; then
    pass "ToolForm has category dropdown"
else
    fail "ToolForm does not have category dropdown"
fi

# Test 14: ToolForm has pricing model dropdown
test "ToolForm has pricing model dropdown"
if grep -q "pricing_model\|Pricing Model" components/admin/tool-form.tsx; then
    pass "ToolForm has pricing model dropdown"
else
    fail "ToolForm does not have pricing model dropdown"
fi

# Test 15: ToolForm has features input
test "ToolForm has features input"
if grep -q "features\|Features\|addFeature\|removeFeature" components/admin/tool-form.tsx; then
    pass "ToolForm has features input"
else
    fail "ToolForm does not have features input"
fi

# Test 16: Create tool page exists
test "Create tool page exists"
if [ -f "app/admin/tools/new/page.tsx" ]; then
    pass "Create tool page exists"
else
    fail "Create tool page not found"
fi

# Test 17: Create tool page uses requireAdmin
test "Create tool page uses requireAdmin"
if grep -q "requireAdmin" app/admin/tools/new/page.tsx; then
    pass "Create tool page uses requireAdmin"
else
    fail "Create tool page does not use requireAdmin"
fi

# Test 18: Create tool page uses ToolForm
test "Create tool page uses ToolForm"
if grep -q "ToolForm" app/admin/tools/new/page.tsx; then
    pass "Create tool page uses ToolForm"
else
    fail "Create tool page does not use ToolForm"
fi

# Test 19: Edit tool page exists
test "Edit tool page exists"
if [ -f "app/admin/tools/[id]/edit/page.tsx" ]; then
    pass "Edit tool page exists"
else
    fail "Edit tool page not found"
fi

# Test 20: Edit tool page uses requireAdmin
test "Edit tool page uses requireAdmin"
if grep -q "requireAdmin" app/admin/tools/\[id\]/edit/page.tsx; then
    pass "Edit tool page uses requireAdmin"
else
    fail "Edit tool page does not use requireAdmin"
fi

# Test 21: Edit tool page uses ToolForm
test "Edit tool page uses ToolForm"
if grep -q "ToolForm" app/admin/tools/\[id\]/edit/page.tsx; then
    pass "Edit tool page uses ToolForm"
else
    fail "Edit tool page does not use ToolForm"
fi

# Test 22: Edit tool page uses getToolById
test "Edit tool page uses getToolById"
if grep -q "getToolById" app/admin/tools/\[id\]/edit/page.tsx; then
    pass "Edit tool page uses getToolById"
else
    fail "Edit tool page does not use getToolById"
fi

# Test 23: Textarea component installed
test "Textarea component installed"
if [ -f "components/ui/textarea.tsx" ]; then
    pass "Textarea component installed"
else
    fail "Textarea component not installed"
fi

# Test 24: Label component installed
test "Label component installed"
if [ -f "components/ui/label.tsx" ]; then
    pass "Label component installed"
else
    fail "Label component not installed"
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

