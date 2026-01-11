import { AlertTriangle, BadgeAlert, CheckCircle, Info } from "lucide-react";

export const typeConfig = {
    info: { label: "Thông tin", color: "bg-blue-500", icon: Info },
    warning: { label: "Cảnh báo", color: "bg-yellow-500", icon: AlertTriangle },
    important: { label: "Quan trọng", color: "bg-orange-500", icon: AlertTriangle },
    system: { label: "Hệ thống", color: "bg-purple-500", icon: CheckCircle },
    request: { label: "Yêu cầu", color: "bg-gray-500", icon: BadgeAlert },
};

export const statusConfig = {
    unread: { label: "Chưa đọc", color: "bg-gray-500" },
    read: { label: "Đã đọc", color: "bg-green-500" },
    success: { label: "Thành công", color: "bg-blue-500" },
    pending: { label: "Chờ xác nhận", color: "bg-yellow-500" }
};

export const audienceConfig = {
    all: "Tất cả",
    personal: "Cá nhân",
    group: "Nhóm",
    admin: 'Quản lý'
};

export interface FilterConfig {
    key: string;
    label: string;
    options: { value: string; label: string }[];
}

export const filters: FilterConfig[] = [
    {
        key: "type",
        label: "Loại thông báo",
        options: [
            { value: "all", label: "Tất cả" },
            { value: "info", label: "Thông tin" },
            { value: "warning", label: "Cảnh báo" },
            { value: "important", label: "Quan trọng" },
            { value: "system", label: "Hệ thống" },
        ],
    },
    {
        key: "status",
        label: "Trạng thái",
        options: [
            { value: "all", label: "Tất cả" },
            { value: "unread", label: "Chưa đọc" },
            { value: "read", label: "Đã đọc" },
            { value: "success", label: "Thành công" },
        ],
    },
    {
        key: "target",
        label: "Đối tượng",
        options: [
            { value: "all", label: "Tất cả" },
            { value: "admin", label: "Quản lý" },
            { value: "personal", label: "Cá nhân" },
            { value: "group", label: "Nhóm" },
        ],
    },
];
