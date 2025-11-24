#!/bin/bash

# Script đơn giản để test Vercel deployment
# Sử dụng production domain nếu có, hoặc hướng dẫn manual test

set -e

echo "=========================================="
echo "Vercel Deployment Test - Simple"
echo "=========================================="
echo ""

# Try to get production URL
echo "🔍 Đang tìm production URL..."

# Method 1: Get from vercel ls (latest production)
PROD_URL=$(npx vercel ls ai-tools-finder 2>&1 | grep "● Ready.*Production" | head -1 | grep -oE "https://[^ ]*" | head -1 || echo "")

if [ -z "$PROD_URL" ]; then
    # Method 2: Try project name pattern
    PROD_URL="https://ai-tools-finder.vercel.app"
fi

echo "🌐 Testing URL: $PROD_URL"
echo ""

# Test với curl
echo "📋 Running Tests..."
echo ""

# Test homepage
echo -n "1. Homepage... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" 2>&1 || echo "000")
if [ "$STATUS" = "200" ] || [ "$STATUS" = "307" ] || [ "$STATUS" = "308" ]; then
    echo "✅ PASS (Status: $STATUS)"
else
    echo "⚠️  Status: $STATUS"
    echo "   (Có thể cần authentication hoặc deployment đang protected)"
fi

# Test login page
echo -n "2. Login Page... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/login" 2>&1 || echo "000")
if [ "$STATUS" = "200" ] || [ "$STATUS" = "307" ] || [ "$STATUS" = "308" ]; then
    echo "✅ PASS (Status: $STATUS)"
else
    echo "⚠️  Status: $STATUS"
fi

echo ""
echo "=========================================="
echo "📊 Deployment Information"
echo "=========================================="
echo ""
echo "Deployment URL: $PROD_URL"
echo ""
echo "⚠️  Lưu ý:"
echo "   - Nếu deployment yêu cầu authentication, bạn cần:"
echo "     1. Vào Vercel Dashboard"
echo "     2. Settings → Deployment Protection"
echo "     3. Disable protection hoặc add bypass token"
echo ""
echo "   - Hoặc test trực tiếp trên Vercel Dashboard:"
echo "     https://vercel.com/dashboard"
echo ""
echo "=========================================="
echo "✅ Manual Test Checklist"
echo "=========================================="
echo ""
echo "Vui lòng test manual trên browser:"
echo ""
echo "1. ✅ Mở: $PROD_URL"
echo "2. ✅ Test homepage loads"
echo "3. ✅ Test /login page"
echo "4. ✅ Test /admin (should redirect to /login)"
echo "5. ✅ Check browser console (F12) - no errors"
echo "6. ✅ Verify Supabase connection"
echo ""

