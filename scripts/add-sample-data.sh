#!/bin/bash

# Script to add sample data to Supabase database
# This script reads the SQL migration file and executes it via Supabase CLI or provides instructions

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Add Sample Data to Supabase Database"
echo "=========================================="
echo ""

# Check if Supabase CLI is installed
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}✅ Supabase CLI found${NC}"
    USE_CLI=true
else
    echo -e "${YELLOW}⚠️  Supabase CLI not found${NC}"
    echo "   Will provide manual instructions"
    USE_CLI=false
fi

# Check if migration file exists
MIGRATION_FILE="supabase/migrations/003_sample_data.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo -e "${RED}❌ Migration file not found: $MIGRATION_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Migration file found: $MIGRATION_FILE${NC}"
echo ""

# Method 1: Using Supabase CLI (if available)
if [ "$USE_CLI" = true ]; then
    echo "=========================================="
    echo "Method 1: Using Supabase CLI"
    echo "=========================================="
    echo ""
    echo "To add sample data using Supabase CLI:"
    echo ""
    echo "1. Link your project (if not already):"
    echo "   ${BLUE}supabase link --project-ref YOUR_PROJECT_REF${NC}"
    echo ""
    echo "2. Run the migration:"
    echo "   ${BLUE}supabase db push${NC}"
    echo ""
    echo "Or execute SQL directly:"
    echo "   ${BLUE}supabase db execute --file $MIGRATION_FILE${NC}"
    echo ""
fi

# Method 2: Manual execution via Supabase Dashboard
echo "=========================================="
echo "Method 2: Manual Execution (Recommended)"
echo "=========================================="
echo ""
echo "1. Open Supabase Dashboard:"
echo "   ${BLUE}https://supabase.com/dashboard${NC}"
echo ""
echo "2. Select your project"
echo ""
echo "3. Navigate to: ${BLUE}SQL Editor${NC}"
echo ""
echo "4. Copy and paste the contents of:"
echo "   ${BLUE}$MIGRATION_FILE${NC}"
echo ""
echo "5. Click ${BLUE}Run${NC} to execute"
echo ""

# Show preview of what will be added
echo "=========================================="
echo "Sample Data Preview"
echo "=========================================="
echo ""
echo "Categories to be added:"
grep "INSERT INTO categories" "$MIGRATION_FILE" | head -1
echo "   - Text Generation"
echo "   - Image Generation"
echo "   - Code Assistant"
echo "   - Video Generation"
echo "   - Audio Generation"
echo "   - Productivity"
echo ""

echo "Tools to be added:"
TOOL_COUNT=$(grep -c "INSERT INTO tools" "$MIGRATION_FILE" || echo "0")
echo "   - ${TOOL_COUNT} tools across all categories"
echo "   - Mix of free, freemium, and paid tools"
echo "   - Includes popular AI tools like ChatGPT, Midjourney, GitHub Copilot, etc."
echo ""

# Option to show SQL file
read -p "Do you want to view the SQL file? (y/N): " view_file
if [ "$view_file" = "y" ] || [ "$view_file" = "Y" ]; then
    echo ""
    echo "=========================================="
    echo "SQL File Contents:"
    echo "=========================================="
    cat "$MIGRATION_FILE"
fi

echo ""
echo "=========================================="
echo "Next Steps"
echo "=========================================="
echo ""
echo "After adding sample data:"
echo "1. Refresh your browser at: ${BLUE}http://localhost:3000/tools${NC}"
echo "2. You should see tool cards displayed"
echo "3. Test pagination (if you have >24 tools)"
echo "4. Test responsive design"
echo ""
echo -e "${GREEN}✅ Ready to add sample data!${NC}"

