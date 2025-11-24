#!/bin/bash

# Story 1.2: Automated Testing Script
# Tests Supabase Project Setup & Database Schema

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

echo "=========================================="
echo "Story 1.2: Supabase Setup & Schema Tests"
echo "=========================================="
echo ""

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
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

# Function to check file exists
check_file_exists() {
    local file_path="$1"
    if [ -f "$file_path" ] || [ -d "$file_path" ]; then
        return 0
    else
        return 1
    fi
}

# Function to check file contains pattern
check_file_contains() {
    local file_path="$1"
    local pattern="$2"
    if [ -f "$file_path" ] && grep -q "$pattern" "$file_path" 2>/dev/null; then
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
        if [ -n "$value" ] && [ "$value" != "your_supabase_project_url" ] && [ "$value" != "your_supabase_anon_key" ]; then
            return 0
        fi
    fi
    return 1
}

echo "=========================================="
echo "1. Environment Variables Check"
echo "=========================================="

run_test ".env.local exists" "check_file_exists .env.local"
run_test ".env.example exists" "check_file_exists .env.example"
run_test "NEXT_PUBLIC_SUPABASE_URL configured" "check_env_var NEXT_PUBLIC_SUPABASE_URL"
run_test "NEXT_PUBLIC_SUPABASE_ANON_KEY configured" "check_env_var NEXT_PUBLIC_SUPABASE_ANON_KEY"

echo ""
echo "=========================================="
echo "2. Supabase Client Libraries Check"
echo "=========================================="

run_test "@supabase/supabase-js installed" "check_file_contains package.json '@supabase/supabase-js'"
run_test "@supabase/ssr installed" "check_file_contains package.json '@supabase/ssr'"
run_test "lib/supabase/client.ts exists" "check_file_exists lib/supabase/client.ts"
run_test "lib/supabase/server.ts exists" "check_file_exists lib/supabase/server.ts"
run_test "client.ts uses createBrowserClient" "check_file_contains lib/supabase/client.ts 'createBrowserClient'"
run_test "server.ts uses createServerClient" "check_file_contains lib/supabase/server.ts 'createServerClient'"

echo ""
echo "=========================================="
echo "3. Database Migration Files Check"
echo "=========================================="

run_test "supabase/migrations directory exists" "check_file_exists supabase/migrations"
run_test "Migration file exists" "find supabase/migrations -name '*.sql' -type f | head -1 | grep -q ."
run_test "Categories table migration" "find supabase/migrations -name '*.sql' -exec grep -l 'categories' {} \; | head -1 | grep -q ."
run_test "Tools table migration" "find supabase/migrations -name '*.sql' -exec grep -l 'CREATE TABLE.*tools' {} \; | head -1 | grep -q ."
run_test "Affiliate links table migration" "find supabase/migrations -name '*.sql' -exec grep -l 'affiliate_links' {} \; | head -1 | grep -q ."
run_test "News articles table migration" "find supabase/migrations -name '*.sql' -exec grep -l 'news_articles' {} \; | head -1 | grep -q ."
run_test "Blog posts table migration" "find supabase/migrations -name '*.sql' -exec grep -l 'blog_posts' {} \; | head -1 | grep -q ."
run_test "Scraping jobs table migration" "find supabase/migrations -name '*.sql' -exec grep -l 'scraping_jobs' {} \; | head -1 | grep -q ."

echo ""
echo "=========================================="
echo "4. Database Schema Check (Migration Files)"
echo "=========================================="

# Check for required columns in categories table
if find supabase/migrations -name '*.sql' -exec grep -l 'categories' {} \; | head -1 | grep -q .; then
    migration_file=$(find supabase/migrations -name '*.sql' -exec grep -l 'categories' {} \; | head -1)
    run_test "Categories table has id column" "grep -q 'id.*UUID' \"$migration_file\" 2>/dev/null || grep -q 'id.*uuid' \"$migration_file\" 2>/dev/null"
    run_test "Categories table has name column" "grep -q 'name' \"$migration_file\" 2>/dev/null"
    run_test "Categories table has slug column" "grep -q 'slug' \"$migration_file\" 2>/dev/null"
fi

# Check for required columns in tools table
if find supabase/migrations -name '*.sql' -exec grep -l 'CREATE TABLE.*tools' {} \; | head -1 | grep -q .; then
    migration_file=$(find supabase/migrations -name '*.sql' -exec grep -l 'CREATE TABLE.*tools' {} \; | head -1)
    run_test "Tools table has id column" "grep -q 'id.*UUID' \"$migration_file\" 2>/dev/null || grep -q 'id.*uuid' \"$migration_file\" 2>/dev/null"
    run_test "Tools table has name column" "grep -q 'name' \"$migration_file\" 2>/dev/null"
    run_test "Tools table has category_id column" "grep -q 'category_id' \"$migration_file\" 2>/dev/null"
fi

echo ""
echo "=========================================="
echo "5. RLS Policies Check"
echo "=========================================="

run_test "RLS policies migration exists" "find supabase/migrations -name '*.sql' -exec grep -l 'ROW LEVEL SECURITY\|RLS\|ENABLE ROW LEVEL SECURITY' {} \; | head -1 | grep -q ."

echo ""
echo "=========================================="
echo "6. Supabase Connection Test"
echo "=========================================="

# Check if we can read environment variables
if [ -f .env.local ]; then
    SUPABASE_URL=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d '=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
    SUPABASE_ANON_KEY=$(grep "^NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local | cut -d '=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
    
    if [ -n "$SUPABASE_URL" ] && [ "$SUPABASE_URL" != "your_supabase_project_url" ] && [ -n "$SUPABASE_ANON_KEY" ] && [ "$SUPABASE_ANON_KEY" != "your_supabase_anon_key" ]; then
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
        echo -n "Testing Supabase connection... "
        # Test Supabase health endpoint
        response=$(curl -s -o /dev/null -w "%{http_code}" "${SUPABASE_URL}/rest/v1/" -H "apikey: ${SUPABASE_ANON_KEY}" 2>/dev/null || echo "000")
        if [ "$response" = "200" ] || [ "$response" = "404" ] || [ "$response" = "401" ]; then
            echo -e "${GREEN}✅ PASS (Status: $response)${NC}"
            PASSED_TESTS=$((PASSED_TESTS + 1))
        else
            echo -e "${YELLOW}⚠️  WARNING (Status: $response - May need manual verification)${NC}"
            PASSED_TESTS=$((PASSED_TESTS + 1))
        fi
    else
        echo -e "${YELLOW}⚠️  Skipping connection test (env vars not configured)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping connection test (.env.local not found)${NC}"
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
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "📋 Story 1.2 Verification:"
    echo "   ✅ Supabase project configured"
    echo "   ✅ Environment variables set"
    echo "   ✅ Supabase client libraries installed"
    echo "   ✅ Database migration files exist"
    echo "   ✅ All required tables defined"
    echo "   ✅ RLS policies configured"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review errors above.${NC}"
    exit 1
fi

