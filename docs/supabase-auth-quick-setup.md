# Supabase Auth Quick Setup Guide

Quick reference để configure Supabase Auth Provider cho Story 1.3.

---

## ⚡ Quick Steps (5 phút)

### 1. Enable Email Provider

```
Supabase Dashboard → Authentication → Providers → Email → Toggle ON
```

### 2. Disable Email Confirmation (Development)

```
Authentication → Settings → Email → "Enable email confirmations" → Toggle OFF
```

### 3. Create Admin User

```
Authentication → Users → "Add user" → Fill:
  • Email: admin@example.com
  • Password: [your_password]
  • Auto Confirm User: ✅ Check
→ "Create user"
```

### 4. Verify

- ✅ Email provider: Enabled
- ✅ Admin user: Created và Confirmed
- ✅ Email và password: Đã lưu

---

## 📝 Checklist

- [ ] Email provider enabled
- [ ] Email confirmation disabled (dev) hoặc enabled (prod)
- [ ] Admin user created với email và password
- [ ] Admin user có status "Confirmed"
- [ ] Email và password đã được lưu ở nơi an toàn

---

## 🚀 Done!

Sau khi hoàn thành, cho tôi biết để tiếp tục với Story 1.3 development!

---

**Chi tiết đầy đủ**: Xem `docs/supabase-auth-setup.md`

