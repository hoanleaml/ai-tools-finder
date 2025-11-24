# AI Tools Finder - Product Requirements Document

**Author:** Hoan
**Date:** 2025-01-27
**Version:** 1.0

---

## Executive Summary

AI Tools Finder là một website tổng hợp các công cụ AI giúp người dùng tìm kiếm dễ dàng theo nhu cầu của họ. Hệ thống tự động cập nhật danh sách công cụ từ FutureTools.io, tích hợp affiliate marketing, và cung cấp nội dung AI News và Blog để tăng traffic và engagement.

### What Makes This Special

Điểm khác biệt của AI Tools Finder:

1. **Tự động hóa hoàn toàn**: Hệ thống tự động scrape và sync công cụ AI từ FutureTools.io hàng ngày, không cần can thiệp thủ công
2. **Affiliate Marketing thông minh**: Tự động phát hiện chương trình affiliate + admin confirmation workflow để tối ưu hóa revenue
3. **Content Generation tự động**: AI News (2-4 giờ/lần) và AI Blog (2-3 lần/tuần) tự động tạo nội dung để tăng traffic và SEO
4. **User Experience tối ưu**: Giao diện tham khảo aitoolfinder.io với tìm kiếm và filter mạnh mẽ

---

## Project Classification

**Technical Type:** web_app
**Domain:** general
**Complexity:** medium

### Project Classification Details

Đây là một web application được xây dựng với Next.js 16, kết hợp cả frontend và backend. Hệ thống có độ phức tạp trung bình do các tính năng:

- Web scraping và data synchronization
- AI content generation
- Affiliate link management
- Real-time updates và automation

Hệ thống không yêu cầu domain-specific compliance như healthcare hay fintech, nhưng cần đảm bảo:

- Web scraping tuân thủ robots.txt và rate limiting
- Content generation tuân thủ copyright và quality standards
- Affiliate tracking tuân thủ privacy regulations

---

## Success Criteria

### Primary Success Metrics

1. **Tool Coverage**: Index được 1000+ công cụ AI từ FutureTools.io và các nguồn khác
2. **Daily Updates**: Hệ thống tự động phát hiện và thêm công cụ mới hàng ngày với accuracy > 95%
3. **Traffic Growth**:
   - AI News section tạo 50+ articles/tháng
   - AI Blog section tạo 8-12 posts/tháng
   - Organic traffic tăng 20% mỗi tháng trong 6 tháng đầu
4. **Affiliate Performance**:
   - 30%+ công cụ có affiliate program được phát hiện và xác nhận
   - Conversion rate từ affiliate links > 2%

### User Engagement Metrics

- Average session duration > 3 phút
- Bounce rate < 50%
- Return visitor rate > 30%
- Search usage: 60%+ users sử dụng search/filter

### Business Metrics

- Monthly recurring revenue từ affiliate (target: $500+/tháng trong 6 tháng)
- Cost per acquisition (CPA) từ content marketing < $10
- Content production cost (AI generation) < $50/tháng

---

## Product Scope

### MVP - Minimum Viable Product

**Core Features:**

1. **Tool Discovery & Sync System**
   - Scrape danh sách công cụ từ FutureTools.io (sort by go-live-date)
   - Daily sync từ trang newly-added
   - So sánh và detect công cụ mới tự động
   - Auto-generate tool data tương tự aitoolfinder.io nếu chưa có

2. **User-Facing Website**
   - Browse và search công cụ AI
   - Filter theo categories, pricing, features
   - Tool detail pages với đầy đủ thông tin
   - Responsive design cho mobile và desktop

3. **Admin Dashboard**
   - Dashboard quản lý tất cả công cụ
   - Filter tools có/không có affiliate program
   - CRUD operations cho tools
   - Update affiliate links
   - Manual tool creation/editing

4. **Basic Affiliate Management**
   - Manual affiliate link entry
   - Affiliate link tracking và redirect
   - Basic analytics

### Growth Features (Post-MVP)

1. **AI News System**
   - Auto-fetch từ 2-3 nguồn uy tín (TechCrunch, The Verge, AI News)
   - Update mỗi 2-4 giờ
   - News feed với pagination
   - News detail pages với SEO optimization

2. **AI Blog System**
   - Auto-generate blog posts (hybrid: AI generate + admin review)
   - Topics: tool reviews, best practices, comparisons
   - Schedule: 2-3 posts/tuần
   - Admin review/edit workflow trước khi publish
   - SEO optimization

3. **Advanced Affiliate Management**
   - Auto-detect affiliate programs (crawl tool websites)
   - Admin confirmation workflow
   - Advanced tracking và analytics
   - Revenue reporting dashboard

4. **Enhanced User Features**
   - User accounts và favorites
   - Email newsletters
   - Tool comparison feature
   - User reviews và ratings

### Vision (Future)

1. **Community Features**
   - User-generated content
   - Community reviews
   - Discussion forums
   - Tool recommendations based on user behavior

2. **Advanced AI Features**
   - AI-powered tool recommendations
   - Personalized search results
   - Natural language search queries
   - AI chatbot for tool discovery

3. **Monetization Expansion**
   - Premium subscriptions
   - Sponsored tool listings
   - API access for developers
   - White-label solutions

4. **Data & Analytics**
   - Public API for tool data
   - Analytics dashboard cho tool owners
   - Market trends và insights
   - Usage statistics và reports

---

## Web Application Specific Requirements

### Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Design

- Desktop: 1920px, 1440px, 1280px breakpoints
- Tablet: 768px, 1024px breakpoints
- Mobile: 320px, 375px, 414px breakpoints

### Performance Targets

- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1

### SEO Strategy

- Server-side rendering (SSR) với Next.js
- Dynamic meta tags cho mỗi tool page
- Structured data (JSON-LD) cho tools
- Sitemap generation tự động
- Robots.txt configuration
- Open Graph và Twitter Card tags

### Accessibility Level

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios đạt chuẩn
- Focus indicators rõ ràng

---

## User Experience Principles

### Visual Personality

- **Modern & Clean**: Giao diện hiện đại, tối giản, tập trung vào nội dung
- **Professional yet Approachable**: Cân bằng giữa chuyên nghiệp và thân thiện
- **AI-Focused**: Sử dụng màu sắc và iconography liên quan đến AI/tech
- **Trustworthy**: Thiết kế tạo cảm giác đáng tin cậy cho affiliate links

### Key Interactions

1. **Tool Discovery Flow**
   - Landing page với featured tools
   - Search bar prominent ở header
   - Filter sidebar với categories, pricing, features
   - Infinite scroll hoặc pagination cho tool listings
   - Quick preview trên hover

2. **Tool Detail Flow**
   - Rich tool information page
   - Screenshots/demos
   - Pricing information
   - Feature highlights
   - Clear CTA với affiliate link
   - Related tools suggestions

3. **Admin Dashboard Flow**
   - Overview dashboard với statistics
   - Tool management table với filters
   - Quick actions (edit, delete, approve)
   - Bulk operations
   - Affiliate link management interface

4. **Content Consumption Flow**
   - News feed với categories
   - Blog post listings với featured images
   - Reading experience tối ưu
   - Related content suggestions
   - Social sharing buttons

---

## Functional Requirements

### FR1: Tool Discovery & Synchronization

**FR1.1**: Hệ thống có thể scrape danh sách công cụ AI từ FutureTools.io với sorting theo go-live-date (descending)

**FR1.2**: Hệ thống có thể sync công cụ mới từ trang FutureTools.io/newly-added hàng ngày

**FR1.3**: Hệ thống có thể so sánh công cụ mới với danh sách hiện có để detect duplicates

**FR1.4**: Hệ thống có thể tự động tạo tool data entry mới nếu công cụ chưa tồn tại trong database

**FR1.5**: Hệ thống có thể auto-generate tool metadata (description, features, pricing) tương tự aitoolfinder.io nếu chưa có

**FR1.6**: Hệ thống có thể lưu trữ scraping history và logs để tracking

**FR1.7**: Hệ thống có thể handle scraping errors và retry logic

**FR1.8**: Hệ thống có thể respect rate limiting để tránh bị block từ FutureTools.io

### FR2: User-Facing Tool Discovery

**FR2.1**: Người dùng có thể browse danh sách công cụ AI với pagination hoặc infinite scroll

**FR2.2**: Người dùng có thể search công cụ theo tên, description, hoặc keywords

**FR2.3**: Người dùng có thể filter công cụ theo:

- Categories (text generation, image generation, code, etc.)
- Pricing model (free, freemium, paid, one-time)
- Features (API access, browser extension, mobile app, etc.)
- Launch date range

**FR2.4**: Người dùng có thể view tool detail page với đầy đủ thông tin:

- Tool name và logo
- Description
- Key features
- Pricing information
- Screenshots/demos
- Website link
- Affiliate link (nếu có)

**FR2.5**: Người dùng có thể click affiliate link để redirect với tracking

**FR2.6**: Người dùng có thể share tool trên social media

**FR2.7**: Người dùng có thể xem related tools dựa trên categories

### FR3: Admin Dashboard & Management

**FR3.1**: Admin có thể đăng nhập vào dashboard với authentication

**FR3.2**: Admin có thể view dashboard overview với statistics:

- Total tools count
- New tools today/this week
- Tools với affiliate programs
- Pending reviews

**FR3.3**: Admin có thể view danh sách tất cả công cụ trong table format

**FR3.4**: Admin có thể filter tools theo:

- Có/không có affiliate program
- Categories
- Status (active, pending, archived)
- Date range

**FR3.5**: Admin có thể create tool mới manually với form input

**FR3.6**: Admin có thể edit tool information (name, description, features, pricing, etc.)

**FR3.7**: Admin có thể delete hoặc archive tools

**FR3.8**: Admin có thể update affiliate links cho tools

**FR3.9**: Admin có thể bulk operations (bulk edit, bulk delete, bulk approve)

**FR3.10**: Admin có thể view và manage scraping jobs và logs

### FR4: AI News System

**FR4.1**: Hệ thống có thể auto-fetch news từ 2-3 nguồn uy tín (TechCrunch, The Verge, AI News - cần xác định cụ thể)

**FR4.2**: Hệ thống có thể update news mỗi 2-4 giờ tự động

**FR4.3**: Hệ thống có thể parse và extract news content (title, summary, content, images, source, date)

**FR4.4**: Hệ thống có thể detect và filter duplicate news

**FR4.5**: Người dùng có thể view news feed với pagination

**FR4.6**: Người dùng có thể view news detail page với full content

**FR4.7**: Người dùng có thể filter news theo date, source, hoặc category

**FR4.8**: Admin có thể review và moderate news trước khi publish (optional)

### FR5: AI Blog System

**FR5.1**: Hệ thống có thể auto-generate blog posts sử dụng AI (OpenAI/Anthropic APIs)

**FR5.2**: Hệ thống có thể generate blog posts về các topics:

- Tool reviews
- Best practices khi sử dụng công cụ AI
- Tool comparisons
- Industry trends
- How-to guides

**FR5.3**: Hệ thống có thể schedule blog posts (2-3 posts/tuần)

**FR5.4**: Hệ thống có thể generate SEO-optimized content (meta descriptions, keywords, headings)

**FR5.5**: Admin có thể review và edit blog posts trước khi publish

**FR5.6**: Admin có thể approve, reject, hoặc request revisions cho blog posts

**FR5.7**: Admin có thể manually create blog posts

**FR5.8**: Người dùng có thể view blog post listings với categories và tags

**FR5.9**: Người dùng có thể view blog post detail page với full content

**FR5.10**: Người dùng có thể share blog posts trên social media

### FR6: Affiliate Management

**FR6.1**: Hệ thống có thể auto-detect affiliate programs bằng cách crawl tool websites để tìm affiliate links hoặc affiliate program pages

**FR6.2**: Hệ thống có thể extract affiliate program information (program name, commission rate, link format)

**FR6.3**: Admin có thể review và confirm affiliate programs được phát hiện tự động

**FR6.4**: Admin có thể manually add affiliate links cho tools

**FR6.5**: Admin có thể update affiliate links khi có thay đổi

**FR6.6**: Hệ thống có thể track affiliate link clicks và conversions

**FR6.7**: Hệ thống có thể generate affiliate reports (clicks, conversions, revenue)

**FR6.8**: Admin có thể view affiliate analytics dashboard

**FR6.9**: Hệ thống có thể handle affiliate link redirects với proper tracking parameters

### FR7: Search & Filter System

**FR7.1**: Hệ thống có thể index tất cả tool data để search nhanh

**FR7.2**: Hệ thống có thể support full-text search trên tool names, descriptions, và features

**FR7.3**: Hệ thống có thể support fuzzy search để handle typos

**FR7.4**: Hệ thống có thể support filter combinations (multiple filters cùng lúc)

**FR7.5**: Hệ thống có thể save và restore filter states trong URL

**FR7.6**: Hệ thống có thể suggest search queries khi user typing

### FR8: Data Management

**FR8.1**: Hệ thống có thể store tool data trong Supabase database

**FR8.2**: Hệ thống có thể handle data relationships (tools, categories, features, affiliate links)

**FR8.3**: Hệ thống có thể backup data định kỳ

**FR8.4**: Hệ thống có thể export data (CSV, JSON) cho admin

**FR8.5**: Hệ thống có thể import data từ external sources

---

## Non-Functional Requirements

### Performance

**NFR1.1**: Page load time < 2 giây cho homepage và tool listings

**NFR1.2**: Search results phải hiển thị trong < 500ms

**NFR1.3**: Tool detail pages phải load trong < 1.5 giây

**NFR1.4**: Scraping jobs không được block user requests (chạy background)

**NFR1.5**: Database queries phải được optimize với proper indexing

**NFR1.6**: Images phải được optimized (WebP format, lazy loading, CDN)

**NFR1.7**: API responses phải có caching strategy (Next.js caching, Redis nếu cần)

### Scalability

**NFR2.1**: Hệ thống phải support 1000+ tools trong database

**NFR2.2**: Hệ thống phải handle concurrent scraping jobs (multiple tools cùng lúc)

**NFR2.3**: Hệ thống phải scale để handle 10,000+ daily visitors

**NFR2.4**: Database phải được optimize cho large datasets với proper indexing và pagination

**NFR2.5**: Hệ thống phải support horizontal scaling nếu cần (multiple server instances)

### Reliability

**NFR3.1**: Hệ thống phải có uptime > 99.5%

**NFR3.2**: Scraping errors phải được handle gracefully với retry logic (exponential backoff)

**NFR3.3**: Hệ thống phải có error logging và monitoring (Sentry, LogRocket, hoặc tương tự)

**NFR3.4**: Hệ thống phải có rate limiting để tránh bị block từ external sources

**NFR3.5**: Hệ thống phải có backup strategy cho database (daily backups)

**NFR3.6**: Hệ thống phải có fallback mechanisms khi external APIs fail

### Security

**NFR4.1**: Admin authentication phải sử dụng secure methods (Supabase Auth với 2FA optional)

**NFR4.2**: API endpoints phải có rate limiting để prevent abuse

**NFR4.3**: Input validation và sanitization cho tất cả user inputs

**NFR4.4**: XSS protection cho user-generated content

**NFR4.5**: CSRF protection cho admin actions

**NFR4.6**: SQL injection prevention (sử dụng parameterized queries với Supabase)

**NFR4.7**: Secure storage cho affiliate links và sensitive data

**NFR4.8**: HTTPS only cho tất cả communications

### Maintainability

**NFR5.1**: Code phải follow clean code principles và best practices

**NFR5.2**: Code phải có comprehensive logging cho debugging

**NFR5.3**: Hệ thống phải có error monitoring và alerting

**NFR5.4**: Documentation phải được maintain cho APIs và workflows

**NFR5.5**: Code phải có proper testing (unit tests, integration tests)

**NFR5.6**: Database schema phải được versioned và documented

### Integration

**NFR6.1**: Hệ thống phải integrate với Supabase cho database và authentication

**NFR6.2**: Hệ thống phải integrate với AI APIs (OpenAI/Anthropic) cho content generation

**NFR6.3**: Hệ thống phải integrate với external news sources (RSS feeds, APIs, hoặc scraping)

**NFR6.4**: Hệ thống phải support webhook integrations cho future expansions

---

## Technical Stack

### Frontend & Backend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS hoặc CSS Modules
- **UI Components**: shadcn/ui hoặc similar component library

### Database & Backend Services

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (cho images/files)
- **Real-time**: Supabase Realtime (nếu cần)

### Scraping & Automation

- **Scraping Library**: Cheerio hoặc Puppeteer
- **HTTP Client**: Fetch API hoặc Axios
- **Job Scheduling**: Vercel Cron Jobs hoặc external cron service

### AI & Content Generation

- **AI APIs**: OpenAI GPT-4 hoặc Anthropic Claude
- **Content Processing**: Custom logic với AI API integration

### Deployment

- **Hosting**: Vercel (recommended) hoặc self-hosted
- **CI/CD**: GitHub Actions hoặc Vercel Git integration
- **Monitoring**: Vercel Analytics + Sentry hoặc LogRocket

### Development Tools

- **Package Manager**: npm hoặc pnpm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript strict mode

---

_This PRD captures the essence of AI Tools Finder - a comprehensive AI tools aggregation platform with automated content generation and affiliate marketing capabilities._

_Created through collaborative discovery between Hoan and AI facilitator._
