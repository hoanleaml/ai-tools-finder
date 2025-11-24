#!/bin/bash

# Script to verify SUPABASE_SERVICE_ROLE_KEY format

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Verify SUPABASE_SERVICE_ROLE_KEY"
echo "=========================================="
echo ""

if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local not found${NC}"
    exit 1
fi

# Extract the key value
KEY_LINE=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" .env.local | head -1)

if [ -z "$KEY_LINE" ]; then
    echo -e "${RED}❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local${NC}"
    exit 1
fi

# Extract value (everything after =)
KEY_VALUE="${KEY_LINE#*=}"

# Remove quotes if present
KEY_VALUE=$(echo "$KEY_VALUE" | sed 's/^["'\'']//' | sed 's/["'\'']$//')

KEY_LENGTH=${#KEY_VALUE}
FIRST_20=$(echo "$KEY_VALUE" | cut -c1-20)

echo "Key Info:"
echo "  Length: $KEY_LENGTH characters"
echo "  First 20 chars: $FIRST_20..."
echo ""

# Validation
ISSUES=0

if [ "$KEY_LENGTH" -lt 50 ]; then
    echo -e "${RED}❌ Key too short (${KEY_LENGTH} chars, expected 100+)${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Key length OK (${KEY_LENGTH} chars)${NC}"
fi

if [ "$KEY_VALUE" = "your_supabase_service_role_key" ] || [ "${KEY_VALUE:0:5}" = "your_" ]; then
    echo -e "${RED}❌ Key appears to be placeholder${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ Key is not a placeholder${NC}"
fi

if [ "${KEY_VALUE:0:3}" != "eyJ" ]; then
    echo -e "${YELLOW}⚠️  Key doesn't start with 'eyJ' (unusual JWT format)${NC}"
    echo "   This might be OK, but please verify"
else
    echo -e "${GREEN}✅ Key starts with 'eyJ' (correct JWT format)${NC}"
fi

# Check for common issues
if echo "$KEY_LINE" | grep -q ' '; then
    echo -e "${YELLOW}⚠️  Warning: Found spaces in key line${NC}"
    echo "   Make sure there's no space after ="
fi

if echo "$KEY_LINE" | grep -q '["'\'']'; then
    echo -e "${YELLOW}⚠️  Warning: Found quotes around key${NC}"
    echo "   Remove quotes: SUPABASE_SERVICE_ROLE_KEY=key (not SUPABASE_SERVICE_ROLE_KEY=\"key\")"
fi

echo ""
echo "=========================================="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ Key format looks good!${NC}"
    echo ""
    echo "You can now run:"
    echo "  ./scripts/auto-seed.sh"
    exit 0
else
    echo -e "${RED}❌ Key has issues${NC}"
    echo ""
    echo "How to fix:"
    echo "1. Go to: https://supabase.com/dashboard"
    echo "2. Select your project → Settings → API"
    echo "3. Find 'service_role' key → Click 'Reveal'"
    echo "4. Copy the FULL key (100+ characters)"
    echo "5. Update .env.local:"
    echo "   SUPABASE_SERVICE_ROLE_KEY=<paste-key-here>"
    echo "   (No quotes, no spaces after =)"
    echo ""
    exit 1
fi

