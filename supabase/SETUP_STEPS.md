# Supabase Setup - Interactive Guide

Follow these steps in order. After each step, come back here to continue.

## ✅ Step 1: Create Supabase Project

**Action Required:** Go to Supabase website and create project

1. **Open browser** and go to: https://supabase.com
2. **Sign In** (or create account if you don't have one)
3. **Click "New Project"** button
4. **Fill in the form:**
   - Name: `AI Tools Finder`
   - Database Password: Choose a strong password (save it!)
   - Region: Choose closest to you (e.g., Southeast Asia for Vietnam)
   - Plan: Free (for development)
5. **Click "Create new project"**
6. **Wait 1-2 minutes** for provisioning

**✅ When done:** Come back and we'll continue to Step 2

---

## ✅ Step 2: Get API Keys

**Action Required:** Copy API keys from Supabase dashboard

1. **In Supabase dashboard**, click **Settings** (gear icon, bottom left)
2. **Click "API"** in settings menu
3. **Copy these 3 values:**

   **a) Project URL:**
   - Look for "Project URL" section
   - Copy the URL (format: `https://xxxxx.supabase.co`)
   - Example: `https://abcdefghijklmnop.supabase.co`

   **b) anon/public key:**
   - Look for "Project API keys" section
   - Find "anon" or "public" key
   - Click "Reveal" if hidden
   - Copy the key (starts with `eyJ...`)

   **c) service_role key:**
   - In same "Project API keys" section
   - Find "service_role" key
   - Click "Reveal" if hidden
   - Copy the key (starts with `eyJ...`)
   - ⚠️ Keep this secret!

**✅ When done:** Come back with your API keys, or continue to Step 3

---

## ✅ Step 3: Configure Environment Variables

**Action Required:** Create .env.local file with your credentials

I'll help you create this file. You'll need to provide:
- Project URL
- anon key
- service_role key

**✅ When done:** Continue to Step 4

---

## ✅ Step 4: Run Database Migrations

**Action Required:** Run SQL migrations in Supabase SQL Editor

1. **In Supabase dashboard**, click **SQL Editor** (left sidebar)
2. **Open** `supabase/migrations/001_initial_schema.sql` in your code editor
3. **Copy** entire file content
4. **Paste** into Supabase SQL Editor
5. **Click "Run"** button
6. **Verify** success message appears

7. **Open** `supabase/migrations/002_rls_policies.sql` in your code editor
8. **Copy** entire file content
9. **Paste** into Supabase SQL Editor (clear previous SQL first)
10. **Click "Run"** button
11. **Verify** success message appears

**✅ When done:** Continue to Step 5

---

## ✅ Step 5: Verify Setup

**Action Required:** Verify tables and RLS are set up correctly

1. **In Supabase dashboard**, click **Table Editor** (left sidebar)
2. **Verify** these 6 tables exist:
   - categories
   - tools
   - affiliate_links
   - news_articles
   - blog_posts
   - scraping_jobs

**✅ When done:** Continue to Step 6

---

## ✅ Step 6: Test Database Connection

**Action Required:** Test the connection via API

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser** to: http://localhost:3000/api/test-db

3. **Verify** you see:
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

**✅ When done:** Setup is complete!

---

## Current Status

- [ ] Step 1: Supabase project created
- [ ] Step 2: API keys copied
- [ ] Step 3: .env.local configured
- [ ] Step 4: Migrations run
- [ ] Step 5: Tables verified
- [ ] Step 6: Connection tested

