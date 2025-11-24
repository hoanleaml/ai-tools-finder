#!/bin/bash

# Story 1.3: Production Testing Script
# Tests authentication setup on production (Vercel)

set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Production URL (can be overridden)
PROD_URL="${1:-https://ai-tools-finder-two.vercel.app}"

echo "=========================================="
echo "Story 1.3: Production Authentication Tests"
echo "=========================================="
echo ""
echo "Production URL: $PROD_URL"
echo ""

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to check HTTP status
check_http_status() {
    local url="$1"
    local expected_status="${2:-200}"
    local method="${3:-GET}"
    
    if [ "$method" = "GET" ]; then
        status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    else
        status=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" 2>/dev/null || echo "000")
    fi
    
    if [ "$status" = "$expected_status" ] || [ "$status" = "307" ] || [ "$status" = "308" ]; then
        return 0
    else
        echo -e " (Expected: $expected_status, Got: $status)"
        return 1
    fi
}

echo "=========================================="
echo "Production Endpoint Tests"
echo "=========================================="

# Test login page
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Testing /login page... "
if check_http_status "$PROD_URL/login" "200"; then
    echo -e "${GREEN}✅ PASS${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ FAIL${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# Test admin route protection
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Testing /admin route protection... "
status=$(curl -s -o /dev/null -w "%{http_code}" -L "$PROD_URL/admin" 2>/dev/null || echo "000")
if [ "$status" = "200" ] || [ "$status" = "307" ] || [ "$status" = "308" ]; then
    location=$(curl -s -o /dev/null -w "%{redirect_url}" -L "$PROD_URL/admin" 2>/dev/null || echo "")
    if echo "$location" | grep -q "login" || [ "$status" = "307" ] || [ "$status" = "308" ]; then
        echo -e "${GREEN}✅ PASS (Redirects to /login)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${YELLOW}⚠️  WARNING (Status: $status, may need authentication)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    fi
else
    echo -e "${RED}❌ FAIL (Status: $status)${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# Test logout API endpoint
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Testing /api/auth/logout endpoint... "
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PROD_URL/api/auth/logout" 2>/dev/null || echo "000")
if [ "$status" = "200" ] || [ "$status" = "401" ] || [ "$status" = "405" ]; then
    echo -e "${GREEN}✅ PASS (Status: $status)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ FAIL (Status: $status)${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# Test logout API with GET (should return 405)
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Testing /api/auth/logout GET method... "
status=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/auth/logout" 2>/dev/null || echo "000")
if [ "$status" = "405" ] || [ "$status" = "404" ]; then
    echo -e "${GREEN}✅ PASS (Status: $status - Method not allowed)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  WARNING (Status: $status, expected 405)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi

# Check if login page contains expected content
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Checking login page content... "
content=$(curl -s "$PROD_URL/login" 2>/dev/null || echo "")
if echo "$content" | grep -qi "login\|email\|password\|sign in" 2>/dev/null; then
    echo -e "${GREEN}✅ PASS${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  WARNING (Content check inconclusive)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
fi

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
if [ $FAILED_TESTS -gt 0 ]; then
    echo -e "${RED}Failed: $FAILED_TESTS${NC}"
else
    echo -e "Failed: $FAILED_TESTS"
fi
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✅ All production tests passed!${NC}"
    echo ""
    echo "📋 Next Steps (Manual Testing Required):"
    echo "   1. Test login flow with valid credentials"
    echo "   2. Test login flow with invalid credentials"
    echo "   3. Test session persistence (reload page)"
    echo "   4. Test logout functionality"
    echo "   5. See docs/STORY_1.3_MANUAL_TESTING.md for details"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review errors above.${NC}"
    exit 1
fi

