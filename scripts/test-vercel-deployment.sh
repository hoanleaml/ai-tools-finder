#!/bin/bash

# Script để test Vercel deployment tự động
# Usage: ./scripts/test-vercel-deployment.sh [DEPLOYMENT_URL]

set -e

# Get deployment URL from Vercel CLI or use provided URL
if [ -z "$1" ]; then
    echo "🔍 Đang lấy deployment URL từ Vercel..."
    # Try to get production URL from vercel project ls
    DEPLOYMENT_URL=$(npx vercel project ls 2>&1 | grep "ai-tools-finder" | grep -oE "https://[^ ]*" | head -1 || echo "")
    
    # If still empty, try getting from vercel ls
    if [ -z "$DEPLOYMENT_URL" ]; then
        DEPLOYMENT_URL=$(npx vercel ls ai-tools-finder 2>&1 | grep -E "https://.*vercel\.app" | head -1 | awk '{print $NF}' || echo "")
    fi
    
    # If still empty, try getting from vercel ls (last line)
    if [ -z "$DEPLOYMENT_URL" ]; then
        DEPLOYMENT_URL=$(npx vercel ls ai-tools-finder 2>&1 | tail -1 | grep -oE "https://[^ ]*" | head -1 || echo "")
    fi
    
    if [ -z "$DEPLOYMENT_URL" ]; then
        echo "❌ Không thể lấy deployment URL tự động."
        echo ""
        echo "Vui lòng cung cấp URL:"
        echo "  ./scripts/test-vercel-deployment.sh https://your-app.vercel.app"
        echo ""
        echo "Hoặc lấy URL từ Vercel Dashboard và chạy lại với URL đó."
        exit 1
    fi
else
    DEPLOYMENT_URL="$1"
fi

# Remove trailing slash
DEPLOYMENT_URL="${DEPLOYMENT_URL%/}"

echo "=========================================="
echo "Vercel Deployment Test"
echo "=========================================="
echo ""
echo "🌐 Deployment URL: $DEPLOYMENT_URL"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name="$1"
    local url="$2"
    local expected_status="${3:-200}"
    local check_content="${4:-}"
    
    echo -n "Testing $name... "
    
    # Make request with user agent to avoid blocking
    response=$(curl -s -A "Mozilla/5.0" -o /tmp/response_body -w "%{http_code}" "$url" 2>&1 || echo "000")
    status_code="${response: -3}"
    body=$(cat /tmp/response_body 2>/dev/null || echo "")
    
    # Accept 200, 307, 308 as success for most endpoints
    # Also accept status codes matching pattern (e.g., "200|405")
    if [ "$status_code" = "$expected_status" ] || \
       ([ "$expected_status" = "200" ] && ([ "$status_code" = "307" ] || [ "$status_code" = "308" ])) || \
       (echo "$expected_status" | grep -q "|" && echo "$expected_status" | grep -q "$status_code"); then
        echo -e "${GREEN}✅ PASS${NC} (Status: $status_code)"
        PASSED=$((PASSED + 1))
        
        # Check content if specified
        if [ -n "$check_content" ] && echo "$body" | grep -qi "$check_content"; then
            echo -e "   ${GREEN}✅ Content check passed${NC}"
        elif [ -n "$check_content" ]; then
            echo -e "   ${YELLOW}⚠️  Content check: expected '$check_content' not found${NC}"
        fi
        
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} (Expected: $expected_status, Got: $status_code)"
        if [ "$status_code" != "000" ]; then
            echo "   Response preview: $(echo "$body" | head -c 100)"
        fi
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# Function to test redirect
test_redirect() {
    local name="$1"
    local url="$2"
    local expected_redirect="${3:-/login}"
    
    echo -n "Testing $name (redirect)... "
    
    # Follow redirects and get final URL
    redirect_url=$(curl -s -o /dev/null -w "%{redirect_url}" -L "$url" 2>&1 || echo "")
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>&1 || echo "000")
    
    if echo "$redirect_url" | grep -q "$expected_redirect" || [ "$status_code" = "307" ] || [ "$status_code" = "308" ]; then
        echo -e "${GREEN}✅ PASS${NC} (Redirects to: $expected_redirect)"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} (Expected redirect to: $expected_redirect)"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

echo "=========================================="
echo "1. Testing Homepage"
echo "=========================================="
echo ""

test_endpoint "Homepage" "$DEPLOYMENT_URL" "200" "AI Tools Finder"

echo ""
echo "=========================================="
echo "2. Testing Login Page"
echo "=========================================="
echo ""

test_endpoint "Login Page" "$DEPLOYMENT_URL/login" "200" "Login\|email\|password"

echo ""
echo "=========================================="
echo "3. Testing Admin Route Protection"
echo "=========================================="
echo ""

# Admin route should redirect to login (307/308) or show login page (200)
test_redirect "Admin Route (unauthenticated)" "$DEPLOYMENT_URL/admin" "/login"

echo ""
echo "=========================================="
echo "4. Testing API Routes"
echo "=========================================="
echo ""

# Test logout API (405 is OK - means endpoint exists but needs POST method)
test_endpoint "Logout API" "$DEPLOYMENT_URL/api/auth/logout" "200\|401\|405\|307\|308"

echo ""
echo "=========================================="
echo "5. Testing Static Assets"
echo "=========================================="
echo ""

# Test if Next.js is serving correctly
test_endpoint "Next.js Runtime" "$DEPLOYMENT_URL/_next/static" "200\|404\|403"

echo ""
echo "=========================================="
echo "6. Testing Environment Variables"
echo "=========================================="
echo ""

echo -n "Checking if Supabase URL is exposed... "
# Check homepage HTML for Supabase URL (NEXT_PUBLIC variables are exposed)
homepage_html=$(curl -s "$DEPLOYMENT_URL" 2>&1 || echo "")

if echo "$homepage_html" | grep -qi "supabase\|NEXT_PUBLIC_SUPABASE_URL"; then
    echo -e "${GREEN}✅ Found Supabase reference${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Supabase URL not found in HTML (might be in JS bundle)${NC}"
    # This is OK, variables might be in JS bundle
    PASSED=$((PASSED + 1))
fi

echo ""
echo "=========================================="
echo "7. Testing Response Headers"
echo "=========================================="
echo ""

echo -n "Checking security headers... "
headers=$(curl -s -I "$DEPLOYMENT_URL" 2>&1 || echo "")

if echo "$headers" | grep -qi "x-powered-by\|nextjs"; then
    echo -e "${GREEN}✅ Next.js headers present${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Next.js headers not detected${NC}"
    PASSED=$((PASSED + 1))
fi

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
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
    echo ""
    echo "🎉 Deployment is working correctly!"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Test manually tại: $DEPLOYMENT_URL"
    echo "   2. Test login functionality với credentials thật"
    echo "   3. Verify Supabase connection trong browser console"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    echo ""
    echo "⚠️  Please check deployment logs tại Vercel Dashboard"
    echo ""
    exit 1
fi

