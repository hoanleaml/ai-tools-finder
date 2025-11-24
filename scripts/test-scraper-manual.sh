#!/bin/bash

# Manual Scraper Test Script
# This script helps test the scraper with FutureTools.io

set -e

echo "=========================================="
echo "🧪 FutureTools.io Scraper Manual Test"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if dev server is running
echo -n "Checking dev server... "
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Running${NC}"
else
  echo -e "${YELLOW}❌ Not running${NC}"
  echo ""
  echo "Please start dev server first:"
  echo "  npm run dev"
  exit 1
fi

echo ""
echo "=========================================="
echo "Test 1: Scrape Page 1 (No Save)"
echo "=========================================="
echo ""

RESPONSE=$(curl -s "http://localhost:3000/api/scraper/futuretools?page=1")

# Check if response is valid JSON
if ! echo "$RESPONSE" | jq . > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Invalid JSON response. Server might be returning HTML.${NC}"
  echo "Response preview:"
  echo "$RESPONSE" | head -5
  exit 1
fi

SUCCESS=$(echo "$RESPONSE" | jq -r '.success // false')
TOOLS_COUNT=$(echo "$RESPONSE" | jq -r '.tools | length // 0')
ERRORS_COUNT=$(echo "$RESPONSE" | jq -r '.errors | length // 0')
CURRENT_PAGE=$(echo "$RESPONSE" | jq -r '.currentPage // 0')
TOTAL_PAGES=$(echo "$RESPONSE" | jq -r '.totalPages // 0')

if [ "$SUCCESS" = "true" ]; then
  echo -e "${GREEN}✅ Scraping successful!${NC}"
else
  echo -e "${YELLOW}⚠️  Scraping completed with issues${NC}"
fi

echo ""
echo "Results:"
echo "  Tools Found: ${TOOLS_COUNT}"
echo "  Current Page: ${CURRENT_PAGE}"
echo "  Total Pages: ${TOTAL_PAGES}"
echo "  Errors: ${ERRORS_COUNT}"

if [ "$ERRORS_COUNT" -gt 0 ]; then
  echo ""
  echo -e "${YELLOW}Errors:${NC}"
  echo "$RESPONSE" | jq -r '.errors[]' | head -5
fi

if [ "$TOOLS_COUNT" -gt 0 ]; then
  echo ""
  echo -e "${GREEN}✅ Tools found! Preview:${NC}"
  echo "$RESPONSE" | jq -r '.tools[0:3] | .[] | "  - \(.name): \(.websiteUrl)"'
  
  echo ""
  echo "=========================================="
  echo "Test 2: Scrape Page 1 (With Save)"
  echo "=========================================="
  echo ""
  echo -e "${BLUE}Would you like to test saving to database? (y/n)${NC}"
  read -r SAVE_TEST
  
  if [ "$SAVE_TEST" = "y" ] || [ "$SAVE_TEST" = "Y" ]; then
    echo ""
    echo "Testing with save=true and skipDuplicates=true..."
    SAVE_RESPONSE=$(curl -s "http://localhost:3000/api/scraper/futuretools?page=1&save=true&skipDuplicates=true")
    
    SAVED=$(echo "$SAVE_RESPONSE" | jq -r '.saveResult.saved // 0')
    SKIPPED=$(echo "$SAVE_RESPONSE" | jq -r '.saveResult.skipped // 0')
    SAVE_ERRORS=$(echo "$SAVE_RESPONSE" | jq -r '.saveResult.errors | length // 0')
    
    echo ""
    echo "Save Results:"
    echo "  Saved: ${SAVED}"
    echo "  Skipped: ${SKIPPED}"
    echo "  Errors: ${SAVE_ERRORS}"
    
    if [ "$SAVE_ERRORS" -gt 0 ]; then
      echo ""
      echo -e "${YELLOW}Save Errors:${NC}"
      echo "$SAVE_RESPONSE" | jq -r '.saveResult.errors[]' | head -5
    fi
  fi
else
  echo ""
  echo "Skipping save test."
fi

echo ""
echo "=========================================="
echo "📝 Next Steps:"
echo "=========================================="
echo ""
echo "1. If no tools found:"
echo "   - Check FutureTools.io HTML structure"
echo "   - Refine selectors in lib/scraper/futuretools-scraper.ts"
echo ""
echo "2. If tools found but errors:"
echo "   - Review error messages"
echo "   - Check data extraction logic"
echo ""
echo "3. If everything works:"
echo "   - Test with multiple pages"
echo "   - Test with 'all=true' parameter"
echo "   - Proceed to Story 5.2"
echo ""
echo "4. View results in admin panel:"
echo "   http://localhost:3000/admin/scraper-test"
echo ""
echo "=========================================="

