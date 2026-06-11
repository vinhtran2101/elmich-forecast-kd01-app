```yaml
---
name: css-in-depth-mastery
description: "Sử dụng skill này khi cần xây dựng layout phức tạp, tối ưu hóa cấu trúc code CSS, xử lý các lỗi về UI (z-index, specificity), và áp dụng các tính năng CSS hiện đại như Flexbox, Grid, Cascade Layers, và Container Queries."
category: Frontend Development
subcategory: CSS
source: "CSS in Depth, Second Edition"
version: "1.0"
tags: [css, layout, flexbox, grid, responsive, cascade-layers, container-queries, modern-css]
---
```

# CSS in Depth, Second Edition — Skill Reference

> **📖 Nguồn gốc**: CSS in Depth, Second Edition - Keith J. Grant
> **📚 Sources**: Part 1: Fundamentals | Part 2: Mastering Layout | Part 3: Modern Code Organization | Part 4: Visual Enhancements | Part 5: Adding Motion
> **🎯 Mục đích**: Cung cấp giải pháp chuyên sâu để giải quyết các vấn đề CSS từ căn bản (cascade, box model) đến nâng cao (grid, scope, animations).

## 🎯 Trigger Context
- **Personas**: Frontend Developer, UI/UX Engineer, Web Developer.
- **Auto-trigger keywords**: layout, flexbox, CSS grid, z-index issue, specificity conflict, cascade layers, `@layer`, container queries, responsive design, OKLCH, BEM, CSS animations.
- **Anti-triggers**: Cần xử lý logic backend, thao tác cơ sở dữ liệu, viết luồng JavaScript không tương tác với UI.

## 🧠 Core Models / Frameworks
- **The Cascade & Specificity**: Hệ thống quy tắc cốt lõi xác định style nào sẽ được áp dụng khi có xung đột, bao gồm 6 tiêu chí: origin, inline, layer, specificity, scope proximity, và source order.
- **Modern Layout Model**: Chuyển đổi từ luồng tài liệu thông thường (document flow) sang kiến trúc layout 1D (Flexbox) và 2D (Grid).

## Khi nào áp dụng Skill này?
| Dấu hiệu bài toán | Giải pháp đề xuất |
|--------------------|---------------------|
| Style không ăn do class khác ghi đè, khó maintain | **Cascade Layers & Specificity** (§1.1) |
| Cần chia bố cục 1 chiều (hàng/cột), căn giữa linh hoạt | **Flexbox** (§2.1) |
| Cần xây dựng khung trang web 2 chiều phức tạp | **Grid Layout** (§2.2) |
| Component tái sử dụng bị vỡ giao diện khi đổi container | **Container Queries** (§3.1) |
| Modal/Dropdown bị che khuất bởi các thành phần khác | **Positioning & Stacking Context** (§4.1) |
| Cần quản lý màu sắc hiện đại, hỗ trợ dải màu rộng (wide-gamut) | **OKLCH & Custom Properties** (§5.1) |

## §1 Code Organization (Kiến trúc & Tổ chức)
### §1.1 Cascade Layers & Nesting — Quản lý mức độ ưu tiên của CSS
- **Trade-offs**: 
  | Giải pháp | Ưu điểm | Nhược điểm |
  |---|---|---|
  | `!important` | Xử lý nhanh xung đột | Phá vỡ cascade, gây nợ kỹ thuật. |
  | Specificity Hack | Tận dụng rule tự nhiên | Phải viết selector dài, khó scale. |
  | **Cascade Layers (`@layer`)** | Phân rõ quyền ưu tiên (ví dụ: `theme` đè `reset`) bất kể specificity. | Cần quy hoạch rõ ràng từ đầu dự án. |
- **Before/After**: 
  ```css
  /* Before: Specificity War */
  #main-nav a.button { background: blue; } 

  /* After: Cascade Layers */
  @layer reset, components;
  @layer components { .button { background: blue; } } /* Luôn thắng layer reset */
  ```
- **Use case**: Thiết lập kiến trúc dự án lớn với các layer: `reset`, `theme`, `global`, `layout`, `modules`, `utilities`.

### §1.2 Modular CSS & Scope — Giới hạn phạm vi ảnh hưởng của CSS
- **Concept**: Sử dụng `@scope` kết hợp BEM để ngăn styles của một module ảnh hưởng rò rỉ ra ngoài (scoping limit).
- **Use case**: Thiết kế Pattern Library (UI Kit), nơi các component như `Card` hay `Media Object` hoạt động độc lập, không bị ảnh hưởng bởi layout chứa nó.

## §2 Layout (Bố cục)
### §2.1 Flexbox — Căn chỉnh bố cục một chiều
- **Concept**: Giải quyết khoảng cách và sắp xếp dọc/ngang với `align-items`, `justify-content`, `flex-grow`, `flex-shrink`.
- **Use case**: Navigation bar, danh sách thẻ (tag list), căn giữa icon và text.

### §2.2 Grid Layout — Thiết kế lưới hai chiều
- **Concept**: Đặt phần tử vào các ô lưới (grid cells/areas) thông qua khai báo `grid-template-columns` và `grid-template-rows`.
- **Use case**: Bố cục trang chủ (Header, Main, Sidebar, Footer), Image Gallery tự động fill cột.

## §3 Responsive Design (Thích ứng thiết bị)
### §3.1 Container Queries — Responsive dựa trên Component
- **Concept**: Sử dụng `@container` để thay đổi style dựa vào kích thước của container chứa nó thay vì kích thước toàn màn hình (viewport).
- **Before/After**: Dùng `@media (min-width: 800px)` (phụ thuộc màn hình) chuyển sang `@container layout (width >= 450px)` (chỉ phụ thuộc vùng chứa cha).
- **Use case**: Xây dựng Widget/Card có thể đặt ở Sidebar (giao diện dọc) hoặc Main Content (giao diện ngang) mà không cần viết lại CSS.

### §3.2 Relative Units — Xây dựng Fluid Layout
- **Concept**: Sử dụng `rem` (root em), `em` (font-size nội tại), và viewport units (`vw`, `vh`) kết hợp `clamp()` để font chữ và padding tự động co giãn.
- **Use case**: Đặt `font-size: clamp(0.9rem, 0.5svw + 0.6em, 1.125rem);` ở thẻ html để tạo typography tự động co giãn mà không cần nhiều `@media` queries.

## §4 Positioning & Stacking (Định vị & Phân lớp)
### §4.1 Stacking Contexts & Z-index — Quản lý lớp hiển thị
- **Concept**: Định vị phần tử với `position` (absolute, fixed, sticky) sẽ loại bỏ chúng khỏi document flow thông thường và tạo ra Stacking Context mới (kết hợp với z-index).
- **Trade-offs**: Dùng z-index số lớn ngẫu nhiên (vd: `9999`) dễ gây lỗi mất kiểm soát; nên quản lý tập trung bằng CSS Custom Properties (Variables).
- **Use case**: Đặt Modal Dialog box (`position: fixed`) luôn nổi lên trên cùng, Dropdown menu (`position: absolute`) nằm dưới Modal.

## §5 Visual & Motion (Trực quan & Chuyển động)
### §5.1 Color Spaces & OKLCH — Thao tác màu sắc hiện đại
- **Concept**: Chuyển từ hex/rgb sang `oklch()` để có dải màu rộng (wide-gamut) và thao tác sáng tối (lightness), sắc độ (chroma), tông màu (hue) trực quan hơn.
- **Use case**: Dùng `color-mix()` để tự động sinh các biến thể màu nhạt/đậm từ màu brand chính cho các trạng thái hover/active.

### §5.2 Transitions & Animations — Tạo chuyển động UI
- **Concept**: Áp dụng `@keyframes` để tạo hoạt ảnh; dùng `transition` với `cubic-bezier()` (như `ease-in`, `ease-out`) để chuyển đổi trạng thái mượt mà.
- **Use case**: Fly-in card (dùng 3D transform `translateZ` và `rotateY`), hoặc loading spinner với `animation-iteration-count: infinite`.

## Quick Checklist
- [ ] Đã khai báo `box-sizing: border-box` trên toàn trang để padding/border không làm hỏng width/height chưa?
- [ ] Đã ưu tiên `rem`/`em` thay vì `px` cố định để đảm bảo layout linh hoạt chưa?
- [ ] Khi dùng `position: absolute/fixed`, đã kiểm soát z-index qua CSS variables chưa?
- [ ] Đã thêm query `@media (prefers-reduced-motion: reduce)` để tắt animation cho người dùng nhạy cảm với chuyển động chưa?
- [ ] Đã dùng tính năng logical properties (như `margin-inline` thay cho `margin-left/right`) để hỗ trợ layout đa ngôn ngữ chưa?

## 🔗 Related Skills
- **[Web Accessibility (a11y)]** — Khi cần đảm bảo giao diện hiển thị tốt với screen readers hoặc thao tác bàn phím (Focus states, Contrast ratios).
- **[JavaScript DOM Manipulation]** — Khi cần trigger các state như `.is-open`, `.is-active` để CSS áp dụng transition hoặc animation.