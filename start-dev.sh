#!/bin/bash

# Start Next.js Dev Server Helper Script

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🚀 Starting Next.js Dev Server                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    echo "   Please create .env.local from .env.example"
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "⚠️  node_modules not found. Installing dependencies..."
    npm install
fi

echo "✅ Environment check passed"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Starting dev server..."
echo ""
echo "📝 Once you see 'Ready' message, test connection with:"
echo "   curl http://localhost:3000/api/test-db"
echo "   Or open: http://localhost:3000/api/test-db"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start dev server
npm run dev

