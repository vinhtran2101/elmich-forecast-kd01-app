```yaml
---
name: build-frontend-framework-scratch
description: "Sử dụng khi agent cần hướng dẫn chi tiết cách xây dựng frontend web framework từ đầu, bao gồm Virtual DOM, Reconciliation, State Management và Component Lifecycle."
category: Software Engineering
subcategory: Frontend Development
source: "Build a Frontend Web Framework (From Scratch)"
version: "1.0"
tags: [frontend, framework, virtual-dom, reconciliation, state-management, component, javascript]
---
```

# Build a Frontend Web Framework (From Scratch) — Skill Reference

> **📖 Nguồn gốc**: Build a Frontend Web Framework (From Scratch) - Ángel Sola Orbaiceta
> **📚 Sources**: Part 1: No framework | Part 2: A basic framework | Part 3: Improving the framework
> **🎯 Mục đích**: Cung cấp nguyên lý và cách thực thi cốt lõi để tự xây dựng một frontend framework hoàn chỉnh sử dụng vanilla JavaScript.

## 🎯 Trigger Context
- **Personas**: Frontend Developer, Software Engineer, Framework Creator, JavaScript Instructor.
- **Auto-trigger keywords**: tạo frontend framework, tự viết framework, virtual DOM từ đầu, thuật toán reconciliation, diffing, patching, state management vanilla js, custom component framework, lifecycle scheduler.
- **Anti-triggers**: Cần xây dựng ứng dụng production ổn định (nên dùng React/Vue); cần tài liệu về backend framework.

## 🧠 Core Models / Frameworks
- **Virtual DOM Architecture**: Biểu diễn cấu trúc cây DOM dưới dạng JavaScript object nhẹ (Node) để dễ dàng tính toán trước khi áp dụng lên DOM thực.
- **Reconciliation Algorithm (Diffing & Patching)**: Thuật toán so sánh (diff) cây Virtual DOM cũ và mới, từ đó vá (patch) chính xác những thay đổi lên trình duyệt để tối ưu hiệu suất.
- **Stateful Component Model**: Đóng gói UI thành các khối độc lập có state, props, và lifecycle riêng biệt, giao tiếp qua cơ chế unidirectional data flow (props down, events up).

## Khi nào áp dụng Skill này?
| Dấu hiệu bài toán | Giải pháp đề xuất |
|--------------------|---------------------|
| Code trộn lẫn giữa application logic và DOM manipulation | **Virtual DOM & Rendering** (§1.1) |
| Render lại toàn bộ ứng dụng mỗi khi state đổi gây giật lag | **Reconciliation Algorithm** (§1.2) |
| State toàn cục phình to, khó bảo trì | **Stateful Components** (§2.1) |
| Subcomponents cần gửi dữ liệu ngược lên Parent | **Props & Events Communication** (§2.2) |
| Xóa phần tử trong danh sách gây sai lệch render | **Keyed Lists** (§2.3) |
| Call API lúc component mount làm chặn (block) render | **Lifecycle Hooks & Scheduler** (§3.1) |
| Cần test component có chứa logic async | **Async Testing (nextTick)** (§3.2) |

## §1. Kiến trúc Core (Rendering & Reconciliation)
### §1.1 Virtual DOM & Rendering — Tách biệt logic UI và DOM API
- **Trade-offs**: 
  | Phương pháp | Ưu điểm | Nhược điểm |
  |-------------|---------|------------|
  | Vanilla JS | Hiệu suất gốc cao nhất | Khó bảo trì, imperative code |
  | Virtual DOM | Declarative, code sạch, dễ tách component | Tốn chi phí tính toán (overhead) |
- **Before/After**:
  ```javascript
  // Before: Imperative Vanilla JS
  const p = document.createElement('p');
  p.className = 'foo';
  p.textContent = 'Hello';
  
  // After: Declarative Virtual DOM
  h('p', { class: 'foo' }, ['Hello'])
  ```
- **Use case**: Chuyển đổi mã tạo giao diện từ các chuỗi nối tiếp nhau sang hàm `h()` tạo cấu trúc cây JS Objects.

### §1.2 Reconciliation Algorithm — Tối ưu hóa cập nhật DOM
- **Before/After**:
  ```javascript
  // Before: Phá hủy và tạo lại toàn bộ DOM
  destroyDOM(vdom);
  mountDOM(newVdom, parentEl);
  
  // After: Patch DOM dựa trên sequence of operations (thêm, xóa, sửa, giữ nguyên)
  vdom = patchDOM(vdom, newVdom, parentEl);
  ```
- **Use case**: Khi cập nhật thuộc tính `class` của một button từ danh sách, framework chỉ patch phần class thay vì vẽ lại cả danh sách.

## §2. Kiến trúc Component (Component Architecture)
### §2.1 Stateful Components — Tự đóng gói logic và UI
- **Before/After**:
  ```javascript
  // Before: Stateless function
  function TodoList(state) { return h('ul', ...); }
  
  // After: Stateful Component class tạo bởi factory
  const TodoList = defineComponent({
    state(props) { return { count: 0 }; },
    render() { return h('div', {}, [this.state.count]); }
  });
  ```
- **Use case**: Thiết kế một `Counter` component tự theo dõi số đếm độc lập mà không cần báo cáo lên Global State.

### §2.2 Props & Events Communication — Giao tiếp giữa các Components
- **Before/After**:
  ```javascript
  // Component con phát sự kiện (Child)
  this.emit('remove-todo', i)
  
  // Component cha nhận sự kiện (Parent)
  h(TodoItem, { on: { 'remove-todo': (i) => this.updateState(...) } })
  ```
- **Use case**: Component `SearchField` phát sinh event `search` mang payload là chuỗi text lên component `App` cha để filter dữ liệu.

### §2.3 Keyed Lists — Theo dõi danh sách động
- **Trade-offs**:
  | Khóa (Key) | Kết quả thuật toán | Vấn đề |
  |------------|--------------------|--------|
  | Không có Key | Tái tạo lại toàn bộ branch bị lệch | Tổn thất hiệu suất rất lớn |
  | Dùng Index (`key=i`) | Lỗi UI khi phần tử bị dịch chuyển | Unpredictable reordering |
  | Dùng Unique ID | Diffing chính xác | Chuẩn mực nhất |
- **Before/After**:
  ```javascript
  // Before: Lỗi định danh
  todos.map((todo, i) => h(TodoItem, { key: i }))
  
  // After: Định danh duy nhất
  todos.map(todo => h(TodoItem, { key: todo.id }))
  ```
- **Use case**: Render danh sách Todo, giỏ hàng, bảng dữ liệu có chức năng thêm/sửa/xóa ở giữa danh sách.

## §3. Tối ưu & Vòng đời (Optimization & Lifecycle)
### §3.1 Lifecycle Hooks & Scheduler — Xử lý bất đồng bộ không chặn render
- **Trade-offs**: 
  | Cách thực thi | Đặc điểm |
  |---------------|----------|
  | Await lúc Mount | Chặn luồng render các component phía sau |
  | Event Loop Microtask | Tách việc call API sang `queueMicrotask`, đảm bảo render mượt mà |
- **Before/After**:
  ```javascript
  // Scheduler Pattern
  export function enqueueJob(job) {
    jobs.push(job);
    queueMicrotask(processJobs); // Đẩy vào microtask queue
  }
  ```
- **Use case**: Gọi API fetch dữ liệu trong hàm `onMounted()` và render màn hình "Loading..." tạm thời.

### §3.2 Async Testing (nextTick) — Chờ DOM cập nhật để test
- **Before/After**:
  ```javascript
  // Test code cần flushPromises
  button.click();
  await nextTick(); // Chờ Scheduler hoàn tất microtasks
  expect(document.body.innerHTML).toContain('Result');
  ```
- **Use case**: Viết unit test (Vitest/Jest) cho component có chứa `onMounted` bất đồng bộ.

## Quick Checklist
- [ ] Hàm `h()` tạo được 3 loại Virtual Node cốt lõi: Text, Element, Fragment.
- [ ] Hàm `mountDOM()` gắn `el` (reference DOM thực) vào Virtual Node.
- [ ] Thuật toán `arraysDiffSequence()` xuất ra đúng mảng operations: `ADD`, `REMOVE`, `MOVE`, `NOOP`.
- [ ] `defineComponent()` factory bind đúng context `this` cho render và methods.
- [ ] Thuộc tính `key` đã được xóa khỏi `props` nội bộ của component thông qua `extractPropsAndEvents()`.
- [ ] Scheduler gom nhóm các hàm bất đồng bộ bằng `queueMicrotask` để không block first render.
- [ ] Sử dụng `nextTick()` để chờ Promise phân giải (flush) trong môi trường testing.

## 🔗 Related Skills
- **Vanilla JavaScript DOM API** — Chuyển sang dùng khi cần tối ưu micro-performance hoặc làm việc ngoài giới hạn của Virtual DOM.
- **Modern UI Frameworks (React/Vue Architecture)** — Áp dụng tư duy tương tự khi làm việc hoặc debug mã nguồn của các framework phổ biến hiện nay.