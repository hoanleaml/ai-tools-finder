#!/bin/bash

# Test Script for Sync Tools Cron Job
# This script tests the /api/cron/sync-tools endpoint

set -e

echo "=========================================="
echo "🧪 Testing Sync Tools Cron Job"
echo "=========================================="
echo ""

# Configuration
API_URL="http://localhost:3000/api/cron/sync-tools"
CRON_SECRET=${CRON_SECRET:-"test"} # Default to "test" for local testing

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if server is running
echo -n "Checking if dev server is running... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep "200" > /dev/null; then
  echo -e "${GREEN}✅ Running${NC}"
else
  echo -e "${RED}❌ Not running. Please start the dev server with 'npm run dev'${NC}"
  exit 1
fi
echo ""

# Test endpoint
echo "Testing sync-tools endpoint..."
echo "URL: ${API_URL}?secret=${CRON_SECRET}"
echo "------------------------------------------"

RESPONSE=$(curl -s "${API_URL}?secret=${CRON_SECRET}")

# Check for errors
if echo "${RESPONSE}" | grep -q '"success":false'; then
  echo -e "${RED}❌ API returned an error:${NC}"
  echo "${RESPONSE}" | python3 -m json.tool 2>/dev/null || echo "${RESPONSE}"
  exit 1
fi

echo -e "${GREEN}✅ API call successful!${NC}"
echo "------------------------------------------"
echo "Sync Results:"
echo "------------------------------------------"

# Extract and display information
if command -v jq &> /dev/null; then
  echo "${RESPONSE}" | jq -r '
    "Job ID: \(.jobId // "N/A")",
    "Duration: \(.duration // "N/A")",
    "",
    "Scraping:",
    "  Tools Found: \(.scrape.toolsFound // 0)",
    "  Errors: \(.scrape.errors // 0)",
    "",
    "Database Save:",
    "  Saved: \(.save.saved // 0)",
    "  Skipped: \(.save.skipped // 0)",
    "  Errors: \(.save.errors // 0)",
    "",
    "Timestamp: \(.timestamp // "N/A")"
  '
  
  if [ "$(echo "${RESPONSE}" | jq -r '.save.errorDetails | length')" -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Save Errors:${NC}"
    echo "${RESPONSE}" | jq -r '.save.errorDetails[]'
  fi
else
  # Fallback if jq is not available
  echo "${RESPONSE}" | python3 -m json.tool 2>/dev/null || echo "${RESPONSE}"
fi

echo ""
echo -e "${GREEN}Test completed successfully!${NC}"
echo "=========================================="

