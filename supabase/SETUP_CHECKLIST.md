# Supabase Setup Checklist

Check off each item as you complete it. This helps track your progress.

---

## ✅ STEP 1: Tạo Supabase Project

- [ ] Đã mở https://supabase.com/dashboard
- [ ] Đã đăng nhập (hoặc tạo tài khoản)
- [ ] Đã click "New Project"
- [ ] Đã điền form:
  - [ ] Project Name: `AI Tools Finder`
  - [ ] Database Password: (đã lưu ở nơi an toàn)
  - [ ] Region: (đã chọn)
  - [ ] Plan: Free
- [ ] Đã click "Create new project"
- [ ] Đã đợi provisioning hoàn thành (1-2 phút)
- [ ] Đã thấy project dashboard với left sidebar menu

**✅ Step 1 Complete khi:** Project dashboard hiển thị, không có errors

---

## ✅ STEP 2: Lấy API Keys

- [ ] Đã click Settings (⚙️) trong left sidebar
- [ ] Đã click "API" trong settings menu
- [ ] Đã copy **Project URL**:
  - [ ] Format: `https://xxxxx.supabase.co`
  - [ ] Đã lưu tạm: `___________________________`
- [ ] Đã copy **anon/public key**:
  - [ ] Đã click "Reveal" nếu bị ẩn
  - [ ] Key bắt đầu với `eyJ...`
  - [ ] Đã lưu tạm: `___________________________`
- [ ] Đã copy **service_role key**:
  - [ ] Đã click "Reveal" nếu bị ẩn
  - [ ] Key bắt đầu với `eyJ...`
  - [ ] Đã lưu tạm: `___________________________`

**✅ Step 2 Complete khi:** Đã copy đủ 3 values (URL, anon key, service_role key)

---

## ✅ STEP 3: Cấu hình Environment Variables

- [ ] Đã tạo `.env.local` từ `.env.example`:
  ```bash
  cp .env.example .env.local
  ```
- [ ] Đã mở `.env.local` trong code editor
- [ ] Đã thay `your_supabase_project_url` bằng Project URL
- [ ] Đã thay `your_supabase_anon_key` bằng anon key
- [ ] Đã thay `your_supabase_service_role_key` bằng service_role key
- [ ] Đã verify:
  - [ ] Không có khoảng trắng thừa sau `=`
  - [ ] URLs không có trailing slash
  - [ ] Keys là complete (rất dài)
  - [ ] Không có quotes xung quanh values
- [ ] Đã save file
- [ ] Đã verify `.gitignore` có `.env*` (để không commit keys)

**✅ Step 3 Complete khi:** `.env.local` có đúng 3 values, file đã save

---

## ✅ STEP 4: Chạy Database Migrations

### Migration 1: Initial Schema

- [ ] Đã mở Supabase SQL Editor (left sidebar)
- [ ] Đã mở file `supabase/migrations/001_initial_schema.sql`
- [ ] Đã copy toàn bộ SQL content
- [ ] Đã paste vào SQL Editor
- [ ] Đã review SQL (đảm bảo complete)
- [ ] Đã click "Run"
- [ ] Đã thấy success message: "Success. No rows returned"
- [ ] Đã verify trong Table Editor: thấy 6 tables

### Migration 2: RLS Policies

- [ ] Đã clear SQL cũ trong SQL Editor
- [ ] Đã mở file `supabase/migrations/002_rls_policies.sql`
- [ ] Đã copy toàn bộ SQL content
- [ ] Đã paste vào SQL Editor
- [ ] Đã review SQL
- [ ] Đã click "Run"
- [ ] Đã thấy success message

**✅ Step 4 Complete khi:** Cả 2 migrations chạy thành công, không có errors

---

## ✅ STEP 5: Verify Setup

### Verify Tables

- [ ] Đã mở Table Editor
- [ ] Đã verify table `categories`:
  - [ ] Có đúng columns (id, name, slug, description, created_at, updated_at)
  - [ ] Có index `idx_categories_slug`
- [ ] Đã verify table `tools`:
  - [ ] Có đúng columns
  - [ ] Có foreign key đến `categories`
  - [ ] Có indexes
- [ ] Đã verify table `affiliate_links`:
  - [ ] Có đúng columns
  - [ ] Có foreign key đến `tools`
- [ ] Đã verify table `news_articles`:
  - [ ] Có đúng columns
  - [ ] Có indexes
- [ ] Đã verify table `blog_posts`:
  - [ ] Có đúng columns
  - [ ] Slug is unique
- [ ] Đã verify table `scraping_jobs`:
  - [ ] Có đúng columns
  - [ ] Có indexes

### Verify RLS

- [ ] Đã verify RLS enabled trên `categories`
- [ ] Đã verify RLS enabled trên `tools`
- [ ] Đã verify RLS enabled trên `affiliate_links`
- [ ] Đã verify RLS enabled trên `news_articles`
- [ ] Đã verify RLS enabled trên `blog_posts`
- [ ] Đã verify RLS enabled trên `scraping_jobs`

**✅ Step 5 Complete khi:** Tất cả tables có đúng structure, RLS enabled

---

## ✅ STEP 6: Test Database Connection

- [ ] Đã start dev server:
  ```bash
  npm run dev
  ```
- [ ] Server đã start thành công (Ready on http://localhost:3000)
- [ ] Đã mở browser: http://localhost:3000/api/test-db
- [ ] Đã thấy JSON response:
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
- [ ] Đã check browser console: không có errors
- [ ] Đã check terminal logs: không có errors

**✅ Step 6 Complete khi:** API route returns success, không có errors

---

## 🎉 Setup Complete!

**Tất cả 6 steps đã hoàn thành:**
- ✅ Step 1: Supabase project created
- ✅ Step 2: API keys copied
- ✅ Step 3: Environment variables configured
- ✅ Step 4: Migrations run
- ✅ Step 5: Tables and RLS verified
- ✅ Step 6: Connection tested

**Next Steps:**
- Continue với Story 1.3: Supabase Authentication Setup
- Hoặc start inserting test data
- Hoặc continue development

---

## 📝 Notes

- **Date Started:** _______________
- **Date Completed:** _______________
- **Project URL:** _______________
- **Issues Encountered:** _______________
- **Solutions:** _______________
