# Supabase Setup - Step by Step Guide

Hướng dẫn chi tiết từng bước để setup Supabase project cho AI Tools Finder.

---

## 📋 Tổng quan các bước

1. ✅ **Step 1**: Tạo Supabase project
2. ✅ **Step 2**: Lấy API keys
3. ✅ **Step 3**: Cấu hình environment variables
4. ✅ **Step 4**: Chạy database migrations
5. ✅ **Step 5**: Verify tables và RLS
6. ✅ **Step 6**: Test database connection

---

## 🚀 STEP 1: Tạo Supabase Project

### 1.1 Mở Supabase Dashboard

1. **Mở browser** và đi đến: https://supabase.com/dashboard
2. Nếu chưa có tài khoản:
   - Click **"Sign In"** (góc trên bên phải)
   - Chọn phương thức đăng nhập: GitHub, Google, hoặc Email
   - Tạo tài khoản nếu cần

### 1.2 Tạo Project Mới

1. **Sau khi đăng nhập**, bạn sẽ thấy dashboard
2. **Tìm và click** nút **"New Project"** (thường là nút xanh lá, góc trên bên phải hoặc giữa màn hình)

### 1.3 Điền Form Tạo Project

Bạn sẽ thấy form với các trường sau:

**a) Organization:**
- Nếu đã có organization: chọn organization hiện có
- Nếu chưa có: Supabase sẽ tự động tạo organization mới

**b) Project Name:**
- **Nhập**: `AI Tools Finder`
- Hoặc tên bạn muốn (ví dụ: `ai-tools-finder`)

**c) Database Password:**
- **⚠️ QUAN TRỌNG**: Chọn mật khẩu mạnh (ít nhất 12 ký tự)
- **Lưu mật khẩu này** ở nơi an toàn (password manager)
- Bạn sẽ cần mật khẩu này để:
  - Kết nối database trực tiếp
  - Reset password sau này
- **Gợi ý**: Sử dụng password generator

**d) Region:**
- **Chọn region** gần nhất với bạn hoặc users của bạn
- **Ví dụ cho Vietnam**: `Southeast Asia (Singapore)`
- **Ví dụ cho US**: `US East (North Virginia)`
- **Lưu ý**: Region không thể thay đổi sau khi tạo project

**e) Pricing Plan:**
- **Chọn**: `Free` plan (đủ cho development và MVP)
- Free plan bao gồm:
  - 500 MB database
  - 1 GB file storage
  - 2 GB bandwidth
  - Unlimited API requests

### 1.4 Submit và Đợi Provisioning

1. **Review** lại thông tin đã điền
2. **Click** nút **"Create new project"** (hoặc "Create project")
3. **Đợi provisioning** (thường 1-2 phút):
   - Bạn sẽ thấy progress indicator
   - **KHÔNG đóng browser tab** trong lúc này
   - Supabase đang:
     - Tạo PostgreSQL database
     - Setup authentication
     - Configure storage
     - Generate API keys

### 1.5 Verify Project Created

Sau khi provisioning xong, bạn sẽ được redirect đến project dashboard. Bạn sẽ thấy:

**Left Sidebar có các menu:**
- 📊 **Table Editor** - Quản lý database tables
- 🔍 **SQL Editor** - Chạy SQL queries
- 🔐 **Authentication** - Quản lý users
- ⚙️ **Settings** - Cấu hình project
- 📁 **Storage** - File storage
- 📈 **Logs** - System logs

**✅ Bước 1 hoàn thành khi:**
- Project dashboard hiển thị
- Left sidebar có đầy đủ menu items
- Không có error messages

---

## 🔑 STEP 2: Lấy API Keys

### 2.1 Navigate đến API Settings

1. **Trong project dashboard**, nhìn vào **left sidebar** (bên trái)
2. **Scroll xuống** và tìm icon **⚙️ Settings** (thường ở dưới cùng)
3. **Click** vào **Settings**
4. **Trong Settings menu**, click **"API"**

### 2.2 Tìm Project URL

1. **Ở đầu trang API settings**, bạn sẽ thấy section **"Project URL"**
2. **Copy URL** này:
   - Format: `https://xxxxx.supabase.co`
   - Ví dụ: `https://abcdefghijklmnop.supabase.co`
   - **Cách copy**: Click vào icon copy (📋) hoặc select và copy (Ctrl+C / Cmd+C)
3. **Lưu tạm** URL này (sẽ dùng ở Step 3)

### 2.3 Tìm và Copy anon/public Key

1. **Scroll xuống** đến section **"Project API keys"**
2. **Tìm key có label** là **"anon"** hoặc **"public"**
   - Đây là key dùng cho client-side operations
   - An toàn để expose trong browser code
3. **Nếu key bị ẩn** (hiển thị `••••••••`):
   - Click nút **"Reveal"** hoặc icon 👁️
   - Key sẽ hiển thị đầy đủ
4. **Copy key** này:
   - Key rất dài, bắt đầu với `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Click icon copy hoặc select all và copy
5. **Lưu tạm** key này

### 2.4 Tìm và Copy service_role Key

1. **Trong cùng section "Project API keys"**
2. **Tìm key có label** là **"service_role"**
   - ⚠️ **QUAN TRỌNG**: Key này có quyền admin
   - **KHÔNG BAO GIỜ** expose trong client-side code
   - Chỉ dùng trong server-side operations
3. **Click "Reveal"** để hiển thị key
4. **Copy key** này (cũng rất dài)
5. **Lưu tạm** key này

### 2.5 Verify Đã Copy Đủ 3 Values

Trước khi tiếp tục, đảm bảo bạn đã có:

- ✅ **Project URL**: `https://xxxxx.supabase.co`
- ✅ **anon/public key**: `eyJ...` (rất dài)
- ✅ **service_role key**: `eyJ...` (rất dài)

**✅ Bước 2 hoàn thành khi:**
- Đã copy đủ 3 values
- Keys được lưu ở nơi an toàn (tạm thời)

---

## ⚙️ STEP 3: Cấu hình Environment Variables

### 3.1 Tạo .env.local File

**Cách 1: Dùng Terminal (Khuyến nghị)**

1. **Mở terminal** trong project root directory
2. **Chạy lệnh**:
   ```bash
   cp .env.example .env.local
   ```
3. **Verify file đã tạo**:
   ```bash
   ls -la .env.local
   ```
   Bạn sẽ thấy file `.env.local` trong danh sách

**Cách 2: Dùng File Explorer**

1. **Mở File Explorer/Finder**
2. **Navigate** đến project root directory
3. **Tìm file** `.env.example`
4. **Copy** file này
5. **Rename** copy thành `.env.local`

### 3.2 Mở .env.local trong Code Editor

1. **Mở code editor** (VS Code, Cursor, etc.)
2. **Open file** `.env.local` từ project root
3. **Bạn sẽ thấy** nội dung như sau:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard:
# https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service Role Key (for admin operations, server-side only)
# DO NOT expose this in client-side code
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI API Key (for future Epic 7 - AI Blog generation)
OPENAI_API_KEY=your_openai_api_key
```

### 3.3 Thay Thế Placeholder Values

**Thay thế từng giá trị:**

1. **Thay `your_supabase_project_url`:**
   - Tìm dòng: `NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url`
   - Thay `your_supabase_project_url` bằng Project URL bạn đã copy
   - Ví dụ: `NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co`

2. **Thay `your_supabase_anon_key`:**
   - Tìm dòng: `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`
   - Thay `your_supabase_anon_key` bằng anon key bạn đã copy
   - Ví dụ: `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Thay `your_supabase_service_role_key`:**
   - Tìm dòng: `SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key`
   - Thay `your_supabase_service_role_key` bằng service_role key bạn đã copy
   - Ví dụ: `SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. **OPENAI_API_KEY** (tùy chọn):
   - Có thể để nguyên `your_openai_api_key` nếu chưa có
   - Sẽ cần ở Epic 7 (AI Blog generation)

### 3.4 Verify .env.local File

**File cuối cùng sẽ trông như thế này:**

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard:
# https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

# OpenAI API Key (for future Epic 7 - AI Blog generation)
OPENAI_API_KEY=your_openai_api_key
```

**✅ Checklist:**
- ✅ Không có khoảng trắng thừa sau dấu `=`
- ✅ URLs không có trailing slash (`/`)
- ✅ Keys là complete (rất dài, không bị cắt)
- ✅ Không có quotes (`"`) xung quanh values
- ✅ File được save

### 3.5 Verify .gitignore

1. **Mở file** `.gitignore` trong project root
2. **Verify** có dòng:
   ```
   .env*
   ```
   hoặc
   ```
   .env*.local
   ```
3. **Nếu không có**, thêm vào (nhưng nên đã có từ Story 1.1)

### 3.6 Restart Development Server

**Nếu dev server đang chạy:**

1. **Stop server**: Press `Ctrl+C` trong terminal
2. **Start lại**:
   ```bash
   npm run dev
   ```
3. **Environment variables** sẽ được load từ `.env.local`

**✅ Bước 3 hoàn thành khi:**
- `.env.local` file tồn tại với đúng values
- File đã được save
- Dev server đã restart (nếu đang chạy)

---

## 🗄️ STEP 4: Chạy Database Migrations

### 4.1 Mở SQL Editor trong Supabase

1. **Trong Supabase dashboard**, nhìn vào **left sidebar**
2. **Click** vào **"SQL Editor"** (icon database 📊)
3. **Bạn sẽ thấy** SQL Editor interface:
   - Text area lớn để nhập SQL
   - Nút "Run" ở dưới
   - Có thể có query history ở bên

### 4.2 Chạy Migration 1: Initial Schema

1. **Mở file** `supabase/migrations/001_initial_schema.sql` trong code editor của bạn
   - Path: `supabase/migrations/001_initial_schema.sql`
2. **Select All** (Ctrl+A / Cmd+A)
3. **Copy** (Ctrl+C / Cmd+C)
   - File này khoảng 135+ dòng SQL
   - Bao gồm: CREATE TABLE statements, indexes, triggers
4. **Quay lại** Supabase SQL Editor
5. **Paste** SQL vào text area (Ctrl+V / Cmd+V)
6. **Review SQL** một lần nữa:
   - Đảm bảo tất cả SQL đã được paste
   - Không có lỗi copy-paste
7. **Click nút "Run"** (thường ở góc dưới bên phải)
   - Hoặc press `Ctrl+Enter` / `Cmd+Enter`
8. **Đợi execution** (thường 1-5 giây)
9. **Verify success**:
   - Bạn sẽ thấy message: "Success. No rows returned"
   - Hoặc "Success" với số rows affected
   - **Nếu có error**: Xem phần Troubleshooting

### 4.3 Verify Migration 1 Đã Chạy

1. **Trong Supabase dashboard**, click **"Table Editor"** (left sidebar)
2. **Bạn sẽ thấy** các tables đã được tạo:
   - `categories`
   - `tools`
   - `affiliate_links`
   - `news_articles`
   - `blog_posts`
   - `scraping_jobs`
3. **Click vào một table** (ví dụ: `categories`) để xem structure
4. **Verify columns** đúng như mong đợi

### 4.4 Chạy Migration 2: RLS Policies

1. **Quay lại SQL Editor**
   - **Clear** SQL cũ (select all và delete, hoặc click "New query")
2. **Mở file** `supabase/migrations/002_rls_policies.sql` trong code editor
3. **Select All và Copy** SQL content
4. **Paste** vào SQL Editor (đã clear SQL cũ)
5. **Review SQL**:
   - Should contain `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
   - Should contain `CREATE POLICY` statements
6. **Click "Run"**
7. **Verify success**:
   - Message: "Success. No rows returned"
   - Hoặc success message tương tự

### 4.5 Verify RLS Policies

1. **Trong Table Editor**, click vào một table (ví dụ: `categories`)
2. **Tìm indicator** "Row Level Security" hoặc "RLS"
3. **Verify** RLS is enabled (should show "Enabled" hoặc icon 🔒)
4. **Repeat** cho các tables khác

**✅ Bước 4 hoàn thành khi:**
- Migration 1 chạy thành công
- Migration 2 chạy thành công
- Tất cả 6 tables visible trong Table Editor
- RLS enabled trên tất cả tables

---

## ✅ STEP 5: Verify Setup

### 5.1 Verify Tables Structure

**Trong Table Editor**, verify từng table:

#### Categories Table
1. **Click** vào table `categories`
2. **Verify columns**:
   - `id` (UUID, Primary Key)
   - `name` (VARCHAR)
   - `slug` (VARCHAR, Unique)
   - `description` (TEXT)
   - `created_at` (TIMESTAMPTZ)
   - `updated_at` (TIMESTAMPTZ)
3. **Verify index**: `idx_categories_slug` exists

#### Tools Table
1. **Click** vào table `tools`
2. **Verify columns**: id, name, description, website_url, logo_url, category_id, pricing_model, features, slug, status, created_at, updated_at
3. **Verify foreign key**: `category_id` references `categories(id)`
4. **Verify indexes**: idx_tools_category, idx_tools_status, idx_tools_slug, idx_tools_name

#### Affiliate Links Table
1. **Click** vào table `affiliate_links`
2. **Verify columns**: id, tool_id, affiliate_url, program_name, commission_rate, status, created_at, updated_at
3. **Verify foreign key**: `tool_id` references `tools(id)`
4. **Verify indexes**: idx_affiliate_links_tool, idx_affiliate_links_status

#### News Articles Table
1. **Click** vào table `news_articles`
2. **Verify columns**: id, title, summary, content, source_url, source_name, image_url, published_at, created_at
3. **Verify indexes**: idx_news_published, idx_news_source

#### Blog Posts Table
1. **Click** vào table `blog_posts`
2. **Verify columns**: id, title, slug, content, excerpt, author_id, status, published_at, created_at, updated_at
3. **Verify unique constraint**: `slug` is unique
4. **Verify indexes**: idx_blog_slug, idx_blog_status, idx_blog_published

#### Scraping Jobs Table
1. **Click** vào table `scraping_jobs`
2. **Verify columns**: id, source_url, status, error_message, tools_found, created_at, completed_at
3. **Verify indexes**: idx_scraping_jobs_status, idx_scraping_jobs_created

### 5.2 Test Insert Data (Optional)

**Test với Categories table:**

1. **Trong Table Editor**, chọn table `categories`
2. **Click** nút **"Insert row"** hoặc **"+"** button
3. **Fill in test data**:
   - `name`: "Test Category"
   - `slug`: "test-category"
   - `description`: "This is a test category"
4. **Click "Save"** hoặc press Enter
5. **Verify** row appears in table
6. **Delete test row** (optional, để clean up)

### 5.3 Verify RLS Policies

1. **Trong Table Editor**, mỗi table nên có indicator "Row Level Security: Enabled"
2. **Hoặc** go to **Authentication** → **Policies** để xem tất cả policies
3. **Verify policies exist** cho:
   - categories: "Categories are viewable by everyone"
   - tools: "Tools are viewable by everyone"
   - affiliate_links: "Affiliate links are viewable by everyone"
   - news_articles: "News articles are viewable by everyone"
   - blog_posts: "Published blog posts are viewable by everyone"
   - scraping_jobs: "Scraping jobs are admin-only"

**✅ Bước 5 hoàn thành khi:**
- Tất cả 6 tables có đúng structure
- Indexes được tạo
- Foreign keys được configure
- RLS enabled trên tất cả tables
- Policies được tạo

---

## 🧪 STEP 6: Test Database Connection

### 6.1 Start Development Server

1. **Mở terminal** trong project root
2. **Chạy lệnh**:
   ```bash
   npm run dev
   ```
3. **Đợi** server start (sẽ thấy message "Ready")
4. **Server** sẽ chạy trên `http://localhost:3000`

### 6.2 Test API Route

1. **Mở browser**
2. **Navigate** đến: http://localhost:3000/api/test-db
3. **Bạn sẽ thấy** JSON response

### 6.3 Verify Success Response

**Expected Success Response:**

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

**Nếu bạn thấy response này:**
- ✅ Database connection working!
- ✅ Supabase client configured correctly
- ✅ Tables accessible
- ✅ RLS policies working

### 6.4 Test từ Browser Console (Optional)

1. **Open browser DevTools** (F12)
2. **Go to Console** tab
3. **Run**:
   ```javascript
   fetch('/api/test-db')
     .then(r => r.json())
     .then(console.log)
   ```
4. **Should see** same success response

### 6.5 Verify No Errors

**Check các nơi sau:**

1. **Browser Console** (F12 → Console):
   - Không có error messages
   - Không có warnings về CORS

2. **Terminal/Server Logs**:
   - Không có error messages
   - Không có connection errors

3. **Network Tab** (F12 → Network):
   - Request to `/api/test-db` returns 200 status
   - Response time reasonable (< 1 second)

**✅ Bước 6 hoàn thành khi:**
- API route returns success response
- No errors in console or logs
- Database connection verified working

---

## 🎉 Setup Complete!

Nếu tất cả 6 bước đã hoàn thành:

✅ **Supabase project created**
✅ **API keys configured**
✅ **Environment variables set**
✅ **Database migrations run**
✅ **Tables and RLS verified**
✅ **Connection tested**

**Bạn đã sẵn sàng để:**
- Continue với Story 1.3: Supabase Authentication Setup
- Hoặc start inserting data vào database
- Hoặc continue development

---

## 🆘 Troubleshooting

Nếu gặp vấn đề ở bất kỳ bước nào, xem:
- **Detailed troubleshooting**: `supabase/README.md` → Troubleshooting section
- **Common issues**: `supabase/QUICK_START.md` → Common Issues table

---

## 📝 Notes

- **Save this guide** để reference sau này
- **Keep API keys secure** - không commit vào Git
- **Database password** - lưu ở nơi an toàn
- **Migration files** - có thể re-run nếu cần (sẽ có warnings về existing objects)

