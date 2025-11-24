# Add Sample Data to Database

**Purpose:** Add sample categories and tools to test Story 2.1 (Tool Listing Page)

---

## 📋 Quick Guide

### Step 1: Open Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar

### Step 2: Execute SQL Migration

1. Open the file: `supabase/migrations/003_sample_data.sql`
2. **Copy all contents** of the file
3. **Paste** into Supabase SQL Editor
4. Click **"Run"** button (or press Cmd+Enter / Ctrl+Enter)

### Step 3: Verify Data

After execution, you should see:
- ✅ 6 categories added
- ✅ 30 tools added

You can verify by running:
```sql
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM tools WHERE status = 'active';
```

---

## 📊 Sample Data Overview

### Categories (6)
- Text Generation
- Image Generation
- Code Assistant
- Video Generation
- Audio Generation
- Productivity

### Tools (30)
**Text Generation (5 tools):**
- ChatGPT
- Claude
- Jasper AI
- Copy.ai
- Grammarly

**Image Generation (5 tools):**
- Midjourney
- DALL-E
- Stable Diffusion
- Runway ML
- Leonardo.ai

**Code Assistant (5 tools):**
- GitHub Copilot
- Cursor
- Replit
- Tabnine
- Codeium

**Video Generation (5 tools):**
- Synthesia
- Pictory
- Luma AI
- InVideo AI
- Runway Gen-2

**Audio Generation (5 tools):**
- ElevenLabs
- Mubert
- Suno AI
- Uberduck
- AIVA

**Productivity (5 tools):**
- Notion AI
- Mem
- Otter.ai
- Fireflies.ai
- Jasper Chat

---

## ✅ After Adding Data

1. **Refresh browser** at `http://localhost:3000/tools`
2. **Expected Result:**
   - ✅ Tool cards displayed in grid
   - ✅ 30 tools visible (24 on page 1, 6 on page 2)
   - ✅ Pagination controls visible
   - ✅ Tool cards show: name, logo, description, pricing badge

3. **Test Pagination:**
   - Click "Next" button
   - Should navigate to page 2
   - URL should update to `/tools?page=2`

---

## 🔧 Alternative: Using Script

Run the helper script:
```bash
./scripts/add-sample-data.sh
```

This will show instructions and preview the data to be added.

---

## 📝 Notes

- All tools have `status = 'active'` so they will appear in listings
- Tools include realistic data: names, descriptions, website URLs, pricing models
- Features are stored as JSONB arrays
- Slugs are URL-friendly (e.g., 'chatgpt', 'midjourney')

---

**Last Updated:** 2025-01-27

