#!/bin/bash

# Script to seed database with sample data via API endpoint

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="${1:-http://localhost:3000}"
API_URL="${BASE_URL}/api/admin/seed-data"

echo "=========================================="
echo "Seeding Database with Sample Data"
echo "=========================================="
echo ""
echo "API Endpoint: $API_URL"
echo ""

# Check if server is running
if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
    echo -e "${RED}❌ Server not running at $BASE_URL${NC}"
    echo -e "${YELLOW}   Please start server with: npm run dev${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Server is running${NC}"
echo ""

# Call API endpoint
echo "Calling API endpoint..."
response=$(curl -s -X POST "$API_URL" -H "Content-Type: application/json" 2>&1)

# Check response
if echo "$response" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Sample data inserted successfully!${NC}"
    echo ""
    echo "$response" | grep -o '"categoriesInserted":[0-9]*' | head -1
    echo "$response" | grep -o '"toolsInserted":[0-9]*' | head -1
    echo "$response" | grep -o '"totalCategories":[0-9]*' | head -1
    echo "$response" | grep -o '"totalActiveTools":[0-9]*' | head -1
    echo ""
    echo "=========================================="
    echo "Next Steps"
    echo "=========================================="
    echo ""
    echo "1. Refresh browser at: ${BLUE}$BASE_URL/tools${NC}"
    echo "2. You should see tool cards displayed"
    echo "3. Test pagination (30 tools = 2 pages)"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Failed to insert sample data${NC}"
    echo ""
    echo "Response:"
    echo "$response" | head -20
    echo ""
    exit 1
fi

