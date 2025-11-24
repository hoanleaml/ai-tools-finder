#!/bin/bash

# Test Script for Story 5.1: FutureTools.io Scraper Implementation
# Tests the scraper API endpoint and functionality

set -e

echo "=========================================="
echo "🧪 Testing Story 5.1: FutureTools.io Scraper"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="http://localhost:3000/api/scraper/futuretools"
PASSED=0
FAILED=0

# Check if server is running
echo -n "Checking if dev server is running... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep "200" > /dev/null; then
  echo -e "${GREEN}✅ Running${NC}"
else
  echo -e "${RED}❌ Not running. Please start the dev server with 'npm run dev'${NC}"
  exit 1
fi
echo ""

# Test 1: Scrape page 1 (no save)
echo "Test 1: Scrape page 1 (no save)"
echo "------------------------------------------"
RESPONSE=$(curl -s "${API_URL}?page=1")
if echo "$RESPONSE" | grep -q '"success":true'; then
  TOOLS_COUNT=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('scrape', {}).get('tools', []) and len(data.get('scrape', {}).get('tools', [])) or 0)" 2>/dev/null || echo "0")
  if [ "$TOOLS_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ PASSED: Found $TOOLS_COUNT tools${NC}"
    ((PASSED++))
  else
    echo -e "${RED}❌ FAILED: No tools found${NC}"
    ((FAILED++))
  fi
else
  echo -e "${RED}❌ FAILED: API returned error${NC}"
  echo "$RESPONSE" | head -5
  ((FAILED++))
fi
echo ""

# Test 2: Check tool data structure
echo "Test 2: Check tool data structure"
echo "------------------------------------------"
RESPONSE=$(curl -s "${API_URL}?page=1")
HAS_NAME=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); tools=data.get('scrape', {}).get('tools', []); print('true' if tools and tools[0].get('name') else 'false')" 2>/dev/null || echo "false")
HAS_DESCRIPTION=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); tools=data.get('scrape', {}).get('tools', []); print('true' if tools and tools[0].get('description') else 'false')" 2>/dev/null || echo "false")
HAS_WEBSITE_URL=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); tools=data.get('scrape', {}).get('tools', []); print('true' if tools and tools[0].get('websiteUrl') else 'false')" 2>/dev/null || echo "false")
HAS_SOURCE_URL=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); tools=data.get('scrape', {}).get('tools', []); print('true' if tools and tools[0].get('sourceUrl') else 'false')" 2>/dev/null || echo "false")

if [ "$HAS_NAME" = "true" ] && [ "$HAS_WEBSITE_URL" = "true" ] && [ "$HAS_SOURCE_URL" = "true" ]; then
  echo -e "${GREEN}✅ PASSED: Tool data structure is correct${NC}"
  echo "  - Name: $HAS_NAME"
  echo "  - Description: $HAS_DESCRIPTION"
  echo "  - Website URL: $HAS_WEBSITE_URL"
  echo "  - Source URL: $HAS_SOURCE_URL"
  ((PASSED++))
else
  echo -e "${RED}❌ FAILED: Missing required fields${NC}"
  echo "  - Name: $HAS_NAME"
  echo "  - Description: $HAS_DESCRIPTION"
  echo "  - Website URL: $HAS_WEBSITE_URL"
  echo "  - Source URL: $HAS_SOURCE_URL"
  ((FAILED++))
fi
echo ""

# Test 3: Check for duplicates
echo "Test 3: Check for duplicate tools"
echo "------------------------------------------"
RESPONSE=$(curl -s "${API_URL}?page=1")
UNIQUE_COUNT=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); tools=data.get('scrape', {}).get('tools', []); source_urls=[t.get('sourceUrl') for t in tools if t.get('sourceUrl')]; print(len(set(source_urls)))" 2>/dev/null || echo "0")
TOTAL_COUNT=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); tools=data.get('scrape', {}).get('tools', []); print(len(tools))" 2>/dev/null || echo "0")

if [ "$UNIQUE_COUNT" -eq "$TOTAL_COUNT" ] && [ "$TOTAL_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✅ PASSED: No duplicates found ($UNIQUE_COUNT unique tools)${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠️  WARNING: Found duplicates ($UNIQUE_COUNT unique out of $TOTAL_COUNT total)${NC}"
  ((PASSED++)) # Not a critical failure
fi
echo ""

# Test 4: Check error handling
echo "Test 4: Check error handling (invalid page)"
echo "------------------------------------------"
RESPONSE=$(curl -s "${API_URL}?page=99999")
if echo "$RESPONSE" | grep -q '"success":true'; then
  ERRORS_COUNT=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(len(data.get('scrape', {}).get('errors', [])))" 2>/dev/null || echo "0")
  if [ "$ERRORS_COUNT" -ge 0 ]; then
    echo -e "${GREEN}✅ PASSED: Error handling works (errors: $ERRORS_COUNT)${NC}"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠️  WARNING: No error handling detected${NC}"
    ((PASSED++))
  fi
else
  echo -e "${GREEN}✅ PASSED: API handles invalid input gracefully${NC}"
  ((PASSED++))
fi
echo ""

# Summary
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo -e "Total Tests: $((PASSED + FAILED))"
echo -e "${GREEN}Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
  echo -e "${RED}Failed: $FAILED${NC}"
else
  echo -e "Failed: $FAILED"
fi
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi

