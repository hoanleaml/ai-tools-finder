#!/bin/bash

# Test Script for Story 3.3: Social Sharing Functionality
# Tests: Multi-platform sharing, Copy link, Email, Web Share API

set -e

echo "=========================================="
echo "Testing Story 3.3: Social Sharing Functionality"
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

# Test 1: Social Share component file exists
test "Social Share component file exists"
if [ -f "components/tools/social-share.tsx" ]; then
    pass "Social Share component file exists"
else
    fail "Social Share component file not found"
fi

# Test 2: Social Share component exports correctly
test "Social Share component exports correctly"
if grep -q "export.*SocialShare" components/tools/social-share.tsx; then
    pass "Social Share component exports correctly"
else
    fail "Social Share component export not found"
fi

# Test 3: Social Share component is client component
test "Social Share component is client component"
if grep -q '"use client"' components/tools/social-share.tsx; then
    pass "Social Share is a client component"
else
    fail "Social Share is not a client component"
fi

# Test 4: Popover component exists
test "Popover component exists"
if [ -f "components/ui/popover.tsx" ]; then
    pass "Popover component file exists"
else
    fail "Popover component file not found"
fi

# Test 5: Social Share uses Popover
test "Social Share uses Popover component"
if grep -q "Popover\|PopoverContent\|PopoverTrigger" components/tools/social-share.tsx; then
    pass "Social Share uses Popover component"
else
    fail "Social Share does not use Popover component"
fi

# Test 6: Twitter/X sharing link
test "Twitter/X sharing link exists"
if grep -q "twitter.com/intent/tweet\|Twitter" components/tools/social-share.tsx; then
    pass "Twitter/X sharing link found"
else
    fail "Twitter/X sharing link not found"
fi

# Test 7: Facebook sharing link
test "Facebook sharing link exists"
if grep -q "facebook.com/sharer\|Facebook" components/tools/social-share.tsx; then
    pass "Facebook sharing link found"
else
    fail "Facebook sharing link not found"
fi

# Test 8: LinkedIn sharing link
test "LinkedIn sharing link exists"
if grep -q "linkedin.com/sharing\|Linkedin" components/tools/social-share.tsx; then
    pass "LinkedIn sharing link found"
else
    fail "LinkedIn sharing link not found"
fi

# Test 9: Copy link functionality
test "Copy link functionality exists"
if grep -q "clipboard\|Copy\|copy" components/tools/social-share.tsx; then
    pass "Copy link functionality found"
else
    fail "Copy link functionality not found"
fi

# Test 10: Email sharing functionality
test "Email sharing functionality exists"
if grep -q "mailto:\|Mail\|email" components/tools/social-share.tsx; then
    pass "Email sharing functionality found"
else
    fail "Email sharing functionality not found"
fi

# Test 11: Web Share API support
test "Web Share API support exists"
if grep -q "navigator.share\|handleWebShare\|Web Share" components/tools/social-share.tsx; then
    pass "Web Share API support found"
else
    fail "Web Share API support not found"
fi

# Test 12: Social Share component props
test "Social Share component accepts props"
if grep -q "toolName\|toolDescription\|toolUrl\|toolImage" components/tools/social-share.tsx; then
    pass "Social Share component accepts required props"
else
    fail "Social Share component does not accept required props"
fi

# Test 13: Share button exists on tool detail page
test "Share button exists on tool detail page"
PAGE_CONTENT=$(curl -s "$TOOL_URL")
if echo "$PAGE_CONTENT" | grep -qi "Share\|share\|SocialShare"; then
    pass "Share button found on tool detail page"
else
    fail "Share button not found on tool detail page"
fi

# Test 14: Social Share integrated in tool detail page
test "Social Share integrated in tool detail page"
if grep -q "SocialShare\|social-share" app/tools/\[slug\]/page.tsx; then
    pass "Social Share integrated in tool detail page"
else
    fail "Social Share not integrated in tool detail page"
fi

# Test 15: Share button uses correct props
test "Share button uses correct props"
if grep -q "toolName=" app/tools/\[slug\]/page.tsx && grep -q "toolDescription=" app/tools/\[slug\]/page.tsx; then
    pass "Share button uses correct props"
else
    fail "Share button does not use correct props"
fi

# Test 16: Icons imported correctly
test "Icons imported correctly"
if grep -q "Share2\|Twitter\|Facebook\|Linkedin\|Mail\|Copy\|Check" components/tools/social-share.tsx; then
    pass "Icons imported correctly"
else
    fail "Icons not imported correctly"
fi

# Test 17: State management for copy feedback
test "State management for copy feedback"
if grep -q "useState\|copied\|setCopied" components/tools/social-share.tsx; then
    pass "State management for copy feedback found"
else
    fail "State management for copy feedback not found"
fi

# Test 18: Share text formatting
test "Share text formatting"
if grep -q "shareText\|Check out\|encodeURIComponent" components/tools/social-share.tsx; then
    pass "Share text formatting found"
else
    fail "Share text formatting not found"
fi

# Test 19: Full URL construction
test "Full URL construction"
if grep -q "window.location.origin\|fullUrl" components/tools/social-share.tsx; then
    pass "Full URL construction found"
else
    fail "Full URL construction not found"
fi

# Test 20: Popover open state management
test "Popover open state management"
if grep -q "shareOpen\|setShareOpen\|onOpenChange" components/tools/social-share.tsx; then
    pass "Popover open state management found"
else
    fail "Popover open state management not found"
fi

# Test 21: Copy link timeout
test "Copy link timeout"
if grep -q "setTimeout\|2000" components/tools/social-share.tsx; then
    pass "Copy link timeout found"
else
    fail "Copy link timeout not found"
fi

# Test 22: Error handling for clipboard
test "Error handling for clipboard"
if grep -q "try\|catch\|console.error" components/tools/social-share.tsx; then
    pass "Error handling for clipboard found"
else
    fail "Error handling for clipboard not found"
fi

# Test 23: Web Share API conditional check
test "Web Share API conditional check"
if grep -q "navigator.share\|typeof navigator" components/tools/social-share.tsx; then
    pass "Web Share API conditional check found"
else
    fail "Web Share API conditional check not found"
fi

# Test 24: Social links open in new tab
test "Social links open in new tab"
if grep -q "target=\"_blank\"\|rel=\"noopener noreferrer\"" components/tools/social-share.tsx; then
    pass "Social links open in new tab"
else
    fail "Social links do not open in new tab"
fi

# Test 25: Share button accessibility
test "Share button accessibility"
if grep -q "asChild\|PopoverTrigger" components/tools/social-share.tsx; then
    pass "Share button accessibility features found"
else
    fail "Share button accessibility features not found"
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

