# BMAD Quick Checklist - Từ Ý Tưởng Đến Triển Khai

## 🚀 Phase 1: Analysis

- [ ] **workflow-init** - Khởi tạo dự án
- [ ] **brainstorm-project** - Khám phá ý tưởng
- [ ] **research** (optional) - Nghiên cứu thị trường/công nghệ
- [ ] **domain-research** (optional) - Nghiên cứu domain phức tạp
- [ ] **product-brief** - Định nghĩa tầm nhìn sản phẩm

## 📋 Phase 2: Planning

- [ ] **create-ux-design** (optional) - Thiết kế UX nếu có UI
- [ ] **prd** (Enterprise track) HOẶC **tech-spec** (Quick Flow track)
  - [ ] PRD: Cho dự án phức tạp, nhiều tính năng
  - [ ] Tech Spec: Cho dự án đơn giản, triển khai nhanh

## 🏗️ Phase 3: Solutioning

- [ ] **architecture** - Thiết kế kiến trúc hệ thống
- [ ] **create-epics-and-stories** (nếu cần điều chỉnh)
- [ ] **implementation-readiness** - Validate trước khi code

## 💻 Phase 4: Implementation

- [ ] **story-ready** - Chuẩn bị story
- [ ] **story-context** - Lấy context
- [ ] **dev-story** - Phát triển
- [ ] **story-done** - Hoàn thành và validate

---

## 🎯 Chọn Track Phù Hợp

### Enterprise/Complex Track

→ Sử dụng **prd** workflow
→ Phù hợp: Dự án lớn, phức tạp, nhiều stakeholders

### Quick Flow Track

→ Sử dụng **tech-spec** workflow
→ Phù hợp: Dự án đơn giản, feature mới, cần nhanh

---

## 📝 Cách Sử Dụng

Trong Cursor, reference workflow:

```
@bmad/bmm/workflows/{workflow-name}
```

Ví dụ:

```
@bmad/bmm/workflows/product-brief
```

---

## 📁 Output Files Quan Trọng

- `bmm-workflow-status.yaml` - Theo dõi tiến độ
- `product-brief-*.md` - Tầm nhìn sản phẩm
- `prd.md` hoặc `tech-spec.md` - Yêu cầu kỹ thuật
- `architecture.md` - Kiến trúc hệ thống
- `epics.md` - Epics và stories
- `ux-design-specification.md` - Thiết kế UX (nếu có)
- `implementation-readiness-report-*.md` - Báo cáo readiness

---

## ⚡ Quick Start

1. Chạy: `@bmad/bmm/workflows/workflow-init`
2. Chạy: `@bmad/bmm/workflows/brainstorm-project`
3. Chạy: `@bmad/bmm/workflows/product-brief`
4. Chọn track và tiếp tục!

---

Xem hướng dẫn chi tiết: [BMAD-Guide-From-Idea-to-Implementation.md](./BMAD-Guide-From-Idea-to-Implementation.md)
