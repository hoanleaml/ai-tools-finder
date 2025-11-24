# Vercel Setup Guide - Step by Step

Hướng dẫn chi tiết từng bước để setup Vercel deployment cho AI Tools Finder.

---

## 📋 Checklist Tổng Quan

- [ ] Tạo Vercel account
- [ ] Connect GitHub repository
- [ ] Configure project settings
- [ ] Add environment variables
- [ ] Deploy và verify
- [ ] Test preview deployments
- [ ] Test production deployment

---

## 🚀 STEP 1: Tạo Vercel Account

### 1.1 Sign Up / Login

**Nếu chưa có account:**
1. **Mở browser** và truy cập: https://vercel.com
2. **Click "Sign Up"** (góc trên bên phải)
3. **Chọn phương thức đăng ký:**
   - **Option 1:** "Continue with GitHub" (khuyến nghị - tự động connect GitHub)
   - **Option 2:** "Sign up with Email" (sau đó cần connect GitHub manually)

**Nếu đã có account (login bằng email):**
- ✅ Bạn đã hoàn thành step này!
- ⚠️ **Cần làm thêm:** Connect GitHub account (xem Step 1.2)

**✅ Hoàn thành khi:** Bạn đã login vào Vercel dashboard

### 1.2 Connect GitHub (Nếu login bằng email)

**Nếu bạn login bằng email, cần connect GitHub:**

1. **Click vào avatar/profile** (góc trên bên phải) → **"Settings"**
2. **Tìm "Connected Accounts"** hoặc **"Git Providers"**
3. **Click "Connect"** bên cạnh GitHub
4. **Authorize Vercel** trên GitHub
5. **Grant access** cho repositories bạn cần

**Chi tiết:** Xem `docs/VERCEL_CONNECT_GITHUB.md` để hướng dẫn đầy đủ

**✅ Hoàn thành khi:** GitHub hiển thị "Connected" trong Settings

---

## 🔗 STEP 2: Connect GitHub Repository

### 2.1 Import Project

1. **Trong Vercel dashboard**, click **"Add New..."** → **"Project"**
   - Hoặc truy cập trực tiếp: https://vercel.com/new

2. **Import Git Repository:**
   - Bạn sẽ thấy danh sách GitHub repositories
   - **Tìm và click** vào repository `ai-tools-finder` (hoặc tên repo của bạn)
   - Nếu không thấy repo, click **"Adjust GitHub App Permissions"** và grant access

3. **Click "Import"** để tiếp tục

**✅ Hoàn thành khi:** Bạn thấy màn hình "Configure Project"

---

## ⚙️ STEP 3: Configure Project Settings

### 3.1 Project Configuration

**Framework Preset:**
- ✅ **Next.js** (sẽ được auto-detect)
- Nếu không auto-detect, chọn "Next.js" từ dropdown

**Project Name:**
- Mặc định: `ai-tools-finder` (hoặc tên repo)
- Có thể đổi nếu muốn

**Root Directory:**
- ✅ Để mặc định: `./` (root directory)
- Chỉ đổi nếu project nằm trong subdirectory

### 3.2 Build Settings

**Build Command:**
```
npm run build
```
- ✅ Mặc định đã đúng, không cần đổi

**Output Directory:**
```
.next
```
- ✅ Mặc định đã đúng cho Next.js

**Install Command:**
```
npm install
```
- ✅ Mặc định đã đúng

**Node.js Version:**
- ✅ Vercel sẽ tự động detect từ `package.json`
- Hoặc chọn **18.x** hoặc **20.x** từ dropdown

### 3.3 Environment Variables (Tạm thời bỏ qua)

⚠️ **Lưu ý:** Chúng ta sẽ add environment variables ở bước sau (Step 4)

### 3.4 Deploy

1. **Click "Deploy"** button
2. **Đợi build process** hoàn thành (2-5 phút)
3. **Build sẽ fail** vì chưa có environment variables - ĐÂY LÀ BÌNH THƯỜNG!

**✅ Hoàn thành khi:** Deployment được tạo (có thể failed, không sao)

---

## 🔐 STEP 4: Configure Environment Variables

### 4.1 Navigate to Environment Variables

1. **Trong Vercel dashboard**, chọn project `ai-tools-finder`
2. **Click "Settings"** tab (trong top navigation)
3. **Click "Environment Variables"** (trong left sidebar)

### 4.2 Add Supabase Variables

**Thêm từng variable một:**

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL

1. **Key:** `NEXT_PUBLIC_SUPABASE_URL`
2. **Value:** Paste Supabase project URL của bạn
   - Format: `https://xxxxx.supabase.co`
   - Lấy từ: Supabase Dashboard → Settings → API → Project URL
3. **Environment:** Chọn tất cả:
   - ✅ Development
   - ✅ Preview
   - ✅ Production
4. **Click "Save"**

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

1. **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. **Value:** Paste Supabase anon/public key
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Lấy từ: Supabase Dashboard → Settings → API → anon/public key
3. **Environment:** Chọn tất cả:
   - ✅ Development
   - ✅ Preview
   - ✅ Production
4. **Click "Save"**

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY

1. **Key:** `SUPABASE_SERVICE_ROLE_KEY`
2. **Value:** Paste Supabase service_role key
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Lấy từ: Supabase Dashboard → Settings → API → service_role key
   - ⚠️ **Click "Reveal"** nếu key bị ẩn
   - 🔒 **GIỮ BÍ MẬT** - Không share key này!
3. **Environment:** Chọn tất cả:
   - ✅ Development
   - ✅ Preview
   - ✅ Production
4. **Click "Save"**

### 4.3 Optional Variables (Có thể thêm sau)

**OPENAI_API_KEY** (cho Epic 7):
- Key: `OPENAI_API_KEY`
- Value: OpenAI API key (nếu có)
- Environment: Production (hoặc tất cả)

**NEXT_PUBLIC_APP_URL** (cho production):
- Key: `NEXT_PUBLIC_APP_URL`
- Value: `https://your-project.vercel.app` (sẽ có sau khi deploy)
- Environment: Production

**CRON_SECRET** (cho cron jobs):
- Key: `CRON_SECRET`
- Value: Random string (generate: `openssl rand -base64 32`)
- Environment: Production

**✅ Hoàn thành khi:** Tất cả 3 Supabase variables đã được add

---

## 🚀 STEP 5: Redeploy với Environment Variables

### 5.1 Trigger New Deployment

1. **Trong Vercel dashboard**, chọn project
2. **Click "Deployments"** tab
3. **Tìm deployment mới nhất** (có thể failed)
4. **Click "..."** (three dots) → **"Redeploy"**
5. **Hoặc:** Click **"Redeploy"** button ở top

### 5.2 Verify Build

1. **Đợi build process** hoàn thành (2-5 phút)
2. **Check build logs:**
   - Click vào deployment
   - Click "Build Logs" tab
   - Verify không có errors về environment variables

**✅ Hoàn thành khi:** Build thành công (status: Ready)

---

## ✅ STEP 6: Verify Deployment

### 6.1 Test Production URL

1. **Trong deployment**, bạn sẽ thấy **"Visit"** button
2. **Click "Visit"** để mở production URL
   - Format: `https://ai-tools-finder.vercel.app` (hoặc tên project của bạn)

### 6.2 Test Application

**Test các chức năng:**

1. **Homepage:**
   - ✅ Page loads successfully
   - ✅ Components render correctly
   - ✅ No console errors

2. **Login Page:**
   - ✅ Navigate to `/login`
   - ✅ Form displays correctly
   - ✅ Can submit form (test với credentials thật)

3. **Admin Routes:**
   - ✅ Navigate to `/admin` (without login)
   - ✅ Should redirect to `/login`
   - ✅ After login, can access `/admin`

4. **Environment Variables:**
   - ✅ Check browser console (F12)
   - ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` is loaded
   - ✅ No errors about missing variables

**✅ Hoàn thành khi:** Tất cả tests pass

---

## 🔀 STEP 7: Test Preview Deployments

### 7.1 Create Test Pull Request

1. **Tạo branch mới:**
   ```bash
   git checkout -b test-preview-deployment
   ```

2. **Make a small change:**
   - Ví dụ: Update README hoặc thêm comment
   - Commit và push:
   ```bash
   git add .
   git commit -m "test: preview deployment"
   git push origin test-preview-deployment
   ```

3. **Tạo Pull Request:**
   - Trên GitHub, tạo PR từ `test-preview-deployment` → `main`

### 7.2 Verify Preview Deployment

1. **Trong Vercel dashboard**, vào project
2. **Click "Deployments"** tab
3. **Tìm deployment** với label "Preview" (có PR number)
4. **Verify:**
   - ✅ Preview deployment được tạo tự động
   - ✅ Build thành công
   - ✅ Preview URL accessible
   - ✅ Environment variables loaded correctly

**✅ Hoàn thành khi:** Preview deployment hoạt động

---

## 🎯 STEP 8: Test Production Deployment

### 8.1 Merge to Main

1. **Merge Pull Request** từ Step 7
2. **Hoặc:** Push trực tiếp lên main branch:
   ```bash
   git checkout main
   git merge test-preview-deployment
   git push origin main
   ```

### 8.2 Verify Production Deployment

1. **Trong Vercel dashboard**, vào project
2. **Click "Deployments"** tab
3. **Tìm deployment** với label "Production"
4. **Verify:**
   - ✅ Production deployment được trigger tự động
   - ✅ Build thành công
   - ✅ Production URL updated
   - ✅ Application hoạt động bình thường

**✅ Hoàn thành khi:** Production deployment hoạt động

---

## 🔍 Troubleshooting

### Build Fails với "Environment Variable Not Found"

**Nguyên nhân:** Environment variables chưa được add hoặc sai tên

**Giải pháp:**
1. Verify tất cả variables đã được add trong Vercel
2. Check tên variable chính xác (case-sensitive)
3. Verify environment được chọn đúng (Development/Preview/Production)
4. Redeploy sau khi add variables

### Build Fails với TypeScript Errors

**Nguyên nhân:** Type errors trong code

**Giải pháp:**
1. Run `npm run build` locally để check errors
2. Fix TypeScript errors
3. Commit và push changes
4. Redeploy

### Application Can't Connect to Supabase

**Nguyên nhân:** Environment variables không đúng hoặc Supabase project inactive

**Giải pháp:**
1. Verify Supabase URL và keys đúng
2. Check Supabase project status (active?)
3. Verify RLS policies allow access
4. Check browser console for specific errors

### Preview Deployments Not Created

**Nguyên nhân:** Vercel không detect PR hoặc GitHub integration issue

**Giải pháp:**
1. Verify GitHub repository connected correctly
2. Check Vercel project settings → Git
3. Ensure PR is from same repository
4. Try creating new PR

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard

- **Deployments:** Xem tất cả deployments và status
- **Analytics:** Xem traffic và performance metrics
- **Logs:** Xem function logs và errors
- **Settings:** Manage environment variables, domains, etc.

### Best Practices

1. **Environment Variables:**
   - Use different Supabase projects cho dev/prod
   - Rotate keys regularly
   - Never commit `.env.local` to Git

2. **Deployments:**
   - Review preview deployments trước khi merge
   - Monitor production deployments
   - Set up alerts cho failed deployments

3. **Security:**
   - Enable Vercel Protection cho production
   - Use strong secrets cho CRON_SECRET
   - Review access permissions regularly

---

## ✅ Completion Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project configured correctly
- [ ] All environment variables added
- [ ] Production deployment successful
- [ ] Preview deployment tested
- [ ] Application tested và working
- [ ] Documentation updated

**🎉 Hoàn thành Story 1.5 khi:** Tất cả checklist items được tick!

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://nextjs.org/docs/deployment#vercel)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git)

