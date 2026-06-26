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
  { label: "Quản trị hệ thống", icon: Settings, screen: "channel-config" },
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

function App() {
  const [screen, setScreen] = useState("overview");

  const headerTitle =
    screen === "list"
      ? "Lịch Forecast"
      : screen === "storage-file"
        ? "File Details"
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
      <Sidebar screen={screen} setScreen={setScreen} />
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
        <div className="content-area">
          {screen === "overview" && <Overview onCreate={() => setScreen("create-1")} />}
          {screen === "list" && (
            <ScheduleList
              onCreate={() => setScreen("create-1")}
              onOpen={() => setScreen("detail")}
            />
          )}
          {screen === "detail" && <ForecastDetail />}
          {screen === "tasks" && <TaskList onOpen={() => setScreen("task-update")} />}
          {screen === "task-update" && <TaskUpdate onBack={() => setScreen("tasks")} />}
          {screen === "appraisal" && (
            <AppraisalList onOpen={() => setScreen("appraisal-detail")} />
          )}
          {screen === "appraisal-detail" && <AppraisalDetail />}
          {screen === "approval" && (
            <ApprovalList onOpen={() => setScreen("approval-detail")} />
          )}
          {screen === "approval-detail" && <ApprovalDetail />}
          {screen === "storage" && (
            <StoragePage
              level="root"
              onOpenFolder={() => setScreen("storage-folder")}
              onOpenFile={() => setScreen("storage-file")}
            />
          )}
          {screen === "storage-folder" && (
            <StoragePage
              level="folder"
              onOpenFolder={() => setScreen("storage-file")}
              onOpenFile={() => setScreen("storage-file")}
            />
          )}
          {screen === "storage-file" && <StorageFileDetail />}
          {screen === "channel-config" && (
            <ChannelFrameworkConfig
              onApprovalConfig={() => setScreen("approval-config")}
              onSlaConfig={() => setScreen("sla-config")}
            />
          )}
          {screen === "approval-config" && (
            <ApprovalWorkflowConfig
              onChannelConfig={() => setScreen("channel-config")}
              onSlaConfig={() => setScreen("sla-config")}
            />
          )}
          {screen === "sla-config" && (
            <SlaConfig
              onChannelConfig={() => setScreen("channel-config")}
              onApprovalConfig={() => setScreen("approval-config")}
            />
          )}
          {screen === "create-1" && (
            <CreateForecastStepOne
              onCancel={() => setScreen("list")}
              onNext={() => setScreen("create-2")}
            />
          )}
          {screen === "create-2" && (
            <CreateForecastStepTwo
              onBack={() => setScreen("create-1")}
              onFinish={() => setScreen("overview")}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Sidebar({ screen, setScreen }) {
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
          {navItems.map((item) => {
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
              item.label === "Quản trị hệ thống" && ["channel-config", "approval-config", "sla-config"].includes(screen);
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

function Overview({ onCreate }) {
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
          <button className="primary-button" onClick={onCreate}>
            <Plus size={18} />
            Tạo Forecast mới
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard
          icon={Gauge}
          label="SLA đúng hạn"
          value="92%"
          hint="+6%"
          tone="blue"
          footer={<div className="metric-progress"><span style={{ width: "92%" }} /></div>}
        />
        <MetricCard
          icon={CheckCircle2}
          label="Kênh đã nộp file"
          value="18/24"
          hint="Kỳ 07/2026"
          tone="green"
          footer={<span>6 kênh còn đang nhập liệu</span>}
        />
        <MetricCard
          icon={ClipboardList}
          label="Chờ thẩm định"
          value="08"
          hint="2 quá hạn"
          tone="red"
          footer={<AvatarStack />}
        />
        <MetricCard
          icon={Clock3}
          label="Chờ CEO duyệt"
          value="04"
          hint="Sắp tới hạn"
          tone="soft-red"
          footer={<span>Deadline phê duyệt: 22/07/2026</span>}
        />
      </div>

      <div className="overview-grid">
        <ChartPanel />
        <NoticePanel />
      </div>

      <RecentApprovals />
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

function ChartPanel() {
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

function NoticePanel() {
  const notices = [
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

function RecentApprovals() {
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
        {recentRows.map((row) => (
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

function ScheduleList({ onCreate, onOpen }) {
  return (
    <section className="page-flow">
      <div className="schedule-top">
        <MiniMetric icon={Calendar} label="Đang kích hoạt" value="12 Lịch" tone="blue" />
        <MiniMetric icon={FileText} label="File mẫu" value="45 Bản" tone="green" />
        <MiniMetric icon={ClipboardList} label="Sắp tới hạn" value="03 Deadline" tone="pale" />
        <div className="schedule-actions">
          <button className="primary-button" onClick={onCreate}>
            <Plus size={19} />
            Tạo lịch Forecast
          </button>
          <button className="muted-button">
            <Upload size={18} />
            Tải lên File mẫu
          </button>
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
            {scheduleRows.map((row, index) => (
              <article className={`schedule-row ${row.tone}`} key={row.title}>
                <button className="schedule-name schedule-open" onClick={onOpen}>
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
                <span><Badge tone={row.tone === "active" ? "success" : "neutral"}>{row.status}</Badge></span>
                <span className="row-tools">
                  <button className="icon-button table-action" title="Xem chi tiết" onClick={onOpen}>
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

function TaskList({ onOpen }) {
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
        <TaskMetric title="Tổng số Task" value="42" note="so với tuần trước" delta="+12%" tone="blue" />
        <TaskMetric title="Đang thực hiện" value="18" progress={44} tone="orange" />
        <TaskMetric title="Hoàn thành" value="24" progress={55} tone="green" />
        <TaskMetric title="Quá hạn SLA" value="03" note="Cần xử lý ngay" tone="red" />
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
          {taskRows.map((row) => (
            <article className="task-row" key={row.title}>
              <button className="task-title-cell" onClick={onOpen}>
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
                <button className="icon-button table-action" onClick={onOpen} title="Xem">
                  <Eye size={19} />
                </button>
                <button className="icon-button table-action" onClick={onOpen} title="Sửa">
                  <Pencil size={19} />
                </button>
                <button className="icon-button table-action" title="Phân công">
                  <UserPlus size={19} />
                </button>
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

function TaskUpdate({ onBack }) {
  return (
    <section className="task-update-page">
      <div className="task-update-main">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          Quay lại danh sách Task
        </button>
        <div className="task-update-title">
          <div>
            <h2>Cập nhật Forecast Kênh TMĐT - Tháng 07/2026</h2>
            <p>Mã Task: #FC-2026-07-EC • Phân công: ASM TMĐT Toàn quốc</p>
          </div>
          <div className="action-row">
            <button className="secondary-button">
              <Save size={18} />
              Lưu bản nháp
            </button>
            <button className="primary-button">
              <CheckCircle2 size={18} />
              Gửi cập nhật
            </button>
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
              <strong>Forecast_EC_T07_2026_v1.xlsx</strong>
              <small>4.2 MB • Đã tải lên 2 phút trước</small>
            </div>
            <CheckCircle2 size={22} />
            <button className="icon-button table-action" title="Xóa">
              <Trash2 size={19} />
            </button>
          </div>
        </section>
      </div>

      <aside className="task-update-rail">
        <section className="panel status-update-card">
          <h3>Cập nhật trạng thái</h3>
          <label className="status-option active">
            <Circle size={18} />
            <span>
              <strong>Đang thực hiện</strong>
              <small>Vẫn đang tổng hợp và kiểm tra dữ liệu.</small>
            </span>
          </label>
          <label className="status-option">
            <Circle size={18} />
            <span>
              <strong>Hoàn thành</strong>
              <small>Sẵn sàng để quản lý xem xét.</small>
            </span>
          </label>
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
            ["11:32, 25/06/2026", "Lê Quang Minh đã tải lên tệp Forecast_EC_T07_2026_v1.xlsx."],
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

function AppraisalList({ onOpen }) {
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
            <button className="active">Tất cả</button>
            <button>Chờ thẩm định</button>
            <button>Chờ duyệt</button>
          </div>
          <button className="month-select">
            Tháng 07/2026
            <ChevronRight size={16} />
          </button>
          <label className="appraisal-search">
            <Search size={19} />
            <input placeholder="Tìm kiếm kênh hoặc tên task..." />
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
          {appraisalRows.map((row) => {
            const Icon = row.icon;
            return (
              <article className="appraisal-row" key={row.channel}>
                <div className="appraisal-channel">
                  <span className={`task-icon ${row.iconTone}`}>
                    <Icon size={19} />
                  </span>
                  <strong>{row.channel}</strong>
                </div>
                <button className="appraisal-month" onClick={onOpen}>{row.month}</button>
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
                  <button className="icon-button table-action" title="Thẩm định" onClick={onOpen}>
                    <ClipboardList size={20} />
                  </button>
                  <button className="icon-button table-action" title="Xem" onClick={onOpen}>
                    <Eye size={20} />
                  </button>
                </span>
              </article>
            );
          })}
        </div>
        <div className="table-footer">
          <span>Hiển thị 3 trong tổng số 12 tác vụ</span>
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

function AppraisalDetail() {
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
          <span className="status-badge warning">Đang chờ thẩm định</span>
          <h2>Thẩm định Forecast Kênh TMĐT - Tháng 07/2026</h2>
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
              <strong>Forecast_EC_T07_2026_v1.xlsx</strong>
              <p>Dung lượng: 2.4 MB • Cập nhật lúc 09:45 - 20/07/2026</p>
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
            <button className="active">
              <CheckCircle2 size={20} />
              Phê duyệt
            </button>
            <button>
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
          <button className="secondary-button">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button className="primary-button submit-appraisal-button">
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

function ApprovalList({ onOpen }) {
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
            <button className="active">Tất cả</button>
            <button>Chờ phê duyệt</button>
            <button>Đã phê duyệt</button>
          </div>
          <button className="month-select">
            Tháng 07/2026
            <ChevronRight size={16} />
          </button>
          <label className="appraisal-search">
            <Search size={19} />
            <input placeholder="Tìm kiếm kênh hoặc tên task..." />
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
          {approvalRows.map((row, index) => {
            const Icon = row.icon;
            return (
              <article className="appraisal-row" key={row.channel}>
                <div className="appraisal-channel">
                  <span className={`task-icon ${row.iconTone}`}>
                    <Icon size={19} />
                  </span>
                  <strong>{row.channel}</strong>
                </div>
                <button className="appraisal-month" onClick={onOpen}>{row.month}</button>
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
                  <button className="icon-button table-action" title={index === 0 ? "Đã duyệt" : "Phê duyệt"} onClick={onOpen}>
                    {index === 0 ? <SquarePen size={20} /> : <CheckCircle2 size={20} />}
                  </button>
                  <button className="icon-button table-action" title="Xem" onClick={onOpen}>
                    <Eye size={20} />
                  </button>
                </span>
              </article>
            );
          })}
        </div>
        <div className="table-footer">
          <span>Hiển thị 3 trong tổng số 12 tác vụ</span>
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

function ApprovalDetail() {
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
          <span className="status-badge danger">Chờ duyệt</span>
          <h2>Phê duyệt Forecast Kênh TMĐT - Tháng 07/2026</h2>
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
              <strong>Forecast_EC_T07_2026_v1.xlsx</strong>
              <p>Dung lượng: 2.4 MB • Cập nhật lúc 09:45 - 20/07/2026</p>
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
            <button className="active">
              <CheckCircle2 size={20} />
              Phê duyệt
            </button>
            <button>
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
          <button className="secondary-button">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button className="approve-button">
            Duyệt
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

function ChannelFrameworkConfig({ onApprovalConfig, onSlaConfig }) {
  return (
    <section className="page-flow frame-config-page">
      <div className="system-switcher">
        <button className="active">Cấu hình Khung</button>
        <button onClick={onApprovalConfig}>Quy trình phê duyệt</button>
        <button onClick={onSlaConfig}>Cấu hình SLA</button>
      </div>

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

function ApprovalWorkflowConfig({ onChannelConfig, onSlaConfig }) {
  return (
    <section className="page-flow workflow-config-page">
      <div className="system-switcher">
        <button onClick={onChannelConfig}>Cấu hình Khung</button>
        <button className="active">Quy trình phê duyệt</button>
        <button onClick={onSlaConfig}>Cấu hình SLA</button>
      </div>

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

function SlaConfig({ onChannelConfig, onApprovalConfig }) {
  return (
    <section className="page-flow sla-config-page">
      <div className="system-switcher">
        <button onClick={onChannelConfig}>Cấu hình Khung</button>
        <button onClick={onApprovalConfig}>Quy trình phê duyệt</button>
        <button className="active">Cấu hình SLA</button>
      </div>

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

function StoragePage({ level, onOpenFolder, onOpenFile }) {
  const isFolder = level === "folder";
  const rows = isFolder
    ? [
      ["Kênh MT", "Thư mục • 15 tệp tin", "24/10/2026 14:30", "--"],
        ["Kênh GT", "Thư mục • 15 tệp tin", "22/07/2026 14:30", "--"],
        ["Kênh TMĐT", "Thư mục • 15 tệp tin", "22/07/2026 14:30", "--"],
        ["Kênh Showroom", "Thư mục • 15 tệp tin", "22/07/2026 14:30", "--"],
      ]
    : [
        ["Tháng 07/2026", "Thư mục • 15 tệp tin", "22/07/2026 14:30", "--"],
        ["Tháng 06/2026", "Thư mục • 15 tệp tin", "22/06/2026 14:30", "--"],
        ["Tháng 05/2026", "Thư mục • 15 tệp tin", "22/05/2026 14:30", "--"],
        ["Tháng 04/2026", "Thư mục • 15 tệp tin", "22/04/2026 14:30", "--"],
      ];

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
              onClick={isFolder && index === 3 ? onOpenFile : onOpenFolder}
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

function StorageFileDetail() {
  return (
    <section className="storage-file-layout">
      <div className="storage-file-main">
        <section className="panel file-hero-card">
          <span className="file-icon green large-file-icon">
            <FileText size={36} />
          </span>
          <div className="file-hero-content">
            <div className="file-title-line">
              <h2>Forecast_Showroom_T07_2026_v2.xlsx</h2>
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
              <p>Cập nhật 2 giờ trước bởi <strong>Nguyễn Tú Anh</strong></p>
            </div>
            <div className="file-meta-grid">
              <div>
                <span className="eyebrow">Loại file</span>
                <strong>Microsoft Excel (.xlsx)</strong>
              </div>
              <div>
                <span className="eyebrow">Dung lượng</span>
                <strong>4.2 MB</strong>
              </div>
              <div>
                <span className="eyebrow">Vị trí lưu</span>
                <strong>Forecast / 2026 / T07 / Showroom</strong>
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
              ["v2.1 (Hiện tại)", "22/07/2026 14:20", "Nguyễn Tú Anh", "Điều chỉnh cuối sau phê duyệt CEO.", "more"],
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
              <strong>Forecast Tháng 07/2026</strong>
            </div>
            <ChevronRight size={20} />
          </article>
          <article>
            <span className="large-icon green">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <span className="eyebrow">Task liên quan</span>
              <strong>Forecast Showroom T07/2026</strong>
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

function ForecastDetail() {
  return (
    <section className="page-flow detail-page">
      <div className="detail-title-row">
        <div>
          <span className="detail-kicker">Chi tiết kế hoạch</span>
          <h2>Lịch Forecast KD01 - Tháng 07/2026</h2>
        </div>
        <div className="action-row">
          <button className="secondary-button">
            <Pencil size={18} />
            Chỉnh sửa
          </button>
          <button className="primary-button">
            <Share2 size={18} />
            Tổng hợp
          </button>
        </div>
      </div>

      <section className="panel forecast-info-panel">
        <div className="panel-title-row">
          <h3>Thông tin tổng quan</h3>
          <span className="id-badge">ID: FC-2026-07</span>
        </div>
        <div className="forecast-info-grid">
          <div className="forecast-info-cell month-cell">
            <div className="label-row">
              <span className="eyebrow">Kỳ Forecast</span>
              <span className="status-badge success">Đang thực hiện</span>
            </div>
            <strong>Tháng 07/2026</strong>
            <div className="divider-line" />
            <span className="eyebrow">Tiến độ hoàn thành</span>
            <div className="detail-progress">
              <i><span style={{ width: "65%" }} /></i>
              <strong>65%</strong>
            </div>
          </div>

          <div className="forecast-info-cell">
            <span className="eyebrow">Hạn chót phê duyệt tổng (Deadline)</span>
            <div className="deadline-summary">
              <span className="deadline-icon">
                <Calendar size={20} />
              </span>
              <div>
                <strong>22 Tháng 07, 2026</strong>
                <small>Hạn CEO phê duyệt cuối</small>
              </div>
            </div>
          </div>

          <div className="forecast-info-cell note-cell">
            <span className="eyebrow">Ghi chú vận hành</span>
            <blockquote>
              "Ưu tiên rà soát kênh TMĐT, MT và GT do có nhiều chương trình khuyến mãi tháng 07. Các file đính kèm cần dùng template KD01 version 2.4"
            </blockquote>
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
          {detailTaskRows.map((row) => (
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
                {row.upload && (
                  <button className="upload-pill">
                    <Upload size={14} />
                    Tải lên
                  </button>
                )}
                {row.emptyFile && <span className="empty-file">{row.emptyFile}</span>}
              </div>
              <span>
                <Badge tone={row.statusTone}>{row.status}</Badge>
              </span>
              <span className="detail-action-icons">
                <button className="icon-button table-action" title="Tài liệu">
                  <Calendar size={18} />
                </button>
                <button className="icon-button table-action" title="Chỉnh sửa">
                  <Pencil size={18} />
                </button>
                <button className="icon-button table-action" title="Báo cáo">
                  <BarChart3 size={18} />
                </button>
                <button className="icon-button table-action" title="Checklist">
                  <ClipboardList size={18} />
                </button>
                <button className="icon-button table-action" title="Duyệt">
                  <CheckCircle2 size={18} />
                </button>
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
          <strong>2</strong>
          <span>Kênh đã hoàn tất</span>
        </article>
        <article className="detail-summary-card yellow">
          <strong>1</strong>
          <span>Đang chờ duyệt</span>
        </article>
        <article className="detail-summary-card red">
          <strong>1</strong>
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

function CreateForecastStepOne({ onCancel, onNext }) {
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
              <button className={month === "Tháng 07/2026" ? "selected" : ""} key={month}>
                {month}
              </button>
            ))}
          </div>
          <p>Kỳ Forecast sẽ tạo task cho từng kênh và theo dõi từ lúc giao việc đến khi phát hành bản chính thức.</p>
        </div>

        <div className="form-group">
          <label>Thiết lập Deadline tổng <strong>*</strong></label>
          <div className="input-grid">
            <div className="input-shell">
              <input value="22/07/2026" readOnly />
              <Calendar size={20} />
            </div>
            <div className="input-shell">
              <input value="17:00" readOnly />
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
          <textarea placeholder="Nhập các lưu ý quan trọng cho các bộ phận tham gia forecast..." />
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

function CreateForecastStepTwo({ onBack, onFinish }) {
  const [asmModalOpen, setAsmModalOpen] = useState(false);
  const assignmentRows = [
    { channel: "Kênh GT", region: "Miền Bắc", asm: "3 ASM", deadline: "18/07/2026", file: "" },
    { channel: "Kênh MT", region: "Toàn Quốc", asm: "2 ASM", deadline: "18/07/2026", file: "Template_FC_KD01_T07.xlsx" },
    { channel: "Kênh Showroom", region: "Miền Nam", asm: "4 ASM", deadline: "19/07/2026", file: "" },
    { channel: "Kênh TMĐT", region: "Toàn Quốc", asm: "5 ASM", deadline: "19/07/2026", file: "Template_FC_KD01_T07.xlsx" },
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
                    {row.file}
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
