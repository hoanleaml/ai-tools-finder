# Supabase Setup Guide - AI Tools Finder

This comprehensive guide will walk you through setting up your Supabase project and running the database migrations for AI Tools Finder.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Supabase Project](#step-1-create-supabase-project)
3. [Step 2: Get API Keys](#step-2-get-api-keys)
4. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
5. [Step 4: Run Database Migrations](#step-4-run-database-migrations)
6. [Step 5: Verify Setup](#step-5-verify-setup)
7. [Step 6: Test Database Connection](#step-6-test-database-connection)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

---

## Prerequisites

Before starting, ensure you have:

- ✅ A Supabase account (sign up at https://supabase.com if you don't have one)
- ✅ Node.js and npm installed (already done in Story 1.1)
- ✅ Next.js project set up (already done in Story 1.1)
- ✅ Git repository initialized (already done in Story 1.1)

---

## Step 1: Create Supabase Project

### 1.1 Sign In to Supabase

1. Go to https://supabase.com
2. Click **"Sign In"** (top right) or **"Start your project"**
3. Sign in with your GitHub, Google, or email account

### 1.2 Create New Project

1. Once logged in, you'll see your dashboard
2. Click the **"New Project"** button (usually a green button in the top right or center)
3. Fill in the project creation form:

   **Project Details:**
   - **Name**: `AI Tools Finder` (or your preferred name)
   - **Database Password**: 
     - Choose a **strong password** (at least 12 characters)
     - **IMPORTANT**: Save this password securely - you'll need it for database connections
     - Consider using a password manager
   - **Region**: 
     - Select the region closest to your target users
     - For example: `Southeast Asia (Singapore)` for Vietnam users
     - Or `US East (North Virginia)` for US users
   - **Pricing Plan**: 
     - Select **Free** plan for development (sufficient for MVP)
     - Upgrade later if needed

4. Click **"Create new project"**
5. Wait for provisioning (usually 1-2 minutes)
   - You'll see a progress indicator
   - Don't close the browser tab during this process

### 1.3 Verify Project Created

- Once provisioning is complete, you'll be redirected to your project dashboard
- You should see: **Project Settings**, **Table Editor**, **SQL Editor**, etc. in the left sidebar

---

## Step 2: Get API Keys

### 2.1 Navigate to API Settings

1. In your Supabase project dashboard, look at the **left sidebar**
2. Click on **"Settings"** (gear icon at the bottom)
3. Click on **"API"** in the settings menu

### 2.2 Copy Required Values

You'll see several sections. Copy the following values:

#### Project URL
- **Location**: Under "Project URL" section
- **Format**: `https://xxxxx.supabase.co`
- **Example**: `https://abcdefghijklmnop.supabase.co`
- **Action**: Click the copy icon or manually copy the URL
- **Save to**: You'll use this for `NEXT_PUBLIC_SUPABASE_URL`

#### API Keys

**1. anon/public key:**
- **Location**: Under "Project API keys" → "anon" or "public" key
- **Format**: Starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Visibility**: Click "Reveal" if the key is hidden
- **Security**: This key is safe to use in client-side code (browser)
- **Action**: Click copy icon
- **Save to**: You'll use this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**2. service_role key:**
- **Location**: Under "Project API keys" → "service_role" key
- **Format**: Starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Visibility**: Click "Reveal" if the key is hidden
- **Security**: ⚠️ **KEEP THIS SECRET** - Never expose in client-side code
- **Usage**: Server-side operations only (admin tasks, bypassing RLS)
- **Action**: Click copy icon
- **Save to**: You'll use this for `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 Verify Keys Copied

- Double-check that you've copied all three values:
  - ✅ Project URL
  - ✅ anon/public key
  - ✅ service_role key

---

## Step 3: Configure Environment Variables

### 3.1 Locate Environment Template

The project includes an `.env.example` file in the root directory with placeholder values.

### 3.2 Create .env.local File

**Option A: Using Terminal (Recommended)**

1. Open terminal in your project root directory
2. Run:
   ```bash
   cp .env.example .env.local
   ```
3. Verify file created:
   ```bash
   ls -la .env.local
   ```

**Option B: Using File Explorer**

1. Navigate to project root directory
2. Find `.env.example` file
3. Copy it and rename the copy to `.env.local`

### 3.3 Edit .env.local File

1. Open `.env.local` in your code editor
2. Replace the placeholder values with your actual Supabase credentials:

   ```env
   # Supabase Configuration
   # Get these values from your Supabase project dashboard:
   # https://supabase.com/dashboard/project/_/settings/api

   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Replace values:**
   - `https://xxxxx.supabase.co` → Your actual Project URL
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (anon key) → Your actual anon/public key
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (service role) → Your actual service_role key

4. **Example of completed file:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
   ```

### 3.4 Verify .gitignore

1. Check that `.env.local` is in `.gitignore`:
   ```bash
   grep "\.env" .gitignore
   ```
2. You should see `.env*` or `.env*.local` listed
3. If not present, add it (though it should already be there from Story 1.1)

### 3.5 Verify Environment Variables

**Important**: Restart your development server after creating/updating `.env.local`

1. If dev server is running, stop it (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Environment variables are now loaded

---

## Step 4: Run Database Migrations

### 4.1 Open SQL Editor

1. In your Supabase project dashboard, look at the **left sidebar**
2. Click on **"SQL Editor"** (database icon)
3. You'll see a SQL editor interface with a query input area

### 4.2 Run First Migration (Initial Schema)

1. **Open the migration file:**
   - Navigate to `supabase/migrations/001_initial_schema.sql` in your project
   - Open it in your code editor

2. **Copy the entire SQL content:**
   - Select all (Ctrl+A / Cmd+A)
   - Copy (Ctrl+C / Cmd+C)
   - The file contains:
     - UUID extension setup
     - `update_updated_at_column()` function
     - All 6 table definitions (categories, tools, affiliate_links, news_articles, blog_posts, scraping_jobs)
     - All indexes
     - All triggers

3. **Paste into Supabase SQL Editor:**
   - Click in the SQL Editor text area
   - Paste (Ctrl+V / Cmd+V)

4. **Review the SQL:**
   - Check that all SQL is pasted correctly
   - The migration should be ~150+ lines

5. **Run the migration:**
   - Click the **"Run"** button (usually bottom right, or press Ctrl+Enter)
   - Wait for execution (usually 1-5 seconds)

6. **Verify success:**
   - Look for success message: "Success. No rows returned"
   - Or check the bottom panel for execution status
   - If there are errors, see [Troubleshooting](#troubleshooting) section

### 4.3 Run Second Migration (RLS Policies)

1. **Open the second migration file:**
   - Navigate to `supabase/migrations/002_rls_policies.sql` in your project
   - Open it in your code editor

2. **Copy the entire SQL content:**
   - Select all and copy

3. **Paste into Supabase SQL Editor:**
   - **Important**: Clear the previous SQL or open a new query tab
   - Paste the RLS policies SQL

4. **Review the SQL:**
   - Should contain `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` statements
   - Should contain `CREATE POLICY` statements for each table

5. **Run the migration:**
   - Click **"Run"**
   - Wait for execution

6. **Verify success:**
   - Check for success message
   - RLS should now be enabled on all tables

### 4.4 Verify Migrations Applied

1. Go to **"Table Editor"** in the left sidebar
2. You should see all 6 tables listed:
   - ✅ `categories`
   - ✅ `tools`
   - ✅ `affiliate_links`
   - ✅ `news_articles`
   - ✅ `blog_posts`
   - ✅ `scraping_jobs`

3. Click on each table to verify:
   - Columns are correct
   - Indexes are present (check table structure)
   - Foreign keys are configured

---

## Step 5: Verify Setup

### 5.1 Verify Tables Structure

For each table, verify the structure matches the schema:

#### Categories Table
- Columns: `id`, `name`, `slug`, `description`, `created_at`, `updated_at`
- Constraints: `id` is PRIMARY KEY, `slug` is UNIQUE
- Index: `idx_categories_slug` on `slug`

#### Tools Table
- Columns: `id`, `name`, `description`, `website_url`, `logo_url`, `category_id`, `pricing_model`, `features`, `slug`, `status`, `created_at`, `updated_at`
- Constraints: `id` is PRIMARY KEY, `slug` is UNIQUE, `category_id` references `categories(id)`
- Indexes: `idx_tools_category`, `idx_tools_status`, `idx_tools_slug`, `idx_tools_name`

#### Affiliate Links Table
- Columns: `id`, `tool_id`, `affiliate_url`, `program_name`, `commission_rate`, `status`, `created_at`, `updated_at`
- Constraints: `id` is PRIMARY KEY, `tool_id` references `tools(id) ON DELETE CASCADE`
- Indexes: `idx_affiliate_links_tool`, `idx_affiliate_links_status`

#### News Articles Table
- Columns: `id`, `title`, `summary`, `content`, `source_url`, `source_name`, `image_url`, `published_at`, `created_at`
- Constraints: `id` is PRIMARY KEY
- Indexes: `idx_news_published`, `idx_news_source`

#### Blog Posts Table
- Columns: `id`, `title`, `slug`, `content`, `excerpt`, `author_id`, `status`, `published_at`, `created_at`, `updated_at`
- Constraints: `id` is PRIMARY KEY, `slug` is UNIQUE
- Indexes: `idx_blog_slug`, `idx_blog_status`, `idx_blog_published`

#### Scraping Jobs Table
- Columns: `id`, `source_url`, `status`, `error_message`, `tools_found`, `created_at`, `completed_at`
- Constraints: `id` is PRIMARY KEY
- Indexes: `idx_scraping_jobs_status`, `idx_scraping_jobs_created`

### 5.2 Verify RLS Policies

1. Go to **"Authentication"** → **"Policies"** in Supabase dashboard
2. Or check each table's RLS status:
   - Go to **"Table Editor"**
   - Click on a table
   - Look for "Row Level Security" indicator (should show "Enabled")

3. Verify policies exist for:
   - ✅ `categories` - Public SELECT
   - ✅ `tools` - Public SELECT
   - ✅ `affiliate_links` - Public SELECT
   - ✅ `news_articles` - Public SELECT
   - ✅ `blog_posts` - Public SELECT (published only)
   - ✅ `scraping_jobs` - Admin only (denied for now, will be configured in Story 1.3)

### 5.3 Test Table Creation

1. In **Table Editor**, select `categories` table
2. Click **"Insert row"** (or use the + button)
3. Fill in test data:
   - `name`: "Test Category"
   - `slug`: "test-category"
   - `description`: "Test description"
4. Click **"Save"**
5. Verify row appears in the table
6. (Optional) Delete the test row after verification

---

## Step 6: Test Database Connection

### 6.1 Start Development Server

1. Make sure `.env.local` is configured with your Supabase credentials
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Wait for server to start (you'll see "Ready" message)
4. Server should be running on `http://localhost:3000`

### 6.2 Test API Route

1. **Open browser** and navigate to:
   ```
   http://localhost:3000/api/test-db
   ```

2. **Expected Success Response:**
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

3. **If you see this response:**
   - ✅ Database connection is working!
   - ✅ Supabase client is configured correctly
   - ✅ Tables are accessible
   - ✅ RLS policies are working (allowing read access)

### 6.3 Test from Browser Console (Optional)

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Run:
   ```javascript
   fetch('/api/test-db')
     .then(r => r.json())
     .then(console.log)
   ```
4. Should see the same success response

### 6.4 Test Error Handling

To verify error handling works:

1. Temporarily break the connection (for testing):
   - Edit `.env.local`
   - Change `NEXT_PUBLIC_SUPABASE_URL` to an invalid URL
   - Restart dev server
   - Visit `/api/test-db`
   - Should see error response with details
   - **Revert the change** after testing

---

## Troubleshooting

### Problem: Environment Variables Not Found

**Symptoms:**
- Error: `NEXT_PUBLIC_SUPABASE_URL is undefined`
- API route returns 500 error
- Build fails with missing environment variables

**Solutions:**
1. ✅ Verify `.env.local` exists in project root
2. ✅ Check file name is exactly `.env.local` (not `.env.local.txt` or similar)
3. ✅ Verify environment variables are spelled correctly:
   - `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_KEY`)
4. ✅ Restart development server after creating/updating `.env.local`
5. ✅ Check `.env.local` is not in `.gitignore` exclusion (should be ignored)

### Problem: Database Connection Failed

**Symptoms:**
- API route returns: `"Database connection failed"`
- Error message mentions authentication or connection

**Solutions:**
1. ✅ Verify Supabase project URL is correct:
   - Format: `https://xxxxx.supabase.co`
   - No trailing slash
   - No typos
2. ✅ Verify API keys are correct:
   - anon key starts with `eyJ...`
   - Keys are complete (very long strings)
   - No extra spaces or line breaks
3. ✅ Check Supabase project is active:
   - Go to Supabase dashboard
   - Verify project status is "Active" (not paused)
   - Free tier projects can be paused after inactivity
4. ✅ Verify network connectivity:
   - Can you access https://supabase.com?
   - Check firewall/proxy settings

### Problem: Migration Errors

**Symptoms:**
- SQL Editor shows error when running migration
- Tables not created
- Error messages in Supabase dashboard

**Common Errors and Solutions:**

**Error: "relation already exists"**
- **Cause**: Migration was partially run before
- **Solution**: 
  - Check which tables already exist
  - Either drop existing tables or skip creating them
  - Or run migration in parts (create missing tables only)

**Error: "permission denied"**
- **Cause**: Insufficient database permissions
- **Solution**: 
  - Verify you're using the correct Supabase project
  - Check you're logged in as project owner
  - Try running migration again

**Error: "syntax error"**
- **Cause**: SQL syntax issue or copy-paste error
- **Solution**:
  - Verify entire SQL was copied correctly
  - Check for missing semicolons
  - Ensure no extra characters were added
  - Try copying SQL again from the file

**Error: "function already exists"**
- **Cause**: `update_updated_at_column()` function was created before
- **Solution**: 
  - This is safe to ignore
  - Or modify migration to use `CREATE OR REPLACE FUNCTION`

### Problem: Tables Not Visible

**Symptoms:**
- Migration ran successfully but tables don't appear in Table Editor

**Solutions:**
1. ✅ Refresh the Supabase dashboard (F5)
2. ✅ Check you're in the correct project
3. ✅ Verify migration actually ran:
   - Go to SQL Editor
   - Check "History" tab for executed queries
4. ✅ Check table names are correct (case-sensitive in PostgreSQL)

### Problem: RLS Policies Not Working

**Symptoms:**
- Can't read from tables via API
- Error: "new row violates row-level security policy"

**Solutions:**
1. ✅ Verify RLS is enabled:
   - Go to Table Editor → Select table → Check RLS status
2. ✅ Verify policies exist:
   - Go to Authentication → Policies
   - Check policies are created for each table
3. ✅ Verify policy conditions:
   - Public tables should have `USING (true)` for SELECT
   - Blog posts should have `USING (status = 'published')`
4. ✅ Test with anon key (not service_role key) for client-side operations

### Problem: TypeScript Errors

**Symptoms:**
- `npx tsc --noEmit` shows type errors
- IDE shows red squiggles

**Solutions:**
1. ✅ Verify `types/database.ts` exists and is correct
2. ✅ Check import paths use `@/*` alias
3. ✅ Restart TypeScript server in IDE
4. ✅ Run `npm run build` to see full error messages

### Problem: Build Fails

**Symptoms:**
- `npm run build` fails
- Errors related to Supabase or environment variables

**Solutions:**
1. ✅ Verify all environment variables are set in `.env.local`
2. ✅ Check TypeScript compilation: `npx tsc --noEmit`
3. ✅ Check ESLint: `npm run lint`
4. ✅ Verify Supabase client files compile correctly
5. ✅ Check for missing dependencies: `npm install`

---

## Next Steps

After successfully completing this setup:

### ✅ Story 1.2 Complete

- Database schema is ready
- Supabase clients are configured
- TypeScript types are available
- Connection testing is working

### 🚀 Continue to Story 1.3

The next story will set up:
- Supabase Authentication
- Admin login functionality
- Protected admin routes
- Session management

### 📝 Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Next.js + Supabase Guide**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Row Level Security Guide**: https://supabase.com/docs/guides/auth/row-level-security

### 🔍 Verify Everything Works

Before moving to Story 1.3, verify:

- ✅ All 6 tables exist and have correct structure
- ✅ RLS policies are enabled and working
- ✅ Database connection test passes (`/api/test-db`)
- ✅ TypeScript types compile without errors
- ✅ Build succeeds (`npm run build`)

---

## Quick Reference

### Environment Variables Checklist

```env
✅ NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
✅ SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Migration Files Checklist

```bash
✅ supabase/migrations/001_initial_schema.sql (run first)
✅ supabase/migrations/002_rls_policies.sql (run second)
```

### Tables Checklist

```
✅ categories
✅ tools
✅ affiliate_links
✅ news_articles
✅ blog_posts
✅ scraping_jobs
```

### Test Checklist

```
✅ /api/test-db returns success
✅ Tables visible in Supabase Table Editor
✅ RLS policies enabled
✅ TypeScript compiles
✅ Build succeeds
```

---

**Need Help?** If you encounter issues not covered in this guide, check:
1. Supabase documentation
2. Story 1.2 context file: `docs/sprint-artifacts/1-2-supabase-project-setup-database-schema.context.xml`
3. Architecture document: `docs/architecture.md`
