# Story 1.3: Testing Guide (Automated + Manual)

**Story:** Supabase Authentication Setup  
**Status:** Code Complete, Testing Required  
**Date:** 2025-01-27

---

## 📋 Tổng quan

Story 1.3 đã hoàn thành về code implementation. Script tự động đã verify code và endpoints. Bây giờ cần thực hiện **manual testing** với credentials thật để verify authentication flow hoạt động đúng.

**Các bước cần làm:**
1. ✅ **Run automated tests** (đã có scripts)
2. ✅ Đảm bảo có admin user trong Supabase
3. ✅ Test trên local environment (manual)
4. ✅ Test trên production (Vercel) (manual)
5. ✅ Update story status thành "done"

---

## 🤖 STEP 0: Automated Testing

### 0.1 Test trên Local

```bash
# Chạy automated tests cho local environment
./scripts/test-story-1.3.sh

# Hoặc với custom URL
./scripts/test-story-1.3.sh http://localhost:3000
```

**Expected Results:**
- ✅ Environment variables configured (2/3 - service role key optional)
- ✅ All files exist
- ✅ Code compiles successfully
- ✅ Endpoints accessible
- ✅ Code quality checks pass

### 0.2 Test trên Production

```bash
# Chạy automated tests cho production
./scripts/test-story-1.3-production.sh

# Hoặc với custom URL
./scripts/test-story-1.3-production.sh https://your-app.vercel.app
```

**Expected Results:**
- ✅ Login page accessible
- ✅ Admin route protection working
- ✅ Logout endpoint functional
- ✅ All tests pass

---

## 🔧 STEP 1: Tạo Admin User (Nếu chưa có)

### Option 1: Tạo user qua Supabase Dashboard

1. **Mở Supabase Dashboard** → **Authentication** → **Users**
2. **Click "Add user"** hoặc **"Create new user"**
3. **Nhập thông tin:**
   - Email: `admin@example.com` (hoặc email bạn muốn)
   - Password: `SecurePassword123!` (hoặc password mạnh)
   - **Auto Confirm User**: ✅ Check (để không cần confirm email)
4. **Click "Create user"**
5. **Lưu lại credentials** để test

### Option 2: Tạo user qua SQL Editor

1. **Mở Supabase Dashboard** → **SQL Editor**
2. **Chạy query:**

```sql
-- Tạo admin user (thay email và password)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com',  -- Thay email của bạn
  crypt('YourPassword123!', gen_salt('bf')),  -- Thay password của bạn
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  '',
  ''
);

-- Lấy user ID vừa tạo
SELECT id, email FROM auth.users WHERE email = 'admin@example.com';
```

**⚠️ Lưu ý:** Option 2 phức tạp hơn, nên dùng Option 1 (Dashboard) cho đơn giản.

---

## 🧪 STEP 2: Test trên Local Environment

### 2.1 Start Development Server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

### 2.2 Test Scenarios

#### ✅ Test 1: Login với Valid Credentials

**Steps:**
1. Mở browser → `http://localhost:3000/login`
2. Nhập email và password đã tạo ở STEP 1
3. Click "Sign In" hoặc nhấn Enter
4. **Expected Result:**
   - ✅ Redirect đến `/admin`
   - ✅ Thấy admin dashboard
   - ✅ Thấy user email hiển thị
   - ✅ Không có error messages

**Screenshot/Notes:** 
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

#### ✅ Test 2: Login với Invalid Credentials

**Steps:**
1. Mở browser → `http://localhost:3000/login`
2. Nhập **sai email** hoặc **sai password**
3. Click "Sign In"
4. **Expected Result:**
   - ✅ Error message hiển thị (ví dụ: "Invalid login credentials")
   - ✅ Vẫn ở trang `/login`
   - ✅ Không redirect

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

#### ✅ Test 3: Protected Route Access (Chưa login)

**Steps:**
1. **Đảm bảo chưa login** (hoặc logout trước)
2. Truy cập trực tiếp: `http://localhost:3000/admin`
3. **Expected Result:**
   - ✅ Redirect đến `/login`
   - ✅ Không thấy admin dashboard

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

#### ✅ Test 4: Protected Route Access (Đã login)

**Steps:**
1. Login thành công (Test 1)
2. Truy cập: `http://localhost:3000/admin`
3. **Expected Result:**
   - ✅ Thấy admin dashboard
   - ✅ Thấy user email/info
   - ✅ Có logout button

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

#### ✅ Test 5: Session Persistence

**Steps:**
1. Login thành công
2. **Reload trang** (`/admin`) bằng cách:
   - Nhấn F5 hoặc Cmd+R
   - Hoặc đóng browser và mở lại
3. **Expected Result:**
   - ✅ Vẫn ở trang `/admin`
   - ✅ Vẫn authenticated
   - ✅ Không redirect về `/login`

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

#### ✅ Test 6: Logout Functionality

**Steps:**
1. Login thành công
2. Click **"Logout"** button (trong admin dashboard)
3. **Expected Result:**
   - ✅ Redirect đến `/login`
   - ✅ Session đã clear
   - ✅ Truy cập `/admin` lại sẽ redirect về `/login`

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

#### ✅ Test 7: Redirect After Login

**Steps:**
1. **Chưa login**, truy cập: `http://localhost:3000/admin`
2. Bị redirect về `/login`
3. Login thành công
4. **Expected Result:**
   - ✅ Redirect về `/admin` (original destination)
   - ✅ Không ở lại `/login`

**Screenshot/Notes:**
- [ ] Test passed
- [ ] Test failed (ghi chú lỗi)

---

## 🌐 STEP 3: Test trên Production (Vercel)

### 3.1 Production URL

**Production URL:** `https://ai-tools-finder-two.vercel.app`

### 3.2 Test Scenarios

Lặp lại **tất cả Test Scenarios** ở STEP 2, nhưng sử dụng production URL:

1. ✅ **Test 1:** Login với valid credentials
2. ✅ **Test 2:** Login với invalid credentials
3. ✅ **Test 3:** Protected route access (chưa login)
4. ✅ **Test 4:** Protected route access (đã login)
5. ✅ **Test 5:** Session persistence
6. ✅ **Test 6:** Logout functionality
7. ✅ **Test 7:** Redirect after login

**⚠️ Lưu ý:**
- Đảm bảo environment variables đã được config trên Vercel
- Test với cùng admin user credentials
- Kiểm tra browser console để xem có errors không

---

## ✅ STEP 4: Verify Browser Console

### 4.1 Check for Errors

1. Mở **Browser DevTools** (F12)
2. Mở tab **Console**
3. **Expected:**
   - ✅ Không có errors (red)
   - ✅ Có thể có warnings (yellow) - OK
   - ✅ Supabase client initialized successfully

### 4.2 Check Network Requests

1. Mở tab **Network**
2. Login và xem requests:
   - ✅ POST request đến Supabase Auth API
   - ✅ Status 200 (success)
   - ✅ Cookies được set (check Application → Cookies)

---

## 📊 Test Results Summary

| Test | Local | Production | Notes |
|------|-------|------------|-------|
| Test 1: Login Valid | ⬜ | ⬜ | |
| Test 2: Login Invalid | ⬜ | ⬜ | |
| Test 3: Protected (No Auth) | ⬜ | ⬜ | |
| Test 4: Protected (With Auth) | ⬜ | ⬜ | |
| Test 5: Session Persistence | ⬜ | ⬜ | |
| Test 6: Logout | ⬜ | ⬜ | |
| Test 7: Redirect After Login | ⬜ | ⬜ | |

**Legend:**
- ✅ = Pass
- ❌ = Fail
- ⬜ = Not tested

---

## 🎯 STEP 5: Update Story Status

Sau khi **tất cả tests pass**, update story status:

1. **Update `docs/sprint-artifacts/1-3-supabase-authentication-setup.md`:**
   - Đổi status từ `review` → `done`
   - Update manual test results

2. **Update `docs/sprint-artifacts/sprint-status.yaml`:**
   - Đổi `1-3-supabase-authentication-setup: review` → `done`

3. **Commit changes:**
   ```bash
   git add docs/sprint-artifacts/
   git commit -m "docs: Mark Story 1.3 as done after manual testing"
   git push
   ```

---

## 🐛 Troubleshooting

### Issue: Login không redirect

**Possible causes:**
- Environment variables chưa config đúng
- Supabase project URL/Key sai
- Check browser console for errors

**Solution:**
- Verify `.env.local` (local) và Vercel env vars (production)
- Check Supabase Dashboard → Settings → API

---

### Issue: Session không persist

**Possible causes:**
- Cookies không được set
- Browser blocking cookies
- Domain mismatch

**Solution:**
- Check Application → Cookies trong DevTools
- Verify cookie domain matches app domain
- Try incognito mode để test

---

### Issue: Middleware không protect routes

**Possible causes:**
- Middleware không chạy
- Route pattern không match
- Session check logic sai

**Solution:**
- Check `middleware.ts` file
- Verify route patterns
- Check middleware logs (Vercel logs)

---

## 📝 Notes

- **Credentials:** Lưu credentials ở nơi an toàn, không commit vào git
- **Security:** Đảm bảo password mạnh cho admin user
- **Production:** Test kỹ trên production trước khi mark done

---

## ✅ Checklist

- [ ] Admin user đã được tạo trong Supabase
- [ ] Tested trên local (7/7 tests pass)
- [ ] Tested trên production (7/7 tests pass)
- [ ] Browser console không có errors
- [ ] Story status updated thành "done"
- [ ] Changes committed và pushed

---

**Sau khi hoàn thành tất cả tests, Story 1.3 sẽ được mark là "done"!** 🎉

