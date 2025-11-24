# Vercel Environment Variables Setup - Hướng Dẫn Chi Tiết

Hướng dẫn từng bước để add environment variables vào Vercel dashboard.

---

## 📍 Bước 1: Navigate đến Environment Variables

### 1.1 Vào Project Settings

1. **Trong Vercel dashboard**, chọn project **`ai-tools-finder`**
2. **Click tab "Settings"** (trong top navigation bar)
3. **Click "Environment Variables"** (trong left sidebar menu)

**Hoặc truy cập trực tiếp:**
- URL sẽ có dạng: `https://vercel.com/YOUR_TEAM/ai-tools-finder/settings/environment-variables`

---

## 🔐 Bước 2: Add Environment Variables

Bạn cần add **3 variables bắt buộc** cho Supabase. Thêm từng variable một:

### Variable 1: NEXT_PUBLIC_SUPABASE_URL

1. **Trong Environment Variables page**, bạn sẽ thấy form:
   - **Key:** (input field)
   - **Value:** (input field)
   - **Environment:** (checkboxes)

2. **Điền thông tin:**
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Paste Supabase Project URL của bạn
     - Format: `https://xxxxx.supabase.co`
     - Ví dụ: `https://soedtclhiwocwwtneska.supabase.co`
     - Lấy từ: Supabase Dashboard → Settings → API → Project URL

3. **Chọn Environments:**
   - ✅ **Development**
   - ✅ **Preview**
   - ✅ **Production**

4. **Click "Save"** button

**✅ Verify:** Variable sẽ xuất hiện trong danh sách

---

### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

1. **Click "Add New"** hoặc scroll xuống form mới

2. **Điền thông tin:**
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Paste Supabase anon/public key
     - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (rất dài)
     - Lấy từ: Supabase Dashboard → Settings → API → anon/public key
     - ⚠️ **Copy toàn bộ key** (có thể rất dài)

3. **Chọn Environments:**
   - ✅ **Development**
   - ✅ **Preview**
   - ✅ **Production**

4. **Click "Save"**

**✅ Verify:** Variable sẽ xuất hiện trong danh sách

---

### Variable 3: SUPABASE_SERVICE_ROLE_KEY

1. **Click "Add New"** hoặc scroll xuống form mới

2. **Điền thông tin:**
   - **Key:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** Paste Supabase service_role key
     - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (rất dài)
     - Lấy từ: Supabase Dashboard → Settings → API → service_role key
     - ⚠️ **Click "Reveal"** nếu key bị ẩn
     - 🔒 **GIỮ BÍ MẬT** - Không share key này!

3. **Chọn Environments:**
   - ✅ **Development**
   - ✅ **Preview**
   - ✅ **Production**

4. **Click "Save"**

**✅ Verify:** Variable sẽ xuất hiện trong danh sách

---

## 📋 Checklist Environment Variables

Sau khi add xong, bạn sẽ có **3 variables** trong danh sách:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` (Development, Preview, Production)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Development, Preview, Production)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (Development, Preview, Production)

---

## 🔍 Bước 3: Verify Variables

### 3.1 Kiểm tra danh sách

Trong Environment Variables page, bạn sẽ thấy:
- ✅ Tất cả 3 variables đã được add
- ✅ Mỗi variable có đúng 3 environments (Development, Preview, Production)
- ✅ Values không bị expose (hiển thị dạng `••••••••`)

### 3.2 Lưu ý quan trọng

- ⚠️ **Variables bắt đầu với `NEXT_PUBLIC_`** sẽ được expose trong client-side code
- 🔒 **Variables không có `NEXT_PUBLIC_`** chỉ available trong server-side (API routes, server components)
- ✅ **Sau khi add variables mới**, cần **redeploy** để variables có hiệu lực

---

## 🚀 Bước 4: Redeploy với Environment Variables

### 4.1 Trigger New Deployment

1. **Vào tab "Deployments"** trong Vercel dashboard
2. **Tìm deployment mới nhất** (có thể failed vì chưa có env vars)
3. **Click "..."** (three dots) → **"Redeploy"**
   - Hoặc click **"Redeploy"** button ở top

### 4.2 Verify Build

1. **Đợi build process** hoàn thành (2-5 phút)
2. **Check build logs:**
   - Click vào deployment
   - Click "Build Logs" tab
   - Verify không có errors về environment variables
   - ✅ Build status: **Ready**

---

## ✅ Bước 5: Test Application

### 5.1 Mở Production URL

1. **Trong deployment**, click **"Visit"** button
2. **Hoặc** copy URL từ deployment page
   - Format: `https://ai-tools-finder.vercel.app`

### 5.2 Test các chức năng

**Homepage:**
- ✅ Page loads successfully
- ✅ Components render correctly
- ✅ No console errors (F12 → Console)

**Login Page:**
- ✅ Navigate to `/login`
- ✅ Form displays correctly
- ✅ Can submit form (test với credentials thật)

**Admin Routes:**
- ✅ Navigate to `/admin` (without login)
- ✅ Should redirect to `/login`
- ✅ After login, can access `/admin`

**Environment Variables:**
- ✅ Check browser console (F12)
- ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` is loaded
- ✅ No errors about missing variables

---

## 🔍 Troubleshooting

### Build Fails với "Environment Variable Not Found"

**Nguyên nhân:** Environment variables chưa được add hoặc sai tên

**Giải pháp:**
1. Verify tất cả 3 variables đã được add trong Vercel
2. Check tên variable chính xác (case-sensitive):
   - `NEXT_PUBLIC_SUPABASE_URL` (không phải `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (không phải `ANON_KEY`)
   - `SUPABASE_SERVICE_ROLE_KEY` (không phải `SERVICE_ROLE_KEY`)
3. Verify environment được chọn đúng (Development/Preview/Production)
4. Redeploy sau khi add variables

### Application Can't Connect to Supabase

**Nguyên nhân:** Environment variables không đúng hoặc Supabase project inactive

**Giải pháp:**
1. Verify Supabase URL và keys đúng:
   - Check trong Supabase Dashboard → Settings → API
   - Copy lại values và paste vào Vercel
2. Check Supabase project status (active?)
3. Verify RLS policies allow access
4. Check browser console for specific errors

### Variables Not Loading After Redeploy

**Giải pháp:**
- Variables mới chỉ có hiệu lực sau khi redeploy
- Đảm bảo đã redeploy sau khi add variables
- Check deployment logs để verify variables được load

---

## 📝 Optional Variables (Có thể thêm sau)

Nếu cần cho các epics sau:

**OPENAI_API_KEY** (cho Epic 7 - AI Blog):
- Key: `OPENAI_API_KEY`
- Value: OpenAI API key
- Environment: Production (hoặc tất cả)

**NEXT_PUBLIC_APP_URL** (cho production):
- Key: `NEXT_PUBLIC_APP_URL`
- Value: `https://ai-tools-finder.vercel.app` (hoặc custom domain)
- Environment: Production

**CRON_SECRET** (cho cron jobs):
- Key: `CRON_SECRET`
- Value: Random string (generate: `openssl rand -base64 32`)
- Environment: Production

---

## ✅ Completion Checklist

- [ ] Navigate đến Environment Variables page
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` (all environments)
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` (all environments)
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` (all environments)
- [ ] Verify tất cả 3 variables trong danh sách
- [ ] Redeploy application
- [ ] Verify build thành công
- [ ] Test application hoạt động
- [ ] Verify Supabase connection working

---

**Sau khi hoàn thành Step 4, tiếp tục với:** `docs/VERCEL_SETUP_GUIDE.md` Step 5 (Verify Deployment)!

