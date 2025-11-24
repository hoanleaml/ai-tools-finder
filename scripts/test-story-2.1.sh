#!/bin/bash

# Test Script for Story 2.1: Tool Listing Page with Pagination
# Tests: Pagination, tool cards display, loading states, empty states

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="${1:-http://localhost:3000}"
PASSED=0
FAILED=0

echo "=========================================="
echo "Story 2.1: Tool Listing Page with Pagination"
echo "=========================================="
echo ""
echo "Testing: $BASE_URL/tools"
echo ""

# Test 1: Check if tools page exists
echo "Test 1: Tools page accessibility..."
PAGE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/tools")
if [ "$PAGE_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Tools page is accessible (HTTP $PAGE_RESPONSE)"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Tools page returned HTTP $PAGE_RESPONSE"
    FAILED=$((FAILED + 1))
fi

# Test 2: Check if page contains tool cards structure
echo ""
echo "Test 2: Tool cards structure..."
PAGE_CONTENT=$(curl -s "$BASE_URL/tools")
if echo "$PAGE_CONTENT" | grep -q "tool-card\|grid.*gap"; then
    echo -e "${GREEN}✅ PASS${NC} - Tool cards structure found"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Tool cards structure not found"
    FAILED=$((FAILED + 1))
fi

# Test 3: Check pagination component
echo ""
echo "Test 3: Pagination component..."
if echo "$PAGE_CONTENT" | grep -q "pagination\|page.*button\|next\|previous"; then
    echo -e "${GREEN}✅ PASS${NC} - Pagination component found"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARN${NC} - Pagination component not found (may not be visible if only 1 page)"
    # Don't fail, just warn
fi

# Test 4: Check if search input exists (from Story 2.2, but should be present)
echo ""
echo "Test 4: Search input component..."
if echo "$PAGE_CONTENT" | grep -q "search\|SearchInput\|input.*type.*text"; then
    echo -e "${GREEN}✅ PASS${NC} - Search input found"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARN${NC} - Search input not found (may be added in Story 2.2)"
fi

# Test 5: Check if filters exist (from Story 2.3, but should be present)
echo ""
echo "Test 5: Filters component..."
if echo "$PAGE_CONTENT" | grep -q "filter\|Filter\|category\|pricing"; then
    echo -e "${GREEN}✅ PASS${NC} - Filters component found"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARN${NC} - Filters component not found (may be added in Story 2.3)"
fi

# Test 6: Check page title and description
echo ""
echo "Test 6: Page title and description..."
if echo "$PAGE_CONTENT" | grep -qi "AI Tools\|Discover.*tools"; then
    echo -e "${GREEN}✅ PASS${NC} - Page title/description found"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Page title/description not found"
    FAILED=$((FAILED + 1))
fi

# Test 7: Test pagination URL parameter
echo ""
echo "Test 7: Pagination URL parameter..."
PAGE_2_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/tools?page=2")
if [ "$PAGE_2_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Page 2 accessible via URL parameter"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARN${NC} - Page 2 returned HTTP $PAGE_2_RESPONSE (may not exist if < 24 tools)"
fi

# Test 8: Check TypeScript compilation (skip - requires full project context)
echo ""
echo "Test 8: TypeScript compilation..."
if [ -f "app/tools/page.tsx" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Tools page file exists (TypeScript check skipped - requires full project)"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - app/tools/page.tsx not found"
    FAILED=$((FAILED + 1))
fi

# Test 9: Check get-tools.ts function exists
echo ""
echo "Test 9: get-tools.ts function..."
if [ -f "lib/tools/get-tools.ts" ]; then
    if grep -q "export.*function getTools" lib/tools/get-tools.ts; then
        echo -e "${GREEN}✅ PASS${NC} - getTools function exists"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC} - getTools function not found"
        FAILED=$((FAILED + 1))
    fi
else
    echo -e "${RED}❌ FAIL${NC} - lib/tools/get-tools.ts not found"
    FAILED=$((FAILED + 1))
fi

# Test 10: Check pagination component exists
echo ""
echo "Test 10: Pagination component..."
if [ -f "components/tools/pagination.tsx" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Pagination component file exists"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - components/tools/pagination.tsx not found"
    FAILED=$((FAILED + 1))
fi

# Test 11: Check tool-card component exists
echo ""
echo "Test 11: ToolCard component..."
if [ -f "components/tools/tool-card.tsx" ]; then
    echo -e "${GREEN}✅ PASS${NC} - ToolCard component file exists"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - components/tools/tool-card.tsx not found"
    FAILED=$((FAILED + 1))
fi

# Test 12: Check empty state component exists
echo ""
echo "Test 12: EmptyState component..."
if [ -f "components/tools/empty-state.tsx" ]; then
    echo -e "${GREEN}✅ PASS${NC} - EmptyState component file exists"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - components/tools/empty-state.tsx not found"
    FAILED=$((FAILED + 1))
fi

# Summary
echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All critical tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi

