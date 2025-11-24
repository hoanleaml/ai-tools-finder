# Tạo GitHub Repository - Hướng dẫn Chi Tiết

Hướng dẫn từng bước để tạo GitHub repository mới cho ai-tools-finder.

---

## ✅ Bước 1: Commit đã hoàn thành

Code đã được commit thành công với message:
```
feat: complete Epic 1 stories (1.1-1.5)
```

**60 files đã được commit**, bao gồm:
- ✅ Authentication setup
- ✅ UI components
- ✅ Deployment documentation
- ✅ Database migrations
- ✅ Và nhiều files khác

---

## 🚀 Bước 2: Tạo GitHub Repository

### 2.1 Mở GitHub New Repository Page

1. **Mở browser** và truy cập: **https://github.com/new**
   - Hoặc: Click **"+"** (góc trên bên phải GitHub) → **"New repository"**

2. **Đảm bảo bạn đã login** vào GitHub account

### 2.2 Điền Thông Tin Repository

**Repository name:**
```
ai-tools-finder
```
- ⚠️ **Lưu ý:** Tên này sẽ là URL của repo: `github.com/YOUR_USERNAME/ai-tools-finder`

**Description (tùy chọn):**
```
AI Tools Finder - Discover and explore AI tools. Built with Next.js 16, Supabase, and Vercel.
```

**Visibility:**
- ✅ **Public** (khuyến nghị - free, dễ share)
- Hoặc **Private** (nếu muốn giữ kín code)

**⚠️ QUAN TRỌNG - KHÔNG CHECK các options sau:**
- ❌ **Add a README file** (đã có sẵn trong project)
- ❌ **Add .gitignore** (đã có sẵn `.gitignore`)
- ❌ **Choose a license** (có thể thêm sau nếu cần)

**Lý do:** Vì bạn đã có code local và muốn push code lên, không nên tạo README hoặc .gitignore mới trên GitHub.

### 2.3 Tạo Repository

1. **Click nút "Create repository"** (màu xanh lá)
2. **Đợi GitHub tạo repository** (vài giây)

### 2.4 Copy Repository URL

Sau khi repository được tạo, GitHub sẽ hiển thị trang với instructions.

**Bạn sẽ thấy 2 options:**

**Option 1: "…or push an existing repository from the command line"**
- Đây là option bạn cần!

**Copy URL từ phần này:**
```
https://github.com/YOUR_USERNAME/ai-tools-finder.git
```

**Hoặc nếu bạn dùng SSH:**
```
git@github.com:YOUR_USERNAME/ai-tools-finder.git
```

**✅ Lưu URL này lại** để dùng ở bước tiếp theo.

---

## 🔗 Bước 3: Connect Local Repository với GitHub

### 3.1 Mở Terminal

Mở terminal trong project directory:
```bash
cd /Users/hoanln/Desktop/nextlearn/ai-tools-finder
```

### 3.2 Add Remote Repository

**Thay `YOUR_USERNAME` bằng GitHub username của bạn:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-finder.git
```

**Ví dụ:** Nếu username là `hoanln`, thì command sẽ là:
```bash
git remote add origin https://github.com/hoanln/ai-tools-finder.git
```

### 3.3 Verify Remote

```bash
git remote -v
```

**Output sẽ hiển thị:**
```
origin  https://github.com/YOUR_USERNAME/ai-tools-finder.git (fetch)
origin  https://github.com/YOUR_USERNAME/ai-tools-finder.git (push)
```

**✅ Hoàn thành khi:** Remote được add thành công

---

## 📤 Bước 4: Push Code lên GitHub

### 4.1 Push Code

```bash
git push -u origin main
```

### 4.2 Authentication

**Nếu được hỏi authentication:**

**Username:** Nhập GitHub username của bạn

**Password:** 
- ⚠️ **KHÔNG dùng GitHub password**
- ✅ **Dùng Personal Access Token**

**Nếu chưa có token, tạo mới:**

1. **Vào:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Điền:**
   - **Note:** `Vercel Deployment`
   - **Expiration:** Chọn thời hạn (90 days hoặc No expiration)
   - **Scopes:** Check ✅ `repo` (Full control of private repositories)
4. **Click:** "Generate token"
5. **Copy token** ngay lập tức (chỉ hiển thị 1 lần!)
6. **Paste token** khi Git hỏi password

**Hoặc dùng token trong URL (an toàn hơn):**

```bash
# Remove remote cũ
git remote remove origin

# Add lại với token
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/ai-tools-finder.git

# Push
git push -u origin main
```

### 4.3 Verify Push

Sau khi push thành công, bạn sẽ thấy:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/YOUR_USERNAME/ai-tools-finder.git
 * [new branch]      main -> main
Branch 'main' set up to track 'remote branch 'main' from 'origin'.
```

**✅ Hoàn thành khi:** Push thành công!

---

## ✅ Bước 5: Verify trên GitHub

### 5.1 Kiểm tra Repository

1. **Mở browser** và truy cập: `https://github.com/YOUR_USERNAME/ai-tools-finder`
2. **Verify:**
   - ✅ Tất cả files đã được push
   - ✅ README.md hiển thị đúng
   - ✅ Folder structure đúng
   - ✅ Commits hiển thị (ít nhất 3 commits)

### 5.2 Kiểm tra Files Quan Trọng

Verify các files/folders sau có trên GitHub:
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `lib/` folder
- ✅ `docs/` folder
- ✅ `supabase/` folder
- ✅ `package.json`
- ✅ `vercel.json`
- ✅ `.gitignore`
- ✅ `README.md`

**⚠️ Verify KHÔNG có:**
- ❌ `.env.local` (phải bị exclude bởi .gitignore)
- ❌ `node_modules/` (phải bị exclude)
- ❌ `.next/` (phải bị exclude)

---

## 🚀 Bước 6: Tiếp tục với Vercel

Sau khi code đã trên GitHub:

1. **Vào Vercel:** https://vercel.com/new
2. **Import repository:**
   - Tìm và chọn `ai-tools-finder`
   - Click "Import"
3. **Tiếp tục** với `docs/VERCEL_SETUP_GUIDE.md` Step 3

---

## 🔍 Troubleshooting

### Error: "remote origin already exists"

**Giải pháp:**
```bash
# Remove remote cũ
git remote remove origin

# Add lại
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-finder.git
```

### Error: "Authentication failed"

**Giải pháp:**
- Sử dụng Personal Access Token thay vì password
- Hoặc setup SSH keys

### Error: "failed to push some refs"

**Giải pháp:**
```bash
# Pull trước (nếu có conflicts)
git pull origin main --allow-unrelated-histories

# Sau đó push lại
git push -u origin main
```

### Không thấy repository trong Vercel

**Giải pháp:**
- Verify GitHub repository là Public (hoặc bạn đã grant Vercel access)
- Refresh Vercel page
- Check GitHub connection trong Vercel Settings

---

## ✅ Quick Checklist

- [x] Code đã được commit ✅
- [ ] GitHub repository được tạo
- [ ] Remote repository được add
- [ ] Code được push lên GitHub
- [ ] Verify code trên GitHub
- [ ] Import vào Vercel

---

**Sau khi hoàn thành, tiếp tục với:** `docs/VERCEL_SETUP_GUIDE.md` Step 2!

