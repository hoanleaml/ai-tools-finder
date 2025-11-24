#!/bin/bash

# Test script for FutureTools.io scraper
# Usage: ./scripts/test-scraper.sh [page]

set -e

BASE_URL="${BASE_URL:-http://localhost:3000}"
PAGE="${1:-1}"

echo "=========================================="
echo "Testing FutureTools.io Scraper"
echo "=========================================="
echo ""
echo "Base URL: $BASE_URL"
echo "Page: $PAGE"
echo ""

# Check if server is running
if ! curl -s "$BASE_URL" > /dev/null; then
    echo "❌ Server is not running at $BASE_URL"
    echo "Please start the development server: npm run dev"
    exit 1
fi

echo "✅ Server is running"
echo ""
echo "🔍 Testing scraper API..."
echo ""

# Test single page scrape
RESPONSE=$(curl -s "$BASE_URL/api/scraper/futuretools?page=$PAGE")

# Check if response contains success
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Scraper API responded successfully"
    echo ""
    echo "📊 Results:"
    echo "$RESPONSE" | jq -r '.tools | length' 2>/dev/null | xargs -I {} echo "   Tools found: {}"
    echo "$RESPONSE" | jq -r '.errors | length' 2>/dev/null | xargs -I {} echo "   Errors: {}"
    echo ""
    
    # Show first tool if available
    FIRST_TOOL=$(echo "$RESPONSE" | jq -r '.tools[0]' 2>/dev/null)
    if [ "$FIRST_TOOL" != "null" ] && [ -n "$FIRST_TOOL" ]; then
        echo "📝 First tool sample:"
        echo "$FIRST_TOOL" | jq '.' 2>/dev/null || echo "$FIRST_TOOL"
    fi
    
    # Show errors if any
    ERRORS=$(echo "$RESPONSE" | jq -r '.errors[]' 2>/dev/null)
    if [ -n "$ERRORS" ]; then
        echo ""
        echo "⚠️  Errors:"
        echo "$ERRORS"
    fi
else
    echo "❌ Scraper API failed"
    echo "Response:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    exit 1
fi

echo ""
echo "=========================================="
echo "Test completed"
echo "=========================================="

