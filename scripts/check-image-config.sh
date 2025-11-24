#!/bin/bash

# Script to check if Next.js image config is working

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="${1:-http://localhost:3000}"

echo "=========================================="
echo "Check Next.js Image Configuration"
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

# Check next.config.ts
if [ ! -f "next.config.ts" ]; then
    echo -e "${RED}❌ next.config.ts not found${NC}"
    exit 1
fi

# Check if remotePatterns exists
if grep -q "remotePatterns" next.config.ts; then
    echo -e "${GREEN}✅ remotePatterns configured in next.config.ts${NC}"
    
    # Count hostnames
    HOSTNAME_COUNT=$(grep -c "hostname:" next.config.ts || echo "0")
    echo "   Found $HOSTNAME_COUNT hostname patterns"
else
    echo -e "${RED}❌ remotePatterns not found in next.config.ts${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo "Testing Tools Page"
echo "=========================================="
echo ""

# Test tools page
TOOLS_PAGE=$(curl -s "$BASE_URL/tools" 2>&1)

# Check for image errors
if echo "$TOOLS_PAGE" | grep -qi "Invalid src prop\|hostname.*is not configured"; then
    echo -e "${RED}❌ Still seeing image configuration errors${NC}"
    echo ""
    echo "This means dev server needs to be restarted:"
    echo "  1. Stop server (Ctrl+C)"
    echo "  2. Run: npm run dev"
    echo "  3. Refresh browser"
    exit 1
elif echo "$TOOLS_PAGE" | grep -qi "claude\|chatgpt\|midjourney"; then
    echo -e "${GREEN}✅ Tools page loads successfully${NC}"
    echo -e "${GREEN}✅ No image configuration errors detected${NC}"
else
    echo -e "${YELLOW}⚠️  Could not verify tools page content${NC}"
    echo "   Please check manually: $BASE_URL/tools"
fi

echo ""
echo "=========================================="
echo "Next Steps"
echo "=========================================="
echo ""
echo "If you still see errors:"
echo "  1. Stop dev server (Ctrl+C in terminal running 'npm run dev')"
echo "  2. Restart: npm run dev"
echo "  3. Hard refresh browser (Cmd+Shift+R)"
echo ""
echo "If errors persist, check:"
echo "  - All hostnames are in next.config.ts"
echo "  - No typos in hostname patterns"
echo ""

