# Forecast KD01 Database v1

Mục tiêu của v1 là chuẩn hóa dữ liệu theo cấu trúc gần PostgreSQL nhưng vẫn giữ app chạy bằng mock data.

## Luồng triển khai

1. `src/data/mockDatabase.js`
   - Chứa dữ liệu dạng bảng: `users`, `roles`, `forecast_cycles`, `forecast_tasks`, `forecast_files`...
   - Các quan hệ được nối bằng `id`, ví dụ `forecast_task.forecastCycleId`, `forecast_task.channelId`, `user_role.userId`.

2. `src/data/mockViewModels.js`
   - Chuyển dữ liệu dạng bảng sang format UI hiện tại đang dùng.
   - Khi nối backend thật, có thể thay lớp này bằng API mapper.

3. `database/schema.sql`
   - Schema PostgreSQL nháp cho backend thật.
   - Có khóa ngoại, unique constraint và index cơ bản.

## Bước tiếp theo khi nối database thật

1. Tạo database PostgreSQL trên Supabase hoặc Neon.
2. Chạy `database/schema.sql`.
3. Seed dữ liệu từ `src/data/mockDatabase.js`.
4. Tạo API đọc/ghi cho từng nhóm:
   - user/role/permission
   - forecast cycle
   - forecast task
   - forecast file
   - appraisal/approval
   - activity log
5. Thay `mockViewModels.js` bằng API data mapper.
