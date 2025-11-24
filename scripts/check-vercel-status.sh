#!/bin/bash

# Script để check Vercel deployment status
# Usage: ./scripts/check-vercel-status.sh [PROJECT_NAME]

set -e

PROJECT_NAME="${1:-ai-tools-finder}"

echo "=========================================="
echo "Vercel Deployment Status Check"
echo "=========================================="
echo ""

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null && ! command -v npx &> /dev/null; then
    echo "❌ Vercel CLI không có sẵn."
    echo ""
    echo "Cài đặt Vercel CLI:"
    echo "  npm install -g vercel"
    echo ""
    echo "Hoặc check deployment tại: https://vercel.com/dashboard"
    exit 1
fi

# Use npx if vercel not installed globally
VERCEL_CMD="vercel"
if ! command -v vercel &> /dev/null; then
    VERCEL_CMD="npx vercel"
fi

# Check if logged in
if ! $VERCEL_CMD whoami &> /dev/null; then
    echo "⚠️  Chưa login vào Vercel."
    echo ""
    echo "Đang login..."
    $VERCEL_CMD login
fi

echo "📦 Project: $PROJECT_NAME"
echo ""

# List deployments
echo "📋 Recent Deployments:"
echo ""

$VERCEL_CMD ls "$PROJECT_NAME" --limit 5 2>&1 || {
    echo "⚠️  Không thể list deployments."
    echo ""
    echo "Có thể project chưa được link với Vercel CLI."
    echo "Hoặc check deployment tại: https://vercel.com/dashboard"
    exit 1
}

echo ""
echo "=========================================="
echo "✅ Status Check Complete"
echo "=========================================="
echo ""
echo "Chi tiết deployment tại: https://vercel.com/dashboard"
echo ""

