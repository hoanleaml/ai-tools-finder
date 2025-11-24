# Supabase Authentication Setup Guide

Hướng dẫn chi tiết để configure Supabase Auth Provider cho Story 1.3.

---

## 📋 Tổng quan

Story 1.3 yêu cầu setup Supabase Authentication với email/password provider để admin users có thể đăng nhập vào admin dashboard.

**Các bước cần thực hiện:**
1. Enable email/password provider trong Supabase dashboard
2. Configure email settings (optional, có thể dùng defaults)
3. Tạo admin user đầu tiên (test user)
4. Verify auth provider hoạt động

---

## 🚀 STEP 1: Enable Email/Password Provider

### 1.1 Navigate đến Authentication Settings

1. **Mở Supabase dashboard** của project bạn
2. **Click "Authentication"** trong left sidebar (icon 🔐)
3. **Click "Providers"** tab (hoặc "Settings" → "Auth" → "Providers")

### 1.2 Enable Email Provider

1. **Tìm "Email" provider** trong danh sách providers
2. **Toggle switch** để enable Email provider
   - Switch sẽ chuyển từ OFF → ON (màu xanh)
3. **Verify** Email provider đã được enable

### 1.3 Configure Email Settings (Optional)

**Email Confirmation:**

- **For Development**: Có thể **disable** email confirmation để test dễ hơn
  - Tìm "Enable email confirmations"
  - Toggle OFF (disable)
  - ⚠️ **Lưu ý**: Chỉ disable trong development, production nên enable

- **For Production**: Nên **enable** email confirmation
  - Toggle ON
  - Users sẽ nhận email để confirm account

**Email Templates:**

- Supabase cung cấp default email templates
- Có thể customize sau nếu cần
- Hiện tại có thể dùng defaults

---

## 🔧 STEP 2: Configure Additional Settings (Optional)

### 2.1 Password Requirements

1. **Trong Authentication settings**, tìm **"Password"** section
2. **Configure password requirements** (nếu cần):
   - Minimum length (default: 6 characters)
   - Require uppercase, lowercase, numbers, special characters (optional)
   - **Recommendation**: Giữ defaults cho development

### 2.2 Session Settings

1. **Tìm "Session"** section trong Authentication settings
2. **Configure session duration** (nếu cần):
   - Default: 1 hour
   - Có thể tăng lên 24 hours cho development
   - **Recommendation**: Giữ defaults

### 2.3 Site URL

1. **Tìm "Site URL"** trong Authentication settings
2. **Set Site URL**:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. **Add Redirect URLs** (nếu cần):
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/admin`

---

## 👤 STEP 3: Tạo Admin User Đầu Tiên (Test User)

### 3.1 Tạo User trong Supabase Dashboard

1. **Trong Authentication**, click **"Users"** tab
2. **Click "Add user"** hoặc **"Create new user"** button
3. **Fill in form**:
   - **Email**: `admin@example.com` (hoặc email bạn muốn)
   - **Password**: Chọn password mạnh (lưu lại!)
   - **Auto Confirm User**: ✅ Check this box (để không cần email confirmation)
4. **Click "Create user"**

### 3.2 Verify User Created

1. **Verify** user xuất hiện trong Users list
2. **Check** user có status "Confirmed" (nếu đã check Auto Confirm)
3. **Note** user ID (UUID) - sẽ cần sau này

### 3.3 Alternative: Tạo User qua SQL (Optional)

Nếu muốn tạo user qua SQL:

1. **Mở SQL Editor** trong Supabase
2. **Run SQL**:
   ```sql
   -- Create admin user
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
     confirmation_token,
     email_change,
     email_change_token_new,
     recovery_token
   ) VALUES (
     '00000000-0000-0000-0000-000000000000',
     gen_random_uuid(),
     'authenticated',
     'authenticated',
     'admin@example.com',
     crypt('your_password_here', gen_salt('bf')),
     NOW(),
     NOW(),
     NOW(),
     '',
     '',
     '',
     ''
   );
   ```
   ⚠️ **Lưu ý**: Cách này phức tạp hơn, nên dùng dashboard method.

---

## ✅ STEP 4: Verify Auth Provider Hoạt Động

### 4.1 Test Login trong Supabase Dashboard

1. **Trong Authentication** → **"Users"** tab
2. **Click vào user** bạn vừa tạo
3. **Verify** thông tin user:
   - Email đúng
   - Status: Confirmed
   - Created at: Có timestamp

### 4.2 Test với Supabase Auth UI (Optional)

Supabase cung cấp Auth UI component để test:

1. **Có thể test** bằng cách tạo test page với Supabase Auth UI
2. **Hoặc đợi** đến khi implement login page trong Story 1.3

---

## 📝 STEP 5: Lưu Thông Tin

**Lưu các thông tin sau:**

- ✅ Email provider: **Enabled**
- ✅ Email confirmation: **Disabled** (development) hoặc **Enabled** (production)
- ✅ Admin user email: `_________________`
- ✅ Admin user password: `_________________` (lưu ở nơi an toàn!)
- ✅ Site URL: `http://localhost:3000` (development)

---

## 🔍 Verification Checklist

Trước khi tiếp tục với Story 1.3 development, verify:

- [ ] Email provider đã được enable
- [ ] Email confirmation settings đã được configure
- [ ] Admin user đã được tạo
- [ ] Admin user có status "Confirmed"
- [ ] Site URL đã được set (nếu cần)
- [ ] Redirect URLs đã được add (nếu cần)

---

## 🚀 Next Steps

Sau khi hoàn thành các bước trên:

1. ✅ **Task 1 Complete**: Supabase Auth Provider configured
2. **Continue với Story 1.3 development**:
   - Task 2: Create Authentication Middleware
   - Task 3: Create Login Page
   - Task 4: Implement Logout Functionality
   - Task 5: Create Protected Admin Route Example
   - Task 6: Create Auth Helper Utilities
   - Task 7: Test Authentication Flow

---

## 📚 References

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Email Provider Setup**: https://supabase.com/docs/guides/auth/auth-email
- **Password Requirements**: https://supabase.com/docs/guides/auth/password-reset
- **Session Management**: https://supabase.com/docs/guides/auth/sessions

---

## ⚠️ Troubleshooting

**Email provider không enable được:**
- Kiểm tra bạn có quyền admin của project không
- Refresh trang và thử lại

**User không thể login:**
- Kiểm tra email confirmation đã được disable (development)
- Kiểm tra user có status "Confirmed" không
- Kiểm tra password đúng không

**Session không persist:**
- Kiểm tra Site URL đã được set đúng chưa
- Kiểm tra Redirect URLs đã được add chưa

---

## 💡 Tips

- **Development**: Disable email confirmation để test nhanh hơn
- **Production**: Enable email confirmation để bảo mật tốt hơn
- **Password**: Dùng password manager để lưu admin password
- **Test User**: Tạo nhiều test users với roles khác nhau (nếu cần)

