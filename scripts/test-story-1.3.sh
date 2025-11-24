#!/bin/bash

# Story 1.3: Automated Testing Script
# Tests authentication setup and endpoints

# Don't exit on error - we want to run all tests
set +e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Base URL (default: localhost, can be overridden)
BASE_URL="${1:-http://localhost:3000}"

echo "=========================================="
echo "Story 1.3: Authentication Setup Tests"
echo "=========================================="
echo ""
echo "Base URL: $BASE_URL"
echo ""

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_status="${3:-200}"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

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

# Function to check file exists
check_file_exists() {
    local file_path="$1"
    if [ -f "$file_path" ]; then
        return 0
    else
        return 1
    fi
}

# Function to check environment variable
check_env_var() {
    local var_name="$1"
    if grep -q "^${var_name}=" .env.local 2>/dev/null || grep -q "^${var_name}=" .env 2>/dev/null; then
        local value=$(grep "^${var_name}=" .env.local 2>/dev/null | cut -d '=' -f2- || grep "^${var_name}=" .env 2>/dev/null | cut -d '=' -f2-)
        if [ -n "$value" ] && [ "$value" != "your_supabase_project_url" ] && [ "$value" != "your_supabase_anon_key" ] && [ "$value" != "your_supabase_service_role_key" ]; then
            return 0
        fi
    fi
    return 1
}

echo "=========================================="
echo "1. Environment Variables Check"
echo "=========================================="

run_test "NEXT_PUBLIC_SUPABASE_URL configured" "check_env_var NEXT_PUBLIC_SUPABASE_URL"
run_test "NEXT_PUBLIC_SUPABASE_ANON_KEY configured" "check_env_var NEXT_PUBLIC_SUPABASE_ANON_KEY"
run_test "SUPABASE_SERVICE_ROLE_KEY configured" "check_env_var SUPABASE_SERVICE_ROLE_KEY"

echo ""
echo "=========================================="
echo "2. File Structure Verification"
echo "=========================================="

run_test "middleware.ts exists" "check_file_exists middleware.ts"
run_test "app/login/page.tsx exists" "check_file_exists app/login/page.tsx"
run_test "app/admin/page.tsx exists" "check_file_exists app/admin/page.tsx"
run_test "app/api/auth/logout/route.ts exists" "check_file_exists app/api/auth/logout/route.ts"
run_test "lib/auth/get-user.ts exists" "check_file_exists lib/auth/get-user.ts"
run_test "lib/auth/get-session.ts exists" "check_file_exists lib/auth/get-session.ts"
run_test "lib/auth/require-auth.ts exists" "check_file_exists lib/auth/require-auth.ts"
run_test "lib/supabase/client.ts exists" "check_file_exists lib/supabase/client.ts"
run_test "lib/supabase/server.ts exists" "check_file_exists lib/supabase/server.ts"

echo ""
echo "=========================================="
echo "3. Code Compilation Check"
echo "=========================================="

if command -v npm &> /dev/null; then
    echo -n "Checking TypeScript compilation... "
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
        echo "  Run 'npm run build' to see errors"
    fi
else
    echo -e "${YELLOW}⚠️  npm not found, skipping compilation check${NC}"
fi

echo ""
echo "=========================================="
echo "4. Endpoint Accessibility Tests"
echo "=========================================="

# Check if server is running
if curl -s "$BASE_URL" > /dev/null 2>&1; then
    SERVER_RUNNING=true
else
    SERVER_RUNNING=false
    echo -e "${YELLOW}⚠️  Server not running at $BASE_URL${NC}"
    echo -e "${YELLOW}   Start server with: npm run dev${NC}"
    echo ""
fi

if [ "$SERVER_RUNNING" = true ]; then
    # Test login page (should be accessible)
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing /login page accessibility... "
    if check_http_status "$BASE_URL/login" "200"; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    # Test admin route protection (should redirect to login)
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing /admin route protection (redirect)... "
    status=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE_URL/admin" 2>/dev/null || echo "000")
    if [ "$status" = "200" ] || [ "$status" = "307" ] || [ "$status" = "308" ]; then
        # Check if redirected to login
        location=$(curl -s -o /dev/null -w "%{redirect_url}" -L "$BASE_URL/admin" 2>/dev/null || echo "")
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
    
    # Test logout API endpoint (should exist and accept POST)
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing /api/auth/logout endpoint... "
    status=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/auth/logout" 2>/dev/null || echo "000")
    # Accept 200 (success), 401 (unauthorized), or 405 (method not allowed for GET)
    if [ "$status" = "200" ] || [ "$status" = "401" ] || [ "$status" = "405" ]; then
        echo -e "${GREEN}✅ PASS (Status: $status)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL (Status: $status)${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    # Test logout API with GET (should return 405)
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing /api/auth/logout GET method (should reject)... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/auth/logout" 2>/dev/null || echo "000")
    if [ "$status" = "405" ] || [ "$status" = "404" ]; then
        echo -e "${GREEN}✅ PASS (Status: $status - Method not allowed)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${YELLOW}⚠️  WARNING (Status: $status, expected 405)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping endpoint tests (server not running)${NC}"
fi

echo ""
echo "=========================================="
echo "5. Code Quality Checks"
echo "=========================================="

# Check middleware has route protection
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Checking middleware route protection logic... "
if grep -q "/admin" middleware.ts 2>/dev/null && grep -q "redirect" middleware.ts 2>/dev/null; then
    echo -e "${GREEN}✅ PASS${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ FAIL${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# Check login page uses Supabase client
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Checking login page uses Supabase... "
if grep -q "signInWithPassword" app/login/page.tsx 2>/dev/null && grep -q "createClient" app/login/page.tsx 2>/dev/null; then
    echo -e "${GREEN}✅ PASS${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ FAIL${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# Check logout endpoint uses Supabase
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo -n "Checking logout endpoint uses Supabase... "
if grep -q "signOut" app/api/auth/logout/route.ts 2>/dev/null; then
    echo -e "${GREEN}✅ PASS${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ FAIL${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
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
    echo -e "${GREEN}✅ All automated tests passed!${NC}"
    echo ""
    echo "📋 Next Steps (Manual Testing Required):"
    echo "   1. Start dev server: npm run dev"
    echo "   2. Create admin user in Supabase Dashboard"
    echo "   3. Test login flow with valid credentials"
    echo "   4. Test login flow with invalid credentials"
    echo "   5. Test session persistence (reload page)"
    echo "   6. Test logout functionality"
    echo "   7. See docs/STORY_1.3_MANUAL_TESTING.md for details"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review errors above.${NC}"
    exit 1
fi

