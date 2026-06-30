# Forecast KD01 Database v1

Mục tiêu của v1 là chuẩn hóa dữ liệu theo cấu trúc PostgreSQL, nhưng vẫn giữ UI demo chạy được bằng mock data cho tới khi backend/API được nối hoàn chỉnh.

## Thành Phần

1. `src/data/mockDatabase.js`
   - Chứa dữ liệu dạng bảng: `users`, `roles`, `forecast_cycles`, `forecast_tasks`, `forecast_files`...
   - Các quan hệ đang nối bằng id mock, ví dụ `forecastTask.forecastCycleId`, `forecastTask.channelId`, `userRole.userId`.

2. `src/data/mockViewModels.js`
   - Chuyển dữ liệu dạng bảng sang format UI hiện tại đang dùng.
   - Khi nối backend thật, lớp này có thể được thay bằng API data mapper.

3. `database/schema.sql`
   - Schema PostgreSQL cho backend thật.
   - Có khóa ngoại, unique constraint và index cơ bản.

4. `api/db/*`
   - `health`: kiểm tra kết nối DB.
   - `migrate`: chạy schema.
   - `seed`: seed mock data hiện tại vào PostgreSQL.

5. `api/data/bootstrap`
   - Đọc dữ liệu đã seed để kiểm tra database sau khi migrate/seed.

## Quy Trình Nối PostgreSQL

1. Tạo database PostgreSQL trên Neon hoặc Supabase.
2. Lấy `DATABASE_URL`.
3. Tạo `ADMIN_SETUP_TOKEN` riêng để bảo vệ API migrate/seed.
4. Set 2 biến này trong Vercel Environment Variables.
5. Deploy lại Vercel.
6. Gọi:

```bash
curl -X POST "https://<vercel-domain>/api/db/migrate" -H "x-setup-token: <ADMIN_SETUP_TOKEN>"
curl -X POST "https://<vercel-domain>/api/db/seed" -H "x-setup-token: <ADMIN_SETUP_TOKEN>"
curl "https://<vercel-domain>/api/db/health"
curl "https://<vercel-domain>/api/data/bootstrap"
```

## Bước Sau

- Đổi từng phần frontend từ mock state sang gọi API.
- Ưu tiên thứ tự: user/role -> khung kênh -> forecast cycle -> forecast task -> file -> thẩm định/phê duyệt.
- Không đưa secret Lark, database password hoặc service token vào frontend.
