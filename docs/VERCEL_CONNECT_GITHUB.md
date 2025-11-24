# Connect GitHub với Vercel Account (Email Login)

Hướng dẫn nhanh để connect GitHub repository với Vercel account khi bạn đã login bằng email.

---

## 🔗 STEP 1: Connect GitHub Account với Vercel

### 1.1 Vào Vercel Settings

1. **Login vào Vercel** với email của bạn: https://vercel.com
2. **Click vào avatar/profile** (góc trên bên phải)
3. **Click "Settings"** từ dropdown menu
   - Hoặc truy cập trực tiếp: https://vercel.com/account

### 1.2 Connect GitHub

1. **Trong Settings page**, tìm section **"Connected Accounts"** hoặc **"Git Providers"**
2. **Tìm "GitHub"** trong danh sách providers
3. **Click "Connect"** hoặc **"Connect GitHub"** button
4. **Authorize Vercel:**
   - Bạn sẽ được redirect đến GitHub
   - Login GitHub nếu chưa login
   - **Authorize Vercel** để access repositories
   - Chọn repositories bạn muốn grant access:
     - ✅ **All repositories** (khuyến nghị)
     - Hoặc chọn specific repositories
   - **Click "Authorize"** hoặc **"Install"**

### 1.3 Verify Connection

1. **Quay lại Vercel Settings**
2. **Verify** GitHub đã được connect:
   - Bạn sẽ thấy GitHub với status "Connected"
   - Username GitHub của bạn sẽ hiển thị

**✅ Hoàn thành khi:** GitHub hiển thị "Connected" trong Vercel Settings

---

## 📦 STEP 2: Import GitHub Repository

### 2.1 Import Project

1. **Trong Vercel dashboard**, click **"Add New..."** → **"Project"**
   - Hoặc truy cập: https://vercel.com/new

2. **Import Git Repository:**
   - Bây giờ bạn sẽ thấy danh sách GitHub repositories
   - **Tìm và click** vào repository `ai-tools-finder` (hoặc tên repo của bạn)
   - Nếu không thấy repo:
     - Click **"Adjust GitHub App Permissions"**
     - Grant access cho repository bạn cần
     - Refresh page

3. **Click "Import"** để tiếp tục

**✅ Hoàn thành khi:** Bạn thấy màn hình "Configure Project"

---

## ⚙️ STEP 3: Tiếp tục với Setup

Sau khi import repository thành công, tiếp tục với:

1. **Configure Project Settings** - Xem `docs/VERCEL_SETUP_GUIDE.md` Step 3
2. **Add Environment Variables** - Xem `docs/VERCEL_SETUP_GUIDE.md` Step 4
3. **Deploy** - Xem `docs/VERCEL_SETUP_GUIDE.md` Step 5

---

## 🔍 Troubleshooting

### Không thấy GitHub trong Connected Accounts

**Giải pháp:**
- Refresh page
- Logout và login lại Vercel
- Thử connect lại từ Settings

### Không thấy repository trong danh sách

**Giải pháp:**
1. Verify repository tồn tại trên GitHub
2. Check bạn có access vào repository đó
3. Click "Adjust GitHub App Permissions" và grant access
4. Refresh Vercel page

### GitHub connection bị disconnect

**Giải pháp:**
1. Vào Settings → Connected Accounts
2. Disconnect GitHub
3. Connect lại GitHub
4. Re-authorize permissions

---

## ✅ Quick Checklist

- [ ] Login vào Vercel với email
- [ ] Vào Settings → Connected Accounts
- [ ] Connect GitHub account
- [ ] Authorize Vercel trên GitHub
- [ ] Verify GitHub connected
- [ ] Import repository từ Vercel dashboard
- [ ] Tiếp tục với project configuration

---

**Sau khi connect GitHub thành công, tiếp tục với:** `docs/VERCEL_SETUP_GUIDE.md` từ Step 3!

