// src/api/modules/notification.api.ts

import { PaginatedNotificationResponse, UnreadCountResponse } from '@/types/notification.types';
import { api } from '../base/apiClient';
import { API_ENDPOINTS, buildUrl } from '../base/endpoints';
import { ApiResponse } from '@/types/Common.types';


export const notificationApi = {
    // Admin: Lấy danh sách tất cả thông báo (phân trang)
    getAllNotifications: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedNotificationResponse> => {
        const url = buildUrl(API_ENDPOINTS.NOTIFICATIONS.LIST, params);
        const response = await api.get<PaginatedNotificationResponse>(url);
        return response.data;
    },

    // Admin: Lấy thông báo theo ID
    getNotificationById: async (id: string): Promise<Notification> => {
        const response = await api.get<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.GET(id)
        );
        return response.data.data!;
    },

    // Admin: Tạo thông báo mới
    createNotification: async (
        data: Partial<Notification>
    ): Promise<Notification> => {
        const response = await api.post<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.CREATE,
            data
        );
        return response.data.data!;
    },

    // Admin: Cập nhật thông báo
    updateNotification: async (
        id: string,
        data: Partial<Notification>
    ): Promise<Notification> => {
        const response = await api.put<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.UPDATE(id),
            data
        );
        return response.data.data!;
    },

    // Admin: Xóa mềm thông báo
    deleteNotification: async (id: string): Promise<void> => {
        await api.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(id));
    },

    // User: Lấy danh sách thông báo của mình
    getMyNotifications: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedNotificationResponse> => {
        const url = buildUrl(API_ENDPOINTS.NOTIFICATIONS.LIST, params); // dùng cùng endpoint /notifications nhưng có JWT user
        const response = await api.get<PaginatedNotificationResponse>(url);
        return response.data;
    },

    // User: Lấy chi tiết thông báo của mình (tự động mark as read nếu là personal)
    getMyNotificationById: async (id: string): Promise<Notification> => {
        const response = await api.get<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.GET(id)
        );
        return response.data.data!;
    },

    // User: Đánh dấu 1 thông báo đã đọc
    markAsRead: async (id: string): Promise<Notification> => {
        const response = await api.put<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)
        );
        return response.data.data!;
    },

    // User: Đánh dấu tất cả đã đọc
    markAllAsRead: async (): Promise<void> => {
        await api.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
    },

    // User: Lấy số lượng thông báo chưa đọc
    getUnreadCount: async (): Promise<UnreadCountResponse> => {
        const response = await api.get<ApiResponse<UnreadCountResponse>>(
            API_ENDPOINTS.NOTIFICATIONS.UNREAD
        );
        return response.data.data!;
    },

    // Admin: Gửi thông báo ngay (nếu có push hoặc hệ thống khác)
    sendNotification: async (id: string): Promise<void> => {
        await api.post(API_ENDPOINTS.NOTIFICATIONS.SEND, { id });
    },

    // Admin: Lên lịch gửi thông báo
    scheduleNotification: async (data: {
        notification_id: string;
        scheduled_at: string;
    }): Promise<void> => {
        await api.post(API_ENDPOINTS.NOTIFICATIONS.SCHEDULE, data);
    },
};

export default notificationApi;