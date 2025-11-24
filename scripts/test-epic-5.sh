#!/bin/bash

# Test Script for Epic 5: Scraping & Sync System
# Runs all tests for Epic 5 stories

set -e

echo "=========================================="
echo "🧪 Testing Epic 5: Scraping & Sync System"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOTAL_PASSED=0
TOTAL_FAILED=0

# Check if server is running
echo -n "Checking if dev server is running... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep "200" > /dev/null; then
  echo -e "${GREEN}✅ Running${NC}"
else
  echo -e "${RED}❌ Not running. Please start the dev server with 'npm run dev'${NC}"
  exit 1
fi
echo ""

# Test Story 5.1
echo "=========================================="
echo "📋 Story 5.1: FutureTools.io Scraper Implementation"
echo "=========================================="
if bash "${SCRIPT_DIR}/test-story-5.1.sh"; then
  ((TOTAL_PASSED++))
else
  ((TOTAL_FAILED++))
fi
echo ""

# Test Story 5.2
echo "=========================================="
echo "📋 Story 5.2: Newly Added Tools Detection"
echo "=========================================="
if bash "${SCRIPT_DIR}/test-story-5.2.sh"; then
  ((TOTAL_PASSED++))
else
  ((TOTAL_FAILED++))
fi
echo ""

# Test Story 5.3
echo "=========================================="
echo "📋 Story 5.3: Tool Data Auto-Generation"
echo "=========================================="
if bash "${SCRIPT_DIR}/test-story-5.3.sh"; then
  ((TOTAL_PASSED++))
else
  ((TOTAL_FAILED++))
fi
echo ""

# Test Story 5.4
echo "=========================================="
echo "📋 Story 5.4: Scraping Job Management & Monitoring"
echo "=========================================="
if bash "${SCRIPT_DIR}/test-story-5.4.sh"; then
  ((TOTAL_PASSED++))
else
  ((TOTAL_FAILED++))
fi
echo ""

# Final Summary
echo "=========================================="
echo "📊 Epic 5 Test Summary"
echo "=========================================="
echo -e "Stories Tested: 4"
echo -e "${GREEN}Passed: $TOTAL_PASSED${NC}"
if [ $TOTAL_FAILED -gt 0 ]; then
  echo -e "${RED}Failed: $TOTAL_FAILED${NC}"
else
  echo -e "Failed: $TOTAL_FAILED"
fi
echo ""

if [ $TOTAL_FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 All Epic 5 tests passed!${NC}"
  echo ""
  echo "Epic 5 Features Verified:"
  echo "  ✅ FutureTools.io scraper"
  echo "  ✅ Daily sync from /newly-added"
  echo "  ✅ Tool data auto-generation"
  echo "  ✅ Job management & monitoring"
  exit 0
else
  echo -e "${RED}❌ Some Epic 5 tests failed${NC}"
  exit 1
fi

