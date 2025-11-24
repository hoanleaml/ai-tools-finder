#!/bin/bash

# Script để tự động tạo GitHub repository và push code
# Usage: ./scripts/setup-github-repo.sh [REPO_NAME] [USERNAME]

set -e

REPO_NAME="${1:-ai-tools-finder}"
GITHUB_USERNAME="${2}"

echo "=========================================="
echo "GitHub Repository Setup Script"
echo "=========================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) chưa được cài đặt."
    echo ""
    echo "Đang cài đặt GitHub CLI..."
    
    # Detect OS and install
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "📦 Cài đặt qua Homebrew..."
            brew install gh
        else
            echo "❌ Homebrew chưa được cài đặt."
            echo "Vui lòng cài đặt Homebrew trước: https://brew.sh"
            echo "Hoặc cài đặt GitHub CLI thủ công: https://cli.github.com"
            exit 1
        fi
    else
        echo "❌ Vui lòng cài đặt GitHub CLI thủ công: https://cli.github.com"
        exit 1
    fi
fi

echo "✅ GitHub CLI đã được cài đặt"
echo ""

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "⚠️  Chưa authenticate với GitHub."
    echo ""
    echo "Đang authenticate..."
    echo "Bạn sẽ được yêu cầu:"
    echo "  1. Chọn authentication method (browser hoặc token)"
    echo "  2. Login GitHub nếu chưa login"
    echo "  3. Authorize GitHub CLI"
    echo ""
    read -p "Nhấn Enter để tiếp tục..."
    
    gh auth login
fi

echo "✅ Đã authenticate với GitHub"
echo ""

# Get GitHub username if not provided
if [ -z "$GITHUB_USERNAME" ]; then
    GITHUB_USERNAME=$(gh api user -q .login)
    echo "📝 GitHub username: $GITHUB_USERNAME"
    echo ""
fi

# Check if repository already exists
if gh repo view "$GITHUB_USERNAME/$REPO_NAME" &> /dev/null; then
    echo "⚠️  Repository '$GITHUB_USERNAME/$REPO_NAME' đã tồn tại!"
    read -p "Bạn có muốn sử dụng repository này không? (y/N): " use_existing
    
    if [[ "$use_existing" != "y" && "$use_existing" != "Y" ]]; then
        echo "❌ Hủy bỏ. Vui lòng chọn tên repository khác."
        exit 1
    fi
    
    # Repository exists, just add remote and push
    echo "📦 Repository đã tồn tại. Đang add remote và push code..."
    
    # Check if remote already exists
    if git remote get-url origin &> /dev/null; then
        echo "⚠️  Remote 'origin' đã tồn tại."
        read -p "Bạn có muốn update remote không? (y/N): " update_remote
        
        if [[ "$update_remote" == "y" || "$update_remote" == "Y" ]]; then
            git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        fi
    else
        git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    fi
    
    # Push code
    echo "📤 Đang push code..."
    git push -u origin main
    echo "✅ Code đã được push!"
else
    # Create repository
    echo "🚀 Đang tạo repository '$REPO_NAME'..."
    echo ""
    
    gh repo create "$REPO_NAME" \
        --public \
        --description "AI Tools Finder - Discover and explore AI tools. Built with Next.js 16, Supabase, and Vercel." \
        --source=. \
        --remote=origin \
        --push
    
    echo ""
    echo "✅ Repository đã được tạo và code đã được push!"
fi

echo ""
echo "=========================================="
echo "✅ Hoàn thành!"
echo "=========================================="
echo ""
echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "Tiếp theo:"
echo "1. Vào Vercel: https://vercel.com/new"
echo "2. Import repository '$REPO_NAME'"
echo "3. Tiếp tục với deployment setup"
echo ""

