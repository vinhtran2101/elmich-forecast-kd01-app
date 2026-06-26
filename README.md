# Elmich Forecast KD01 App

Frontend prototype cho hệ thống Elmich Ops / Forecast Management KD01.

## Stack

- Vite + React
- lucide-react icons
- CSS thuần trong `src/styles.css`
- Dữ liệu mock, chưa nối backend/Lark API thật

## Chạy local

```bash
npm install
npm run dev
```

Mở local:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

Output deploy nằm trong `dist/`.

## Ghi chú triển khai

Repo này thay thế frontend demo cũ của Lark App bằng giao diện KD01. Sau khi push lên GitHub, Vercel sẽ build lại từ branch production và link Lark Web App có thể tiếp tục trỏ vào deployment Vercel.
