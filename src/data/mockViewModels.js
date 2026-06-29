import { mockDatabase } from "./mockDatabase";

const permissionLabels = {
  full: "Toàn quyền",
  scoped: "Theo phạm vi",
  view: "Xem",
  locked: "Không",
};

export const permissionLevelOptions = [
  { value: "full", label: "Toàn quyền" },
  { value: "scoped", label: "Theo phạm vi" },
  { value: "view", label: "Chỉ xem" },
  { value: "locked", label: "Khóa" },
];

function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

function formatMonth(month, year) {
  return `Tháng ${String(month).padStart(2, "0")}/${year}`;
}

function formatMonthShort(month, year) {
  return `T${String(month).padStart(2, "0")}/${year}`;
}

function byId(rows) {
  return rows.reduce((acc, row) => {
    acc[row.id] = row;
    return acc;
  }, {});
}

function getAssignment(assignments, channelId, roleCode) {
  return assignments.find((item) => item.channelId === channelId && item.roleCode === roleCode);
}

function getUserName(usersById, userId) {
  return usersById[userId]?.fullName || "Chưa phân công";
}

function getUserTitle(usersById, userId) {
  return usersById[userId]?.title || "";
}

function getIcon(iconRegistry, iconKey) {
  return iconRegistry[iconKey] || iconRegistry.store;
}

export function buildMockAppData(iconRegistry) {
  const db = mockDatabase;
  const usersById = byId(db.users);
  const rolesById = byId(db.roles);
  const channelsById = byId(db.salesChannels);
  const cyclesById = byId(db.forecastCycles);
  const roleUserCounts = db.userRoles.reduce((acc, row) => {
    acc[row.roleId] = (acc[row.roleId] || 0) + 1;
    return acc;
  }, {});

  const roleDefinitions = db.roles.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    scope: role.scopeLabel,
    users: roleUserCounts[role.id] || 0,
    risk: role.risk,
    isSystem: role.isSystem,
  }));

  const adminUsers = db.users.map((user) => {
    const userRole = db.userRoles.find((item) => item.userId === user.id);
    const role = rolesById[userRole?.roleId] || db.roles[0];
    return {
      id: user.id,
      employeeCode: user.employeeCode,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      department: user.department,
      title: user.title,
      role: role.name,
      scope: userRole?.scopeNote || role.scopeLabel,
      status: user.status,
      initials: user.initials,
      tone: user.tone,
    };
  });

  const permissionMatrix = db.modules
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((module) => {
      const row = { module: module.name, data: module.dataLabel };
      db.roles.forEach((role) => {
        const permission = db.rolePermissions.find((item) => item.moduleId === module.id && item.roleId === role.id);
        row[role.id] = permissionLabels[permission?.permissionLevel || "locked"];
      });
      return row;
    });

  const workflowChannels = db.salesChannels.map((channel) => {
    const asm = getAssignment(db.channelAssignments, channel.id, "ASM");
    const rsm = getAssignment(db.channelAssignments, channel.id, "RSM");
    const director = getAssignment(db.channelAssignments, channel.id, "GDKD");
    return {
      channel: channel.shortName,
      region: channel.region,
      owner: getUserName(usersById, asm?.userId),
      ownerRole: getUserTitle(usersById, asm?.userId),
      rsm: getUserName(usersById, rsm?.userId),
      director: getUserName(usersById, director?.userId),
      marker: channel.marker,
      icon: getIcon(iconRegistry, channel.iconKey),
      iconTone: channel.iconTone,
    };
  });

  const channelRows = db.salesChannels.map((channel) => {
    const rsm = getAssignment(db.channelAssignments, channel.id, "RSM");
    const director = getAssignment(db.channelAssignments, channel.id, "GDKD");
    const asms = db.channelAssignments
      .filter((item) => item.channelId === channel.id && item.roleCode === "ASM")
      .map((item) => getUserTitle(usersById, item.userId) || getUserName(usersById, item.userId));
    return {
      channel: channel.name,
      region: channel.region,
      director: getUserName(usersById, director?.userId),
      directorBadge: usersById[director?.userId]?.initials || "NA",
      rsm: getUserName(usersById, rsm?.userId),
      rsmBadge: usersById[rsm?.userId]?.initials || "NA",
      asms,
      tone: channel.marker,
    };
  });

  const initialForecasts = db.forecastCycles.map((cycle) => ({
    id: cycle.id,
    title: cycle.title,
    month: formatMonth(cycle.month, cycle.year),
    monthShort: formatMonthShort(cycle.month, cycle.year),
    created: formatDate(cycle.createdAt),
    deadline: formatDate(cycle.totalDeadlineAt),
    status: cycle.status,
    tone: cycle.tone,
    note: cycle.note,
    template: cycle.template,
  }));

  const initialTasks = db.forecastTasks.map((task) => {
    const cycle = cyclesById[task.forecastCycleId];
    const channel = channelsById[task.channelId];
    const file = db.forecastFiles.find((item) => item.forecastTaskId === task.id);
    return {
      id: task.id,
      forecastId: task.forecastCycleId,
      title: `Forecast ${channel.shortName} - ${formatMonth(cycle.month, cycle.year)}`,
      channel: channel.shortName,
      region: channel.region,
      owner: getUserName(usersById, task.ownerId),
      ownerRole: getUserTitle(usersById, task.ownerId),
      rsm: getUserName(usersById, task.rsmId),
      director: getUserName(usersById, task.directorId),
      deadline: formatDate(task.deadlineAt),
      due: task.dueText,
      progress: task.progress,
      status: task.status,
      statusTone: task.statusTone,
      marker: channel.marker,
      file: file?.fileName || "",
      fileSize: file?.fileSize || "",
      icon: getIcon(iconRegistry, channel.iconKey),
      iconTone: channel.iconTone,
      template: cycle.template,
    };
  });

  const initialEvents = db.activityLogs.map((event) => ({
    id: event.id,
    tone: event.tone,
    icon: getIcon(iconRegistry, event.iconKey),
    title: event.message,
    body: event.detail,
    time: event.createdAtLabel,
  }));

  const initialPublishedFiles = db.forecastFiles
    .filter((file) => cyclesById[db.forecastTasks.find((task) => task.id === file.forecastTaskId)?.forecastCycleId]?.status === "Phát hành")
    .map((file) => {
      const task = db.forecastTasks.find((item) => item.id === file.forecastTaskId);
      const cycle = cyclesById[task.forecastCycleId];
      const channel = channelsById[task.channelId];
      return {
        id: "file-2026-06-mt",
        forecastId: cycle.id,
        name: file.fileName,
        channel: channel.shortName,
        month: formatMonthShort(cycle.month, cycle.year),
        size: file.fileSize,
        modified: `${formatDate(file.uploadedAt)} 14:30`,
        owner: "Nguyễn Tú Anh",
        version: `v${file.version}.0`,
      };
    });

  return {
    mockDatabase: db,
    workflowChannels,
    channelRows,
    initialForecasts,
    initialTasks,
    initialEvents,
    initialPublishedFiles,
    adminUsers,
    roleDefinitions,
    permissionMatrix,
    permissionActivityLog: db.permissionActivityLogs,
    permissionLevelOptions,
  };
}
