#!/bin/bash

# Test Script for Story 3.1: Enhanced Tool Detail Page with Rich Content
# Tests: Pricing Breakdown, Use Cases, Enhanced Layout

set -e

echo "=========================================="
echo "Testing Story 3.1: Enhanced Tool Detail Page"
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

# Get a tool slug for testing
echo "🔍 Getting a tool for testing..."
TOOL_SLUG=$(curl -s "$BASE_URL/api/tools" 2>/dev/null | grep -o '"slug":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "chatgpt")
if [ -z "$TOOL_SLUG" ]; then
    TOOL_SLUG="chatgpt" # Fallback
fi
echo "Using tool slug: $TOOL_SLUG"
echo ""

TOOL_URL="$BASE_URL/tools/$TOOL_SLUG"

# Test 1: Page loads successfully
test "Tool detail page loads"
PAGE_CONTENT=$(curl -s "$TOOL_URL")
if echo "$PAGE_CONTENT" | grep -q "tool\|Tool"; then
    pass "Page loads successfully"
else
    fail "Page does not load or missing content"
fi

# Test 2: Pricing Breakdown component exists
test "Pricing Breakdown component exists"
if echo "$PAGE_CONTENT" | grep -qi "pricing\|Pricing Information"; then
    pass "Pricing Breakdown component found"
else
    fail "Pricing Breakdown component not found"
fi

# Test 3: Pricing Breakdown shows correct pricing model
test "Pricing Breakdown shows pricing model"
if echo "$PAGE_CONTENT" | grep -qi "Free\|Freemium\|Paid\|One-time"; then
    pass "Pricing model displayed"
else
    fail "Pricing model not displayed"
fi

# Test 4: Pricing Breakdown shows features
test "Pricing Breakdown shows features"
if echo "$PAGE_CONTENT" | grep -qi "Features:\|features"; then
    pass "Pricing features section found"
else
    fail "Pricing features section not found"
fi

# Test 5: Use Cases section exists
test "Use Cases section exists"
if echo "$PAGE_CONTENT" | grep -qi "Use Cases\|use cases"; then
    pass "Use Cases section found"
else
    fail "Use Cases section not found"
fi

# Test 6: Use Cases display tool features
test "Use Cases display tool features"
if echo "$PAGE_CONTENT" | grep -qi "Use.*for.*tasks\|for.*workflows"; then
    pass "Use Cases display feature-based content"
else
    fail "Use Cases do not display feature-based content"
fi

# Test 7: 2-column layout structure
test "2-column layout structure exists"
if echo "$PAGE_CONTENT" | grep -qi "grid-cols-1.*lg:grid-cols-3\|lg:col-span-2"; then
    pass "2-column layout structure found"
else
    fail "2-column layout structure not found"
fi

# Test 8: Pricing Breakdown in sidebar
test "Pricing Breakdown in sidebar (right column)"
if echo "$PAGE_CONTENT" | grep -qi "lg:col-span-2\|Right Column\|Sidebar"; then
    pass "Sidebar layout structure found"
else
    fail "Sidebar layout structure not found"
fi

# Test 9: Enhanced hero section
test "Enhanced hero section exists"
if echo "$PAGE_CONTENT" | grep -qi "text-4xl\|font-bold\|hero"; then
    pass "Enhanced hero section found"
else
    fail "Enhanced hero section not found"
fi

# Test 10: Component file exists
test "Pricing Breakdown component file exists"
if [ -f "components/tools/pricing-breakdown.tsx" ]; then
    pass "Pricing Breakdown component file exists"
else
    fail "Pricing Breakdown component file not found"
fi

# Test 11: Pricing Breakdown component exports correctly
test "Pricing Breakdown component exports correctly"
if grep -q "export.*PricingBreakdown" components/tools/pricing-breakdown.tsx; then
    pass "Pricing Breakdown component exports correctly"
else
    fail "Pricing Breakdown component export not found"
fi

# Test 12: Pricing Breakdown accepts pricingModel prop
test "Pricing Breakdown accepts pricingModel prop"
if grep -q "pricingModel.*:" components/tools/pricing-breakdown.tsx; then
    pass "Pricing Breakdown accepts pricingModel prop"
else
    fail "Pricing Breakdown does not accept pricingModel prop"
fi

# Test 13: Pricing Breakdown handles null pricing
test "Pricing Breakdown handles null pricing"
if grep -q "if (!pricingModel)" components/tools/pricing-breakdown.tsx; then
    pass "Pricing Breakdown handles null pricing"
else
    fail "Pricing Breakdown does not handle null pricing"
fi

# Test 14: Pricing Breakdown shows correct pricing info
test "Pricing Breakdown shows correct pricing info"
if grep -q "free\|freemium\|paid\|one-time" components/tools/pricing-breakdown.tsx; then
    pass "Pricing Breakdown includes pricing types"
else
    fail "Pricing Breakdown does not include pricing types"
fi

# Test 15: Use Cases section uses features
test "Use Cases section uses tool features"
if grep -q "tool.features\|features.slice" app/tools/\[slug\]/page.tsx; then
    pass "Use Cases section uses tool features"
else
    fail "Use Cases section does not use tool features"
fi

# Test 16: Responsive design
test "Responsive design classes present"
if echo "$PAGE_CONTENT" | grep -qi "md:\|lg:\|sm:"; then
    pass "Responsive design classes found"
else
    fail "Responsive design classes not found"
fi

# Test 17: Page structure validation
test "Page structure validation"
if echo "$PAGE_CONTENT" | grep -qi "<div.*container\|<main\|<section"; then
    pass "Page structure is valid"
else
    fail "Page structure is invalid"
fi

# Test 18: Pricing Breakdown card structure
test "Pricing Breakdown card structure"
if grep -q "Card\|CardHeader\|CardTitle\|CardContent" components/tools/pricing-breakdown.tsx; then
    pass "Pricing Breakdown uses Card components"
else
    fail "Pricing Breakdown does not use Card components"
fi

# Test 19: Pricing Breakdown icons
test "Pricing Breakdown uses icons"
if grep -q "Check\|X\|lucide-react" components/tools/pricing-breakdown.tsx; then
    pass "Pricing Breakdown uses icons"
else
    fail "Pricing Breakdown does not use icons"
fi

# Test 20: Enhanced layout spacing
test "Enhanced layout spacing"
if grep -q "space-y-8\|gap-8\|space-y-6" app/tools/\[slug\]/page.tsx; then
    pass "Enhanced layout spacing found"
else
    fail "Enhanced layout spacing not found"
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

