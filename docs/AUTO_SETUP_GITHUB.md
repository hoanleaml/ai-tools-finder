# Tự Động Setup GitHub Repository

Hướng dẫn sử dụng script tự động để tạo GitHub repository và push code.

---

## 🚀 Cách 1: Sử dụng Script Tự Động (Khuyến nghị)

### Bước 1: Chạy Script

```bash
./scripts/setup-github-repo.sh
```

**Hoặc với tên repository tùy chỉnh:**
```bash
./scripts/setup-github-repo.sh my-repo-name
```

**Hoặc với username cụ thể:**
```bash
./scripts/setup-github-repo.sh ai-tools-finder your-username
```

### Bước 2: Script sẽ tự động:

1. ✅ **Kiểm tra GitHub CLI** - Nếu chưa có sẽ tự động cài đặt (trên macOS với Homebrew)
2. ✅ **Authenticate** - Hướng dẫn bạn login GitHub nếu chưa authenticate
3. ✅ **Tạo repository** - Tự động tạo repository trên GitHub
4. ✅ **Push code** - Tự động push code lên GitHub

### Bước 3: Follow Prompts

Script sẽ hỏi bạn một số câu hỏi:
- **Authentication method:** Chọn browser hoặc token
- **Repository exists:** Nếu repo đã tồn tại, chọn có muốn dùng không

---

## 📦 Cài Đặt GitHub CLI Thủ Công (Nếu cần)

### macOS (với Homebrew)

```bash
brew install gh
```

### Linux

```bash
# Ubuntu/Debian
sudo apt install gh

# Fedora
sudo dnf install gh

# Arch
sudo pacman -S github-cli
```

### Windows

```bash
# Với Chocolatey
choco install gh

# Hoặc download từ: https://cli.github.com
```

### Authenticate GitHub CLI

```bash
gh auth login
```

Follow prompts:
1. Chọn **GitHub.com**
2. Chọn authentication method:
   - **Browser** (khuyến nghị)
   - **Token** (nếu muốn dùng token)
3. Login và authorize

---

## 🔧 Cách 2: Sử dụng GitHub CLI Trực Tiếp

Nếu đã có GitHub CLI và đã authenticate:

### Tạo Repository và Push

```bash
# Tạo repository và push code trong một command
gh repo create ai-tools-finder \
  --public \
  --description "AI Tools Finder - Discover and explore AI tools" \
  --source=. \
  --remote=origin \
  --push
```

**Options:**
- `--public`: Repository công khai (hoặc `--private` cho private)
- `--description`: Mô tả repository
- `--source=.`: Source từ thư mục hiện tại
- `--remote=origin`: Tên remote là origin
- `--push`: Tự động push code sau khi tạo

---

## 🔍 Verify Setup

Sau khi chạy script hoặc command:

1. **Kiểm tra remote:**
   ```bash
   git remote -v
   ```
   Should show:
   ```
   origin  https://github.com/YOUR_USERNAME/ai-tools-finder.git (fetch)
   origin  https://github.com/YOUR_USERNAME/ai-tools-finder.git (push)
   ```

2. **Kiểm tra trên GitHub:**
   - Mở: `https://github.com/YOUR_USERNAME/ai-tools-finder`
   - Verify tất cả files đã được push

---

## 🚀 Tiếp Theo

Sau khi repository đã được tạo và code đã được push:

1. **Vào Vercel:** https://vercel.com/new
2. **Import repository:** Chọn `ai-tools-finder`
3. **Tiếp tục** với `docs/VERCEL_SETUP_GUIDE.md` Step 3

---

## 🔍 Troubleshooting

### Script không chạy được

**Lỗi:** `Permission denied`
```bash
chmod +x scripts/setup-github-repo.sh
```

### GitHub CLI không cài được

**Giải pháp:** Cài đặt thủ công từ https://cli.github.com

### Authentication failed

**Giải pháp:**
```bash
gh auth login
# Chọn browser method và follow prompts
```

### Repository đã tồn tại

**Giải pháp:**
- Chọn tên repository khác
- Hoặc xóa repository cũ trên GitHub
- Hoặc script sẽ hỏi bạn có muốn dùng repo cũ không

---

## ✅ Quick Start

```bash
# 1. Chạy script tự động
./scripts/setup-github-repo.sh

# 2. Follow prompts (authenticate nếu cần)

# 3. Done! Repository đã được tạo và code đã được push
```

---

**Sau khi hoàn thành, tiếp tục với:** `docs/VERCEL_SETUP_GUIDE.md` Step 2!

