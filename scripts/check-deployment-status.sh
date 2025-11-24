#!/bin/bash

# Script để check deployment status
# Checks GitHub commit và provides Vercel dashboard link

set -e

REPO="hoanleaml/ai-tools-finder"
PROJECT_NAME="ai-tools-finder"

echo "=========================================="
echo "Deployment Status Check"
echo "=========================================="
echo ""

# Check GitHub commit status
echo "📦 Checking GitHub Repository..."
echo ""

if command -v gh &> /dev/null && gh auth status &> /dev/null; then
    echo "✅ GitHub CLI authenticated"
    echo ""
    
    # Get latest commit
    LATEST_COMMIT=$(gh api repos/$REPO/commits --jq '.[0] | {sha: .sha[:7], message: .commit.message, date: .commit.author.date}' 2>/dev/null || echo "")
    
    if [ -n "$LATEST_COMMIT" ]; then
        echo "📝 Latest Commit on GitHub:"
        echo "$LATEST_COMMIT" | jq -r '"  SHA: \(.sha)\n  Message: \(.message)\n  Date: \(.date)"' 2>/dev/null || echo "$LATEST_COMMIT"
        echo ""
    fi
    
    # Check if trigger commit exists
    TRIGGER_COMMIT=$(gh api repos/$REPO/commits --jq '.[] | select(.commit.message | contains("trigger: redeploy")) | .sha[:7]' 2>/dev/null | head -1)
    
    if [ -n "$TRIGGER_COMMIT" ]; then
        echo "✅ Trigger commit found: $TRIGGER_COMMIT"
        echo "   Vercel should have detected this push"
        echo ""
    fi
else
    echo "⚠️  GitHub CLI not authenticated, skipping GitHub check"
    echo ""
fi

# Check local commit
echo "📝 Local Latest Commit:"
git log --oneline -1
echo ""

# Check if local and remote are in sync
LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git ls-remote origin main 2>/dev/null | cut -f1 || echo "")

if [ -n "$REMOTE_SHA" ]; then
    if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
        echo "✅ Local and remote are in sync"
    else
        echo "⚠️  Local and remote are out of sync"
        echo "   Local:  ${LOCAL_SHA:0:7}"
        echo "   Remote: ${REMOTE_SHA:0:7}"
    fi
    echo ""
fi

echo "=========================================="
echo "Vercel Deployment Status"
echo "=========================================="
echo ""
echo "📊 Check deployment status tại Vercel Dashboard:"
echo ""
echo "   🔗 https://vercel.com/dashboard"
echo ""
echo "Hoặc direct link:"
echo "   🔗 https://vercel.com/YOUR_TEAM/$PROJECT_NAME/deployments"
echo ""
echo "📋 Steps to check:"
echo "   1. Vào Vercel Dashboard"
echo "   2. Chọn project '$PROJECT_NAME'"
echo "   3. Click tab 'Deployments'"
echo "   4. Tìm deployment mới nhất"
echo "   5. Check status:"
echo "      ✅ Ready = Deployment thành công"
echo "      🔄 Building = Đang build"
echo "      ❌ Error = Build failed (check logs)"
echo ""

# Try to check via Vercel CLI if available
if command -v vercel &> /dev/null || command -v npx &> /dev/null; then
    VERCEL_CMD="vercel"
    if ! command -v vercel &> /dev/null; then
        VERCEL_CMD="npx vercel"
    fi
    
    if $VERCEL_CMD whoami &> /dev/null; then
        echo "🔍 Checking via Vercel CLI..."
        echo ""
        $VERCEL_CMD ls "$PROJECT_NAME" --limit 3 2>&1 | head -15 || echo "⚠️  Could not fetch deployments"
        echo ""
    else
        echo "💡 Tip: Login Vercel CLI để check status tự động:"
        echo "   $VERCEL_CMD login"
        echo ""
    fi
fi

echo "=========================================="
echo "✅ Check Complete"
echo "=========================================="
echo ""

