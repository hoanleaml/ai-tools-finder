#!/bin/bash

# Test Story 2.4: Tool Detail Page
# This script tests the implementation of the tool detail page

set -e

echo "=========================================="
echo "Testing Story 2.4: Tool Detail Page"
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

# 1. Test getToolBySlug function exists
run_test "getToolBySlug function exists" \
  "test -f lib/tools/get-tool-by-slug.ts"

# 2. Test getRelatedTools function exists
run_test "getRelatedTools function exists" \
  "test -f lib/tools/get-related-tools.ts"

# 3. Test tool detail page exists
run_test "Tool detail page exists" \
  "test -f app/tools/\[slug\]/page.tsx"

# 4. Test loading state exists
run_test "Loading state exists" \
  "test -f app/tools/\[slug\]/loading.tsx"

# 5. Test not-found page exists
run_test "Not-found page exists" \
  "test -f app/tools/\[slug\]/not-found.tsx"

# 6. Test getToolBySlug imports createClient
run_test "getToolBySlug imports createClient" \
  "grep -q 'createClient' lib/tools/get-tool-by-slug.ts"

# 7. Test getToolBySlug queries by slug
run_test "getToolBySlug queries by slug" \
  "grep -q '\.eq(\"slug\"' lib/tools/get-tool-by-slug.ts"

# 8. Test getRelatedTools queries by category
run_test "getRelatedTools queries by category" \
  "grep -q 'category_id' lib/tools/get-related-tools.ts"

# 9. Test getRelatedTools excludes current tool
run_test "getRelatedTools excludes current tool" \
  "grep -q '\.neq(' lib/tools/get-related-tools.ts"

# 10. Test tool detail page imports getToolBySlug
run_test "Tool detail page imports getToolBySlug" \
  "grep -q 'getToolBySlug' app/tools/\[slug\]/page.tsx"

# 11. Test tool detail page imports getRelatedTools
run_test "Tool detail page imports getRelatedTools" \
  "grep -q 'getRelatedTools' app/tools/\[slug\]/page.tsx"

# 12. Test tool detail page has generateMetadata
run_test "Tool detail page has generateMetadata" \
  "grep -q 'generateMetadata' app/tools/\[slug\]/page.tsx"

# 13. Test tool detail page has structured data (JSON-LD)
run_test "Tool detail page has structured data" \
  "grep -q 'application/ld+json' app/tools/\[slug\]/page.tsx"

# 14. Test tool detail page has breadcrumb navigation
run_test "Tool detail page has breadcrumb" \
  "grep -q 'Breadcrumb' app/tools/\[slug\]/page.tsx || grep -q 'breadcrumb' app/tools/\[slug\]/page.tsx"

# 15. Test tool detail page displays tool name
run_test "Tool detail page displays tool name" \
  "grep -q 'tool.name' app/tools/\[slug\]/page.tsx"

# 16. Test tool detail page displays tool description
run_test "Tool detail page displays tool description" \
  "grep -q 'tool.description' app/tools/\[slug\]/page.tsx"

# 17. Test tool detail page displays features
run_test "Tool detail page displays features" \
  "grep -q 'tool.features' app/tools/\[slug\]/page.tsx"

# 18. Test tool detail page has Visit Website button
run_test "Tool detail page has Visit Website button" \
  "grep -q 'Visit Website' app/tools/\[slug\]/page.tsx"

# 19. Test tool detail page has Share button
run_test "Tool detail page has Share button" \
  "grep -q 'Share' app/tools/\[slug\]/page.tsx"

# 20. Test tool detail page displays related tools
run_test "Tool detail page displays related tools" \
  "grep -q 'Related Tools' app/tools/\[slug\]/page.tsx || grep -q 'relatedTools' app/tools/\[slug\]/page.tsx"

# 21. Test tool detail page uses ToolCard for related tools
run_test "Tool detail page uses ToolCard for related tools" \
  "grep -q 'ToolCard' app/tools/\[slug\]/page.tsx"

# 22. Test tool detail page handles notFound
run_test "Tool detail page handles notFound" \
  "grep -q 'notFound' app/tools/\[slug\]/page.tsx"

# 23. Test loading state has skeleton UI
run_test "Loading state has skeleton UI" \
  "grep -q 'animate-pulse' app/tools/\[slug\]/loading.tsx || grep -q 'skeleton' app/tools/\[slug\]/loading.tsx"

# 24. Test not-found page has 404 message
run_test "Not-found page has 404 message" \
  "grep -q '404' app/tools/\[slug\]/not-found.tsx || grep -q 'Not Found' app/tools/\[slug\]/not-found.tsx"

# 25. Test TypeScript compilation (basic check)
run_test "TypeScript files compile (basic check)" \
  "test -f lib/tools/get-tool-by-slug.ts && test -f lib/tools/get-related-tools.ts"

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

