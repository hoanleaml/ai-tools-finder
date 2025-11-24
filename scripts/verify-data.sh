#!/bin/bash

# Script to verify sample data in database

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="${1:-http://localhost:3000}"

echo "=========================================="
echo "Verifying Sample Data"
echo "=========================================="
echo ""

# Check if server is running
if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
    echo -e "${RED}❌ Server not running at $BASE_URL${NC}"
    echo -e "${YELLOW}   Please start server with: npm run dev${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Server is running${NC}"
echo ""

# Check tools page
echo "Checking /tools page..."
TOOLS_PAGE=$(curl -s "$BASE_URL/tools" 2>&1)

if echo "$TOOLS_PAGE" | grep -q "ChatGPT\|Midjourney\|GitHub Copilot"; then
    echo -e "${GREEN}✅ Tools page shows tool names${NC}"
    TOOL_COUNT=$(echo "$TOOLS_PAGE" | grep -o "tool-card\|ChatGPT\|Midjourney" | wc -l | tr -d ' ')
    echo "   Found ~$TOOL_COUNT tool references"
else
    if echo "$TOOLS_PAGE" | grep -q "No tools found\|empty-state"; then
        echo -e "${YELLOW}⚠️  Tools page shows empty state${NC}"
        echo "   Data may not be inserted yet"
    else
        echo -e "${RED}❌ Could not verify tools page${NC}"
    fi
fi

echo ""
echo "=========================================="
echo "Manual Verification Steps"
echo "=========================================="
echo ""
echo "1. Open browser: ${BLUE}$BASE_URL/tools${NC}"
echo "2. Check if you see tool cards"
echo "3. If empty, verify data in Supabase Dashboard:"
echo "   - Table Editor → tools table"
echo "   - Should see 30 rows with status = 'active'"
echo ""

# Try to get tools via API if available
echo "Checking API endpoint..."
API_RESPONSE=$(curl -s "$BASE_URL/api/tools?limit=5" 2>&1)

if echo "$API_RESPONSE" | grep -q '"name"\|"id"'; then
    echo -e "${GREEN}✅ API endpoint returns tools${NC}"
    echo "$API_RESPONSE" | head -20
else
    echo -e "${YELLOW}⚠️  API endpoint not available or returns no data${NC}"
fi

echo ""

