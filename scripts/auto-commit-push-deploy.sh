#!/bin/bash

# Auto Commit, Push and Deploy Script
# This script automatically commits changes, pushes to GitHub, and triggers Vercel deployment
# Usage: ./scripts/auto-commit-push-deploy.sh "commit message"

set -e

echo "=========================================="
echo "Auto Commit, Push & Deploy"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get commit message from argument or use default
COMMIT_MSG="${1:-chore: auto commit and deploy}"

# Check if there are changes
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  No changes to commit${NC}"
  exit 0
fi

echo -e "${BLUE}📋 Changes to commit:${NC}"
git status --short
echo ""

# Stage all changes
echo -e "${BLUE}📦 Staging changes...${NC}"
git add -A

# Commit
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "$COMMIT_MSG" || {
  echo -e "${RED}❌ Commit failed${NC}"
  exit 1
}

echo -e "${GREEN}✅ Changes committed${NC}"
echo ""

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}🌿 Current branch: $CURRENT_BRANCH${NC}"
echo ""

# Push to GitHub
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"

# Try multiple push methods
PUSH_SUCCESS=false

# Method 1: GitHub CLI (most reliable)
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  echo "   Using GitHub CLI..."
  if gh repo sync --force 2>&1 | grep -v "already up to date"; then
    PUSH_SUCCESS=true
  elif git push origin "$CURRENT_BRANCH" 2>&1; then
    PUSH_SUCCESS=true
  fi
fi

# Method 2: Direct push (if GitHub CLI didn't work)
if [ "$PUSH_SUCCESS" = false ]; then
  echo "   Trying direct push..."
  if git push origin "$CURRENT_BRANCH" 2>&1; then
    PUSH_SUCCESS=true
  else
    # Method 3: Try with SSH
    echo -e "${YELLOW}   Trying SSH...${NC}"
    REMOTE_URL=$(git remote get-url origin)
    if [[ "$REMOTE_URL" == https://* ]]; then
      SSH_URL=$(echo "$REMOTE_URL" | sed 's|https://github.com/|git@github.com:|')
      git remote set-url origin "$SSH_URL" 2>/dev/null || true
      if git push origin "$CURRENT_BRANCH" 2>&1; then
        PUSH_SUCCESS=true
      else
        # Restore HTTPS URL
        git remote set-url origin "$REMOTE_URL"
      fi
    fi
  fi
fi

if [ "$PUSH_SUCCESS" = true ]; then
  echo -e "${GREEN}✅ Successfully pushed to GitHub${NC}"
  echo ""
  
  # Show commit info
  echo -e "${BLUE}📊 Commit info:${NC}"
  git log -1 --pretty=format:"  %h - %s" --date=short
  echo ""
  echo ""
  
  # Check Vercel deployment
  echo -e "${BLUE}🚀 Vercel Deployment:${NC}"
  echo "   Vercel will automatically detect the push and deploy"
  echo "   Check status at: https://vercel.com/dashboard"
  echo ""
  
  # Try to check deployment status if Vercel CLI is available
  if command -v vercel >/dev/null 2>&1; then
    echo -e "${BLUE}🔍 Checking deployment status...${NC}"
    sleep 3
    npx vercel ls --limit 1 2>&1 | head -5 || echo "   (Deployment may still be in progress)"
  fi
  
  echo ""
  echo -e "${GREEN}✅ Auto commit, push & deploy completed!${NC}"
else
  echo -e "${RED}❌ Failed to push to GitHub${NC}"
  echo ""
  echo "Please push manually:"
  echo "  git push origin $CURRENT_BRANCH"
  echo ""
  echo "Or use GitHub CLI:"
  echo "  gh repo sync --force"
  exit 1
fi
