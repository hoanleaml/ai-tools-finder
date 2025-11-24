# Vercel Redeploy & Verify - Hướng Dẫn

Sau khi add environment variables, bạn cần redeploy để áp dụng chúng.

---

## 🚀 Bước 1: Redeploy Application

### 1.1 Vào Deployments Page

1. **Trong Vercel dashboard**, chọn project `ai-tools-finder`
2. **Click tab "Deployments"** (trong top navigation)
3. **Tìm deployment mới nhất** (có thể failed hoặc building)

### 1.2 Trigger Redeploy

**Option 1: Redeploy từ deployment hiện tại**
1. **Click vào deployment mới nhất**
2. **Click "..."** (three dots menu) ở góc trên bên phải
3. **Click "Redeploy"**
4. **Confirm** redeploy

**Option 2: Redeploy từ Deployments list**
1. **Trong Deployments list**, tìm deployment mới nhất
2. **Click "..."** (three dots) bên cạnh deployment
3. **Click "Redeploy"**

**Option 3: Push code mới (tự động trigger)**
```bash
# Make a small change và push
git commit --allow-empty -m "trigger: redeploy with env vars"
git push origin main
```

### 1.3 Đợi Build Hoàn Thành

- **Build time:** Thường 2-5 phút
- **Status sẽ thay đổi:**
  - Building → Ready (thành công)
  - Building → Error (có lỗi)

---

## ✅ Bước 2: Verify Build Logs

### 2.1 Check Build Status

1. **Click vào deployment** đang build
2. **Xem status:**
   - ✅ **Ready** = Build thành công
   - ❌ **Error** = Build failed (cần check logs)

### 2.2 Check Build Logs

1. **Trong deployment page**, click **"Build Logs"** tab
2. **Scroll xuống** để xem toàn bộ logs
3. **Tìm errors** (nếu có):
   - Environment variable errors
   - Build errors
   - TypeScript errors

**✅ Build thành công khi:**
- Status: **Ready**
- Build logs không có errors
- Thấy message: "Build completed"

---

## 🌐 Bước 3: Test Application

### 3.1 Mở Production URL

1. **Trong deployment page**, click **"Visit"** button
2. **Hoặc copy URL** từ deployment
   - Format: `https://ai-tools-finder.vercel.app`
   - Hoặc custom domain nếu đã setup

### 3.2 Test Homepage

1. **Verify page loads:**
   - ✅ Page hiển thị không có errors
   - ✅ Components render correctly
   - ✅ No blank page

2. **Check browser console (F12):**
   - ✅ No errors về environment variables
   - ✅ No Supabase connection errors
   - ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` is loaded

### 3.3 Test Login Page

1. **Navigate to:** `/login`
   - URL: `https://your-app.vercel.app/login`

2. **Verify:**
   - ✅ Login form hiển thị
   - ✅ Email và password fields có sẵn
   - ✅ Form có thể submit

3. **Test login** (nếu có credentials):
   - ✅ Login thành công
   - ✅ Redirect to `/admin` sau khi login

### 3.4 Test Admin Routes Protection

1. **Navigate to:** `/admin` (without login)
   - URL: `https://your-app.vercel.app/admin`

2. **Verify:**
   - ✅ Redirect to `/login` (nếu chưa login)
   - ✅ Hoặc hiển thị admin dashboard (nếu đã login)

### 3.5 Test Supabase Connection

**Check browser console:**
```javascript
// Mở browser console (F12) và check:
// Should see Supabase client initialized
// No connection errors
```

---

## 🔍 Troubleshooting

### Build Fails với Environment Variable Errors

**Lỗi:** `Environment variable NEXT_PUBLIC_SUPABASE_URL is not defined`

**Giải pháp:**
1. Verify variable đã được add trong Vercel Settings → Environment Variables
2. Check tên variable chính xác (case-sensitive)
3. Verify environment được chọn (Development/Preview/Production)
4. Redeploy sau khi fix

### Build Fails với TypeScript Errors

**Lỗi:** TypeScript compilation errors

**Giải pháp:**
1. Run `npm run build` locally để check errors
2. Fix TypeScript errors
3. Commit và push changes
4. Redeploy

### Application Can't Connect to Supabase

**Lỗi:** Supabase connection errors trong browser console

**Giải pháp:**
1. Verify Supabase URL và keys đúng trong Vercel
2. Check Supabase project status (active?)
3. Verify RLS policies allow access
4. Check browser console for specific error messages

### Environment Variables Not Loading

**Lỗi:** Variables không được load trong application

**Giải pháp:**
- Variables mới chỉ có hiệu lực sau khi redeploy
- Đảm bảo đã redeploy sau khi add variables
- Check deployment logs để verify variables được load
- Variables với `NEXT_PUBLIC_` prefix sẽ được expose trong client-side

---

## ✅ Completion Checklist

- [ ] Environment variables đã được add (3 variables)
- [ ] Redeploy triggered
- [ ] Build completed successfully (Status: Ready)
- [ ] Build logs không có errors
- [ ] Production URL accessible
- [ ] Homepage loads correctly
- [ ] Login page accessible
- [ ] Admin routes protected (redirect to login)
- [ ] No console errors
- [ ] Supabase connection working

---

## 🎉 Hoàn Thành!

Nếu tất cả tests pass, bạn đã hoàn thành Story 1.5!

**Tiếp theo:**
- Update Story 1.5 status từ "in-progress" → "done"
- Có thể bắt đầu Epic 2 hoặc test thêm các features

---

**Chi tiết:** Xem `docs/VERCEL_SETUP_GUIDE.md` Step 5-6 để biết thêm!

