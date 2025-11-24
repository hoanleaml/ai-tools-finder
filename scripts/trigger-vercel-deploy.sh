#!/bin/bash

# Script đơn giản để trigger Vercel deployment bằng cách push empty commit
# Usage: ./scripts/trigger-vercel-deploy.sh

set -e

echo "=========================================="
echo "Trigger Vercel Deployment"
echo "=========================================="
echo ""

# Check if git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Không phải git repository!"
    exit 1
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Remote 'origin' chưa được configure!"
    exit 1
fi

echo "📤 Đang push empty commit để trigger Vercel deployment..."
echo ""

# Create empty commit
git commit --allow-empty -m "trigger: redeploy with environment variables [$(date +%Y-%m-%d\ %H:%M:%S)]"

# Push to trigger deployment
echo "🚀 Pushing to origin/main..."
git push origin main

echo ""
echo "✅ Push thành công!"
echo ""
echo "Vercel sẽ tự động detect push và trigger deployment mới."
echo "Kiểm tra tại: https://vercel.com/dashboard"
echo ""
echo "⏳ Đợi 2-5 phút để deployment hoàn thành..."
echo ""

