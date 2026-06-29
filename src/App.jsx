import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Circle,
  ClipboardList,
  Clock3,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  Gauge,
  Globe2,
  Grip,
  HelpCircle,
  Info,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
  Share2,
  Save,
  SquarePen,
  Star,
  Store,
  Trash2,
  Upload,
  UploadCloud,
  UserPlus,
  Users,
  X,
  ShoppingCart,
  Cloud,
  Lock,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, screen: "overview" },
  { label: "Lịch Forecast", icon: CalendarDays, screen: "list" },
  { label: "Công việc", icon: ClipboardList, screen: "tasks" },
  { label: "Thẩm định", icon: Star, screen: "appraisal" },
  { label: "Phê duyệt", icon: Check, screen: "approval" },
  { label: "Kho lưu trữ", icon: Folder, screen: "storage" },
  { label: "Quản trị hệ thống", icon: Settings, screen: "system-users" },
];

const recentRows = [
  {
    code: "FC-2026-07-MT",
    department: "Kênh MT",
    date: "20/07/2026",
    status: "Đã phát hành",
    sla: "Đúng hạn",
    mode: "success",
    action: "view",
  },
  {
    code: "FC-2026-07-EC",
    department: "Kênh TMĐT",
    date: "20/07/2026",
    status: "Chờ thẩm định",
    sla: "12:44:48",
    mode: "warning",
    action: "edit",
  },
  {
    code: "FC-2026-07-GT",
    department: "Kênh GT",
    date: "19/07/2026",
    status: "Cần điều chỉnh",
    sla: "Quá hạn 01 ngày",
    mode: "warning",
    action: "edit",
  },
];

const scheduleRows = [
  {
    title: "Forecast Tháng 07/2026",
    created: "24/06/2026",
    deadline: "22/07/2026",
    status: "Đang thực hiện",
    tone: "active",
  },
  {
    title: "Forecast Tháng 06/2026",
    created: "20/05/2026",
    deadline: "22/06/2026",
    status: "Kết thúc",
    tone: "ended",
  },
  {
    title: "Forecast Tháng 05/2026",
    created: "20/04/2026",
    deadline: "22/05/2026",
    status: "Kết thúc",
    tone: "ended-blue",
  },
  {
    title: "Forecast Tháng 04/2026",
    created: "20/03/2026",
    deadline: "22/04/2026",
    status: "Kết thúc",
    tone: "muted",
  },
];

const channelRows = [
  {
    channel: "Kênh GT - Miền Bắc",
    region: "Miền Bắc",
    director: "Nguyễn Văn Nam",
    directorBadge: "NN",
    rsm: "Trần Văn Hùng",
    rsmBadge: "TH",
    asms: ["ASM Hà Nội", "ASM Hải Phòng", "ASM Quảng Ninh"],
    more: "+2 nữa",
    tone: "blue",
  },
  {
    channel: "Kênh MT - Toàn Quốc",
    region: "Toàn Quốc",
    director: "Trần Thu Hà",
    directorBadge: "TH",
    rsm: "Lê Thị Thảo",
    rsmBadge: "LT",
    asms: ["ASM Siêu thị Miền Bắc", "ASM Siêu thị Miền Nam"],
    tone: "green",
  },
  {
    channel: "Kênh GT - Miền Nam",
    region: "Miền Nam",
    director: "Lê Minh Hoàng",
    directorBadge: "LH",
    rsm: "Nguyễn Minh Quân",
    rsmBadge: "NM",
    asms: ["ASM TP.HCM", "ASM Cần Thơ", "ASM Đồng Nai"],
    tone: "blue",
  },
  {
    channel: "Kênh TMĐT",
    region: "Toàn Quốc",
    director: "Phạm Tuyết Mai",
    directorBadge: "PM",
    rsm: "Phạm Khánh Linh",
    rsmBadge: "PK",
    asms: ["ASM Shopee/Lazada", "ASM TikTok Shop"],
    tone: "slate",
  },
];

const detailTaskRows = [
  {
    channel: "Kênh MT",
    owner: "Trần Văn A",
    deadline: "18/07/2026",
    file: "Forecast_MT_T07_2026_v2.xlsx",
    status: "Đã phát hành",
    statusTone: "success",
    icon: ShoppingCart,
    iconTone: "orange",
  },
  {
    channel: "Kênh TMĐT",
    owner: "Lê Thị B",
    deadline: "19/07/2026",
    sla: "SLA: 48h",
    upload: true,
    status: "Chờ thẩm định",
    statusTone: "warning",
    icon: Globe2,
    iconTone: "blue",
  },
  {
    channel: "Kênh GT",
    owner: "Nguyễn Văn C",
    deadline: "17/07/2026",
    danger: true,
    file: "Forecast_GT_T07_2026_v1.xlsx",
    status: "Cần điều chỉnh",
    statusTone: "danger",
    icon: Store,
    iconTone: "purple",
  },
  {
    channel: "Kênh Showroom",
    owner: "Đặng Văn D",
    deadline: "20/07/2026",
    emptyFile: "Chưa có file",
    status: "Đang nhập liệu",
    statusTone: "neutral",
    icon: Building2,
    iconTone: "slate",
  },
];

const taskRows = [
  {
    title: "Nhập Forecast SKU nhóm Gia dụng - Kênh TMĐT",
    channel: "Kênh TMĐT",
    owner: "Lê Quang Minh",
    ownerRole: "ASM TMĐT",
    deadline: "19/07/2026",
    due: "Còn 2 ngày tới hạn nộp file",
    progress: 75,
    status: "Đang nhập liệu",
    statusTone: "warning",
    marker: "blue",
  },
  {
    title: "Bổ sung Forecast WinMart+ Miền Bắc",
    channel: "Kênh MT",
    owner: "Chưa phân công",
    ownerRole: "",
    deadline: "18/07/2026",
    due: "Quá hạn 1 ngày",
    progress: 5,
    status: "Quá hạn SLA",
    statusTone: "danger",
    marker: "green",
  },
  {
    title: "Tổng hợp nhu cầu hàng KM đại lý GT Miền Tây",
    channel: "Kênh GT",
    owner: "Nguyễn Diệp Chi",
    ownerRole: "ASM GT Miền Tây",
    deadline: "20/07/2026",
    due: "Đã nộp file, chờ thẩm định",
    progress: 100,
    status: "Đã nộp",
    statusTone: "success",
    marker: "slate",
  },
  {
    title: "Forecast gói quà tặng B2B - Trung thu",
    channel: "Kênh B2B",
    owner: "Phạm Bảo Nam",
    ownerRole: "B2B Lead",
    deadline: "21/07/2026",
    due: "Còn 3 ngày tới hạn nộp file",
    progress: 30,
    status: "Cần bổ sung",
    statusTone: "warning",
    marker: "blue",
  },
];

const appraisalRows = [
  {
    channel: "Kênh MT",
    month: "Tháng 07/2026",
    sender: "Trần Văn A",
    sentAt: "10:30, 20/07/2026",
    file: "Forecast_MT_T07_2026_v2.xlsx",
    status: "Chờ thẩm định",
    statusTone: "warning",
    icon: Store,
    iconTone: "blue",
  },
  {
    channel: "Kênh TMĐT",
    month: "Tháng 07/2026",
    sender: "Lê Thị B",
    sentAt: "09:15, 20/07/2026",
    file: "Forecast_EC_T07_2026_v1.xlsx",
    status: "Chờ thẩm định",
    statusTone: "warning",
    icon: ShoppingCart,
    iconTone: "purple",
  },
  {
    channel: "Kênh GT",
    month: "Tháng 07/2026",
    sender: "Nguyễn Văn C",
    sentAt: "15:45, 19/07/2026",
    file: "Forecast_GT_T07_2026_v1.xlsx",
    status: "Cần điều chỉnh",
    statusTone: "danger",
    icon: Building2,
    iconTone: "green",
  },
];

const approvalRows = [
  {
    channel: "Kênh MT",
    month: "Tháng 07/2026",
    sender: "Trần Văn A",
    sentAt: "16:30, 21/07/2026",
    file: "Forecast_MT_T07_2026_v2.xlsx",
    status: "Đã phát hành",
    statusTone: "success",
    icon: Store,
    iconTone: "blue",
  },
  {
    channel: "Kênh TMĐT",
    month: "Tháng 07/2026",
    sender: "Lê Thị B",
    sentAt: "09:15, 22/07/2026",
    file: "Forecast_EC_T07_2026_v1.xlsx",
    status: "Chờ phê duyệt",
    statusTone: "danger",
    icon: ShoppingCart,
    iconTone: "purple",
  },
  {
    channel: "Kênh GT",
    month: "Tháng 07/2026",
    sender: "Nguyễn Văn C",
    sentAt: "15:45, 21/07/2026",
    file: "Forecast_GT_T07_2026_v2.xlsx",
    status: "Chờ phê duyệt",
    statusTone: "danger",
    icon: Building2,
    iconTone: "green",
  },
];

const workflowChannels = [
  {
    channel: "Kênh GT",
    region: "Miền Bắc",
    owner: "Nguyễn Diệp Chi",
    ownerRole: "ASM GT Miền Bắc",
    rsm: "Trần Văn Hùng",
    director: "Nguyễn Văn Nam",
    marker: "blue",
    icon: Store,
    iconTone: "blue",
  },
  {
    channel: "Kênh MT",
    region: "Toàn quốc",
    owner: "Trần Văn A",
    ownerRole: "ASM MT",
    rsm: "Lê Thị Thảo",
    director: "Trần Thu Hà",
    marker: "green",
    icon: ShoppingCart,
    iconTone: "orange",
  },
  {
    channel: "Kênh Showroom",
    region: "Miền Nam",
    owner: "Đặng Văn D",
    ownerRole: "ASM Showroom",
    rsm: "Trần Thị B",
    director: "Lê Minh Hoàng",
    marker: "slate",
    icon: Building2,
    iconTone: "green",
  },
  {
    channel: "Kênh TMĐT",
    region: "Toàn quốc",
    owner: "Lê Quang Minh",
    ownerRole: "ASM TMĐT",
    rsm: "Phạm Khánh Linh",
    director: "Phạm Tuyết Mai",
    marker: "blue",
    icon: Globe2,
    iconTone: "purple",
  },
];

const initialForecasts = [
  {
    id: "fc-2026-07",
    title: "Forecast Tháng 07/2026",
    month: "Tháng 07/2026",
    monthShort: "T07/2026",
    created: "24/06/2026",
    deadline: "22/07/2026",
    status: "Đang thực hiện",
    tone: "active",
    note: "Ưu tiên rà soát kênh TMĐT, MT và GT do có nhiều chương trình khuyến mãi tháng 07.",
    template: "Template_FC_KD01_T07_2026.xlsx",
  },
  {
    id: "fc-2026-06",
    title: "Forecast Tháng 06/2026",
    month: "Tháng 06/2026",
    monthShort: "T06/2026",
    created: "20/05/2026",
    deadline: "22/06/2026",
    status: "Phát hành",
    tone: "ended-blue",
    note: "Kỳ Forecast đã phát hành và lưu trữ chính thức.",
    template: "Template_FC_KD01_T06_2026.xlsx",
  },
];

const initialTasks = [
  {
    id: "task-2026-07-mt",
    forecastId: "fc-2026-07",
    title: "Forecast Kênh MT - Tháng 07/2026",
    channel: "Kênh MT",
    region: "Toàn quốc",
    owner: "Trần Văn A",
    ownerRole: "ASM MT",
    rsm: "Lê Thị Thảo",
    director: "Trần Thu Hà",
    deadline: "18/07/2026",
    due: "Đã được GĐKD duyệt",
    progress: 100,
    status: "GĐKD đã duyệt",
    statusTone: "success",
    marker: "green",
    file: "Forecast_MT_T07_2026_v2.xlsx",
    fileSize: "4.8 MB",
    icon: ShoppingCart,
    iconTone: "orange",
  },
  {
    id: "task-2026-07-ec",
    forecastId: "fc-2026-07",
    title: "Forecast Kênh TMĐT - Tháng 07/2026",
    channel: "Kênh TMĐT",
    region: "Toàn quốc",
    owner: "Lê Quang Minh",
    ownerRole: "ASM TMĐT",
    rsm: "Phạm Khánh Linh",
    director: "Phạm Tuyết Mai",
    deadline: "19/07/2026",
    due: "Còn 2 ngày tới hạn nộp file",
    progress: 35,
    status: "Chờ ASM cập nhật",
    statusTone: "warning",
    marker: "blue",
    file: "",
    fileSize: "",
    icon: Globe2,
    iconTone: "purple",
  },
  {
    id: "task-2026-07-gt",
    forecastId: "fc-2026-07",
    title: "Forecast Kênh GT - Tháng 07/2026",
    channel: "Kênh GT",
    region: "Miền Bắc",
    owner: "Nguyễn Diệp Chi",
    ownerRole: "ASM GT Miền Bắc",
    rsm: "Trần Văn Hùng",
    director: "Nguyễn Văn Nam",
    deadline: "17/07/2026",
    due: "Đã nộp file, chờ RSM duyệt",
    progress: 60,
    status: "Chờ RSM duyệt",
    statusTone: "warning",
    marker: "slate",
    file: "Forecast_GT_T07_2026_v1.xlsx",
    fileSize: "3.9 MB",
    icon: Store,
    iconTone: "blue",
  },
  {
    id: "task-2026-07-showroom",
    forecastId: "fc-2026-07",
    title: "Forecast Kênh Showroom - Tháng 07/2026",
    channel: "Kênh Showroom",
    region: "Miền Nam",
    owner: "Đặng Văn D",
    ownerRole: "ASM Showroom",
    rsm: "Trần Thị B",
    director: "Lê Minh Hoàng",
    deadline: "20/07/2026",
    due: "Chưa có file",
    progress: 10,
    status: "Chờ ASM cập nhật",
    statusTone: "neutral",
    marker: "blue",
    file: "",
    fileSize: "",
    icon: Building2,
    iconTone: "green",
  },
  {
    id: "task-2026-06-mt",
    forecastId: "fc-2026-06",
    title: "Forecast Kênh MT - Tháng 06/2026",
    channel: "Kênh MT",
    region: "Toàn quốc",
    owner: "Trần Văn A",
    ownerRole: "ASM MT",
    rsm: "Lê Thị Thảo",
    director: "Trần Thu Hà",
    deadline: "18/06/2026",
    due: "Đã phát hành",
    progress: 100,
    status: "Phát hành",
    statusTone: "success",
    marker: "green",
    file: "Forecast_MT_T06_2026_final.xlsx",
    fileSize: "4.1 MB",
    icon: ShoppingCart,
    iconTone: "orange",
  },
];

const initialEvents = [
  {
    id: "evt-1",
    tone: "blue",
    icon: Calendar,
    title: "Kỳ Forecast 07/2026 đã mở",
    body: "Hệ thống đã tạo task cho các kênh trong kỳ 07/2026.",
    time: "10 phút trước",
  },
  {
    id: "evt-2",
    tone: "green",
    icon: CheckCircle2,
    title: "Kênh MT đã được GĐKD duyệt",
    body: "Task Forecast MT sẵn sàng cho bước tổng hợp.",
    time: "2 giờ trước",
  },
  {
    id: "evt-3",
    tone: "red",
    icon: AlertTriangle,
    title: "Cảnh báo SLA Kênh GT",
    body: "Task GT đang chờ RSM duyệt, cần xử lý trước deadline.",
    time: "4 giờ trước",
  },
];

const initialPublishedFiles = [
  {
    id: "file-2026-06-mt",
    forecastId: "fc-2026-06",
    name: "Forecast_MT_T06_2026_final.xlsx",
    channel: "Kênh MT",
    month: "T06/2026",
    size: "4.1 MB",
    modified: "22/06/2026 14:30",
    owner: "Nguyễn Tú Anh",
    version: "v2.1",
  },
];

const adminUsers = [
  { id: "u-01", name: "Nguyễn Tú Anh", email: "tu.anh@elmich.vn", role: "Admin", scope: "Toàn hệ thống", status: "Active", initials: "NA", tone: "blue" },
  { id: "u-02", name: "Trần Văn A", email: "planning@elmich.vn", role: "Planning", scope: "Phòng Kế hoạch", status: "Active", initials: "TA", tone: "green" },
  { id: "u-03", name: "Lê Quang Minh", email: "asm.ec@elmich.vn", role: "ASM", scope: "Kênh TMĐT", status: "Active", initials: "LM", tone: "blue" },
  { id: "u-04", name: "Nguyễn Diệp Chi", email: "asm.gt@elmich.vn", role: "ASM", scope: "Kênh GT - Miền Bắc", status: "Active", initials: "DC", tone: "purple" },
  { id: "u-05", name: "Đặng Văn D", email: "asm.mt@elmich.vn", role: "ASM", scope: "Kênh MT - Toàn quốc", status: "Inactive", initials: "DD", tone: "slate" },
  { id: "u-06", name: "Lê Thị Thảo", email: "rsm.mt@elmich.vn", role: "RSM", scope: "Kênh MT", status: "Active", initials: "LT", tone: "green" },
  { id: "u-07", name: "Nguyễn Văn Nam", email: "gdkd@elmich.vn", role: "GĐKD", scope: "GT/MT/TMĐT", status: "Active", initials: "NN", tone: "blue" },
  { id: "u-08", name: "Bộ phận Cung ứng", email: "supply@elmich.vn", role: "Cung ứng", scope: "Tồn kho và khả năng cung ứng", status: "Active", initials: "CU", tone: "green" },
  { id: "u-09", name: "Phòng Tài chính", email: "finance@elmich.vn", role: "Tài chính", scope: "Giá vốn, margin, ngân sách", status: "Active", initials: "TC", tone: "orange" },
  { id: "u-10", name: "BI Team", email: "bi@elmich.vn", role: "BI", scope: "Dữ liệu bán hàng và lịch sử forecast", status: "Active", initials: "BI", tone: "purple" },
  { id: "u-11", name: "Kế hoạch Nhà máy", email: "factory@elmich.vn", role: "Nhà máy", scope: "Năng lực sản xuất và lịch giao hàng", status: "Active", initials: "NM", tone: "slate" },
  { id: "u-12", name: "CEO Office", email: "ceo@elmich.vn", role: "CEO", scope: "Phê duyệt cuối", status: "Active", initials: "CO", tone: "purple" },
  { id: "u-13", name: "Ban điều hành", email: "viewer@elmich.vn", role: "Viewer", scope: "Báo cáo và kho lưu trữ", status: "Active", initials: "VD", tone: "blue" },
];

const roleDefinitions = [
  { id: "admin", name: "Admin", description: "Toàn quyền cấu hình và giám sát Forecast KD01", scope: "Toàn hệ thống", users: 1, risk: "Cao" },
  { id: "planning", name: "Planning", description: "Tạo kỳ Forecast, tổng hợp file và trình hồ sơ", scope: "Phòng Kế hoạch", users: 1, risk: "Trung bình" },
  { id: "asm", name: "ASM", description: "Cập nhật file Forecast theo kênh được phân công", scope: "Theo kênh/vùng", users: 3, risk: "Thấp" },
  { id: "rsm", name: "RSM", description: "Rà soát và duyệt Forecast cấp quản lý vùng/kênh", scope: "Theo kênh", users: 1, risk: "Trung bình" },
  { id: "gdkd", name: "GĐKD", description: "Duyệt Forecast cấp Giám đốc kinh doanh", scope: "Theo khối kinh doanh", users: 1, risk: "Cao" },
  { id: "supply", name: "Cung ứng", description: "Thẩm định tồn kho, nguồn hàng và khả năng đáp ứng", scope: "Dữ liệu cung ứng", users: 1, risk: "Trung bình" },
  { id: "finance", name: "Tài chính", description: "Thẩm định giá vốn, biên lợi nhuận và ngân sách", scope: "Dữ liệu tài chính", users: 1, risk: "Cao" },
  { id: "bi", name: "BI", description: "Đối chiếu lịch sử bán hàng, dữ liệu forecast và báo cáo", scope: "Dữ liệu phân tích", users: 1, risk: "Trung bình" },
  { id: "factory", name: "Nhà máy", description: "Thẩm định năng lực sản xuất và lịch giao hàng", scope: "Dữ liệu sản xuất", users: 1, risk: "Trung bình" },
  { id: "ceo", name: "CEO", description: "Phê duyệt cuối và phát hành bản Forecast chính thức", scope: "Toàn công ty", users: 1, risk: "Cao" },
  { id: "viewer", name: "Viewer", description: "Chỉ xem báo cáo và kho lưu trữ", scope: "Theo phân quyền", users: 1, risk: "Thấp" },
];

const permissionMatrix = [
  { module: "Lịch Forecast", data: "Kỳ forecast", admin: "Toàn quyền", planning: "Tạo/Sửa", asm: "Xem", rsm: "Xem", gdkd: "Xem", supply: "Xem", finance: "Xem", bi: "Xem", factory: "Xem", ceo: "Xem", viewer: "Xem" },
  { module: "Giao việc kênh", data: "Task theo kênh", admin: "Toàn quyền", planning: "Phân công", asm: "Nhận việc", rsm: "Theo dõi", gdkd: "Xem", supply: "Không", finance: "Không", bi: "Không", factory: "Không", ceo: "Xem", viewer: "Không" },
  { module: "Nộp file Forecast", data: "File ASM/kênh", admin: "Toàn quyền", planning: "Theo dõi", asm: "Nộp/Sửa", rsm: "Xem", gdkd: "Xem", supply: "Không", finance: "Không", bi: "Không", factory: "Không", ceo: "Xem", viewer: "Không" },
  { module: "Duyệt kinh doanh", data: "File đã nộp", admin: "Toàn quyền", planning: "Theo dõi", asm: "Không", rsm: "Duyệt", gdkd: "Duyệt", supply: "Không", finance: "Không", bi: "Không", factory: "Không", ceo: "Xem", viewer: "Không" },
  { module: "Thẩm định Cung ứng", data: "Tồn kho/nguồn hàng", admin: "Toàn quyền", planning: "Trình hồ sơ", asm: "Không", rsm: "Xem", gdkd: "Xem", supply: "Thẩm định", finance: "Xem", bi: "Xem", factory: "Xem", ceo: "Xem", viewer: "Xem" },
  { module: "Thẩm định Tài chính", data: "Giá vốn/margin", admin: "Toàn quyền", planning: "Trình hồ sơ", asm: "Không", rsm: "Xem", gdkd: "Xem", supply: "Xem", finance: "Thẩm định", bi: "Xem", factory: "Không", ceo: "Xem", viewer: "Xem" },
  { module: "Thẩm định BI", data: "Lịch sử bán hàng", admin: "Toàn quyền", planning: "Trình hồ sơ", asm: "Không", rsm: "Xem", gdkd: "Xem", supply: "Xem", finance: "Xem", bi: "Thẩm định", factory: "Không", ceo: "Xem", viewer: "Xem" },
  { module: "Kế hoạch Nhà máy", data: "Năng lực sản xuất", admin: "Toàn quyền", planning: "Trình hồ sơ", asm: "Không", rsm: "Xem", gdkd: "Xem", supply: "Xem", finance: "Không", bi: "Xem", factory: "Thẩm định", ceo: "Xem", viewer: "Xem" },
  { module: "Phê duyệt CEO", data: "Bản cuối", admin: "Toàn quyền", planning: "Theo dõi", asm: "Không", rsm: "Không", gdkd: "Xem", supply: "Xem", finance: "Xem", bi: "Xem", factory: "Xem", ceo: "Duyệt", viewer: "Xem" },
  { module: "Kho lưu trữ", data: "File phát hành", admin: "Toàn quyền", planning: "Phát hành", asm: "Xem", rsm: "Xem", gdkd: "Xem", supply: "Xem", finance: "Xem", bi: "Xem", factory: "Xem", ceo: "Xem", viewer: "Xem" },
  { module: "Quản trị hệ thống", data: "User/role/SLA", admin: "Toàn quyền", planning: "Đề xuất", asm: "Không", rsm: "Không", gdkd: "Không", supply: "Không", finance: "Không", bi: "Không", factory: "Không", ceo: "Xem", viewer: "Không" },
];

const permissionActivityLog = [
  { id: "pa-01", title: "Cập nhật người dùng: Nguyễn Tú Anh", detail: "Admin -> Toàn hệ thống", time: "10:58 29/06/2026", tone: "blue" },
  { id: "pa-02", title: "Gán quyền: Phòng Tài chính", detail: "Tài chính -> Thẩm định giá vốn/margin", time: "10:42 29/06/2026", tone: "green" },
  { id: "pa-03", title: "Cập nhật phạm vi Planning", detail: "Thêm quyền phát hành file forecast chính thức", time: "09:20 29/06/2026", tone: "green" },
  { id: "pa-04", title: "Rà soát quyền Nhà máy", detail: "Giới hạn quyền ở dữ liệu năng lực sản xuất", time: "17:35 28/06/2026", tone: "orange" },
];

const permissionLevelOptions = [
  { value: "full", label: "Toàn quyền" },
  { value: "scoped", label: "Theo phạm vi" },
  { value: "view", label: "Chỉ xem" },
  { value: "locked", label: "Khóa" },
];

const previewNavModules = {
  overview: ["Lịch Forecast"],
  list: ["Lịch Forecast"],
  tasks: ["Giao việc kênh", "Nộp file Forecast"],
  appraisal: ["Thẩm định Cung ứng", "Thẩm định Tài chính", "Thẩm định BI", "Kế hoạch Nhà máy"],
  approval: ["Phê duyệt CEO"],
  storage: ["Kho lưu trữ"],
  "system-users": ["Quản trị hệ thống"],
};

const previewScreenModules = {
  overview: previewNavModules.overview,
  list: previewNavModules.list,
  detail: ["Lịch Forecast"],
  "create-1": ["Lịch Forecast"],
  "create-2": ["Lịch Forecast"],
  tasks: previewNavModules.tasks,
  "task-update": previewNavModules.tasks,
  appraisal: previewNavModules.appraisal,
  "appraisal-detail": previewNavModules.appraisal,
  approval: previewNavModules.approval,
  "approval-detail": previewNavModules.approval,
  storage: previewNavModules.storage,
  "storage-folder": previewNavModules.storage,
  "storage-file": previewNavModules.storage,
  "system-users": previewNavModules["system-users"],
  "system-permissions": previewNavModules["system-users"],
  "channel-config": previewNavModules["system-users"],
  "approval-config": previewNavModules["system-users"],
  "sla-config": previewNavModules["system-users"],
};

function normalizePermissionLevel(value) {
  if (value === "Toàn quyền") return "full";
  if (value === "Không") return "locked";
  if (value === "Xem") return "view";
  return "scoped";
}

function buildInitialPermissionDrafts() {
  return roleDefinitions.reduce((roleAcc, role) => {
    roleAcc[role.id] = permissionMatrix.reduce((matrixAcc, row) => {
      matrixAcc[row.module] = normalizePermissionLevel(row[role.id]);
      return matrixAcc;
    }, {});
    return roleAcc;
  }, {});
}

function getPermissionLevel(permissions, module) {
  return permissions?.[module] || "locked";
}

function hasPreviewAccess(permissions, modules = []) {
  if (!permissions) return true;
  return modules.some((module) => getPermissionLevel(permissions, module) !== "locked");
}

function isPreviewScreenAllowed(screen, permissions) {
  return hasPreviewAccess(permissions, previewScreenModules[screen] || []);
}

function getFirstPreviewScreen(permissions) {
  const firstNav = navItems.find((item) => hasPreviewAccess(permissions, previewNavModules[item.screen] || []));
  return firstNav?.screen || "overview";
}

function canEditPermission(permissions, module) {
  return ["full", "scoped"].includes(getPermissionLevel(permissions, module));
}

const statusToneMap = {
  "Nháp": "neutral",
  "Đang thực hiện": "success",
  "Chờ ASM cập nhật": "neutral",
  "ASM đã cập nhật": "warning",
  "Chờ RSM duyệt": "warning",
  "Chờ GĐKD duyệt": "warning",
  "GĐKD đã duyệt": "success",
  "Chờ thẩm định": "warning",
  "Hoàn thành thẩm định": "success",
  "Chờ CEO duyệt": "danger",
  "Phát hành": "success",
  "Không duyệt thẩm định": "danger",
  "CEO không duyệt": "danger",
  "Quá hạn": "danger",
};

function getStatusTone(status) {
  return statusToneMap[status] || "neutral";
}

function getForecastProgress(forecast, tasks) {
  if (!forecast) return 0;
  if (forecast.status === "Phát hành") return 100;
  const ownTasks = tasks.filter((task) => task.forecastId === forecast.id);
  if (!ownTasks.length) return 0;
  const total = ownTasks.reduce((sum, task) => sum + task.progress, 0);
  return Math.round(total / ownTasks.length);
}

function buildTasksForForecast(forecast) {
  const monthCode = forecast.monthShort.replace("/", "_");
  return workflowChannels.map((channel, index) => ({
    id: `${forecast.id}-${index}`,
    forecastId: forecast.id,
    title: `Forecast ${channel.channel} - ${forecast.month}`,
    channel: channel.channel,
    region: channel.region,
    owner: channel.owner,
    ownerRole: channel.ownerRole,
    rsm: channel.rsm,
    director: channel.director,
    deadline: index < 2 ? "18/08/2026" : "19/08/2026",
    due: "Chờ ASM upload file Forecast",
    progress: 0,
    status: "Chờ ASM cập nhật",
    statusTone: "neutral",
    marker: channel.marker,
    file: "",
    fileSize: "",
    icon: channel.icon,
    iconTone: channel.iconTone,
    template: `Template_FC_KD01_${monthCode}.xlsx`,
  }));
}

function nextEventId() {
  return `evt-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

function toDateInputValue(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function toDisplayDate(value) {
  if (!value) return "";
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  return `${match[3]}/${match[2]}/${match[1]}`;
}

function App() {
  const [screen, setScreen] = useState("overview");
  const [forecasts, setForecasts] = useState(initialForecasts);
  const [tasks, setTasks] = useState(initialTasks);
  const [events, setEvents] = useState(initialEvents);
  const [publishedFiles, setPublishedFiles] = useState(initialPublishedFiles);
  const [selectedForecastId, setSelectedForecastId] = useState("fc-2026-07");
  const [selectedTaskId, setSelectedTaskId] = useState("task-2026-07-ec");
  const [selectedFileId, setSelectedFileId] = useState("file-2026-06-mt");
  const [draftForecast, setDraftForecast] = useState({
    month: "Tháng 08/2026",
    deadline: "22/08/2026",
    time: "17:00",
    note: "",
  });
  const [toast, setToast] = useState("");
  const [permissionDrafts, setPermissionDrafts] = useState(buildInitialPermissionDrafts);
  const [previewRoleId, setPreviewRoleId] = useState("");

  const selectedForecast =
    forecasts.find((forecast) => forecast.id === selectedForecastId) || forecasts[0];
  const activeForecast =
    forecasts.find((forecast) => forecast.status !== "Phát hành") || selectedForecast;
  const selectedTask =
    tasks.find((task) => task.id === selectedTaskId) ||
    tasks.find((task) => task.forecastId === selectedForecast?.id) ||
    tasks[0];
  const selectedFile =
    publishedFiles.find((file) => file.id === selectedFileId) || publishedFiles[0];
  const previewRole = roleDefinitions.find((role) => role.id === previewRoleId);
  const previewPermissions = previewRole ? permissionDrafts[previewRole.id] : null;
  const previewScreenAllowed = isPreviewScreenAllowed(screen, previewPermissions);
  const canCreateForecast = !previewPermissions || canEditPermission(previewPermissions, "Lịch Forecast");

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const addEvent = ({ icon = CheckCircle2, tone = "blue", title, body }) => {
    setEvents((current) => [
      {
        id: nextEventId(),
        icon,
        tone,
        title,
        body,
        time: "Vừa xong",
      },
      ...current.slice(0, 7),
    ]);
  };

  const updateForecast = (forecastId, patch) => {
    setForecasts((current) =>
      current.map((forecast) =>
        forecast.id === forecastId ? { ...forecast, ...patch } : forecast
      )
    );
  };

  const updateTaskStatus = (taskId, patch, event) => {
    let nextTasks = [];
    let updatedTask;

    setTasks((current) => {
      nextTasks = current.map((task) => {
        if (task.id !== taskId) return task;
        updatedTask = {
          ...task,
          ...patch,
          statusTone: patch.status ? getStatusTone(patch.status) : task.statusTone,
        };
        return updatedTask;
      });
      return nextTasks;
    });

    if (updatedTask) {
      const ownTasks = nextTasks.filter((task) => task.forecastId === updatedTask.forecastId);
      const allBusinessApproved = ownTasks.length > 0 && ownTasks.every((task) => task.status === "GĐKD đã duyệt");
      if (allBusinessApproved) {
        updateForecast(updatedTask.forecastId, {
          status: "GĐKD đã duyệt",
          tone: "active",
        });
      }
    }

    if (event) addEvent(event);
  };

  const openForecast = (forecastId) => {
    setSelectedForecastId(forecastId);
    setScreen("detail");
  };

  const openTask = (taskId) => {
    setSelectedTaskId(taskId);
    setScreen("task-update");
  };

  const openAppraisal = (forecastId) => {
    setSelectedForecastId(forecastId);
    setScreen("appraisal-detail");
  };

  const openApproval = (forecastId) => {
    setSelectedForecastId(forecastId);
    setScreen("approval-detail");
  };

  const openFile = (fileId) => {
    setSelectedFileId(fileId);
    setScreen("storage-file");
  };

  const handlePreviewRole = (roleId) => {
    const role = roleDefinitions.find((item) => item.id === roleId);
    const permissions = permissionDrafts[roleId] || {};
    setPreviewRoleId(roleId);
    setScreen(getFirstPreviewScreen(permissions));
    showToast(`Đang xem trước giao diện vai trò ${role?.name || ""}.`);
  };

  const exitRolePreview = () => {
    setPreviewRoleId("");
    setScreen("system-permissions");
    showToast("Đã thoát chế độ xem trước.");
  };

  const handleCreateForecast = () => {
    const monthNumber = draftForecast.month.match(/(\d{2})\/(\d{4})/)?.[1] || "08";
    const year = draftForecast.month.match(/\/(\d{4})/)?.[1] || "2026";
    const id = `fc-${year}-${monthNumber}`;
    const forecast = {
      id,
      title: `Forecast ${draftForecast.month}`,
      month: draftForecast.month,
      monthShort: `T${monthNumber}/${year}`,
      created: "29/06/2026",
      deadline: draftForecast.deadline,
      status: "Đang thực hiện",
      tone: "active",
      note: draftForecast.note || "Mock kỳ Forecast mới, dùng để chạy thử tròn luồng trên app.",
      template: `Template_FC_KD01_T${monthNumber}_${year}.xlsx`,
    };

    if (forecasts.some((item) => item.id === id)) {
      showToast("Kỳ Forecast này đã tồn tại trong mock data.");
      return;
    }

    const generatedTasks = buildTasksForForecast(forecast);
    setForecasts((current) => [forecast, ...current]);
    setTasks((current) => [...generatedTasks, ...current]);
    setSelectedForecastId(id);
    setSelectedTaskId(generatedTasks[0]?.id || selectedTaskId);
    addEvent({
      icon: Calendar,
      tone: "blue",
      title: `${forecast.title} đã được tạo`,
      body: `Hệ thống đã sinh ${generatedTasks.length} task Forecast theo kênh.`,
    });
    showToast("Đã tạo lịch Forecast và sinh task mock.");
    setScreen("detail");
  };

  const handleTaskSubmit = (taskId, fileName, note) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    updateTaskStatus(
      taskId,
      {
        file: fileName,
        fileSize: "4.2 MB",
        due: "Đã nộp file, chờ RSM duyệt",
        progress: 55,
        status: "Chờ RSM duyệt",
      },
      {
        icon: Upload,
        tone: "green",
        title: `${task.channel} đã gửi file Forecast`,
        body: note || `${fileName} đã được upload và chuyển sang RSM duyệt.`,
      }
    );
    showToast("Đã gửi cập nhật, task chuyển sang chờ RSM duyệt.");
    setScreen("tasks");
  };

  const handleRsmApprove = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    updateTaskStatus(
      taskId,
      {
        due: "RSM đã duyệt, chờ GĐKD duyệt",
        progress: 75,
        status: "Chờ GĐKD duyệt",
      },
      {
        icon: CheckCircle2,
        tone: "blue",
        title: `RSM đã duyệt ${task.channel}`,
        body: `Task được chuyển sang ${task.director} phê duyệt cấp kinh doanh.`,
      }
    );
    showToast("RSM đã duyệt, chuyển tiếp GĐKD.");
  };

  const handleGdkdApprove = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    updateTaskStatus(
      taskId,
      {
        due: "Đã được GĐKD duyệt",
        progress: 100,
        status: "GĐKD đã duyệt",
      },
      {
        icon: CheckCircle2,
        tone: "green",
        title: `GĐKD đã duyệt ${task.channel}`,
        body: "Forecast kênh đã hoàn tất duyệt cấp kinh doanh.",
      }
    );
    showToast("GĐKD đã duyệt task.");
  };

  const handleSubmitAppraisal = (forecastId) => {
    updateForecast(forecastId, {
      status: "Chờ thẩm định",
      tone: "active",
    });
    addEvent({
      icon: Star,
      tone: "blue",
      title: "Hồ sơ đã trình thẩm định",
      body: "Các bộ phận Cung ứng, BI, Nhà máy và Tài chính nhận task thẩm định.",
    });
    showToast("Đã trình hồ sơ sang thẩm định.");
    setScreen("appraisal");
  };

  const handleAppraisalResult = (forecastId, approved) => {
    updateForecast(forecastId, {
      status: approved ? "Chờ CEO duyệt" : "Không duyệt thẩm định",
      tone: approved ? "active" : "muted",
    });
    addEvent({
      icon: approved ? CheckCircle2 : X,
      tone: approved ? "green" : "red",
      title: approved ? "Hoàn thành thẩm định" : "Thẩm định không duyệt",
      body: approved
        ? "Hồ sơ được chuyển sang CEO/BĐH phê duyệt cuối."
        : "Hồ sơ được trả về Phòng Kế hoạch để điều chỉnh.",
    });
    showToast(approved ? "Đã hoàn thành thẩm định, chuyển CEO duyệt." : "Đã trả hồ sơ về sau thẩm định.");
    setScreen(approved ? "approval" : "detail");
  };

  const handleApprovalResult = (forecastId, approved) => {
    const forecast = forecasts.find((item) => item.id === forecastId);
    if (!forecast) return;

    updateForecast(forecastId, {
      status: approved ? "Phát hành" : "CEO không duyệt",
      tone: approved ? "ended-blue" : "muted",
    });

    if (approved) {
      const fileId = `file-${forecastId}`;
      const file = {
        id: fileId,
        forecastId,
        name: `Forecast_${forecast.monthShort.replace("/", "_")}_final.xlsx`,
        channel: "Toàn công ty",
        month: forecast.monthShort,
        size: "5.6 MB",
        modified: "29/06/2026 16:30",
        owner: "Nguyễn Tú Anh",
        version: "v1.0",
      };
      setPublishedFiles((current) => {
        if (current.some((item) => item.id === fileId)) return current;
        return [file, ...current];
      });
      setSelectedFileId(fileId);
    }

    addEvent({
      icon: approved ? CheckCircle2 : X,
      tone: approved ? "green" : "red",
      title: approved ? `${forecast.title} đã phát hành` : `${forecast.title} bị CEO trả lại`,
      body: approved
        ? "Bản Forecast chính thức đã được đưa vào Kho lưu trữ."
        : "Phòng Kế hoạch cần điều chỉnh hồ sơ trước khi trình lại.",
    });
    showToast(approved ? "CEO đã duyệt, Forecast được phát hành." : "CEO không duyệt, hồ sơ được trả lại.");
    setScreen(approved ? "storage" : "detail");
  };

  const headerTitle =
    screen === "list"
      ? "Lịch Forecast"
      : screen === "storage-file"
        ? "File Details"
        : screen === "system-users"
          ? "Tài khoản"
          : screen === "system-permissions"
            ? "Phân quyền"
            : screen === "channel-config"
              ? "Cấu hình Khung Forecast"
              : screen === "approval-config"
                ? "Quản lý hệ thống"
                : screen === "sla-config"
                  ? "Cấu hình SLA"
        : "Forecast Management";
  const isBackScreen =
    screen === "create-1" ||
    screen === "create-2" ||
    screen === "detail" ||
    screen === "appraisal-detail" ||
    screen === "approval-detail" ||
    screen === "storage-file";

  return (
    <div className="app-shell">
      <Sidebar screen={screen} setScreen={setScreen} previewPermissions={previewPermissions} />
      <main className="main-shell">
        <Topbar
          title={headerTitle}
          showBack={isBackScreen}
          hideSearch={screen === "detail" || screen === "storage-file"}
          onBack={() => {
            if (screen === "create-2") setScreen("create-1");
            else if (screen === "appraisal-detail") setScreen("appraisal");
            else if (screen === "approval-detail") setScreen("approval");
            else if (screen === "storage-file") setScreen("storage-folder");
            else setScreen("list");
          }}
          search={
            screen === "list"
              ? "Tìm kiếm tài liệu, lịch..."
              : screen === "tasks"
                ? "Tìm kiếm task..."
              : screen === "task-update"
                ? "Tìm kiếm task, tệp, hoặc người dùng..."
              : screen === "appraisal" || screen === "appraisal-detail" || screen === "approval" || screen === "approval-detail"
                ? "Tìm kiếm task, hồ sơ..."
              : screen === "storage" || screen === "storage-folder" || screen === "storage-file"
                ? "Tìm kiếm file forecast, thư mục..."
              : screen === "system-users"
                ? "Tìm tên, email, vai trò..."
              : screen === "system-permissions"
                ? "Tìm vai trò hoặc quyền..."
              : screen === "channel-config"
                ? "Tìm kiếm kênh hoặc RSM..."
              : screen === "approval-config"
                ? "Tìm kiếm quy trình..."
              : screen === "sla-config"
                ? "Tìm kiếm cấu hình..."
              : screen === "create-1" || screen === "create-2"
                ? "Tìm kiếm quy trình..."
                : "Tìm kiếm forecast, task..."
          }
        />
        {previewRole && <RolePreviewBanner role={previewRole} onExit={exitRolePreview} />}
        <div className="content-area">
          {toast && <div className="mock-toast">{toast}</div>}
          {!previewScreenAllowed ? (
            <PreviewAccessDenied role={previewRole} onExit={exitRolePreview} />
          ) : (
            <>
          {screen === "overview" && (
            <Overview
              forecasts={forecasts}
              tasks={tasks}
              events={events}
              activeForecast={activeForecast}
              onCreate={canCreateForecast ? () => setScreen("create-1") : null}
            />
          )}
          {screen === "list" && (
            <ScheduleList
              forecasts={forecasts}
              tasks={tasks}
              onCreate={canCreateForecast ? () => setScreen("create-1") : null}
              onOpen={openForecast}
            />
          )}
          {screen === "detail" && (
            <ForecastDetail
              forecast={selectedForecast}
              tasks={tasks.filter((task) => task.forecastId === selectedForecast?.id)}
              progress={getForecastProgress(selectedForecast, tasks)}
              onOpenTask={openTask}
              onRsmApprove={handleRsmApprove}
              onGdkdApprove={handleGdkdApprove}
              onSubmitAppraisal={handleSubmitAppraisal}
            />
          )}
          {screen === "tasks" && (
            <TaskList
              tasks={tasks.filter((task) => task.forecastId === selectedForecast?.id)}
              onOpen={openTask}
              onRsmApprove={handleRsmApprove}
              onGdkdApprove={handleGdkdApprove}
            />
          )}
          {screen === "task-update" && (
            <TaskUpdate
              task={selectedTask}
              forecast={forecasts.find((forecast) => forecast.id === selectedTask?.forecastId)}
              onBack={() => setScreen("tasks")}
              onSubmit={handleTaskSubmit}
            />
          )}
          {screen === "appraisal" && (
            <AppraisalList
              forecasts={forecasts}
              tasks={tasks}
              events={events}
              onOpen={openAppraisal}
            />
          )}
          {screen === "appraisal-detail" && (
            <AppraisalDetail
              forecast={selectedForecast}
              tasks={tasks.filter((task) => task.forecastId === selectedForecast?.id)}
              onSubmit={handleAppraisalResult}
              onBack={() => setScreen("appraisal")}
            />
          )}
          {screen === "approval" && (
            <ApprovalList
              forecasts={forecasts}
              tasks={tasks}
              events={events}
              onOpen={openApproval}
            />
          )}
          {screen === "approval-detail" && (
            <ApprovalDetail
              forecast={selectedForecast}
              tasks={tasks.filter((task) => task.forecastId === selectedForecast?.id)}
              onSubmit={handleApprovalResult}
              onBack={() => setScreen("approval")}
            />
          )}
          {screen === "storage" && (
            <StoragePage
              level="root"
              forecasts={forecasts}
              files={publishedFiles}
              onOpenFolder={() => setScreen("storage-folder")}
              onOpenFile={openFile}
            />
          )}
          {screen === "storage-folder" && (
            <StoragePage
              level="folder"
              forecasts={forecasts}
              files={publishedFiles}
              onOpenFolder={() => setScreen("storage-file")}
              onOpenFile={openFile}
            />
          )}
          {screen === "storage-file" && (
            <StorageFileDetail
              file={selectedFile}
              forecast={forecasts.find((forecast) => forecast.id === selectedFile?.forecastId)}
            />
          )}
          {screen === "system-users" && (
            <SystemUsers
              onPermissions={() => setScreen("system-permissions")}
              onChannelConfig={() => setScreen("channel-config")}
              onApprovalConfig={() => setScreen("approval-config")}
              onSlaConfig={() => setScreen("sla-config")}
            />
          )}
          {screen === "system-permissions" && (
            <SystemPermissions
              onUsers={() => setScreen("system-users")}
              onChannelConfig={() => setScreen("channel-config")}
              onApprovalConfig={() => setScreen("approval-config")}
              onSlaConfig={() => setScreen("sla-config")}
              permissionDrafts={permissionDrafts}
              setPermissionDrafts={setPermissionDrafts}
              onPreviewRole={handlePreviewRole}
            />
          )}
          {screen === "channel-config" && (
            <ChannelFrameworkConfig
              onUsers={() => setScreen("system-users")}
              onPermissions={() => setScreen("system-permissions")}
              onApprovalConfig={() => setScreen("approval-config")}
              onSlaConfig={() => setScreen("sla-config")}
            />
          )}
          {screen === "approval-config" && (
            <ApprovalWorkflowConfig
              onUsers={() => setScreen("system-users")}
              onPermissions={() => setScreen("system-permissions")}
              onChannelConfig={() => setScreen("channel-config")}
              onSlaConfig={() => setScreen("sla-config")}
            />
          )}
          {screen === "sla-config" && (
            <SlaConfig
              onUsers={() => setScreen("system-users")}
              onPermissions={() => setScreen("system-permissions")}
              onChannelConfig={() => setScreen("channel-config")}
              onApprovalConfig={() => setScreen("approval-config")}
            />
          )}
          {screen === "create-1" && (
            <CreateForecastStepOne
              draft={draftForecast}
              setDraft={setDraftForecast}
              onCancel={() => setScreen("list")}
              onNext={() => setScreen("create-2")}
            />
          )}
          {screen === "create-2" && (
            <CreateForecastStepTwo
              draft={draftForecast}
              onBack={() => setScreen("create-1")}
              onFinish={handleCreateForecast}
            />
          )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function RolePreviewBanner({ role, onExit }) {
  return (
    <div className="role-preview-banner">
      <div>
        <span>Đang xem trước vai trò</span>
        <strong>{role.name}</strong>
        <small>{role.description}</small>
      </div>
      <button className="secondary-button" onClick={onExit}>
        <X size={18} />
        Thoát xem trước
      </button>
    </div>
  );
}

function PreviewAccessDenied({ role, onExit }) {
  return (
    <section className="preview-denied-card">
      <Lock size={28} />
      <h2>Vai trò {role?.name} không có quyền truy cập màn hình này</h2>
      <p>Các menu và khu vực không nằm trong phạm vi quyền đã được ẩn trong chế độ xem trước.</p>
      <button className="primary-button" onClick={onExit}>
        <X size={18} />
        Thoát xem trước
      </button>
    </section>
  );
}

function Sidebar({ screen, setScreen, previewPermissions }) {
  const visibleNavItems = previewPermissions
    ? navItems.filter((item) => hasPreviewAccess(previewPermissions, previewNavModules[item.screen] || []))
    : navItems;

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-mark">
            <BarChart3 size={20} />
          </div>
          <div>
            <strong>Elmich Ops</strong>
            <span>Operations Platform</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Điều hướng chính">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isDashboard =
              item.label === "Dashboard" && screen === "overview";
            const isForecastFlow =
              item.label === "Lịch Forecast" &&
              ["list", "detail", "create-1", "create-2"].includes(screen);
            const isTaskFlow =
              item.label === "Công việc" && ["tasks", "task-update"].includes(screen);
            const isAppraisalFlow =
              item.label === "Thẩm định" && ["appraisal", "appraisal-detail"].includes(screen);
            const isApprovalFlow =
              item.label === "Phê duyệt" && ["approval", "approval-detail"].includes(screen);
            const isStorageFlow =
              item.label === "Kho lưu trữ" && ["storage", "storage-folder", "storage-file"].includes(screen);
            const isSystemFlow =
              item.label === "Quản trị hệ thống" && ["system-users", "system-permissions", "channel-config", "approval-config", "sla-config"].includes(screen);
            const isActive = isDashboard || isForecastFlow || isTaskFlow || isAppraisalFlow || isApprovalFlow || isStorageFlow || isSystemFlow;

            return (
              <button
                key={item.label}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setScreen(item.screen)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="nav-item compact">
          <HelpCircle size={20} />
          <span>Hỗ trợ</span>
        </button>
        <button className="nav-item compact">
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title, search, showBack, hideSearch, onBack }) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        {showBack && (
          <button className="icon-button ghost" onClick={onBack} title="Quay lại">
            <ArrowLeft size={22} />
          </button>
        )}
        <h1>{title}</h1>
      </div>
      <div className="topbar-tools">
        {!hideSearch && (
          <label className="search-box">
            <Search size={20} />
            <input placeholder={search} />
          </label>
        )}
        <button className="icon-button" title="Thông báo">
          <Bell size={20} />
        </button>
        <button className="icon-button" title="Ứng dụng">
          <Grip size={20} />
        </button>
        <button className="icon-button optional" title="Trợ giúp">
          <CircleHelp size={20} />
        </button>
        <div className="user-chip">
          <strong>Nguyễn Tú Anh</strong>
          <span className="avatar">NA</span>
        </div>
      </div>
    </header>
  );
}

function Overview({
  onCreate,
  forecasts = initialForecasts,
  tasks = initialTasks,
  events = initialEvents,
  activeForecast,
}) {
  const currentForecast = activeForecast || forecasts[0];
  const forecastTasks = tasks.filter((task) => task.forecastId === currentForecast?.id);
  const submittedCount = forecastTasks.filter((task) => task.file).length;
  const totalTasks = forecastTasks.length || 1;
  const onTimeRate = Math.max(
    0,
    Math.round((forecastTasks.filter((task) => task.status !== "Quá hạn").length / totalTasks) * 100)
  );
  const appraisalCount = forecasts.filter((forecast) => forecast.status === "Chờ thẩm định").length;
  const approvalCount = forecasts.filter((forecast) => forecast.status === "Chờ CEO duyệt").length;

  return (
    <section className="page-flow">
      <div className="page-heading with-actions">
        <div>
          <h2>Tổng quan vận hành</h2>
          <p>Thứ Tư, 24 Tháng 6, 2026 • Kỳ Forecast đang mở: 07/2026</p>
        </div>
        <div className="action-row">
          <button className="secondary-button">
            <Filter size={18} />
            Lọc dữ liệu
          </button>
          {onCreate && (
            <button className="primary-button" onClick={onCreate}>
              <Plus size={18} />
              Tạo Forecast mới
            </button>
          )}
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard
          icon={Gauge}
          label="SLA đúng hạn"
          value={`${onTimeRate}%`}
          hint="+6%"
          tone="blue"
          footer={<div className="metric-progress"><span style={{ width: `${onTimeRate}%` }} /></div>}
        />
        <MetricCard
          icon={CheckCircle2}
          label="Kênh đã nộp file"
          value={`${submittedCount}/${totalTasks}`}
          hint={currentForecast?.monthShort || "Mock"}
          tone="green"
          footer={<span>{totalTasks - submittedCount} kênh còn chờ file</span>}
        />
        <MetricCard
          icon={ClipboardList}
          label="Chờ thẩm định"
          value={String(appraisalCount).padStart(2, "0")}
          hint="Mock workflow"
          tone="red"
          footer={<AvatarStack />}
        />
        <MetricCard
          icon={Clock3}
          label="Chờ CEO duyệt"
          value={String(approvalCount).padStart(2, "0")}
          hint="Sắp tới hạn"
          tone="soft-red"
          footer={<span>Deadline phê duyệt: {currentForecast?.deadline}</span>}
        />
      </div>

      <div className="overview-grid">
        <ChartPanel forecast={currentForecast} tasks={forecastTasks} />
        <NoticePanel events={events} />
      </div>

      <RecentApprovals forecasts={forecasts} tasks={tasks} />
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, hint, tone, footer }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`icon-badge ${tone}`}>
          <Icon size={21} />
        </span>
        <small className={`metric-hint ${tone}`}>{hint}</small>
      </div>
      <span className="eyebrow">{label}</span>
      <strong className="metric-value">{value}</strong>
      <div className="metric-footer">{footer}</div>
    </article>
  );
}

function AvatarStack() {
  return (
    <div className="avatar-stack" aria-label="Nhóm xử lý">
      <span>AT</span>
      <span>HN</span>
      <span>+8</span>
    </div>
  );
}

function ChartPanel({ forecast, tasks = [] }) {
  const bars = [
    { day: "T2", approved: 68, pending: 34 },
    { day: "T3", approved: 84, pending: 24 },
    { day: "T4", approved: 73, pending: 29 },
    { day: "T5", approved: 95, pending: 12 },
    { day: "T6", approved: 62, pending: 46 },
    { day: "T7", approved: 45, pending: 12 },
    { day: "CN", approved: 34, pending: 7 },
  ];

  return (
    <section className="panel chart-panel">
      <div className="panel-header">
        <div>
          <h3>Tiến độ kỳ Forecast 07/2026</h3>
          <p>Theo dõi số file kênh đã nộp và số file còn chờ thẩm định theo ngày</p>
        </div>
        <div className="legend">
          <span><i className="dot blue" />Đã xử lý</span>
          <span><i className="dot pale" />Còn chờ</span>
        </div>
      </div>
      <div className="bar-chart" aria-label="Biểu đồ trạng thái phê duyệt">
        {bars.map((bar) => (
          <div className="bar-group" key={bar.day}>
            <div className="bar-stack">
              <span className="pending" style={{ height: `${bar.pending}%` }} />
              <span className="approved" style={{ height: `${bar.approved}%` }} />
            </div>
            <strong>{bar.day}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function NoticePanel({ events = initialEvents }) {
  const notices = events.length ? events : [
    {
      icon: Calendar,
      tone: "blue",
      title: "Kỳ Forecast 07/2026 đã mở",
      body: "Các RSM/ASM bắt đầu nhập và tải file forecast theo kênh",
      time: "10 phút trước",
    },
    {
      icon: CheckCircle2,
      tone: "green",
      title: "Kênh MT đã được phát hành",
      body: "Bản chính thức đã được lưu vào Kho lưu trữ",
      time: "2 giờ trước",
    },
    {
      icon: AlertTriangle,
      tone: "red",
      title: "Cảnh báo SLA Task #4421",
      body: "Task Kênh GT quá hạn nộp file forecast",
      time: "4 giờ trước",
    },
    {
      icon: Upload,
      tone: "slate",
      title: "Cập nhật File mẫu Forecast mới",
      body: "Vui lòng sử dụng template v2.4 cho kỳ 07/2026",
      time: "Hôm qua",
    },
  ];

  return (
    <section className="panel notice-panel">
      <div className="panel-title-row">
        <h3>Thông báo kỳ Forecast</h3>
        <button>Xem tất cả</button>
      </div>
      <div className="notice-list">
        {notices.map((notice) => {
          const Icon = notice.icon;
          return (
            <article className="notice-item" key={notice.title}>
              <span className={`notice-icon ${notice.tone}`}>
                <Icon size={21} />
              </span>
              <div>
                <strong>{notice.title}</strong>
                <p>{notice.body}</p>
                <small>{notice.time}</small>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RecentApprovals({ forecasts = initialForecasts, tasks = initialTasks }) {
  const rows = [
    ...tasks.slice(0, 5).map((task) => ({
      code: task.id.replace("task-", "FC-"),
      department: task.channel,
      date: task.deadline,
      status: task.status,
      sla: task.due,
      mode: task.statusTone,
      action: task.file ? "view" : "edit",
    })),
    ...forecasts.slice(0, 2).map((forecast) => ({
      code: forecast.id.toUpperCase(),
      department: "Phòng Kế hoạch",
      date: forecast.deadline,
      status: forecast.status,
      sla: forecast.monthShort,
      mode: getStatusTone(forecast.status),
      action: "view",
    })),
  ].slice(0, 5);

  return (
    <section className="panel table-panel">
      <div className="panel-title-row">
        <h3>Tác vụ xử lý gần đây</h3>
        <button>Tải báo cáo <Download size={14} /></button>
      </div>
      <div className="data-table recent-table">
        <div className="table-head">
          <span>Mã FC / Task</span>
          <span>Kênh / Bộ phận</span>
          <span>Ngày gửi</span>
          <span>Trạng thái</span>
          <span>SLA còn lại</span>
          <span>Hành động</span>
        </div>
        {rows.map((row) => (
          <div className="table-row" key={row.code}>
            <span>{row.code}</span>
            <span>{row.department}</span>
            <span>{row.date}</span>
            <span><Badge tone={row.mode}>{row.status}</Badge></span>
            <span className={`sla-cell ${row.mode}`}>
              {row.sla}
              <i style={{ width: row.mode === "success" ? "68px" : "48px" }} />
            </span>
            <span>
              <button className="icon-button table-action" title={row.action === "view" ? "Xem" : "Sửa"}>
                {row.action === "view" ? <Eye size={20} /> : <Pencil size={20} />}
              </button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScheduleList({ onCreate, onOpen, forecasts = initialForecasts, tasks = initialTasks }) {
  const rows = forecasts.map((forecast) => ({
    ...forecast,
    deadline: forecast.deadline,
    tone: forecast.status === "Phát hành" ? "ended-blue" : "active",
    taskCount: tasks.filter((task) => task.forecastId === forecast.id).length,
  }));

  return (
    <section className="page-flow">
      <div className="schedule-top">
        <MiniMetric icon={Calendar} label="Đang kích hoạt" value="12 Lịch" tone="blue" />
        <MiniMetric icon={FileText} label="File mẫu" value="45 Bản" tone="green" />
        <MiniMetric icon={ClipboardList} label="Sắp tới hạn" value="03 Deadline" tone="pale" />
        <div className="schedule-actions">
          {onCreate && (
            <>
              <button className="primary-button" onClick={onCreate}>
                <Plus size={19} />
                Tạo lịch Forecast
              </button>
              <button className="muted-button">
                <Upload size={18} />
                Tải lên File mẫu
              </button>
            </>
          )}
        </div>
      </div>

      <div className="schedule-layout">
        <section className="panel schedule-list-panel">
          <div className="panel-title-row tabs-row">
            <h3>Danh sách Lịch Forecast</h3>
            <div className="tabs">
              <button className="active">Tất cả</button>
              <button>Đang chạy</button>
              <button>Kết thúc</button>
            </div>
          </div>
          <div className="schedule-table">
            <div className="schedule-head">
              <span>Tên Lịch / Kỳ Forecast</span>
              <span>Ngày tạo</span>
              <span>Hạn cuối (Deadline)</span>
              <span>Trạng thái</span>
              <span>Thao tác</span>
            </div>
            {rows.map((row, index) => (
              <article className={`schedule-row ${row.tone}`} key={row.title}>
                <button className="schedule-name schedule-open" onClick={() => onOpen(row.id)}>
                  <span className="calendar-token">
                    <Calendar size={18} />
                  </span>
                  <strong>{row.title}</strong>
                </button>
                <span>{row.created}</span>
                <span>
                  {row.deadline}
                  <i className="mini-bar" />
                </span>
                <span><Badge tone={getStatusTone(row.status)}>{row.status}</Badge></span>
                <span className="row-tools">
                  <button className="icon-button table-action" title="Xem chi tiết" onClick={() => onOpen(row.id)}>
                    {index === 3 ? <Eye size={19} /> : <SquarePen size={19} />}
                  </button>
                  <button className="icon-button table-action" title="Tùy chọn">
                    <MoreVertical size={19} />
                  </button>
                </span>
              </article>
            ))}
          </div>
        </section>

        <aside className="right-rail">
          <TemplatePanel />
          <DeadlinePanel />
        </aside>
      </div>
    </section>
  );
}

function TaskList({ onOpen, onRsmApprove, onGdkdApprove, tasks = initialTasks }) {
  const totalTasks = tasks.length;
  const doingTasks = tasks.filter((task) => !["GĐKD đã duyệt", "Phát hành"].includes(task.status)).length;
  const doneTasks = tasks.filter((task) => ["GĐKD đã duyệt", "Phát hành"].includes(task.status)).length;
  const lateTasks = tasks.filter((task) => task.status === "Quá hạn").length;

  return (
    <section className="page-flow task-page">
      <div className="task-filter-row">
        <button className="filter-select">
          <span>Kênh:</span>
          <strong>Tất cả Kênh</strong>
          <ChevronRight size={16} />
        </button>
        <button className="filter-select wide">
          <span>Người phụ trách:</span>
          <strong>Tất cả nhân sự</strong>
          <ChevronRight size={16} />
        </button>
        <button className="link-filter">
          <Filter size={16} />
          Bộ lọc nâng cao
        </button>
      </div>

      <div className="action-row">
        <button className="secondary-button">
          <Download size={18} />
          Xuất báo cáo
        </button>
        <button className="primary-button">
          <Plus size={18} />
          Tạo Task mới
        </button>
      </div>

      <div className="task-metric-grid">
        <TaskMetric title="Tổng số Task" value={String(totalTasks)} note="mock data" delta="+12%" tone="blue" />
        <TaskMetric title="Đang thực hiện" value={String(doingTasks)} progress={totalTasks ? Math.round((doingTasks / totalTasks) * 100) : 0} tone="orange" />
        <TaskMetric title="Hoàn thành" value={String(doneTasks)} progress={totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0} tone="green" />
        <TaskMetric title="Quá hạn SLA" value={String(lateTasks).padStart(2, "0")} note="Cần xử lý ngay" tone="red" />
      </div>

      <section className="panel task-list-panel">
        <div className="task-table">
          <div className="task-head">
            <span>Task & Kênh bán hàng</span>
            <span>Người phụ trách</span>
            <span>Thời hạn / SLA</span>
            <span>Tiến độ</span>
            <span>Trạng thái</span>
            <span>Thao tác</span>
          </div>
          {tasks.map((row) => (
            <article className="task-row" key={row.title}>
              <button className="task-title-cell" onClick={() => onOpen(row.id)}>
                <i className={row.marker} />
                <span>
                  <strong>{row.title}</strong>
                  <small>{row.channel}</small>
                </span>
              </button>
              <div className="task-owner">
                {row.owner !== "Chưa phân công" && <span className="mini-avatar">{row.owner.slice(0, 1)}</span>}
                <span>
                  <strong>{row.owner}</strong>
                  {row.ownerRole && <small>{row.ownerRole}</small>}
                </span>
              </div>
              <div className={row.due.includes("Quá hạn") ? "task-due danger" : "task-due"}>
                <span>{row.deadline}</span>
                <small>{row.due}</small>
              </div>
              <div className="task-progress-cell">
                <i><span style={{ width: `${row.progress}%` }} /></i>
                <div>
                  <span>{row.progress}%</span>
                  {row.progress === 100 && <small>Hoàn tất</small>}
                  {row.progress === 30 && <small>Giai đoạn 1</small>}
                </div>
              </div>
              <span><Badge tone={row.statusTone}>{row.status}</Badge></span>
              <span className="detail-action-icons">
                <button className="icon-button table-action" onClick={() => onOpen(row.id)} title="Xem">
                  <Eye size={19} />
                </button>
                <button className="icon-button table-action" onClick={() => onOpen(row.id)} title="Sửa">
                  <Pencil size={19} />
                </button>
                {row.status === "Chờ RSM duyệt" && (
                  <button className="icon-button table-action" title="RSM duyệt" onClick={() => onRsmApprove(row.id)}>
                    <CheckCircle2 size={19} />
                  </button>
                )}
                {row.status === "Chờ GĐKD duyệt" && (
                  <button className="icon-button table-action" title="GĐKD duyệt" onClick={() => onGdkdApprove(row.id)}>
                    <Check size={19} />
                  </button>
                )}
                <button className="icon-button table-action" title="Báo cáo">
                  <BarChart3 size={19} />
                </button>
              </span>
            </article>
          ))}
        </div>
        <div className="table-footer">
          <span>Hiển thị 1 - 10 trên tổng số 42 Task</span>
          <div className="pagination">
            <button className="ghost-page">‹</button>
            <button className="current">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
          </div>
        </div>
      </section>

      <button className="floating-create" title="Tạo Task">
        <SquarePen size={28} />
      </button>
    </section>
  );
}

function TaskMetric({ title, value, note, delta, progress, tone }) {
  return (
    <article className={`task-metric-card ${tone}`}>
      <div className="task-metric-title">
        <span className="eyebrow">{title}</span>
        <BarChart3 size={18} />
      </div>
      <strong>{value}</strong>
      {delta && <span className="metric-delta">{delta}</span>}
      {progress !== undefined && (
        <div className="task-metric-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      )}
      {note && <small>{note}</small>}
    </article>
  );
}

function TaskUpdate({ onBack, task, forecast, onSubmit }) {
  const displayTask = task || initialTasks[0];
  const [taskStatus, setTaskStatus] = useState("doing");
  const [fileName, setFileName] = useState(
    displayTask.file || `Forecast_${displayTask.channel.replace(/\s+/g, "_")}_${forecast?.monthShort || "T07_2026"}.xlsx`
  );
  const [note, setNote] = useState("");

  return (
    <section className="task-update-page">
      <div className="task-update-main">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          Quay lại danh sách Task
        </button>
        <div className="task-update-title">
          <div>
            <h2>Cập nhật {displayTask.title}</h2>
            <p>Mã Task: #{displayTask.id} • Phân công: {displayTask.ownerRole}</p>
          </div>
        </div>

        <section className="panel instruction-card">
          <div className="instruction-title">
            <div>
              <Info size={22} />
              <h3>Hướng dẫn công việc</h3>
            </div>
            <span>Hết hạn trong 48 giờ</span>
          </div>
          <p>
            Vui lòng hoàn thiện file forecast tháng 07/2026 cho kênh TMĐT theo template KD01. Số liệu cần thể hiện nhu cầu theo SKU, chương trình khuyến mãi dự kiến, tồn kho đầu kỳ và các ghi chú bất thường để bộ phận thẩm định có đủ căn cứ rà soát.
          </p>
          <ul>
            <li>Không đổi cấu trúc cột của file mẫu forecast.</li>
            <li>Điền đầy đủ forecast theo SKU, khu vực và kênh bán hàng.</li>
            <li>Nếu có điều chỉnh lớn so với tháng trước, bắt buộc ghi lý do tại cột ghi chú.</li>
          </ul>
          <div className="instruction-meta">
            <div>
              <span className="eyebrow">Hạn chót</span>
              <strong>19/07/2026 • 17:00</strong>
            </div>
            <div>
              <span className="eyebrow">Độ ưu tiên</span>
              <strong className="danger-text">! Khẩn cấp</strong>
            </div>
          </div>
        </section>

        <section className="panel upload-card">
          <h3>
            <Upload size={22} />
            Tải lên dữ liệu Dự báo
          </h3>
          <div className="drop-zone">
            <UploadCloud size={42} />
            <strong>Kéo và thả tệp vào đây hoặc Chọn tệp từ máy tính</strong>
            <span>Hỗ trợ định dạng XLSX/CSV tối đa 50MB</span>
            <button className="secondary-button">Duyệt tệp tin</button>
          </div>
          <div className="uploaded-file">
            <span className="file-icon blue">
              <FileText size={22} />
            </span>
            <div>
              <strong>{fileName}</strong>
              <small>{displayTask.file ? "File đã có trong mock data" : "File mock sẽ được gửi khi bấm cập nhật"}</small>
            </div>
            <CheckCircle2 size={22} />
            <button className="icon-button table-action" title="Xóa">
              <Trash2 size={19} />
            </button>
          </div>
        </section>
      </div>

      <aside className="task-update-rail">
        <div className="task-update-actions">
          <button className="secondary-button">
            <Save size={18} />
            Lưu bản nháp
          </button>
          <button className="primary-button" onClick={() => onSubmit(displayTask.id, fileName, note)}>
            <CheckCircle2 size={18} />
            Gửi cập nhật
          </button>
        </div>
        <section className="panel status-update-card">
          <h3>Cập nhật trạng thái</h3>
          <button
            className={`status-option ${taskStatus === "doing" ? "active" : ""}`}
            type="button"
            onClick={() => setTaskStatus("doing")}
          >
            <Circle size={18} />
            <span>
              <strong>Đang thực hiện</strong>
              <small>Vẫn đang tổng hợp và kiểm tra dữ liệu.</small>
            </span>
          </button>
          <button
            className={`status-option ${taskStatus === "done" ? "active" : ""}`}
            type="button"
            onClick={() => setTaskStatus("done")}
          >
            <Circle size={18} />
            <span>
              <strong>Hoàn thành</strong>
              <small>Sẵn sàng để quản lý xem xét.</small>
            </span>
          </button>
        </section>

        <section className="panel record-history-card">
          <h3>
            <Clock3 size={21} />
            Lịch sử bản ghi
          </h3>
          {[
            ["10:00, 24/06/2026", "Nguyễn Tú Anh đã tạo task."],
            ["10:05, 24/06/2026", "Hệ thống đã gửi thông báo cho Lê Quang Minh."],
            ["11:30, 25/06/2026", "Lê Quang Minh đã đổi trạng thái sang \"Đang nhập liệu\"."],
            ["11:32, 25/06/2026", `${displayTask.owner} đã tải lên tệp ${fileName}.`],
          ].map((item, index) => (
            <article className={`history-item tone-${index}`} key={item[0]}>
              <i />
              <span>{item[0]}</span>
              <strong>{item[1]}</strong>
            </article>
          ))}
        </section>
      </aside>
    </section>
  );
}

function AppraisalList({ onOpen, forecasts = initialForecasts, tasks = initialTasks }) {
  const defaultForecast =
    forecasts.find((forecast) => ["Chờ thẩm định", "Chờ CEO duyệt"].includes(forecast.status)) ||
    forecasts[0];
  const [selectedForecastId, setSelectedForecastId] = useState(defaultForecast?.id || "");
  const [quickFilter, setQuickFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const selectedForecast =
    forecasts.find((forecast) => forecast.id === selectedForecastId) || defaultForecast;
  const forecastTasks = tasks.filter((task) => task.forecastId === selectedForecast?.id);

  const allRows = forecastTasks.map((task) => {
    const waitingApproval = selectedForecast?.status === "Chờ CEO duyệt";
    const waitingAppraisal =
      selectedForecast?.status === "Chờ thẩm định" ||
      ["GĐKD đã duyệt", "Chờ RSM duyệt", "Chờ GĐKD duyệt"].includes(task.status);
    const status = waitingApproval
      ? "Chờ duyệt"
      : waitingAppraisal
        ? "Chờ thẩm định"
        : task.file
          ? "Có file"
          : "Chưa có file";

    return {
      forecastId: selectedForecast?.id,
      taskId: task.id,
      channel: task.channel,
      month: selectedForecast?.month || task.deadline,
      sender: task.owner,
      sentAt: task.file ? "Vừa xong" : "Chưa gửi",
      file: task.file || task.template || selectedForecast?.template || "Chưa có file",
      status,
      statusTone:
        status === "Chờ duyệt"
          ? "danger"
          : status === "Chờ thẩm định" || status === "Có file"
            ? "warning"
            : "neutral",
      icon: task.icon || Star,
      iconTone: task.iconTone || "blue",
    };
  });

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const rows = allRows
    .filter((row) => {
      if (quickFilter === "appraisal") return row.status === "Chờ thẩm định";
      if (quickFilter === "approval") return row.status === "Chờ duyệt";
      return true;
    })
    .filter((row) => {
      if (!normalizedSearch) return true;
      return [row.channel, row.sender, row.file, row.month]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });

  return (
    <section className="page-flow appraisal-page">
      <div className="breadcrumb appraisal-breadcrumb">
        <button>Forecast Management</button>
        <ChevronRight size={15} />
        <strong>Thẩm định & Phê duyệt</strong>
      </div>

      <div className="page-heading with-actions">
        <div>
          <h2>Thẩm định</h2>
          <p>Rà soát file forecast các kênh trước khi chuyển CEO phê duyệt.</p>
        </div>
        <button className="primary-button">
          <Download size={18} />
          Xuất báo cáo
        </button>
      </div>

      <section className="panel appraisal-table-panel">
        <div className="appraisal-toolbar">
          <div className="segmented-tabs">
            <button className={quickFilter === "all" ? "active" : ""} onClick={() => setQuickFilter("all")}>Tất cả</button>
            <button className={quickFilter === "appraisal" ? "active" : ""} onClick={() => setQuickFilter("appraisal")}>Chờ thẩm định</button>
            <button className={quickFilter === "approval" ? "active" : ""} onClick={() => setQuickFilter("approval")}>Chờ duyệt</button>
          </div>
          <label className="month-select forecast-month-select">
            <select value={selectedForecast?.id || ""} onChange={(event) => setSelectedForecastId(event.target.value)}>
              {forecasts.map((forecast) => (
                <option key={forecast.id} value={forecast.id}>
                  {forecast.month}
                </option>
              ))}
            </select>
            <ChevronRight size={16} />
          </label>
          <label className="appraisal-search">
            <Search size={19} />
            <input
              placeholder="Tìm kiếm kênh hoặc tên task..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="appraisal-table">
          <div className="appraisal-head">
            <span>Tên kênh</span>
            <span>Tháng thẩm định</span>
            <span>Người gửi</span>
            <span>Thời gian gửi</span>
            <span>Trạng thái</span>
            <span>Tài liệu</span>
            <span>Thao tác</span>
          </div>
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <article className="appraisal-row" key={row.taskId}>
                <div className="appraisal-channel">
                  <span className={`task-icon ${row.iconTone}`}>
                    <Icon size={19} />
                  </span>
                  <strong>{row.channel}</strong>
                </div>
                <button className="appraisal-month" onClick={() => onOpen(row.forecastId)}>{row.month}</button>
                <span>{row.sender}</span>
                <span className="sent-at">
                  <Clock3 size={14} />
                  {row.sentAt}
                </span>
                <span><Badge tone={row.statusTone}>{row.status}</Badge></span>
                <span className="file-link">
                  <FileText size={16} />
                  <span className="file-link-text">{row.file}</span>
                </span>
                <span className="row-tools">
                  <button className="icon-button table-action" title="Thẩm định" onClick={() => onOpen(row.forecastId)}>
                    <ClipboardList size={20} />
                  </button>
                  <button className="icon-button table-action" title="Xem" onClick={() => onOpen(row.forecastId)}>
                    <Eye size={20} />
                  </button>
                </span>
              </article>
            );
          })}
          {!rows.length && (
            <div className="appraisal-empty-row">
              Chưa có kênh phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>
        <div className="table-footer">
          <span>Hiển thị {rows.length} trong tổng số {allRows.length} tác vụ</span>
          <div className="pagination">
            <button className="ghost-page">‹</button>
            <button className="current">1</button>
            <button>2</button>
            <button>›</button>
          </div>
        </div>
      </section>

      <div className="appraisal-bottom-grid">
        <article className="appraisal-stat-card">
          <div>
            <span className="icon-badge soft-red">
              <ClipboardList size={20} />
            </span>
            <strong>↗ 12%</strong>
          </div>
          <span className="eyebrow">Chờ thẩm định</span>
          <b>08</b>
        </article>
        <article className="appraisal-stat-card">
          <div>
            <span className="icon-badge blue">
              <Settings size={20} />
            </span>
            <strong className="green-text">⌁ 4%</strong>
          </div>
          <span className="eyebrow">Chờ duyệt</span>
          <b>04</b>
        </article>
        <article className="appraisal-stat-card blue-card">
          <span className="eyebrow">Hiệu suất trung bình</span>
          <b>2.4 giờ</b>
          <p>Thời gian phản hồi SLA đang được tối ưu hóa.</p>
        </article>
        <section className="panel recent-activity-card">
          <h3>
            <Clock3 size={21} />
            Hoạt động gần đây
          </h3>
          {[
            ["Trần Văn A vừa cập nhật file Forecast_MT_T07_2026_v2.xlsx", "10 phút trước"],
            ["Bạn đã thẩm định Task \"Kênh TMĐT T07\"", "2 giờ trước"],
            ["Hệ thống tự động nhắc nhở Task \"Kênh GT\" quá hạn", "Hôm qua"],
          ].map((item, index) => (
            <article className="activity-item" key={item[0]}>
              <i className={index === 0 ? "active" : ""} />
              <div>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
              </div>
            </article>
          ))}
          <button className="floating-create appraisal-add" title="Thêm">
            <Plus size={30} />
          </button>
        </section>
      </div>
    </section>
  );
}

function AppraisalDetail({ forecast, tasks = [], onSubmit, onBack }) {
  const [decision, setDecision] = useState("approve");
  const displayForecast = forecast || initialForecasts[0];
  const sourceTask = tasks.find((task) => task.file) || tasks[0] || initialTasks[0];

  return (
    <section className="appraisal-detail-layout">
      <div className="appraisal-detail-main">
        <div className="breadcrumb">
          <button>Forecast Management</button>
          <ChevronRight size={15} />
          <button>Quy trình Phê duyệt</button>
          <ChevronRight size={15} />
          <strong>Chi tiết thẩm định task</strong>
        </div>

        <section className="panel appraisal-hero-card">
          <span className={`status-badge ${getStatusTone(displayForecast.status)}`}>{displayForecast.status}</span>
          <h2>Thẩm định {displayForecast.title}</h2>
          <div className="sla-countdown">
            <span>SLA còn lại</span>
            <strong>04:22:09</strong>
          </div>
          <div className="appraisal-hero-meta">
            <div>
              <span className="eyebrow">Người thẩm định</span>
              <strong>Nguyễn Tú Anh</strong>
            </div>
            <div>
              <span className="eyebrow">Bộ phận</span>
              <strong>BP. Cung ứng</strong>
            </div>
            <div>
              <span className="eyebrow">Hạn chót</span>
              <strong>20/07/2026 - 17:00</strong>
            </div>
            <div>
              <span className="eyebrow">Độ ưu tiên</span>
              <strong className="danger-text">Cao</strong>
            </div>
          </div>
        </section>

        <section className="panel forecast-data-card">
          <div className="panel-title-row">
            <h3>Dữ liệu Forecast kênh</h3>
            <div className="action-row">
              <button className="secondary-button">
                <Eye size={18} />
                Xem trước
              </button>
              <button className="primary-button">
                <Download size={18} />
                Tải file
              </button>
            </div>
          </div>
          <div className="forecast-file-box">
            <span className="file-icon green">
              <FileText size={26} />
            </span>
            <div>
              <strong>{sourceTask.file || displayForecast.template}</strong>
              <p>Dung lượng: {sourceTask.fileSize || "4.2 MB"} • Cập nhật trong mock workflow</p>
              <div className="forecast-values">
                <div>
                  <span>Tổng doanh thu dự kiến</span>
              <strong>1,450,000,000đ</strong>
                </div>
                <div>
                  <span>Số lượng SKUs</span>
                  <strong>152</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel department-status-card">
          <h3>Trạng thái thẩm định các bộ phận</h3>
          <div className="department-grid">
            {[
              ["BP. Cung ứng", "Đã hoàn thành", "success"],
              ["BP. BI/Data", "Đã hoàn thành", "success"],
              ["BP. Nhà máy", "Đang chờ", "warning"],
              ["BP. Tài chính", "Đang chờ", "warning"],
            ].map((item) => (
              <article className="department-card" key={item[0]}>
                <CheckCircle2 size={20} />
                <div>
                  <strong>{item[0]}</strong>
                  <small className={item[2]}>{item[1]}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel approval-result-card appraisal-decision-card">
          <h3>Kết quả thẩm định</h3>
          <span className="approval-section-label">Quyết định</span>
          <div className="decision-toggle">
            <button className={decision === "approve" ? "active" : ""} onClick={() => setDecision("approve")}>
              <CheckCircle2 size={20} />
              Phê duyệt
            </button>
            <button className={decision === "reject" ? "active" : ""} onClick={() => setDecision("reject")}>
              <X size={20} />
              Từ chối
            </button>
          </div>
          <label className="approval-note">
            <span>Lý do / Ghi chú</span>
            <textarea placeholder="Nhập ý kiến thẩm định hoặc lý do từ chối..." />
          </label>
          <div className="approval-attachment">
            <span>Tài liệu đính kèm (nếu có)</span>
            <div className="small-drop-zone appraisal-drop-zone">
              <UploadCloud size={34} />
              <strong>Kéo và thả file tại đây</strong>
              <small>Hỗ trợ PDF, XLSX, JPG (Tối đa 10MB)</small>
              <button>Hoặc chọn từ máy tính</button>
            </div>
          </div>
        </section>

        <div className="approval-fixed-actions appraisal-submit-row">
          <button className="secondary-button" onClick={onBack}>
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button className="primary-button submit-appraisal-button" onClick={() => onSubmit(displayForecast.id, decision === "approve")}>
            Gửi kết quả thẩm định
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <aside className="panel appraisal-timeline-card">
        <h3>
          <Clock3 size={21} />
          Lịch sử tác vụ
        </h3>
        {[
          ["Kênh TMĐT đã gửi Forecast", "Người thực hiện: Lê Văn Hùng", "20/07/2026 - 09:45:12", "blue"],
          ["Hệ thống gán người thẩm định", "Tự động điều phối theo cấu hình KD01", "20/07/2026 - 09:46:00", "slate"],
          ["Bắt đầu xem xét dữ liệu", "Người thực hiện: Nguyễn Tú Anh", "20/07/2026 - 14:20:05", "yellow"],
          ["Đang xử lý thẩm định...", "Trạng thái hiện tại", "", "muted"],
        ].map((item) => (
          <article className={`timeline-row ${item[3]}`} key={item[0]}>
            <i />
            <strong>{item[0]}</strong>
            <span>{item[1]}</span>
            {item[2] && <small>{item[2]}</small>}
          </article>
        ))}
        <div className="timeline-note">
          Tác vụ này yêu cầu phê duyệt đúng hạn để kịp thời gian triển khai kế hoạch nhập hàng tháng tới.
        </div>
      </aside>
    </section>
  );
}

function ApprovalList({ onOpen, forecasts = initialForecasts, tasks = initialTasks }) {
  const defaultForecast =
    forecasts.find((forecast) => ["Chờ CEO duyệt", "Phát hành"].includes(forecast.status)) ||
    forecasts[0];
  const [selectedForecastId, setSelectedForecastId] = useState(defaultForecast?.id || "");
  const [quickFilter, setQuickFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const selectedForecast =
    forecasts.find((forecast) => forecast.id === selectedForecastId) || defaultForecast;
  const forecastTasks = tasks.filter((task) => task.forecastId === selectedForecast?.id);

  const allRows = forecastTasks.map((task) => {
    const status =
      selectedForecast?.status === "Phát hành"
        ? "Đã phê duyệt"
        : selectedForecast?.status === "CEO không duyệt"
          ? "Trả lại"
          : "Chờ phê duyệt";

    return {
      forecastId: selectedForecast?.id,
      taskId: task.id,
      channel: task.channel,
      month: selectedForecast?.month || task.deadline,
      sender: "Phòng Kế hoạch",
      sentAt: task.file ? "Vừa xong" : "Chưa gửi",
      file: task.file || task.template || selectedForecast?.template || "Chưa có file",
      status,
      statusTone:
        status === "Đã phê duyệt"
          ? "success"
          : status === "Trả lại"
            ? "danger"
            : "warning",
      icon: task.icon || CheckCircle2,
      iconTone: task.iconTone || "purple",
    };
  });

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const rows = allRows
    .filter((row) => {
      if (quickFilter === "pending") return row.status === "Chờ phê duyệt";
      if (quickFilter === "approved") return row.status === "Đã phê duyệt";
      return true;
    })
    .filter((row) => {
      if (!normalizedSearch) return true;
      return [row.channel, row.sender, row.file, row.month]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });

  return (
    <section className="page-flow appraisal-page">
      <div className="breadcrumb appraisal-breadcrumb">
        <button>Forecast Management</button>
        <ChevronRight size={15} />
        <strong>Thẩm định & Phê duyệt</strong>
      </div>

      <div className="page-heading with-actions">
        <div>
          <h2>Phê duyệt</h2>
          <p>Xem các file đã qua thẩm định và chờ quyết định phê duyệt cuối.</p>
        </div>
        <button className="primary-button">
          <Download size={18} />
          Xuất báo cáo
        </button>
      </div>

      <section className="panel appraisal-table-panel">
        <div className="appraisal-toolbar approval-toolbar">
          <div className="segmented-tabs approval-tabs">
            <button className={quickFilter === "all" ? "active" : ""} onClick={() => setQuickFilter("all")}>Tất cả</button>
            <button className={quickFilter === "pending" ? "active" : ""} onClick={() => setQuickFilter("pending")}>Chờ phê duyệt</button>
            <button className={quickFilter === "approved" ? "active" : ""} onClick={() => setQuickFilter("approved")}>Đã phê duyệt</button>
          </div>
          <label className="month-select forecast-month-select">
            <select value={selectedForecast?.id || ""} onChange={(event) => setSelectedForecastId(event.target.value)}>
              {forecasts.map((forecast) => (
                <option key={forecast.id} value={forecast.id}>
                  {forecast.month}
                </option>
              ))}
            </select>
            <ChevronRight size={16} />
          </label>
          <label className="appraisal-search">
            <Search size={19} />
            <input
              placeholder="Tìm kiếm kênh hoặc tên task..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="appraisal-table">
          <div className="appraisal-head">
            <span>Tên kênh</span>
            <span>Tháng thẩm định</span>
            <span>Người gửi</span>
            <span>Thời gian gửi</span>
            <span>Trạng thái</span>
            <span>Tài liệu</span>
            <span>Thao tác</span>
          </div>
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <article className="appraisal-row" key={row.taskId}>
                <div className="appraisal-channel">
                  <span className={`task-icon ${row.iconTone}`}>
                    <Icon size={19} />
                  </span>
                  <strong>{row.channel}</strong>
                </div>
                <button className="appraisal-month" onClick={() => onOpen(row.forecastId)}>{row.month}</button>
                <span>{row.sender}</span>
                <span className="sent-at">
                  <Clock3 size={14} />
                  {row.sentAt}
                </span>
                <span><Badge tone={row.statusTone}>{row.status}</Badge></span>
                <span className="file-link">
                  <FileText size={16} />
                  <span className="file-link-text">{row.file}</span>
                </span>
                <span className="row-tools">
                  <button className="icon-button table-action" title={row.status === "Đã phê duyệt" ? "Đã duyệt" : "Phê duyệt"} onClick={() => onOpen(row.forecastId)}>
                    {row.status === "Đã phê duyệt" ? <SquarePen size={20} /> : <CheckCircle2 size={20} />}
                  </button>
                  <button className="icon-button table-action" title="Xem" onClick={() => onOpen(row.forecastId)}>
                    <Eye size={20} />
                  </button>
                </span>
              </article>
            );
          })}
          {!rows.length && (
            <div className="appraisal-empty-row">
              Chưa có kênh phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>
        <div className="table-footer">
          <span>Hiển thị {rows.length} trong tổng số {allRows.length} tác vụ</span>
          <div className="pagination">
            <button className="ghost-page">‹</button>
            <button className="current">1</button>
            <button>2</button>
            <button>›</button>
          </div>
        </div>
      </section>

      <div className="appraisal-bottom-grid">
        <article className="appraisal-stat-card">
          <div>
            <span className="icon-badge soft-red">
              <ClipboardList size={20} />
            </span>
            <strong>↗ 12%</strong>
          </div>
          <span className="eyebrow">Chờ phê duyệt</span>
          <b>04</b>
        </article>
        <article className="appraisal-stat-card">
          <div>
            <span className="icon-badge blue">
              <Settings size={20} />
            </span>
            <strong className="green-text">⌁ 4%</strong>
          </div>
          <span className="eyebrow">Đã phát hành</span>
          <b>07</b>
        </article>
        <article className="appraisal-stat-card blue-card">
          <span className="eyebrow">Hiệu suất trung bình</span>
          <b>2.4 giờ</b>
          <p>Thời gian phản hồi SLA đang được tối ưu hóa.</p>
        </article>
        <section className="panel recent-activity-card">
          <h3>
            <Clock3 size={21} />
            Hoạt động gần đây
          </h3>
          {[
            ["Trần Văn A vừa gửi file Forecast_MT_T07_2026_v2.xlsx lên duyệt", "10 phút trước"],
            ["CEO đã phê duyệt Task \"Kênh MT T07\"", "2 giờ trước"],
            ["Hệ thống tự động nhắc nhở Task \"Kênh GT\" quá hạn", "Hôm qua"],
          ].map((item, index) => (
            <article className="activity-item" key={item[0]}>
              <i className={index === 0 ? "active" : ""} />
              <div>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
              </div>
            </article>
          ))}
          <button className="floating-create appraisal-add" title="Thêm">
            <Plus size={30} />
          </button>
        </section>
      </div>
    </section>
  );
}

function ApprovalDetail({ forecast, tasks = [], onSubmit, onBack }) {
  const [decision, setDecision] = useState("approve");
  const displayForecast = forecast || initialForecasts[0];
  const sourceTask = tasks.find((task) => task.file) || tasks[0] || initialTasks[0];

  return (
    <section className="appraisal-detail-layout approval-detail-layout">
      <div className="appraisal-detail-main">
        <div className="breadcrumb">
          <button>Forecast Management</button>
          <ChevronRight size={15} />
          <button>Quy trình Phê duyệt</button>
          <ChevronRight size={15} />
          <strong>Chi tiết phê duyệt task</strong>
        </div>

        <section className="panel appraisal-hero-card">
          <span className={`status-badge ${getStatusTone(displayForecast.status)}`}>{displayForecast.status}</span>
          <h2>Phê duyệt {displayForecast.title}</h2>
          <div className="sla-countdown">
            <span>SLA còn lại</span>
            <strong>04:22:09</strong>
          </div>
          <div className="appraisal-hero-meta">
            <div>
              <span className="eyebrow">Người phê duyệt</span>
              <strong>Phạm Thu Hiền</strong>
            </div>
            <div>
              <span className="eyebrow">Bộ phận</span>
              <strong>CEO</strong>
            </div>
            <div>
              <span className="eyebrow">Hạn chót</span>
              <strong>22/07/2026 - 17:00</strong>
            </div>
            <div>
              <span className="eyebrow">Độ ưu tiên</span>
              <strong className="danger-text">Cao</strong>
            </div>
          </div>
        </section>

        <section className="panel forecast-data-card">
          <div className="panel-title-row">
            <h3>Dữ liệu Forecast kênh</h3>
            <div className="action-row">
              <button className="secondary-button">
                <Eye size={18} />
                Xem trước
              </button>
              <button className="primary-button">
                <Download size={18} />
                Tải file
              </button>
            </div>
          </div>
          <div className="forecast-file-box">
            <span className="file-icon green">
              <FileText size={26} />
            </span>
            <div>
              <strong>{sourceTask.file || displayForecast.template}</strong>
              <p>Dung lượng: {sourceTask.fileSize || "5.6 MB"} • Hồ sơ đã hoàn tất thẩm định</p>
              <div className="forecast-values">
                <div>
                  <span>Tổng doanh thu dự kiến</span>
                  <strong>1,450,000,000đ</strong>
                </div>
                <div>
                  <span>Số lượng SKUs</span>
                  <strong>152</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel department-status-card">
          <h3>Trạng thái thẩm định các bộ phận</h3>
          <div className="department-grid">
            {[
              ["BP. Cung ứng", "Đã hoàn thành", "success"],
              ["BP. BI/Data", "Đã hoàn thành", "success"],
              ["BP. Nhà máy", "Đã hoàn thành", "success"],
              ["CEO", "Đang chờ", "warning"],
            ].map((item) => (
              <article className="department-card" key={item[0]}>
                <CheckCircle2 size={20} />
                <div>
                  <strong>{item[0]}</strong>
                  <small className={item[2]}>{item[1]}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel approval-result-card">
          <h3>Kết quả phê duyệt</h3>
          <span className="approval-section-label">Quyết định</span>
          <div className="decision-toggle">
            <button className={decision === "approve" ? "active" : ""} onClick={() => setDecision("approve")}>
              <CheckCircle2 size={20} />
              Phê duyệt
            </button>
            <button className={decision === "reject" ? "active" : ""} onClick={() => setDecision("reject")}>
              <X size={20} />
              Từ chối
            </button>
          </div>
          <label className="approval-note">
            <span>Lý do / Ghi chú</span>
            <textarea placeholder="Nhập ý kiến phê duyệt hoặc lý do từ chối..." />
          </label>
          <div className="approval-attachment">
            <span>Tài liệu đính kèm (nếu có)</span>
            <div className="small-drop-zone">
              <UploadCloud size={34} />
              <strong>Kéo và thả file tại đây</strong>
              <small>Hỗ trợ PDF, XLSX, JPG (Tối đa 10MB)</small>
              <button>Hoặc chọn từ máy tính</button>
            </div>
          </div>
        </section>

        <div className="approval-fixed-actions">
          <button className="secondary-button" onClick={onBack}>
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button className="approve-button" onClick={() => onSubmit(displayForecast.id, decision === "approve")}>
            {decision === "approve" ? "Duyệt" : "Từ chối"}
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>

      <aside className="panel appraisal-timeline-card">
        <h3>
          <Clock3 size={21} />
          Lịch sử tác vụ
        </h3>
        {[
          ["Kênh TMĐT đã gửi Forecast", "Người thực hiện: Lê Văn Hùng", "20/07/2026 - 09:45:12", "blue"],
          ["Hệ thống gán người thẩm định", "Tự động điều phối theo cấu hình KD01", "20/07/2026 - 09:46:00", "slate"],
          ["Hoàn tất thẩm định", "Người thực hiện: Nguyễn Tú Anh", "21/07/2026 - 14:20:05", "yellow"],
          ["Hệ thống gán người phê duyệt", "Tự động chuyển sang CEO phê duyệt cuối", "21/07/2026 - 14:22:00", "slate"],
          ["Đang xử lý Phê duyệt", "Trạng thái hiện tại", "", "muted"],
        ].map((item) => (
          <article className={`timeline-row ${item[3]}`} key={item[0]}>
            <i />
            <strong>{item[0]}</strong>
            <span>{item[1]}</span>
            {item[2] && <small>{item[2]}</small>}
          </article>
        ))}
        <div className="timeline-note">
          Tác vụ này yêu cầu phê duyệt đúng hạn để kịp thời gian triển khai kế hoạch nhập hàng tháng tới.
        </div>
      </aside>
    </section>
  );
}

function SystemSwitcher({ active, onUsers, onPermissions, onChannelConfig, onApprovalConfig, onSlaConfig }) {
  const items = [
    { key: "users", label: "Tài khoản", onClick: onUsers },
    { key: "permissions", label: "Phân quyền", onClick: onPermissions },
    { key: "channels", label: "Khung kênh", onClick: onChannelConfig },
    { key: "workflow", label: "Quy trình", onClick: onApprovalConfig },
    { key: "sla", label: "SLA", onClick: onSlaConfig },
  ].filter((item) => item.onClick);

  return (
    <div className="system-switcher admin-system-switcher">
      {items.map((item) => (
        <button key={item.key} className={active === item.key ? "active" : ""} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function SystemUsers({ onPermissions, onChannelConfig, onApprovalConfig, onSlaConfig }) {
  const [roleFilter, setRoleFilter] = useState("Tất cả vai trò");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const [searchTerm, setSearchTerm] = useState("");
  const roleOptions = ["Tất cả vai trò", ...Array.from(new Set(adminUsers.map((user) => user.role)))];
  const statusOptions = ["Tất cả trạng thái", "Active", "Inactive", "Locked"];
  const filteredUsers = adminUsers.filter((user) => {
    const matchRole = roleFilter === "Tất cả vai trò" || user.role === roleFilter;
    const matchStatus = statusFilter === "Tất cả trạng thái" || user.status === statusFilter;
    const matchSearch = [user.name, user.email, user.role, user.scope]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });
  const activeCount = adminUsers.filter((user) => user.status === "Active").length;
  const lockedCount = adminUsers.filter((user) => user.status === "Locked").length;

  return (
    <section className="page-flow admin-page">
      <SystemSwitcher
        active="users"
        onPermissions={onPermissions}
        onChannelConfig={onChannelConfig}
        onApprovalConfig={onApprovalConfig}
        onSlaConfig={onSlaConfig}
      />

      <div className="admin-heading with-actions">
        <div className="admin-title-lockup">
          <span className="admin-title-icon blue">
            <Users size={24} />
          </span>
          <div>
            <span>Quản trị hệ thống</span>
            <h2>Tài khoản</h2>
            <p>Mock danh sách người dùng, vai trò và phạm vi dữ liệu phục vụ Forecast KD01.</p>
          </div>
        </div>
        <div className="action-row">
          <button className="secondary-blue-button">
            <Cloud size={18} />
            Đồng bộ danh bạ
          </button>
          <button className="primary-button">
            <UserPlus size={18} />
            Tạo tài khoản
          </button>
        </div>
      </div>

      <div className="admin-metric-grid">
        <AdminMetric label="Tài khoản" value={adminUsers.length} hint="Tổng hồ sơ" icon={Users} tone="blue" />
        <AdminMetric label="Đang hoạt động" value={activeCount} hint="Có thể truy cập" icon={CheckCircle2} tone="green" />
        <AdminMetric label="Tạm khóa" value={lockedCount} hint="Đang bị chặn" icon={Lock} tone="orange" />
        <AdminMetric label="Vai trò" value={roleDefinitions.length} hint="Nhóm quyền" icon={Settings} tone="purple" />
      </div>

      <section className="panel admin-directory-panel">
        <div className="admin-filter-grid">
          <label>
            <span>Tìm kiếm</span>
            <div className="admin-input-shell">
              <Search size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm tên, email, vai trò, phạm vi..."
              />
            </div>
          </label>
          <label>
            <span>Vai trò</span>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              {roleOptions.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
          <label>
            <span>Trạng thái</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>

        <div className="admin-user-table">
          <div className="admin-user-head">
            <span>Tài khoản</span>
            <span>Vai trò</span>
            <span>Phạm vi</span>
            <span>Trạng thái</span>
            <span>Thao tác</span>
          </div>
          {filteredUsers.map((user) => (
            <article className="admin-user-row" key={user.id}>
              <div className="admin-user-cell">
                <span className={`avatar ${user.tone}`}>{user.initials}</span>
                <div>
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
              </div>
              <span><Badge tone="neutral">{user.role}</Badge></span>
              <strong>{user.scope}</strong>
              <span><Badge tone={user.status === "Active" ? "success" : user.status === "Locked" ? "danger" : "neutral"}>{user.status}</Badge></span>
              <button className="secondary-button compact-action" title="Thao tác">
                <MoreVertical size={17} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function SystemPermissions({
  onUsers,
  onChannelConfig,
  onApprovalConfig,
  onSlaConfig,
  permissionDrafts,
  setPermissionDrafts,
  onPreviewRole,
}) {
  const [selectedRoleId, setSelectedRoleId] = useState("admin");
  const [roleUserSearch, setRoleUserSearch] = useState("");
  const selectedRole = roleDefinitions.find((role) => role.id === selectedRoleId) || roleDefinitions[0];
  const selectedPermissions = permissionDrafts[selectedRole.id] || {};
  const roleUsers = adminUsers.filter((user) => user.role === selectedRole.name);
  const visibleRoleUsers = roleUsers.filter((user) => {
    const haystack = `${user.name} ${user.email} ${user.scope}`.toLowerCase();
    return haystack.includes(roleUserSearch.toLowerCase());
  });
  const updateRolePermission = (module, level) => {
    setPermissionDrafts((current) => ({
      ...current,
      [selectedRole.id]: {
        ...(current[selectedRole.id] || {}),
        [module]: level,
      },
    }));
  };

  return (
    <section className="page-flow admin-page">
      <SystemSwitcher
        active="permissions"
        onUsers={onUsers}
        onChannelConfig={onChannelConfig}
        onApprovalConfig={onApprovalConfig}
        onSlaConfig={onSlaConfig}
      />

      <div className="admin-heading with-actions">
        <div className="admin-title-lockup">
          <span className="admin-title-icon blue">
            <Lock size={24} />
          </span>
          <div>
            <span>Quản trị hệ thống</span>
            <h2>Phân quyền</h2>
            <p>Thiết lập role, phạm vi dữ liệu và quyền thao tác cho từng bước Forecast KD01.</p>
          </div>
        </div>
        <button className="primary-button">
          <UserPlus size={18} />
          Tạo vai trò
        </button>
      </div>

      <div className="admin-metric-grid">
        <AdminMetric label="Vai trò" value={roleDefinitions.length} hint="Nhóm quyền" icon={Lock} tone="blue" />
        <AdminMetric label="Nhân sự" value={adminUsers.length} hint="Đang quản lý" icon={Users} tone="green" />
        <AdminMetric label="Phạm vi" value="8" hint="Lớp dữ liệu KD01" icon={Settings} tone="cyan" />
        <AdminMetric label="Rủi ro" value="4" hint="Role nhạy cảm" icon={AlertTriangle} tone="orange" />
      </div>

      <div className="permission-layout">
        <section className="panel role-list-panel">
          <div className="panel-title-row">
            <h3>Vai trò</h3>
            <Badge tone="success">OK</Badge>
          </div>
          {roleDefinitions.map((role) => (
            <button
              className={`role-list-item ${role.id === selectedRoleId ? "active" : ""}`}
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
            >
              <div>
                <strong>{role.name}</strong>
                <span>{role.description}</span>
                <small>{role.scope}</small>
              </div>
              <b>{role.users}</b>
            </button>
          ))}
        </section>

        <section className="panel permission-detail-panel">
          <div className="permission-detail-title">
            <div>
              <h3>{selectedRole.name}</h3>
              <p>{selectedRole.description}</p>
            </div>
            <div className="action-row">
              <button className="secondary-blue-button" onClick={() => onPreviewRole(selectedRole.id)}>
                <Eye size={18} />
                Xem trước
              </button>
            </div>
          </div>

          <div className="permission-table">
            <div className="permission-head">
              <span>Khu vực</span>
              <span>Quyền</span>
              <span>Dữ liệu</span>
            </div>
            {permissionMatrix.map((row) => {
              const level = selectedPermissions[row.module] || normalizePermissionLevel(row[selectedRole.id]);
              return (
                <article className="permission-row" key={row.module}>
                  <strong>{row.module}</strong>
                  <select
                    className={`permission-level-select ${level}`}
                    value={level}
                    onChange={(event) => updateRolePermission(row.module, event.target.value)}
                  >
                    {permissionLevelOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <span>{row.data}</span>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <div className="permission-lower-grid">
        <section className="panel role-users-panel">
          <div className="role-users-heading">
            <div>
              <h3>Người dùng</h3>
              <p>{visibleRoleUsers.length}/{selectedRole.users} người có thể truy cập với vai trò {selectedRole.name}</p>
            </div>
            <button className="icon-action-button" title="Tùy chọn">
              <MoreVertical size={18} />
            </button>
          </div>

          <div className="role-users-toolbar">
            <label className="admin-input-shell">
              <Search size={18} />
              <input
                value={roleUserSearch}
                onChange={(event) => setRoleUserSearch(event.target.value)}
                placeholder="Tìm nhân sự..."
              />
            </label>
            <button className="primary-square-button" title="Thêm người dùng">
              <UserPlus size={20} />
            </button>
          </div>

          <div className="role-users-table">
            {visibleRoleUsers.length ? (
              visibleRoleUsers.map((user) => (
                <article className="role-user-row" key={user.id}>
                  <input type="checkbox" aria-label={`Chọn ${user.name}`} />
                  <span className={`avatar ${user.tone}`}>{user.initials}</span>
                  <div>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <b>{user.role}</b>
                  <span>{user.scope}</span>
                </article>
              ))
            ) : (
              <div className="empty-role-users">
                Chưa có người dùng mock nào được gán vai trò này.
              </div>
            )}
          </div>

          <div className="permission-card-footer">
            <span>Hiển thị {visibleRoleUsers.length ? `1-${visibleRoleUsers.length}` : "0"} / {roleUsers.length}</span>
            <div className="pager-actions">
              <button disabled>Trước</button>
              <strong>1/1</strong>
              <button disabled>Sau</button>
            </div>
          </div>
        </section>

        <section className="panel permission-activity-panel">
          <div className="role-users-heading">
            <div>
              <h3>Nhật ký gần đây</h3>
              <p>24 bản ghi thay đổi quyền và phạm vi dữ liệu</p>
            </div>
            <Clock3 size={20} />
          </div>

          <div className="permission-activity-list">
            {permissionActivityLog.map((item) => (
              <article className="permission-activity-item" key={item.id}>
                <span className={`activity-dot ${item.tone}`}>
                  <CheckCircle2 size={16} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>
                <time>{item.time}</time>
              </article>
            ))}
          </div>

          <div className="permission-card-footer">
            <span>24 bản ghi</span>
            <div className="pager-actions">
              <button disabled>Trước</button>
              <strong>1/6</strong>
              <button>Sau</button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function AdminMetric({ label, value, hint, icon: Icon, tone }) {
  return (
    <article className="admin-metric-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>
      <i className={tone}>
        <Icon size={22} />
      </i>
    </article>
  );
}

function ChannelFrameworkConfig({ onUsers, onPermissions, onApprovalConfig, onSlaConfig }) {
  return (
    <section className="page-flow frame-config-page">
      <SystemSwitcher active="channels" onUsers={onUsers} onPermissions={onPermissions} onApprovalConfig={onApprovalConfig} onSlaConfig={onSlaConfig} />

      <div className="frame-intro with-actions">
        <div>
          <p>Quản lý phân quyền, ánh xạ GĐKD - RSM - ASM và phạm vi kênh trong chuỗi Forecast KD01.</p>
          <div className="config-chip-row">
            <span className="config-chip blue">8 Kênh Hoạt động</span>
            <span className="config-chip green">12 RSM Phụ trách</span>
          </div>
        </div>
        <button className="primary-button">
          <Plus size={20} />
          THÊM CẤU HÌNH KÊNH
        </button>
      </div>

      <section className="panel framework-table-panel">
        <div className="framework-table">
          <div className="framework-head">
            <span>Kênh bán hàng</span>
            <span>Miền</span>
            <span>Giám đốc kinh doanh</span>
            <span>RSM phụ trách</span>
            <span>Danh sách ASM thuộc kênh</span>
            <span>Thao tác</span>
          </div>
          {channelRows.map((row) => (
            <article className="framework-row" key={row.channel}>
              <div className="framework-channel">
                <i className={row.tone} />
                <strong>{row.channel}</strong>
              </div>
              <span>{row.region}</span>
              <Person name={row.director} badge={row.directorBadge} tone={row.tone === "green" ? "green" : "blue"} />
              <Person name={row.rsm} badge={row.rsmBadge} tone={row.tone === "green" ? "green" : "slate"} />
              <div className="asm-tag-list">
                {row.asms.map((asm) => (
                  <span key={asm}>{asm}</span>
                ))}
                {row.more && <button>{row.more}</button>}
              </div>
              <div className="framework-actions">
                <button title="Chỉnh sửa">
                  <SquarePen size={20} />
                </button>
                <button title="Xóa">
                  <Trash2 size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="pagination-row">
          <span>Hiển thị 4 trên 8 kết quả</span>
          <div className="pages">
            <button disabled>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>›</button>
          </div>
        </div>
      </section>

      <div className="framework-bottom-grid">
        <article className="panel framework-stat-card">
          <div className="stat-card-title">
            <h3>SLA Phân bổ</h3>
            <Clock3 size={20} />
          </div>
          <p>Thời gian trung bình RSM hoàn thành giao việc và xác nhận phạm vi kênh.</p>
          <strong>2.4 <span>ngày</span></strong>
          <i><span style={{ width: "75%" }} /></i>
        </article>
        <article className="panel framework-stat-card">
          <div className="stat-card-title green">
            <h3>Độ phủ Kênh</h3>
            <Users size={20} />
          </div>
          <p>Tỷ lệ các kênh đã được gán RSM và danh sách ASM đầy đủ.</p>
          <strong className="green">92% <span>hoàn tất</span></strong>
          <i><span className="green" style={{ width: "92%" }} /></i>
        </article>
        <article className="framework-guide-card">
          <h3>Hướng dẫn cấu hình</h3>
          <p>Đảm bảo mỗi RSM không quản lý quá 3 kênh chính để duy trì độ chính xác của dự báo doanh số. Mỗi kênh GT cần tối thiểu 3 ASM địa phương.</p>
          <button>
            Xem tài liệu vận hành
            <ArrowRight size={16} />
          </button>
        </article>
      </div>
    </section>
  );
}

function ApprovalWorkflowConfig({ onUsers, onPermissions, onChannelConfig, onSlaConfig }) {
  return (
    <section className="page-flow workflow-config-page">
      <SystemSwitcher active="workflow" onUsers={onUsers} onPermissions={onPermissions} onChannelConfig={onChannelConfig} onSlaConfig={onSlaConfig} />

      <div className="page-heading with-actions workflow-heading">
        <div>
          <div className="breadcrumb">
            <button>Quản lý hệ thống</button>
            <ChevronRight size={15} />
            <strong>Cấu hình Quy trình Phê duyệt</strong>
          </div>
          <h2>Cấu hình Quy trình Phê duyệt</h2>
          <p>Thiết lập các bước thẩm định song song và phê duyệt cuối cho Forecast KD01.</p>
        </div>
        <div className="action-row">
          <button className="secondary-button">Hủy</button>
          <button className="primary-button">
            <Save size={18} />
            Lưu cấu hình
          </button>
        </div>
      </div>

      <div className="workflow-grid">
        <section className="panel workflow-step-card">
          <div className="workflow-step-title">
            <span>1</span>
            <h3>Bước 1: Thẩm định song song</h3>
          </div>

          <WorkflowRoleCard role="BP. Cung ứng" sla="24" priority="Trung bình" />
          <WorkflowRoleCard role="BP. BI & Data" sla="12" priority="Cao" />
          <WorkflowRoleCard role="BP. Nhà máy" sla="24" priority="Trung bình" />
          <WorkflowRoleCard role="BP. Tài chính" sla="24" priority="Trung bình" />

          <button className="add-role-button">
            <Plus size={21} />
            Thêm vai trò thẩm định
          </button>

          <div className="monthly-deadline-box muted">
            <Circle size={18} />
            <div>
              <strong>Hạn định cố định hàng tháng</strong>
                <p>Kết thúc trước ngày <input value="20" readOnly /> hàng tháng</p>
            </div>
          </div>
        </section>

        <aside className="workflow-side">
          <section className="panel workflow-final-card">
            <div className="workflow-step-title green">
              <span>2</span>
              <h3>Bước 2: Phê duyệt cuối cùng</h3>
            </div>
            <label className="workflow-field full">
              <span>Người quyết định cuối cùng</span>
              <select defaultValue="CEO">
                <option>CEO</option>
                <option>COO</option>
              </select>
            </label>
            <div className="workflow-two-cols">
              <label className="workflow-field">
                <span>SLA phê duyệt (giờ)</span>
                <input value="48" readOnly />
              </label>
              <div className="workflow-priority">
                <span>Loại ưu tiên</span>
                <strong>Urgent</strong>
              </div>
            </div>
            <div className="monthly-deadline-box active">
              <Circle size={18} />
              <div>
                <strong>Hạn định cố định hàng tháng</strong>
                <p>Hoàn tất trước ngày <input value="22" readOnly /> hàng tháng</p>
              </div>
            </div>
          </section>

          <section className="panel workflow-logic-card">
            <h3>LOGIC & ĐIỀU KIỆN</h3>
            <div className="logic-toggle-row">
              <div>
                <strong>Yêu cầu tất cả thẩm định</strong>
                <p>Tất cả các bộ phận ở Bước 1 phải hoàn tất thẩm định trước khi chuyển sang Bước 2.</p>
              </div>
              <button className="switch-toggle active" aria-label="Bật yêu cầu tất cả thẩm định" />
            </div>
            <div className="logic-info-box">
              <Info size={19} />
              <p>Khi SLA thẩm định vượt quá 100%, hệ thống sẽ tự động nhắc nhở qua Lark và email của người phụ trách.</p>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function SlaConfig({ onUsers, onPermissions, onChannelConfig, onApprovalConfig }) {
  return (
    <section className="page-flow sla-config-page">
      <SystemSwitcher active="sla" onUsers={onUsers} onPermissions={onPermissions} onChannelConfig={onChannelConfig} onApprovalConfig={onApprovalConfig} />

      <div className="page-heading with-actions sla-heading">
        <div>
          <h2>Cấu hình SLA</h2>
          <p>Thiết lập thời gian phản hồi cho các mốc nộp file, thẩm định và phê duyệt trong quy trình Forecast KD01.</p>
        </div>
        <div className="action-row">
          <button className="secondary-button">Hủy</button>
          <button className="primary-button">
            <Save size={18} />
            Lưu cấu hình
          </button>
        </div>
      </div>

      <div className="sla-grid">
        <SlaStageCard
          tone="blue"
          icon={ClipboardList}
          title="SLA Thẩm định"
          badge="GIAI ĐOẠN 1"
          description="Áp dụng cho các bước rà soát file forecast từ kênh, kiểm tra logic dữ liệu và đối chiếu năng lực cung ứng."
          dayValue="2"
          monthlyValue="20"
          firstActive
          roles={["BP. Cung ứng", "BP. BI/Data", "BP. Nhà máy", "BP. Tài chính"]}
        />
        <div className="sla-right-column">
          <SlaStageCard
            tone="green"
            icon={Settings}
            title="SLA Phê duyệt"
            badge="GIAI ĐOẠN 2"
            description="Áp dụng cho bước CEO/Ban Giám đốc xác nhận bản forecast chính thức trước khi phát hành."
            dayValue="2"
            monthlyValue="22"
            roles={["CEO / Ban Giám đốc", "Admin vận hành"]}
          />
          <article className="sla-warning-card">
            <AlertTriangle size={24} />
            <div>
              <strong>Lưu ý quan trọng</strong>
              <p>Việc rút ngắn SLA phê duyệt xuống dưới 2 ngày có thể khiến các bộ phận chưa đủ thời gian rà soát file điều chỉnh. Hệ thống sẽ tự động gửi nhắc nhở 24h trước khi hết hạn.</p>
            </div>
          </article>
        </div>
      </div>

      <div className="sla-footer-card">
        <div className="avatar-stack compact">
          <span>VA</span>
          <span>TA</span>
          <span>+3</span>
        </div>
        <p>Sửa đổi lần cuối bởi Nguyễn Tú Anh vào 14:30, 24/06/2026</p>
        <strong><i />Trạng thái: Hoạt động</strong>
      </div>
      <footer className="sla-page-footer">ELMICH OPS © 2026 • FORECAST MANAGEMENT KD01</footer>
    </section>
  );
}

function SlaStageCard({ tone, icon: Icon, title, badge, description, dayValue, monthlyValue, firstActive, roles }) {
  return (
    <section className={`panel sla-stage-card ${tone}`}>
      <div className="sla-card-header">
        <span className={`sla-card-icon ${tone}`}>
          <Icon size={24} />
        </span>
        <h3>{title}</h3>
        <small>{badge}</small>
      </div>
      <p>{description}</p>
      <div className={`sla-option ${firstActive ? "active" : ""}`}>
        <Circle size={18} />
        <div>
          <strong>Theo số ngày làm việc</strong>
          <p><input value={dayValue} readOnly /> ngày làm việc kể từ khi nhận file/task</p>
        </div>
      </div>
      <div className={`sla-option ${firstActive ? "" : "active"}`}>
        <Circle size={18} />
        <div>
          <strong>Hạn định cố định hàng tháng</strong>
          <p>{firstActive ? "Kết thúc vào ngày" : "Hoàn tất trước ngày"} <input value={monthlyValue} readOnly /> hàng tháng</p>
        </div>
      </div>
      <div className="sla-role-section">
        <span>Vai trò áp dụng</span>
        <div>
          {roles.map((role, index) => (
            <small key={role}>
              {index === 0 ? <Users size={13} /> : <Building2 size={13} />}
              {role}
            </small>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowRoleCard({ role, sla, priority }) {
  return (
    <article className="workflow-role-card">
      <div className="workflow-role-grid">
        <label className="workflow-field">
          <span>Vai trò thẩm định</span>
          <select defaultValue={role}>
            <option>{role}</option>
            <option>BP. Nhà máy</option>
            <option>BP. Tài chính</option>
          </select>
        </label>
        <label className="workflow-field">
          <span>SLA (giờ)</span>
          <input value={sla} readOnly />
        </label>
      </div>
      <label className="workflow-field priority-select">
        <span>Ưu tiên</span>
        <select defaultValue={priority}>
          <option>Trung bình</option>
          <option>Cao</option>
          <option>Thấp</option>
        </select>
      </label>
    </article>
  );
}

function StoragePage({ level, onOpenFolder, onOpenFile, forecasts = initialForecasts, files = initialPublishedFiles }) {
  const isFolder = level === "folder";
  const publishedForecasts = forecasts.filter((forecast) => forecast.status === "Phát hành");
  const rows = isFolder
    ? files.map((file) => [file.name, `${file.channel} • ${file.version}`, file.modified, file.size, file.id])
    : publishedForecasts.map((forecast) => [
        forecast.month,
        `Thư mục • ${files.filter((file) => file.forecastId === forecast.id).length || 1} tệp tin`,
        forecast.deadline,
        "--",
        forecast.id,
      ]);

  return (
    <section className="page-flow storage-page">
      <div className="storage-breadcrumb-row">
        <div className="breadcrumb">
          <button>⌂ Kho lưu trữ</button>
          <ChevronRight size={15} />
          <button>Bản Forecast chính thức</button>
          {isFolder && (
            <>
              <ChevronRight size={15} />
              <strong>T07.2026</strong>
            </>
          )}
        </div>
        <div className="action-row">
          <button className="secondary-button">
            <Filter size={18} />
            Phân loại
          </button>
          <button className="primary-button">
            <Download size={18} />
            Tải toàn bộ (.zip)
          </button>
        </div>
      </div>

      <div className="storage-top-grid">
        <button type="button" className="storage-folder-card" onClick={onOpenFolder}>
          <span className="folder-tile orange">
            <Folder size={24} />
          </span>
          <span className="pin-button" title="Ghim" aria-hidden="true">⌖</span>
          <strong>Forecast T07/2026</strong>
          <small>12 files • Cập nhật sau phê duyệt</small>
        </button>
        <article className="storage-folder-card">
          <span className="folder-tile blue">
            <Folder size={24} />
          </span>
          <button className="pin-button" title="Tùy chọn">
            <MoreVertical size={18} />
          </button>
          <strong>Lưu trữ Forecast 2026</strong>
          <small>48 files • 1.2 GB</small>
        </article>
        <article className="storage-usage-card">
          <div>
            <strong>Dung lượng kho lưu trữ</strong>
            <small>Đã dùng 45.2 GB trên 100 GB</small>
          </div>
          <Cloud size={24} />
          <i><span /></i>
        </article>
      </div>

      <section className="panel storage-list-panel">
        <div className="storage-list-title">
          <h3>
            <FolderOpen size={22} />
            Danh sách tệp tin
          </h3>
          <div className="storage-view-icons">
            <LayoutDashboard size={20} />
            <button>
              <ClipboardList size={20} />
            </button>
          </div>
        </div>
        <div className="storage-table">
          <div className="storage-head">
            <span>Tên tệp</span>
            <span>Ngày sửa đổi</span>
            <span>Kích thước</span>
          </div>
          {rows.map((row, index) => (
            <button
              className="storage-row"
              key={row[0]}
              onClick={() => (isFolder ? onOpenFile(row[4]) : onOpenFolder(row[4]))}
            >
              <span className="storage-name">
                <Folder size={22} />
                <span>
                  <strong>{row[0]}</strong>
                  <small>{row[1]}</small>
                </span>
              </span>
              <span className="mono-date">{row[2]}</span>
              <span>{row[3]}</span>
            </button>
          ))}
        </div>
        <div className="table-footer">
          <span>Hiển thị 1 - 4 trong tổng số 15 mục</span>
          <div className="pagination">
            <button className="ghost-page">‹</button>
            <button className="current">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </section>
    </section>
  );
}

function StorageFileDetail({ file, forecast }) {
  const displayFile = file || initialPublishedFiles[0];
  const displayForecast = forecast || initialForecasts.find((item) => item.id === displayFile?.forecastId) || initialForecasts[0];

  return (
    <section className="storage-file-layout">
      <div className="storage-file-main">
        <section className="panel file-hero-card">
          <span className="file-icon green large-file-icon">
            <FileText size={36} />
          </span>
          <div className="file-hero-content">
            <div className="file-title-line">
              <h2>{displayFile?.name}</h2>
              <button className="primary-button">
                <Download size={18} />
                Tải xuống
              </button>
              <button className="secondary-button">
                <Eye size={18} />
                Xem trước
              </button>
            </div>
            <div className="file-published-row">
              <span className="status-badge success">Đã phát hành</span>
              <p>Cập nhật {displayFile?.modified} bởi <strong>{displayFile?.owner}</strong></p>
            </div>
            <div className="file-meta-grid">
              <div>
                <span className="eyebrow">Loại file</span>
                <strong>Microsoft Excel (.xlsx)</strong>
              </div>
              <div>
                <span className="eyebrow">Dung lượng</span>
                <strong>{displayFile?.size}</strong>
              </div>
              <div>
                <span className="eyebrow">Vị trí lưu</span>
                <strong>Forecast / {displayForecast?.monthShort} / {displayFile?.channel}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="panel version-card">
          <div className="panel-title-row">
            <h3>Lịch sử phiên bản</h3>
            <button>So sánh phiên bản</button>
          </div>
          <div className="version-table">
            <div className="version-head">
              <span>Phiên bản</span>
              <span>Thời gian</span>
              <span>Người cập nhật</span>
              <span>Nội dung thay đổi</span>
              <span>Thao tác</span>
            </div>
            {[
              [`${displayFile?.version || "v1.0"} (Hiện tại)`, displayFile?.modified || "29/06/2026 16:30", displayFile?.owner || "Nguyễn Tú Anh", "Bản Forecast chính thức sau phê duyệt CEO.", "more"],
              ["v2.0", "21/07/2026 09:15", "Lê Văn Khoa", "Nộp bản tổng hợp sau thẩm định.", "restore"],
              ["v1.8", "20/07/2026 16:45", "Trần Mỹ Linh", "Cập nhật nhu cầu SKU nhóm Gia dụng.", "restore"],
            ].map((row) => (
              <article className="version-row" key={row[0]}>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
                <span>{row[2]}</span>
                <span>{row[3]}</span>
                <button className="icon-button table-action">
                  {row[4] === "more" ? <MoreVertical size={20} /> : <Clock3 size={20} />}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="storage-file-rail">
        <section className="panel linked-context-card">
          <h3>Liên kết nghiệp vụ</h3>
          <article>
            <span className="large-icon blue">
              <Calendar size={22} />
            </span>
            <div>
              <span className="eyebrow">Lịch Forecast</span>
              <strong>{displayForecast?.title}</strong>
            </div>
            <ChevronRight size={20} />
          </article>
          <article>
            <span className="large-icon green">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <span className="eyebrow">Task liên quan</span>
              <strong>{displayFile?.name}</strong>
            </div>
            <ChevronRight size={20} />
          </article>
        </section>
        <section className="panel file-stats-card">
          <h3>Thông số</h3>
          <span>Lượt tải xuống</span>
          <div>
            <strong>124</strong>
            <small>+12%<br />so với tháng trước</small>
          </div>
          <p>
            <Lock size={18} />
            Chỉ người có quyền được chỉnh sửa phiên bản đã phát hành.
          </p>
        </section>
      </aside>
    </section>
  );
}

function ForecastDetail({
  forecast,
  tasks = initialTasks,
  progress = 0,
  onOpenTask,
  onRsmApprove,
  onGdkdApprove,
  onSubmitAppraisal,
}) {
  const displayForecast = forecast || initialForecasts[0];
  const allBusinessApproved = tasks.length > 0 && tasks.every((task) => task.status === "GĐKD đã duyệt");
  const doneCount = tasks.filter((task) => ["GĐKD đã duyệt", "Phát hành"].includes(task.status)).length;
  const waitingCount = tasks.filter((task) => ["Chờ RSM duyệt", "Chờ GĐKD duyệt"].includes(task.status)).length;
  const openCount = Math.max(0, tasks.length - doneCount - waitingCount);

  return (
    <section className="page-flow detail-page">
      <div className="detail-title-row">
        <div>
          <span className="detail-kicker">Chi tiết kế hoạch</span>
          <h2>Lịch Forecast KD01 - {displayForecast.month}</h2>
        </div>
        <div className="action-row">
          <button className="secondary-button">
            <Pencil size={18} />
            Chỉnh sửa
          </button>
          <button
            className="primary-button"
            disabled={!allBusinessApproved}
            onClick={() => onSubmitAppraisal(displayForecast.id)}
            title={allBusinessApproved ? "Trình thẩm định" : "Cần GĐKD duyệt 100% task trước"}
          >
            <Share2 size={18} />
            Tổng hợp
          </button>
        </div>
      </div>

      <section className="panel forecast-info-panel">
        <div className="panel-title-row">
          <h3>Thông tin tổng quan</h3>
          <span className="id-badge">ID: {displayForecast.id.toUpperCase()}</span>
        </div>
        <div className="forecast-info-grid">
          <div className="forecast-info-cell month-cell">
            <div className="label-row">
              <span className="eyebrow">Kỳ Forecast</span>
              <span className={`status-badge ${getStatusTone(displayForecast.status)}`}>{displayForecast.status}</span>
            </div>
            <strong>{displayForecast.month}</strong>
            <div className="divider-line" />
            <span className="eyebrow">Tiến độ hoàn thành</span>
            <div className="detail-progress">
              <i><span style={{ width: `${progress}%` }} /></i>
              <strong>{progress}%</strong>
            </div>
          </div>

          <div className="forecast-info-cell">
            <span className="eyebrow">Hạn chót phê duyệt tổng (Deadline)</span>
            <div className="deadline-summary">
              <span className="deadline-icon">
                <Calendar size={20} />
              </span>
              <div>
                <strong>{displayForecast.deadline}</strong>
                <small>Hạn CEO phê duyệt cuối</small>
              </div>
            </div>
          </div>

          <div className="forecast-info-cell note-cell">
            <span className="eyebrow">Ghi chú vận hành</span>
            <blockquote>{displayForecast.note}</blockquote>
          </div>
        </div>
      </section>

      <section className="panel detail-task-panel">
        <div className="panel-title-row detail-task-top">
          <h3>Danh sách Tasks theo Kênh</h3>
          <div className="detail-search-row">
            <label className="detail-search">
              <Search size={18} />
              <input placeholder="Tìm kiếm kênh..." />
            </label>
            <button className="icon-button table-action" title="Lọc">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="detail-task-table">
          <div className="detail-task-head">
            <span>Tên kênh</span>
            <span>Hạn chót</span>
            <span>Tài liệu</span>
            <span>Trạng thái</span>
            <span>Thao tác</span>
          </div>
          {tasks.map((row) => (
            <article className="detail-task-row" key={row.channel}>
              <div className="task-channel">
                <span className={`task-icon ${row.iconTone}`}>
                  <row.icon size={20} />
                </span>
                <div>
                  <strong>{row.channel}</strong>
                  <small>{row.owner}</small>
                </div>
              </div>
              <div className={row.danger ? "deadline-danger" : ""}>
                <span>{row.deadline}</span>
                {row.sla && <small>{row.sla}</small>}
              </div>
              <div>
                {row.file && (
                  <span className="file-pill">
                    <FileText size={14} />
                    {row.file}
                  </span>
                )}
                {!row.file && (
                  <button className="upload-pill" onClick={() => onOpenTask(row.id)}>
                    <Upload size={14} />
                    Tải lên
                  </button>
                )}
              </div>
              <span>
                <Badge tone={row.statusTone}>{row.status}</Badge>
              </span>
              <span className="detail-action-icons">
                <button className="icon-button table-action" title="Tài liệu">
                  <Calendar size={18} />
                </button>
                <button className="icon-button table-action" title="Chỉnh sửa" onClick={() => onOpenTask(row.id)}>
                  <Pencil size={18} />
                </button>
                <button className="icon-button table-action" title="Báo cáo">
                  <BarChart3 size={18} />
                </button>
                <button className="icon-button table-action" title="Checklist">
                  <ClipboardList size={18} />
                </button>
                {row.status === "Chờ RSM duyệt" && (
                  <button className="icon-button table-action" title="RSM duyệt" onClick={() => onRsmApprove(row.id)}>
                    <CheckCircle2 size={18} />
                  </button>
                )}
                {row.status === "Chờ GĐKD duyệt" && (
                  <button className="icon-button table-action" title="GĐKD duyệt" onClick={() => onGdkdApprove(row.id)}>
                    <Check size={18} />
                  </button>
                )}
              </span>
            </article>
          ))}
        </div>

        <div className="detail-history-row">
          <em>Cập nhật lần cuối: 10 phút trước bởi Admin vận hành</em>
          <button>Xem tất cả lịch sử</button>
        </div>
      </section>

      <div className="detail-summary-strip">
        <article className="detail-summary-card green">
          <strong>{doneCount}</strong>
          <span>Kênh đã hoàn tất</span>
        </article>
        <article className="detail-summary-card yellow">
          <strong>{waitingCount}</strong>
          <span>Đang chờ duyệt</span>
        </article>
        <article className="detail-summary-card red">
          <strong>{openCount}</strong>
          <span>Cần xử lý lại</span>
        </article>
      </div>
    </section>
  );
}

function MiniMetric({ icon: Icon, label, value, tone }) {
  return (
    <article className="mini-metric">
      <span className={`large-icon ${tone}`}>
        <Icon size={24} />
      </span>
      <div>
        <span className="eyebrow">{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function TemplatePanel() {
  const files = [
    { icon: FileSpreadsheet, name: "Template_FC_KD01_T07_2026.xlsx", meta: "EXCEL • 1.2 MB", tone: "blue" },
    { icon: FileText, name: "Mapping_Channel_RSM_ASM.csv", meta: "CSV • 450 KB", tone: "green" },
    { icon: FileSpreadsheet, name: "Capacity_Check_NhaMay.xlsx", meta: "EXCEL • 2.5 MB", tone: "orange" },
  ];

  return (
    <section className="panel side-panel">
      <h3>File mẫu (Templates)</h3>
      <div className="file-list">
        {files.map((file) => {
          const Icon = file.icon;
          return (
            <article className="file-item" key={file.name}>
              <span className={`file-icon ${file.tone}`}>
                <Icon size={22} />
              </span>
              <div>
                <strong>{file.name}</strong>
                <small>{file.meta}</small>
              </div>
              <button className="icon-button table-action" title="Tải xuống">
                <Download size={18} />
              </button>
            </article>
          );
        })}
      </div>
      <button className="dashed-button">Xem tất cả 45 tệp tin</button>
    </section>
  );
}

function DeadlinePanel() {
  const items = [
    { name: "ASM/RSM nộp file kênh", value: "Còn 2 ngày", width: "86%", tone: "red" },
    { name: "Bộ phận thẩm định", value: "Còn 4 ngày", width: "60%", tone: "orange" },
    { name: "CEO phê duyệt cuối", value: "Còn 6 ngày", width: "30%", tone: "blue" },
  ];

  return (
    <section className="panel side-panel deadline-panel">
      <h3>Deadline theo mốc xử lý</h3>
      {items.map((item) => (
        <div className="deadline-item" key={item.name}>
          <div>
            <span>{item.name}</span>
            <strong className={item.tone}>{item.value}</strong>
          </div>
          <i><span className={item.tone} style={{ width: item.width }} /></i>
        </div>
      ))}
    </section>
  );
}

function CreateForecastStepOne({ onCancel, onNext, draft, setDraft }) {
  const currentDraft = draft || { month: "Tháng 08/2026", deadline: "22/08/2026", time: "17:00", note: "" };
  const deadlineInputValue = toDateInputValue(currentDraft.deadline);
  const updateDraft = (patch) => setDraft({ ...currentDraft, ...patch });
  const openPicker = (event) => {
    const input = event.currentTarget.querySelector("input");
    input?.showPicker?.();
    input?.focus();
  };

  return (
    <section className="page-flow create-page">
      <Breadcrumb current="Tạo lịch mới" />
      <div className="page-heading">
        <h2>Thiết lập Forecast mới</h2>
        <p>Khởi tạo kỳ Forecast KD01, đặt hạn tổng và hướng dẫn cho các kênh nhập file.</p>
      </div>

      <StepTabs active={1} />

      <section className="panel form-panel">
        <div className="form-group">
          <label>Chọn kỳ Forecast <strong>*</strong></label>
          <div className="month-grid">
            {["Tháng 07/2026", "Tháng 08/2026", "Tháng 09/2026", "Tháng 10/2026"].map((month) => (
              <button
                className={month === currentDraft.month ? "selected" : ""}
                key={month}
                onClick={() => updateDraft({ month })}
              >
                {month}
              </button>
            ))}
          </div>
          <p>Kỳ Forecast sẽ tạo task cho từng kênh và theo dõi từ lúc giao việc đến khi phát hành bản chính thức.</p>
        </div>

        <div className="form-group">
          <label>Thiết lập Deadline tổng <strong>*</strong></label>
          <div className="input-grid">
            <div className="input-shell picker-shell" onClick={openPicker}>
              <input
                aria-label="Chọn ngày deadline tổng"
                type="date"
                value={deadlineInputValue}
                onChange={(event) => updateDraft({ deadline: toDisplayDate(event.target.value) })}
              />
              <Calendar size={20} />
            </div>
            <div className="input-shell picker-shell" onClick={openPicker}>
              <input
                aria-label="Chọn giờ deadline tổng"
                type="time"
                value={currentDraft.time || "17:00"}
                onChange={(event) => updateDraft({ time: event.target.value })}
              />
              <Clock3 size={20} />
            </div>
          </div>
          <div className="warning-box">
            <AlertTriangle size={19} />
            Deadline tổng là hạn phê duyệt cuối; các mốc nộp file/thẩm định sẽ được chia theo SLA bên dưới.
          </div>
        </div>

        <div className="form-group">
          <label>Ghi chú / Hướng dẫn cụ thể</label>
          <textarea
            placeholder="Nhập các lưu ý quan trọng cho các bộ phận tham gia forecast..."
            value={currentDraft.note}
            onChange={(event) => updateDraft({ note: event.target.value })}
          />
        </div>

        <div className="form-actions">
          <button className="secondary-button" onClick={onCancel}>Hủy bỏ</button>
          <button className="primary-button" onClick={onNext}>
            Tiếp tục
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </section>
  );
}

function CreateForecastStepTwo({ onBack, onFinish, draft }) {
  const [asmModalOpen, setAsmModalOpen] = useState(false);
  const monthCode = draft?.month?.match(/(\d{2})\/(\d{4})/)?.[1] || "08";
  const assignmentRows = [
    { channel: "Kênh GT", region: "Miền Bắc", asm: "3 ASM", deadline: `18/${monthCode}/2026`, file: "" },
    { channel: "Kênh MT", region: "Toàn Quốc", asm: "2 ASM", deadline: `18/${monthCode}/2026`, file: `Template_FC_KD01_T${monthCode}.xlsx` },
    { channel: "Kênh Showroom", region: "Miền Nam", asm: "4 ASM", deadline: `19/${monthCode}/2026`, file: "" },
    { channel: "Kênh TMĐT", region: "Toàn Quốc", asm: "5 ASM", deadline: `19/${monthCode}/2026`, file: `Template_FC_KD01_T${monthCode}.xlsx` },
  ];

  return (
    <section className="page-flow create-page channel-setup-page">
      <WideStepper />
      <div className="page-heading with-actions channel-heading">
        <div>
          <h2>Giao việc Forecast theo Kênh Bán Hàng</h2>
          <p>Phân bổ deadline nộp file, người phụ trách và template Forecast cho từng kênh.</p>
        </div>
        <button className="secondary-blue-button">
          <Plus size={18} />
          Thêm Kênh mới
        </button>
      </div>

      <section className="panel assignment-panel">
        <div className="assignment-table">
          <div className="assignment-head">
            <span>Kênh</span>
            <span>Miền</span>
            <span>GĐKD</span>
            <span>RSM</span>
            <span>ASM</span>
            <span>Deadline</span>
            <span>File mẫu</span>
          </div>
          {assignmentRows.map((row, index) => (
            <article className="assignment-row" key={`${row.region}-${index}`}>
              <div>{row.channel && <span className="channel-pill">{row.channel}</span>}</div>
              <span>{row.region}</span>
              <Person name="Nguyễn Văn Nam" badge="N" tone="blue" />
              <Person name={index === 2 ? "Trần Thị B" : "Lê Thị Thảo"} badge="L" tone="slate" />
              <button className="asm-count-pill" onClick={() => setAsmModalOpen(true)}>
                <Users size={16} />
                {row.asm}
              </button>
              <div className="date-input-chip">
                <Calendar size={20} />
                {row.deadline}
              </div>
              <div>
                {row.file ? (
                  <span className="file-pill">
                    <FileText size={15} />
                    <span>{row.file}</span>
                  </span>
                ) : (
                  <button className="attach-template">
                    <Upload size={15} />
                    Đính kèm mẫu
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="system-note">
          <Info size={22} />
          <div>
            <strong>Lưu ý hệ thống</strong>
            <p>Hệ thống sẽ tự động gửi nhắc nhở qua Lark đến người phụ trách kênh 24 giờ trước deadline nộp file.</p>
          </div>
        </div>
      </section>

      <div className="create-step-actions">
        <button className="secondary-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Quay lại Bước 1
        </button>
        <div>
          <button className="link-button">Lưu bản nháp</button>
          <button className="primary-button" onClick={onFinish}>
            Lưu và Hoàn tất
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>

      {asmModalOpen && <AsmModal onClose={() => setAsmModalOpen(false)} />}
    </section>
  );
}

function AsmModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <section className="asm-modal">
        <div className="modal-title-row">
          <div>
            <h3>Quản lý Đội ngũ ASM</h3>
            <span>Kênh: GT Toàn Quốc</span>
          </div>
          <button className="icon-button" onClick={onClose} title="Đóng">
            <X size={20} />
          </button>
        </div>

        <div className="modal-section">
          <span className="modal-label">Danh sách ASM hiện tại</span>
          {[
            ["Nguyễn Hoàng Nam", "Khu vực: Đông Bắc"],
            ["Trần Thu Dung", "Khu vực: Duyên Hải"],
          ].map((asm) => (
            <article className="asm-person-row" key={asm[0]}>
              <span className="mini-avatar">{asm[0].slice(0, 1)}</span>
              <div>
                <strong>{asm[0]}</strong>
                <small>{asm[1]}</small>
              </div>
              <button className="icon-button" title="Xóa">
                <X size={15} />
              </button>
            </article>
          ))}
        </div>

        <div className="modal-section add-asm-section">
          <span className="modal-label">Thêm ASM mới</span>
          <div className="add-asm-row">
            <label>
              <Search size={16} />
              <input placeholder="Tìm tên ASM hoặc mã nhân viên..." />
            </label>
            <button className="primary-button">
              <UserPlus size={16} />
              Thêm
            </button>
          </div>
          <small>Chỉ hiển thị các ASM thuộc kênh GT chưa được chỉ định.</small>
        </div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>Hủy</button>
          <button className="primary-button" onClick={onClose}>Lưu thay đổi</button>
        </div>
      </section>
    </div>
  );
}

function Breadcrumb({ current }) {
  return (
    <div className="breadcrumb">
      <button>Lịch Forecast</button>
      <ChevronRight size={15} />
      <strong>{current}</strong>
    </div>
  );
}

function StepTabs({ active }) {
  const steps = ["Thông tin chung", "Thiết lập cho các Kênh", "Xác nhận & Kích hoạt"];
  return (
    <div className="step-tabs">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        return (
          <div className={`step-tab ${active === stepNumber ? "active" : ""}`} key={step}>
            <span>{stepNumber}</span>
            <strong>{step}</strong>
          </div>
        );
      })}
    </div>
  );
}

function WideStepper() {
  return (
    <div className="wide-stepper">
      <div className="wide-step complete">
        <span><Check size={22} /></span>
        <strong>Thiết lập chung</strong>
      </div>
      <i />
      <div className="wide-step active">
        <span>2</span>
        <strong>Giao việc cho Kênh</strong>
      </div>
      <i />
      <div className="wide-step muted">
        <span>3</span>
        <strong>Xác nhận</strong>
      </div>
    </div>
  );
}

function Person({ name, badge, tone }) {
  return (
    <div className="person-cell">
      <span className={`person-badge ${tone}`}>{badge}</span>
      <span>{name}</span>
    </div>
  );
}

function Badge({ children, tone }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}

export default App;
