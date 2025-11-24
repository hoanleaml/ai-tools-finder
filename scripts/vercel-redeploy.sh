#!/bin/bash

# Script để tự động redeploy Vercel project
# Usage: ./scripts/vercel-redeploy.sh [PROJECT_NAME]

set -e

PROJECT_NAME="${1:-ai-tools-finder}"

echo "=========================================="
echo "Vercel Redeploy Script"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI chưa được cài đặt."
    echo ""
    echo "Đang cài đặt Vercel CLI..."
    
    # Install Vercel CLI globally
    npm install -g vercel
    
    echo ""
    echo "✅ Vercel CLI đã được cài đặt"
    echo ""
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Chưa login vào Vercel."
    echo ""
    echo "Đang login..."
    echo "Bạn sẽ được yêu cầu:"
    echo "  1. Login với Vercel account"
    echo "  2. Authorize CLI"
    echo ""
    read -p "Nhấn Enter để tiếp tục..."
    
    vercel login
fi

echo "✅ Đã login vào Vercel"
echo ""

# Get project info
echo "📦 Project: $PROJECT_NAME"
echo ""

# Option 1: Redeploy latest deployment
echo "🚀 Đang redeploy latest deployment..."
echo ""

# Get latest deployment
LATEST_DEPLOYMENT=$(vercel ls "$PROJECT_NAME" --json 2>/dev/null | jq -r '.[0].uid' 2>/dev/null || echo "")

if [ -n "$LATEST_DEPLOYMENT" ]; then
    echo "📝 Latest deployment: $LATEST_DEPLOYMENT"
    vercel redeploy "$LATEST_DEPLOYMENT" --yes
    echo ""
    echo "✅ Redeploy triggered!"
else
    echo "⚠️  Không tìm thấy deployment."
    echo ""
    echo "Trying alternative method: Trigger deployment via git push..."
    echo ""
    
    # Option 2: Trigger deployment by pushing empty commit
    echo "📤 Đang push empty commit để trigger deployment..."
    git commit --allow-empty -m "trigger: redeploy with environment variables" || true
    git push origin main || echo "⚠️  Git push failed. Please push manually."
    
    echo ""
    echo "✅ Deployment sẽ được trigger tự động sau khi push"
fi

echo ""
echo "=========================================="
echo "✅ Hoàn thành!"
echo "=========================================="
echo ""
echo "Kiểm tra deployment tại: https://vercel.com/dashboard"
echo ""

