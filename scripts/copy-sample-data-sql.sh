#!/bin/bash

# Script to copy sample data SQL to clipboard (macOS)

MIGRATION_FILE="supabase/migrations/003_sample_data.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found: $MIGRATION_FILE"
    exit 1
fi

# Copy to clipboard (macOS)
if command -v pbcopy &> /dev/null; then
    cat "$MIGRATION_FILE" | pbcopy
    echo "✅ SQL copied to clipboard!"
    echo ""
    echo "Next steps:"
    echo "1. Open Supabase Dashboard → SQL Editor"
    echo "2. Paste (Cmd+V)"
    echo "3. Click Run"
else
    echo "⚠️  pbcopy not available. Showing file contents:"
    echo ""
    cat "$MIGRATION_FILE"
fi

