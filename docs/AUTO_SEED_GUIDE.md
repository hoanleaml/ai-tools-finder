# Auto Seed Database - Hướng Dẫn Tự Động

**Mục đích:** Tự động insert sample data vào Supabase database mà không cần manual SQL.

---

## 🚀 Cách Sử Dụng

### Bước 1: Cấu Hình Service Role Key

1. **Mở Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Chọn project của bạn

2. **Lấy Service Role Key:**
   - Vào **Settings** → **API**
   - Tìm **"service_role"** key (có label "secret")
   - Click **"Reveal"** để hiển thị key
   - **Copy** toàn bộ key (thường dài 100+ ký tự)

3. **Cập Nhật .env.local:**
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (paste key của bạn vào đây)
   ```
   
   ⚠️ **Lưu ý:**
   - Không có khoảng trắng sau dấu `=`
   - Không có dấu ngoặc kép `"` hoặc `'`
   - Key phải dài ít nhất 50 ký tự

### Bước 2: Chạy Script Tự Động

```bash
./scripts/auto-seed.sh
```

Script sẽ:
- ✅ Tự động load env variables từ `.env.local`
- ✅ Kết nối trực tiếp với Supabase (không cần dev server)
- ✅ Insert 6 categories và 30 tools
- ✅ Hiển thị kết quả và số lượng data đã insert

---

## ✅ Verify Kết Quả

Sau khi chạy script thành công:

1. **Check Browser:**
   ```
   http://localhost:3000/tools
   ```
   - Nên thấy 24 tool cards (page 1)
   - Pagination hiển thị "Next" button

2. **Check Database:**
   - Supabase Dashboard → Table Editor
   - `categories`: 6 rows
   - `tools`: 30 rows (status = 'active')

3. **Run Verify Script:**
   ```bash
   ./scripts/verify-data.sh
   ```

---

## 🔧 Troubleshooting

### Lỗi: "SUPABASE_SERVICE_ROLE_KEY appears to be a placeholder"

**Nguyên nhân:** Service role key chưa được cập nhật hoặc vẫn là placeholder.

**Giải pháp:**
1. Kiểm tra `.env.local`:
   ```bash
   grep SUPABASE_SERVICE_ROLE_KEY .env.local
   ```

2. Đảm bảo key:
   - Không phải `your_supabase_service_role_key`
   - Dài ít nhất 50 ký tự
   - Không có khoảng trắng thừa

3. Lấy lại key từ Supabase Dashboard nếu cần

### Lỗi: "Missing Supabase environment variables"

**Nguyên nhân:** `.env.local` thiếu biến môi trường.

**Giải pháp:**
1. Kiểm tra `.env.local` có đầy đủ:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. Chạy check script:
   ```bash
   ./scripts/check-env.sh
   ```

### Lỗi: "Invalid API key"

**Nguyên nhân:** Service role key không đúng hoặc đã bị thay đổi.

**Giải pháp:**
1. Lấy lại service role key từ Supabase Dashboard
2. Cập nhật lại `.env.local`
3. Chạy lại script

### Lỗi: "new row violates row-level security policy"

**Nguyên nhân:** Service role key không bypass được RLS (hiếm khi xảy ra).

**Giải pháp:**
- Đảm bảo đang dùng **service_role** key (không phải anon key)
- Service role key tự động bypass RLS

---

## 📋 Alternative Methods

### Method 1: SQL Migration (Manual)

Nếu script tự động không hoạt động:

1. Copy SQL từ: `supabase/migrations/003_sample_data.sql`
2. Paste vào Supabase Dashboard → SQL Editor
3. Run

### Method 2: API Endpoint (Requires Dev Server)

Nếu dev server đang chạy:

```bash
# Restart dev server để load env variables mới
npm run dev

# Trong terminal khác
./scripts/seed-database.sh
```

---

## 🔒 Security Notes

- ⚠️ **Service Role Key** có full database access
- ⚠️ **Never commit** `.env.local` vào Git
- ⚠️ **Never expose** service role key trong client-side code
- ✅ Chỉ dùng trong server-side scripts và API routes

---

**Last Updated:** 2025-01-27

