# Vercel CLI Login - Hướng Dẫn

Cách login Vercel CLI để check deployment status tự động.

---

## 🔐 Cách 1: Login với Browser (Khuyến nghị)

### Bước 1: Chạy Login Command

```bash
npx vercel login
```

### Bước 2: Chọn Authentication Method

Bạn sẽ thấy prompt:
```
? Set up and deploy "~/Desktop/nextlearn/ai-tools-finder"? [y/N]
```

Hoặc:
```
? How would you like to authenticate?
  ○ Email
  ○ GitHub
  ○ GitLab
  ○ Bitbucket
```

**Chọn:** `GitHub` (khuyến nghị vì bạn đã connect GitHub với Vercel)

### Bước 3: Authorize trong Browser

1. **Browser sẽ tự động mở** với URL: `https://vercel.com/...`
2. **Login Vercel** nếu chưa login
3. **Authorize Vercel CLI** để access account
4. **Quay lại terminal** - sẽ tự động complete

**✅ Hoàn thành khi:** Terminal hiển thị "Success! Authentication complete"

---

## 🔐 Cách 2: Login với Email

Nếu chọn Email method:

1. **Chạy:** `npx vercel login`
2. **Chọn:** Email
3. **Nhập email** của Vercel account
4. **Check email** để lấy verification code
5. **Nhập code** vào terminal

---

## ✅ Verify Login

Sau khi login, verify:

```bash
npx vercel whoami
```

**Output sẽ hiển thị:**
```
Logged in as your-email@example.com
```

---

## 📊 Check Deployment Status

Sau khi login, bạn có thể check deployment:

```bash
# List deployments
npx vercel ls ai-tools-finder

# List với details
npx vercel ls ai-tools-finder --json | jq '.[0]'

# Check specific deployment
npx vercel inspect [deployment-url]
```

---

## 🔍 Troubleshooting

### Login Failed

**Giải pháp:**
- Đảm bảo browser có thể mở
- Check internet connection
- Thử lại: `npx vercel login`

### "No existing credentials found"

**Giải pháp:**
- Chạy `npx vercel login` lại
- Verify login thành công với `npx vercel whoami`

### Cannot Access Deployments

**Giải pháp:**
- Verify project name đúng: `ai-tools-finder`
- Check bạn có access vào project trong Vercel dashboard
- Thử: `npx vercel ls` để xem tất cả projects

---

## 💡 Quick Commands

```bash
# Login
npx vercel login

# Check login status
npx vercel whoami

# List deployments
npx vercel ls ai-tools-finder

# Check latest deployment
npx vercel ls ai-tools-finder --limit 1
```

---

**Sau khi login thành công, bạn có thể check deployment status tự động!**

