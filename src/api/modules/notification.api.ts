import { PaginatedNotificationResponse, UnreadCountResponse } from '@/types/notification.types';
import { api } from '../base/apiClient';
import { API_ENDPOINTS, buildUrl } from '../base/endpoints';
import { ApiResponse } from '@/types/Common.types';


export const notificationApi = {
    getAllNotifications: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedNotificationResponse> => {
        const url = buildUrl(API_ENDPOINTS.NOTIFICATIONS.LIST, params);
        const response = await api.get<PaginatedNotificationResponse>(url);
        return response.data;
    },

    getNotificationById: async (id: string): Promise<Notification> => {
        const response = await api.get<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.GET(id)
        );
        return response.data.data!;
    },

    createNotification: async (
        data: Partial<Notification>
    ): Promise<Notification> => {
        const response = await api.post<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.CREATE,
            data
        );
        return response.data.data!;
    },

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

    deleteNotification: async (id: string): Promise<void> => {
        await api.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(id));
    },

    getMyNotifications: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedNotificationResponse> => {
        const url = buildUrl(API_ENDPOINTS.NOTIFICATIONS.LIST, params);
        const response = await api.get<PaginatedNotificationResponse>(url);
        return response.data;
    },

    getMyNotificationById: async (id: string): Promise<Notification> => {
        const response = await api.get<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.GET(id)
        );
        return response.data.data!;
    },

    markAsRead: async (id: string): Promise<Notification> => {
        const response = await api.put<ApiResponse<Notification>>(
            API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)
        );
        return response.data.data!;
    },

    markAllAsRead: async (): Promise<void> => {
        await api.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
    },

    getUnreadCount: async (): Promise<UnreadCountResponse> => {
        const response = await api.get<ApiResponse<UnreadCountResponse>>(
            API_ENDPOINTS.NOTIFICATIONS.UNREAD
        );
        return response.data.data!;
    },

    sendNotification: async (id: string): Promise<void> => {
        await api.post(API_ENDPOINTS.NOTIFICATIONS.SEND, { id });
    },

    scheduleNotification: async (data: {
        notification_id: string;
        scheduled_at: string;
    }): Promise<void> => {
        await api.post(API_ENDPOINTS.NOTIFICATIONS.SCHEDULE, data);
    },
};

export default notificationApi;