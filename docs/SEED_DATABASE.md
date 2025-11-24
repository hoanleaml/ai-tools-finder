# Seed Database with Sample Data

**Purpose:** Automatically insert sample categories and tools into the database for testing Story 2.1.

---

## 🚀 Quick Start

### Step 1: Configure Service Role Key

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Find **service_role key** (secret) - click "Reveal" if needed
5. Copy the key

### Step 2: Update Environment Variable

Open `.env.local` and update:
```bash
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

**⚠️ Important:** 
- Never commit `.env.local` to Git
- Service role key bypasses RLS - keep it secret!

### Step 3: Run Seed Script

```bash
./scripts/seed-database.sh
```

Or manually call the API:
```bash
curl -X POST http://localhost:3000/api/admin/seed-data
```

---

## 📊 What Gets Inserted

### Categories (6)
- Text Generation
- Image Generation
- Code Assistant
- Video Generation
- Audio Generation
- Productivity

### Tools (30)
- **Text Generation (5):** ChatGPT, Claude, Jasper AI, Copy.ai, Grammarly
- **Image Generation (5):** Midjourney, DALL-E, Stable Diffusion, Runway ML, Leonardo.ai
- **Code Assistant (5):** GitHub Copilot, Cursor, Replit, Tabnine, Codeium
- **Video Generation (5):** Synthesia, Pictory, Luma AI, InVideo AI, Runway Gen-2
- **Audio Generation (5):** ElevenLabs, Mubert, Suno AI, Uberduck, AIVA
- **Productivity (5):** Notion AI, Mem, Otter.ai, Fireflies.ai, Jasper Chat

---

## ✅ Verification

After seeding, verify:

1. **Check API Response:**
   ```bash
   curl -X POST http://localhost:3000/api/admin/seed-data | jq
   ```

2. **Check Browser:**
   - Open: http://localhost:3000/tools
   - Should see 24 tool cards (page 1)
   - Pagination should show "Next" button

3. **Check Database:**
   - Supabase Dashboard → Table Editor
   - `categories` table: 6 rows
   - `tools` table: 30 rows (all with `status = 'active'`)

---

## 🔧 Troubleshooting

### Error: "Service role key not configured"
- **Solution:** Update `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
- Make sure to restart dev server after updating

### Error: "Invalid API key"
- **Solution:** Double-check the service role key is correct
- Make sure there are no extra spaces or quotes

### Error: "new row violates row-level security policy"
- **Solution:** This shouldn't happen with service role key
- If it does, check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### No data inserted
- Check server logs for errors
- Verify Supabase connection is working
- Check that tables exist and have correct schema

---

## 📝 Alternative: Manual SQL Execution

If the API method doesn't work, you can manually execute SQL:

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of: `supabase/migrations/003_sample_data.sql`
3. Paste and Run

Or use the helper script:
```bash
./scripts/copy-sample-data-sql.sh
# Then paste in Supabase SQL Editor
```

---

## 🔒 Security Notes

- **Service Role Key:** Has full database access, bypasses RLS
- **Never expose:** Don't commit to Git, don't use in client-side code
- **Use only:** Server-side API routes for admin operations
- **Production:** Consider using authenticated admin users instead

---

**Last Updated:** 2025-01-27

