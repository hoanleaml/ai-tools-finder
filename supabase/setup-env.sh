#!/bin/bash

# Supabase Environment Setup Helper Script
# This script helps you create .env.local file with Supabase credentials

echo "=========================================="
echo "Supabase Environment Setup Helper"
echo "=========================================="
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "Cancelled. Exiting."
        exit 0
    fi
fi

# Copy .env.example to .env.local
if [ ! -f .env.example ]; then
    echo "❌ Error: .env.example not found!"
    exit 1
fi

cp .env.example .env.local
echo "✅ Created .env.local from .env.example"
echo ""

# Prompt for values
echo "Please provide your Supabase credentials:"
echo ""

read -p "1. Supabase Project URL (https://xxxxx.supabase.co): " SUPABASE_URL
read -p "2. Supabase anon/public key (eyJ...): " SUPABASE_ANON_KEY
read -p "3. Supabase service_role key (eyJ...): " SUPABASE_SERVICE_ROLE_KEY

# Validate inputs
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: All values are required!"
    exit 1
fi

# Update .env.local
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|your_supabase_project_url|$SUPABASE_URL|g" .env.local
    sed -i '' "s|your_supabase_anon_key|$SUPABASE_ANON_KEY|g" .env.local
    sed -i '' "s|your_supabase_service_role_key|$SUPABASE_SERVICE_ROLE_KEY|g" .env.local
else
    # Linux
    sed -i "s|your_supabase_project_url|$SUPABASE_URL|g" .env.local
    sed -i "s|your_supabase_anon_key|$SUPABASE_ANON_KEY|g" .env.local
    sed -i "s|your_supabase_service_role_key|$SUPABASE_SERVICE_ROLE_KEY|g" .env.local
fi

echo ""
echo "✅ .env.local file updated successfully!"
echo ""
echo "Next steps:"
echo "1. Verify .env.local contains correct values"
echo "2. Run database migrations in Supabase SQL Editor"
echo "3. Test connection: npm run dev → http://localhost:3000/api/test-db"
echo ""

