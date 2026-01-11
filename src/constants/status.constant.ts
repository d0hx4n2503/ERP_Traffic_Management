import { AlertCircle, Ban, Calendar, CheckCircle, HelpCircle, PauseCircle, RefreshCw, Search, ShieldAlert, Trash2, Wrench, XCircle } from "lucide-react";

export enum Status {
    VALID = 'valid',                 // Còn hiệu lực
    EXPIRED = 'expired',             // Hết hạn
    PENDING = 'pending',             // Đang xử lý
    ACTIVE = 'active',               // Hoạt động
    SUSPENDED = 'suspended',         // Bị tạm dừng
    REVOKED = 'revoked',             // Bị thu hồi
    SEIZED = 'seized',               // Bị tạm giữ
    LOST = 'lost',                   // Báo mất

    UNDER_INSPECTION = 'under_inspection', // Đang đăng kiểm
    MAINTENANCE = 'maintenance',     // Đang bảo trì

    BLACKLISTED = 'blacklisted',     // Bị đưa vào blacklist
    DESTROYED = 'destroyed',         // Đã tiêu hủy
    TRANSFERRED = 'transferred',     // Đã sang tên

    OTHER = 'other',
}

export const STATUS_LABEL: Record<Status, string> = {
    [Status.VALID]: 'Còn hiệu lực',
    [Status.EXPIRED]: 'Hết hạn',
    [Status.PENDING]: 'Đang xử lý',
    [Status.ACTIVE]: 'Hoạt động',
    [Status.SUSPENDED]: 'Tạm dừng lưu hành',
    [Status.REVOKED]: 'Thu hồi',
    [Status.SEIZED]: 'Tạm giữ',
    [Status.LOST]: 'Báo mất',

    [Status.UNDER_INSPECTION]: 'Đang đăng kiểm',
    [Status.MAINTENANCE]: 'Đang bảo trì',

    [Status.BLACKLISTED]: 'Danh sách đen',
    [Status.DESTROYED]: 'Đã tiêu hủy',
    [Status.TRANSFERRED]: 'Đã sang tên',

    [Status.OTHER]: 'Khác',
};

export const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    'active': { label: 'Hoạt động', color: 'bg-green-500', icon: CheckCircle },
    'expired': { label: 'Hết hạn', color: 'bg-red-500', icon: AlertCircle },
    'pending': { label: 'Chờ xử lý', color: 'bg-yellow-500', icon: Calendar },
    'suspended': { label: 'Tạm dừng lưu hành', color: 'bg-orange-500', icon: PauseCircle, },
    'revoked': { label: 'Thu hồi', color: 'bg-red-700', icon: XCircle, },
    'seized': { label: 'Tạm giữ', color: 'bg-orange-600', icon: ShieldAlert, },
    'lost': { label: 'Báo mất', color: 'bg-gray-500', icon: AlertCircle, },
    'under_inspection': { label: 'Đang đăng kiểm', color: 'bg-blue-500', icon: Search, },
    'maintenance': { label: 'Đang bảo trì', color: 'bg-indigo-500', icon: Wrench, },
    'blacklist': { label: 'Danh sách đen', color: 'bg-black text-white', icon: Ban, },
    'destroyed': { label: 'Đã tiêu hủy', color: 'bg-gray-700', icon: Trash2, },
    'transferred': { label: 'Đã sang tên', color: 'bg-cyan-500', icon: RefreshCw, },
    'other': { label: 'Khác', color: 'bg-gray-400', icon: HelpCircle, },
};