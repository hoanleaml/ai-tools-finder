# Hướng Dẫn Tìm Service Role Key trong Supabase

## Vị Trí

Service Role Key nằm trong cùng section với anon key, nhưng có thể bị ẩn hoặc ở vị trí khác.

## Các Bước Chi Tiết

### Bước 1: Navigate đến API Settings

1. Trong Supabase dashboard, click **Settings** (⚙️ icon) ở left sidebar
2. Click **"API"** trong settings menu
3. Scroll xuống đến section **"Project API keys"**

### Bước 2: Tìm service_role Key

Trong section **"Project API keys"**, bạn sẽ thấy 2 keys:

1. **anon / public** - Key bạn đã copy
2. **service_role** - Key bạn cần tìm

### Bước 3: Reveal và Copy

1. Tìm key có label **"service_role"** hoặc **"service role"**
2. Key này thường bị ẩn (hiển thị `••••••••`)
3. Click nút **"Reveal"** hoặc icon 👁️
4. Key sẽ hiển thị đầy đủ (rất dài, bắt đầu với `eyJ...`)
5. Click nút **"Copy"** hoặc select all và copy

## Visual Layout

```
┌─────────────────────────────────────────────┐
│  Project URL                                │
│  https://xxxxx.supabase.co                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Project API keys                           │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ anon / public                      │   │
│  │ eyJ... (đã copy)                  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ service_role  ← TÌM KEY NÀY!       │   │
│  │ •••••••• [👁️ Reveal] [📋 Copy]     │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## Nếu Không Thấy Service Role Key

### Option 1: Scroll Xuống Thêm
- Key có thể ở dưới anon key
- Có thể cần scroll trong section "Project API keys"

### Option 2: Kiểm Tra Tab/Accordion
- Có thể có tab "API Keys" hoặc accordion cần expand
- Click để expand section

### Option 3: Kiểm Tra Section Riêng
- Một số Supabase versions có section riêng cho service_role
- Tìm section có title "Service Role" hoặc "Admin Keys"

### Option 4: Refresh Trang
- Refresh browser (F5)
- Kiểm tra xem bạn có đang ở đúng project không

### Option 5: Kiểm Tra Settings Khác
- Thử Settings → General → API Keys
- Hoặc Settings → Database → Connection string (không phải key này)

## Lưu Ý Quan Trọng

⚠️ **Service Role Key có quyền ADMIN - giữ bí mật!**

- Key này chỉ dùng trong server-side code
- **KHÔNG BAO GIỜ** expose trong client-side code
- Key rất dài (hàng trăm ký tự), đảm bảo copy đầy đủ
- Lưu ở nơi an toàn (password manager)

## Sau Khi Tìm Thấy

1. Click **"Reveal"** để hiển thị key
2. Copy key (đảm bảo copy đầy đủ - rất dài!)
3. Paste vào `.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=<paste_key_here>
   ```

## Verify Key Đúng

Service Role Key sẽ:
- Bắt đầu với `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Rất dài (hàng trăm ký tự)
- Khác với anon key (không được nhầm lẫn)

## Troubleshooting

Nếu vẫn không tìm thấy sau khi thử tất cả options:

1. **Kiểm tra project permissions**: Đảm bảo bạn là owner/admin của project
2. **Contact Supabase support**: Nếu là project mới tạo, có thể cần vài phút để keys được generate
3. **Check Supabase documentation**: https://supabase.com/docs/guides/api

## Alternative: Tạo Key Mới (Nếu Cần)

Nếu không thể tìm thấy service_role key và bạn là project owner:

1. Settings → API → Service Role
2. Có thể có option để regenerate key
3. ⚠️ Lưu ý: Regenerate sẽ invalidate key cũ

