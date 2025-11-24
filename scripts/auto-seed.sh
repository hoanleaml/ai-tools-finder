#!/bin/bash

# Script to automatically seed database with sample data
# Uses TypeScript script that runs independently (no dev server needed)

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Auto Seed Database - Sample Data"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local not found${NC}"
    echo "   Please create .env.local with Supabase credentials"
    exit 1
fi

echo -e "${GREEN}✅ .env.local found${NC}"

# Check if tsx is installed
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx not found${NC}"
    echo "   Please install Node.js and npm"
    exit 1
fi

# Check if tsx is available (for running TypeScript)
echo "Checking dependencies..."
if ! npx tsx --version &> /dev/null; then
    echo -e "${YELLOW}⚠️  tsx not found, installing...${NC}"
    npm install --save-dev tsx dotenv 2>&1 | tail -3
fi

echo ""
echo "Running seed script..."
echo ""

# Run the TypeScript script
npx tsx scripts/insert-sample-data.ts

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo -e "${GREEN}✅ Sample data inserted successfully!${NC}"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo "1. Refresh browser at: ${BLUE}http://localhost:3000/tools${NC}"
    echo "2. You should see 24 tool cards (page 1)"
    echo "3. Test pagination (30 tools = 2 pages)"
    echo ""
else
    echo ""
    echo "=========================================="
    echo -e "${RED}❌ Failed to insert sample data${NC}"
    echo "=========================================="
    echo ""
    echo "Troubleshooting:"
    echo "1. Check .env.local has correct SUPABASE_SERVICE_ROLE_KEY"
    echo "2. Verify NEXT_PUBLIC_SUPABASE_URL is set"
    echo "3. Run: ./scripts/check-env.sh"
    echo ""
    exit $EXIT_CODE
fi

