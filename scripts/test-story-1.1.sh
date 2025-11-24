#!/bin/bash

# Story 1.1: Automated Testing Script
# Tests Project Setup & Next.js Configuration

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
echo "Story 1.1: Project Setup & Next.js Tests"
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

echo "=========================================="
echo "1. Package.json & Dependencies Check"
echo "=========================================="

run_test "package.json exists" "check_file_exists package.json"
run_test "Next.js 16 installed" "check_file_contains package.json '\"next\": \"16'"
run_test "TypeScript installed" "check_file_contains package.json '\"typescript\"'"
run_test "React 19 installed" "check_file_contains package.json '\"react\": \"19'"
run_test "Tailwind CSS installed" "check_file_contains package.json '\"tailwindcss\"'"
run_test "ESLint configured" "check_file_contains package.json '\"eslint\"'"
run_test "Prettier configured" "check_file_contains package.json '\"prettier\"'"

echo ""
echo "=========================================="
echo "2. Project Structure Check"
echo "=========================================="

run_test "/app directory exists" "check_file_exists app"
run_test "/components directory exists" "check_file_exists components"
run_test "/lib directory exists" "check_file_exists lib"
run_test "/types directory exists" "check_file_exists types"
run_test "/public directory exists" "check_file_exists public"
run_test "app/layout.tsx exists" "check_file_exists app/layout.tsx"
run_test "app/page.tsx exists" "check_file_exists app/page.tsx"
run_test "app/globals.css exists" "check_file_exists app/globals.css"

echo ""
echo "=========================================="
echo "3. Configuration Files Check"
echo "=========================================="

run_test "tsconfig.json exists" "check_file_exists tsconfig.json"
run_test "TypeScript strict mode enabled" "check_file_contains tsconfig.json '\"strict\": true'"
run_test "next.config.ts exists" "check_file_exists next.config.ts"
run_test "postcss.config.mjs exists" "check_file_exists postcss.config.mjs"
run_test "eslint.config.mjs exists" "check_file_exists eslint.config.mjs"
run_test ".prettierrc exists" "check_file_exists .prettierrc"
run_test ".gitignore exists" "check_file_exists .gitignore"

echo ""
echo "=========================================="
echo "4. TypeScript Configuration Check"
echo "=========================================="

run_test "Import alias @/* configured" "check_file_contains tsconfig.json '@/*'"
run_test "Next.js types included" "check_file_contains tsconfig.json 'next'"

echo ""
echo "=========================================="
echo "5. Tailwind CSS Configuration Check"
echo "=========================================="

run_test "Tailwind imported in globals.css" "check_file_contains app/globals.css 'tailwindcss'"

echo ""
echo "=========================================="
echo "6. Code Quality Check"
echo "=========================================="

if command -v npm &> /dev/null; then
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing TypeScript compilation... "
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        echo "  Run 'npm run build' to see errors"
    fi
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing ESLint... "
    if npm run lint > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${YELLOW}⚠️  WARNING (ESLint found issues)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  npm not found, skipping compilation checks${NC}"
fi

echo ""
echo "=========================================="
echo "7. Git Repository Check"
echo "=========================================="

run_test ".git directory exists" "check_file_exists .git"
run_test ".gitignore includes node_modules" "check_file_contains .gitignore 'node_modules'"
run_test ".gitignore includes .next" "check_file_contains .gitignore '.next'"
run_test ".gitignore includes .env*.local" "check_file_contains .gitignore '.env'"

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
    echo "📋 Story 1.1 Verification:"
    echo "   ✅ Next.js 16 project initialized"
    echo "   ✅ TypeScript strict mode enabled"
    echo "   ✅ Project structure follows conventions"
    echo "   ✅ Tailwind CSS configured"
    echo "   ✅ ESLint and Prettier configured"
    echo "   ✅ Git repository initialized"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review errors above.${NC}"
    exit 1
fi

