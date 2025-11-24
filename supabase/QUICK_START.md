# Supabase Quick Start Guide

**Quick reference for experienced developers.** For detailed instructions, see [README.md](./README.md).

## TL;DR

```bash
# 1. Create Supabase project at https://supabase.com/dashboard
# 2. Get API keys from Settings → API
# 3. Create .env.local
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run migrations in Supabase SQL Editor
# Copy/paste supabase/migrations/001_initial_schema.sql → Run
# Copy/paste supabase/migrations/002_rls_policies.sql → Run

# 5. Test connection
npm run dev
# Visit http://localhost:3000/api/test-db
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Migration Files

1. `supabase/migrations/001_initial_schema.sql` - Creates 6 tables + indexes + triggers
2. `supabase/migrations/002_rls_policies.sql` - Enables RLS + creates policies

## Tables Created

- `categories` - Tool categories
- `tools` - AI tools
- `affiliate_links` - Affiliate tracking
- `news_articles` - AI news
- `blog_posts` - Blog posts
- `scraping_jobs` - Scraping job tracking

## Test Endpoint

```
GET http://localhost:3000/api/test-db
```

Expected response:
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "categoriesCount": 0,
    "toolsCount": 0
  }
}
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Environment variables not found | Restart dev server after creating `.env.local` |
| Connection failed | Verify API keys and project URL are correct |
| Migration errors | Check SQL syntax, ensure migrations run in order |
| Tables not visible | Refresh Supabase dashboard |

## Files Created

- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server client
- `types/database.ts` - TypeScript types
- `app/api/test-db/route.ts` - Test API route

## Next Steps

After setup complete → Story 1.3: Supabase Authentication Setup

