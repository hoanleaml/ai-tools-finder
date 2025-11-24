# Push Code lên GitHub - Hướng dẫn

Hướng dẫn để push code local lên GitHub repository mới.

---

## 📋 Tình trạng hiện tại

- ✅ Git repository đã được init (local)
- ✅ Đã có một số commits
- ❌ Chưa có GitHub repository
- ❌ Chưa có remote repository configured
- ⚠️ Có nhiều files chưa được commit

---

## 🚀 STEP 1: Commit các thay đổi hiện tại

### 1.1 Kiểm tra thay đổi

```bash
git status
```

Bạn sẽ thấy:
- **Modified files**: Files đã được sửa đổi
- **Untracked files**: Files mới chưa được add

### 1.2 Add tất cả files

```bash
# Add tất cả files (modified và untracked)
git add .

# Hoặc add từng nhóm:
git add app/
git add components/
git add lib/
git add docs/
git add supabase/
git add middleware.ts
git add vercel.json
git add package.json
git add tsconfig.json
```

### 1.3 Commit

```bash
git commit -m "feat: complete Epic 1 stories (1.1-1.5)

- Story 1.1: Project setup ✅
- Story 1.2: Supabase database schema ✅
- Story 1.3: Authentication setup ✅
- Story 1.4: UI components & design system ✅
- Story 1.5: Deployment pipeline setup ✅

- Add authentication middleware
- Add UI components (Button, Input, Card, Dialog, etc.)
- Add deployment documentation
- Configure Vercel deployment"
```

**✅ Hoàn thành khi:** Commit thành công

---

## 📦 STEP 2: Tạo GitHub Repository

### 2.1 Tạo Repository trên GitHub

1. **Mở browser** và truy cập: https://github.com/new
2. **Điền thông tin:**
   - **Repository name:** `ai-tools-finder`
   - **Description:** `AI Tools Finder - Discover and explore AI tools`
   - **Visibility:**
     - ✅ **Public** (khuyến nghị - free)
     - Hoặc **Private** (nếu muốn giữ kín)
   - **⚠️ KHÔNG check:**
     - ❌ Add a README file (đã có sẵn)
     - ❌ Add .gitignore (đã có sẵn)
     - ❌ Choose a license (có thể thêm sau)
3. **Click "Create repository"**

### 2.2 Copy Repository URL

Sau khi tạo, GitHub sẽ hiển thị URL:
- **HTTPS:** `https://github.com/YOUR_USERNAME/ai-tools-finder.git`
- **SSH:** `git@github.com:YOUR_USERNAME/ai-tools-finder.git`

**Copy URL này** để dùng ở bước sau.

**✅ Hoàn thành khi:** Repository được tạo và bạn có URL

---

## 🔗 STEP 3: Connect Local Repository với GitHub

### 3.1 Add Remote Repository

```bash
# Thay YOUR_USERNAME bằng GitHub username của bạn
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-finder.git

# Verify remote đã được add
git remote -v
```

**Output sẽ hiển thị:**
```
origin  https://github.com/YOUR_USERNAME/ai-tools-finder.git (fetch)
origin  https://github.com/YOUR_USERNAME/ai-tools-finder.git (push)
```

### 3.2 Rename Branch (nếu cần)

```bash
# Kiểm tra branch hiện tại
git branch

# Nếu branch là "main" thì OK, nếu là "master" thì rename:
git branch -M main
```

**✅ Hoàn thành khi:** Remote được add thành công

---

## 📤 STEP 4: Push Code lên GitHub

### 4.1 Push lần đầu

```bash
# Push code lên GitHub
git push -u origin main
```

**Nếu được hỏi authentication:**
- **GitHub Username:** Nhập username của bạn
- **Password:** Nhập **Personal Access Token** (không phải password GitHub)
  - Nếu chưa có token, xem Step 4.2 bên dưới

### 4.2 Tạo Personal Access Token (nếu cần)

**Nếu Git yêu cầu authentication:**

1. **Tạo Personal Access Token:**
   - Vào: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - **Note:** `Vercel Deployment`
   - **Expiration:** Chọn thời hạn (90 days hoặc No expiration)
   - **Scopes:** Check:
     - ✅ `repo` (Full control of private repositories)
   - **Click "Generate token"**
   - **Copy token** ngay lập tức (chỉ hiển thị 1 lần!)

2. **Sử dụng token:**
   - Khi Git hỏi password, paste token vào
   - Hoặc dùng token trong URL:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/ai-tools-finder.git
   ```

**✅ Hoàn thành khi:** Code được push lên GitHub thành công

---

## ✅ STEP 5: Verify trên GitHub

### 5.1 Kiểm tra Repository

1. **Mở browser** và truy cập: `https://github.com/YOUR_USERNAME/ai-tools-finder`
2. **Verify:**
   - ✅ Tất cả files đã được push
   - ✅ Commits hiển thị đúng
   - ✅ README.md hiển thị
   - ✅ Không có `.env.local` hoặc sensitive files

### 5.2 Verify .gitignore

Kiểm tra `.gitignore` đã exclude:
- ✅ `.env*` files
- ✅ `node_modules/`
- ✅ `.next/`
- ✅ `.vercel/`

**✅ Hoàn thành khi:** Repository trên GitHub có đầy đủ code

---

## 🚀 STEP 6: Import vào Vercel

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

### Error: Authentication failed

**Giải pháp:**
- Sử dụng Personal Access Token thay vì password
- Hoặc setup SSH keys (xem GitHub docs)

### Error: "failed to push some refs"

**Giải pháp:**
```bash
# Pull trước (nếu có conflicts)
git pull origin main --allow-unrelated-histories

# Sau đó push lại
git push -u origin main
```

---

## ✅ Quick Checklist

- [ ] Commit tất cả changes local
- [ ] Tạo GitHub repository mới
- [ ] Add remote repository
- [ ] Push code lên GitHub
- [ ] Verify code trên GitHub
- [ ] Import vào Vercel

---

**Sau khi push code lên GitHub thành công, tiếp tục với:** `docs/VERCEL_SETUP_GUIDE.md` Step 2!

