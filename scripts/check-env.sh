#!/bin/bash

# Script to check if environment variables are set correctly

echo "=========================================="
echo "Checking Environment Variables"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found"
    exit 1
fi

echo "✅ .env.local exists"
echo ""

# Check required variables
echo "Checking required variables:"
echo ""

# Check NEXT_PUBLIC_SUPABASE_URL
if grep -q "NEXT_PUBLIC_SUPABASE_URL=" .env.local; then
    URL=$(grep "NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'" | head -1)
    if [ -z "$URL" ] || [ "$URL" = "your_supabase_url" ]; then
        echo "❌ NEXT_PUBLIC_SUPABASE_URL is not set or is placeholder"
    else
        echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
    fi
else
    echo "❌ NEXT_PUBLIC_SUPABASE_URL not found in .env.local"
fi

# Check SUPABASE_SERVICE_ROLE_KEY
if grep -q "SUPABASE_SERVICE_ROLE_KEY=" .env.local; then
    KEY=$(grep "SUPABASE_SERVICE_ROLE_KEY=" .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'" | head -1)
    if [ -z "$KEY" ] || [ "$KEY" = "your_supabase_service_role_key" ]; then
        echo "❌ SUPABASE_SERVICE_ROLE_KEY is not set or is placeholder"
        echo "   Please update it in .env.local"
    else
        KEY_LENGTH=${#KEY}
        if [ "$KEY_LENGTH" -lt 50 ]; then
            echo "⚠️  SUPABASE_SERVICE_ROLE_KEY seems too short (${KEY_LENGTH} chars)"
            echo "   Service role keys are usually 100+ characters"
        else
            echo "✅ SUPABASE_SERVICE_ROLE_KEY is set (${KEY_LENGTH} chars)"
        fi
    fi
else
    echo "❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local"
fi

echo ""
echo "=========================================="
echo "Note:"
echo "=========================================="
echo "If you just updated .env.local, you need to:"
echo "1. Stop dev server (Ctrl+C)"
echo "2. Restart: npm run dev"
echo "3. Then run: ./scripts/seed-database.sh"
echo ""

