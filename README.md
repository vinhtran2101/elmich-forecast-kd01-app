# Elmich Forecast KD01 App

Frontend prototype cho hệ thống Elmich Ops / Forecast Management KD01.

## Stack

- Vite + React
- lucide-react icons
- CSS thuần trong `src/styles.css`
- UI hiện vẫn chạy mock data, đã có Vercel API routes để kết nối PostgreSQL

## Chạy Local

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

## PostgreSQL / Vercel API

API routes đã sẵn sàng trong `api/`:

- `GET /api/db/health`: kiểm tra `DATABASE_URL` và kết nối PostgreSQL.
- `POST /api/db/migrate`: chạy `database/schema.sql`.
- `POST /api/db/seed`: seed mock data ban đầu vào PostgreSQL.
- `GET /api/data/bootstrap`: đọc dữ liệu PostgreSQL đã seed để kiểm tra.

Cần cấu hình Vercel Environment Variables:

```text
DATABASE_URL=postgresql://...
ADMIN_SETUP_TOKEN=chon-mot-token-rieng
```

Khởi tạo database sau khi deploy:

```bash
curl -X POST "https://<vercel-domain>/api/db/migrate" -H "x-setup-token: <ADMIN_SETUP_TOKEN>"
curl -X POST "https://<vercel-domain>/api/db/seed" -H "x-setup-token: <ADMIN_SETUP_TOKEN>"
curl "https://<vercel-domain>/api/db/health"
curl "https://<vercel-domain>/api/data/bootstrap"
```

Lưu ý: máy local hiện có thể bị chặn tải npm package, nên `pg` sẽ được cài khi Vercel deploy.

## Ghi Chú Triển Khai

Repo này thay thế frontend demo cũ của Lark App bằng giao diện KD01. Sau khi push lên GitHub, Vercel sẽ build lại từ branch production và link Lark Web App có thể tiếp tục trỏ vào deployment Vercel.
