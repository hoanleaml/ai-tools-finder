# Hướng Dẫn Sử Dụng BMAD: Từ Ý Tưởng Đến Triển Khai

## Tổng Quan

BMAD (BMad Method) là một phương pháp phát triển hệ thống có cấu trúc, giúp bạn chuyển đổi ý tưởng thành hệ thống hoàn chỉnh thông qua các workflow được định nghĩa rõ ràng. Tài liệu này hướng dẫn bạn sử dụng BMAD từ giai đoạn ý tưởng ban đầu.

## Quy Trình Phát Triển BMAD

BMAD chia quá trình phát triển thành 4 giai đoạn chính:

### **Phase 1: Analysis (Phân Tích)**

Khám phá và định hình ý tưởng

### **Phase 2: Planning (Lập Kế Hoạch)**

Chuyển đổi ý tưởng thành kế hoạch chi tiết

### **Phase 3: Solutioning (Thiết Kế Giải Pháp)**

Thiết kế kiến trúc và phân rã công việc

### **Phase 4: Implementation (Triển Khai)**

Phát triển và triển khai hệ thống

---

## Phase 1: Analysis - Từ Ý Tưởng Đến Tầm Nhìn

### Bước 1: Khởi Tạo Dự Án (workflow-init)

**Khi nào sử dụng:** Bắt đầu mọi dự án mới

**Cách sử dụng:**

```
@bmad/bmm/workflows/workflow-init
```

**Mục đích:**

- Xác định loại dự án (Greenfield/Brownfield)
- Thiết lập cấu trúc thư mục
- Tạo file cấu hình và workflow status

**Kết quả:** File `bmm-workflow-status.yaml` được tạo trong thư mục output

---

### Bước 2: Brainstorming (brainstorm-project)

**Khi nào sử dụng:** Khi bạn có ý tưởng ban đầu cần được khám phá và mở rộng

**Cách sử dụng:**

```
@bmad/bmm/workflows/brainstorm-project
```

**Mục đích:**

- Khám phá các khía cạnh khác nhau của ý tưởng
- Tạo ra nhiều góc nhìn và khả năng
- Xác định các vấn đề và cơ hội

**Kết quả:** File `brainstorm-*.md` chứa các ý tưởng đã được brainstorm

**Lưu ý:** Workflow này sử dụng CORE brainstorming workflow để tạo ra các ý tưởng đa dạng

---

### Bước 3: Nghiên Cứu (research) - Tùy Chọn

**Khi nào sử dụng:** Khi bạn cần hiểu rõ hơn về thị trường, đối thủ, hoặc công nghệ

**Cách sử dụng:**

```
@bmad/bmm/workflows/research
```

**Các loại nghiên cứu hỗ trợ:**

- **Market Research:** Nghiên cứu thị trường và người dùng
- **Deep Research:** Nghiên cứu sâu về một chủ đề cụ thể
- **Technical Research:** Đánh giá công nghệ và kiến trúc
- **Competitive Intelligence:** Phân tích đối thủ cạnh tranh
- **User Research:** Nghiên cứu người dùng
- **Domain Analysis:** Phân tích lĩnh vực

**Kết quả:** File `research-{type}-{date}.md` với các nguồn tham khảo và trích dẫn

**Đặc điểm:**

- Tự động tìm kiếm web (mặc định bật)
- Yêu cầu trích dẫn nguồn
- Xác minh thông tin từ nhiều nguồn

---

### Bước 4: Nghiên Cứu Domain (domain-research) - Tùy Chọn

**Khi nào sử dụng:** Khi dự án liên quan đến lĩnh vực phức tạp (y tế, tài chính, pháp lý...)

**Cách sử dụng:**

```
@bmad/bmm/workflows/domain-research
```

**Mục đích:**

- Khám phá các yêu cầu đặc thù của domain
- Hiểu các quy định và tiêu chuẩn
- Xác định các pattern và best practices

**Kết quả:** File `domain-brief.md` với thông tin về domain

---

### Bước 5: Product Brief (product-brief)

**Khi nào sử dụng:** Sau khi đã có ý tưởng rõ ràng và (tùy chọn) đã nghiên cứu

**Cách sử dụng:**

```
@bmad/bmm/workflows/product-brief
```

**Mục đích:**

- Định nghĩa tầm nhìn sản phẩm
- Xác định mục tiêu và giá trị cốt lõi
- Mô tả người dùng mục tiêu
- Xác định phạm vi MVP

**Input tự động:**

- Kết quả brainstorming (nếu có)
- Kết quả research (nếu có)
- Tài liệu dự án hiện có (nếu brownfield)

**Kết quả:** File `product-brief-{project_name}-{date}.md`

**Đặc điểm:**

- Workflow tương tác, hướng dẫn bạn qua từng bước
- Tự động tải các input liên quan
- Có template và checklist validation

---

## Phase 2: Planning - Từ Tầm Nhìn Đến Yêu Cầu

### Bước 6: UX Design (create-ux-design) - Tùy Chọn

**Khi nào sử dụng:** Khi sản phẩm có giao diện người dùng

**Cách sử dụng:**

```
@bmad/bmm/workflows/create-ux-design
```

**Mục đích:**

- Thiết kế trải nghiệm người dùng
- Tạo wireframes và mockups
- Xác định interaction patterns
- Chọn color themes và design directions

**Input tự động:**

- Product Brief
- PRD (nếu có)
- Epics (nếu có)
- Brainstorming results

**Kết quả:**

- `ux-design-specification.md`
- `ux-color-themes.html` (visual)
- `ux-design-directions.html` (visual)

**Đặc điểm:**

- Workflow hợp tác, tạo nhiều phương án thiết kế
- Tạo visual HTML để xem trước
- Lưu tiến độ tự động trong quá trình làm việc

---

### Bước 7A: PRD (prd) - Cho Dự Án Enterprise/Complex

**Khi nào sử dụng:**

- Dự án phức tạp, nhiều tính năng
- Cần phân tích chi tiết requirements
- Dự án enterprise-level

**Cách sử dụng:**

```
@bmad/bmm/workflows/prd
```

**Mục đích:**

- Tạo Product Requirements Document chi tiết
- Định nghĩa Functional Requirements (FRs)
- Định nghĩa Non-Functional Requirements (NFRs)
- Phân rã thành epics và stories (tự động)

**Input tự động:**

- Product Brief
- Research results
- Domain Brief (nếu có)
- Project documentation (nếu brownfield)

**Kết quả:**

- `prd.md` - Tài liệu yêu cầu sản phẩm đầy đủ
- Tự động tạo epics và stories

**Đặc điểm:**

- Sử dụng data-driven approach với project types và domain complexity
- Tự động phân rã thành epics
- Tích hợp với workflow status

---

### Bước 7B: Tech Spec (tech-spec) - Cho Dự Án Quick Flow

**Khi nào sử dụng:**

- Dự án đơn giản, thay đổi nhỏ
- Feature mới cho hệ thống hiện có
- Cần triển khai nhanh

**Cách sử dụng:**

```
@bmad/bmm/workflows/tech-spec
```

**Mục đích:**

- Tạo technical specification tập trung
- Tự động tạo epic + stories (1 story cho thay đổi đơn giản, 2-5 stories cho feature)

**Input tự động:**

- Product Brief (nếu có)
- Research results (nếu có)
- Project documentation (nếu brownfield)

**Kết quả:**

- `tech-spec.md` - Technical specification
- `epics.md` - Epics và stories

**Đặc điểm:**

- Nhanh gọn, không cần PRD
- Tự động xác định số lượng stories cần thiết
- Phù hợp cho quick iterations

---

## Phase 3: Solutioning - Từ Yêu Cầu Đến Thiết Kế

### Bước 8: Architecture (architecture)

**Khi nào sử dụng:** Sau khi có PRD hoặc Tech Spec

**Cách sử dụng:**

```
@bmad/bmm/workflows/architecture
```

**Mục đích:**

- Thiết kế kiến trúc hệ thống
- Đưa ra các quyết định kiến trúc quan trọng
- Chọn patterns và technologies
- Tối ưu cho AI-agent consistency

**Input tự động:**

- PRD hoặc Tech Spec
- Epics (nếu có)
- UX Design (nếu có)
- Project documentation (nếu brownfield)

**Kết quả:** `architecture.md` - Tài liệu kiến trúc với các quyết định

**Đặc điểm:**

- Intelligent, adaptive conversation (không dựa trên template cứng)
- Decision-focused để tránh conflict giữa các AI agents
- Sử dụng decision catalog và architecture patterns
- Tối ưu để các AI agents khác có thể đọc và hiểu

---

### Bước 9: Create Epics and Stories (create-epics-and-stories)

**Khi nào sử dụng:**

- Nếu chưa có epics/stories từ PRD
- Cần phân rã lại hoặc bổ sung

**Cách sử dụng:**

```
@bmad/bmm/workflows/create-epics-and-stories
```

**Mục đích:**

- Chuyển đổi PRD requirements thành epics và user stories
- Tổ chức stories thành các epics có thể deliver được
- Đảm bảo tất cả functional requirements được capture

**Input tự động:**

- PRD (required)
- Product Brief (optional)
- Domain Brief (optional)
- UX Design (optional)
- Architecture (optional)

**Kết quả:** `epics.md` - Epics và stories được tổ chức

**Lưu ý:**

- PRD workflow đã tự động tạo epics, bước này chỉ cần nếu muốn điều chỉnh
- Tech Spec workflow cũng đã tự động tạo epics và stories

---

### Bước 10: Implementation Readiness (implementation-readiness)

**Khi nào sử dụng:** Trước khi bắt đầu Phase 4 (Implementation)

**Cách sử dụng:**

```
@bmad/bmm/workflows/implementation-readiness
```

**Mục đích:**

- Validate tất cả artifacts đã hoàn chỉnh
- Đảm bảo PRD, UX Design, Architecture, Epics đã align
- Kiểm tra không có gaps hoặc contradictions
- Xác nhận MVP requirements đã được cover đầy đủ

**Input tự động:**

- PRD hoặc Tech Spec
- Epics
- Architecture
- UX Design (nếu có)

**Kết quả:** `implementation-readiness-report-{date}.md` - Báo cáo readiness

**Đặc điểm:**

- Tích hợp với workflow status
- Checklist validation đầy đủ
- Đảm bảo chất lượng trước khi implement

---

## Phase 4: Implementation - Phát Triển và Triển Khai

Sau khi hoàn thành Phase 3, bạn có đầy đủ:

- ✅ Product Brief hoặc Tech Spec
- ✅ PRD (cho complex projects) hoặc Tech Spec (cho quick flow)
- ✅ Architecture document
- ✅ Epics và User Stories
- ✅ UX Design (nếu có UI)
- ✅ Implementation Readiness Report

Bây giờ bạn có thể bắt đầu phát triển với các workflow:

### Development Workflows

- **story-ready:** Chuẩn bị story để bắt đầu development
- **story-context:** Lấy context đầy đủ cho một story
- **dev-story:** Phát triển một story cụ thể
- **story-done:** Hoàn thành và validate story

### Sprint Management

- **sprint-planning:** Lập kế hoạch sprint
- **retrospective:** Retrospective sau sprint

### Code Quality

- **code-review:** Review code
- **correct-course:** Điều chỉnh khi có vấn đề

---

## Hai Con Đường Phát Triển

### Con Đường 1: Enterprise/Complex Track

**Phù hợp cho:**

- Dự án lớn, phức tạp
- Nhiều stakeholders
- Cần documentation đầy đủ

**Quy trình:**

1. workflow-init
2. brainstorm-project
3. research (optional)
4. domain-research (optional)
5. product-brief
6. create-ux-design (optional)
7. **prd** ← Tạo PRD chi tiết
8. architecture
9. create-epics-and-stories (nếu cần điều chỉnh)
10. implementation-readiness
11. Implementation

### Con Đường 2: Quick Flow Track

**Phù hợp cho:**

- Dự án đơn giản
- Feature mới cho hệ thống hiện có
- Cần triển khai nhanh

**Quy trình:**

1. workflow-init
2. brainstorm-project (optional)
3. product-brief (có thể bỏ qua nếu đã rõ)
4. **tech-spec** ← Tạo Tech Spec (tự động tạo epics + stories)
5. architecture (optional, nếu cần)
6. implementation-readiness (optional)
7. Implementation

---

## Cách Sử Dụng Workflows

### Cách 1: Reference trong Cursor

Khi làm việc với AI trong Cursor, reference workflow bằng cách:

```
@bmad/bmm/workflows/{workflow-name}
```

Ví dụ:

```
@bmad/bmm/workflows/product-brief
```

### Cách 2: Sử dụng Agents

BMAD cung cấp các agents chuyên biệt:

- **@bmad/bmm/agents/pm** - Product Manager
- **@bmad/bmm/agents/architect** - System Architect
- **@bmad/bmm/agents/dev** - Developer
- **@bmad/bmm/agents/ux-designer** - UX Designer
- **@bmad/bmm/agents/analyst** - Business Analyst

Kết hợp agents với workflows để có trải nghiệm tốt nhất.

---

## Best Practices

### 1. Bắt Đầu Từ Đầu

Luôn bắt đầu với `workflow-init` để thiết lập cấu trúc dự án đúng cách.

### 2. Không Bỏ Qua Product Brief

Product Brief là nền tảng cho mọi quyết định sau này. Đầu tư thời gian vào bước này.

### 3. Research Khi Cần

Không phải mọi dự án đều cần research, nhưng khi cần thì nên làm sớm (trước Product Brief hoặc PRD).

### 4. Chọn Đúng Track

Xác định rõ dự án của bạn là Enterprise/Complex hay Quick Flow để chọn đúng workflow.

### 5. Validate Trước Khi Implement

Luôn chạy `implementation-readiness` trước khi bắt đầu code để tránh phải quay lại sau.

### 6. Sử Dụng Smart Input

Các workflows tự động tìm và load các input files liên quan. Đảm bảo đặt tên files đúng pattern.

### 7. Kiểm Tra Workflow Status

File `bmm-workflow-status.yaml` theo dõi tiến độ. Kiểm tra định kỳ để biết bạn đang ở đâu.

---

## Cấu Trúc Thư Mục

Sau khi chạy `workflow-init`, cấu trúc sẽ như sau:

```
project-root/
├── .bmad/
│   └── bmm/
│       ├── config.yaml
│       └── workflows/
├── docs/ (hoặc output_folder được config)
│   ├── bmm-workflow-status.yaml
│   ├── product-brief-*.md
│   ├── prd.md (hoặc tech-spec.md)
│   ├── architecture.md
│   ├── epics.md
│   ├── ux-design-specification.md
│   └── ...
└── ...
```

---

## Troubleshooting

### Workflow không tìm thấy input files?

- Kiểm tra tên file có đúng pattern không (ví dụ: `*brief*.md`, `*prd*.md`)
- Đảm bảo files nằm trong `output_folder` được config
- Kiểm tra `config.yaml` có đúng không

### Muốn bỏ qua một bước?

- Nhiều workflows có input optional
- Kiểm tra `input_file_patterns` trong workflow config để biết input nào là required

### Muốn điều chỉnh workflow?

- Các workflows là standalone và có thể customize
- Xem instructions trong `{installed_path}/instructions.md`

---

## Tài Liệu Tham Khảo

- BMAD Index: `@bmad/index`
- Workflow Status: `@bmad/bmm/workflows/workflow-status`
- CORE Workflows: `@bmad/core/workflows`

---

## Kết Luận

BMAD cung cấp một quy trình có cấu trúc để chuyển đổi ý tưởng thành hệ thống hoàn chỉnh. Bằng cách follow các workflows theo thứ tự, bạn đảm bảo:

1. ✅ Không bỏ sót bước quan trọng
2. ✅ Có documentation đầy đủ
3. ✅ Các artifacts align với nhau
4. ✅ Sẵn sàng cho implementation

**Bắt đầu ngay:** Chạy `@bmad/bmm/workflows/workflow-init` để khởi tạo dự án của bạn!
