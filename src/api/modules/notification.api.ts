import { Notification, PaginatedNotificationResponse, UnreadCountResponse } from '@/types/notification.types';
import { api } from '../base/apiClient';
import { API_ENDPOINTS, buildUrl } from '../base/endpoints';

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
        const response = await api.get<Notification>(
            API_ENDPOINTS.NOTIFICATIONS.GET(id)
        );
        return response.data;
    },

    createNotification: async (
        data: Partial<Notification>
    ): Promise<Notification> => {
        const response = await api.post<Notification>(
            API_ENDPOINTS.NOTIFICATIONS.CREATE,
            data
        );
        return response.data;
    },

    updateNotification: async (
        id: string,
        data: Partial<Notification>
    ): Promise<Notification> => {
        const response = await api.put<Notification>(
            API_ENDPOINTS.NOTIFICATIONS.UPDATE(id),
            data
        );
        return response.data;
    },

    deleteNotification: async (id: string): Promise<void> => {
        await api.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(id));
    },

    getMyNotifications: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedNotificationResponse> => {
        const url = buildUrl(API_ENDPOINTS.NOTIFICATIONS.MY_LIST, params);
        const response = await api.get<PaginatedNotificationResponse>(url);
        return response.data;
    },

    getMyNotificationById: async (id: string): Promise<Notification> => {
        const response = await api.get<Notification>(
            API_ENDPOINTS.NOTIFICATIONS.MY_GET(id)
        );
        return response.data;
    },

    markAsRead: async (id: string): Promise<Notification> => {
        // Backend currently marks personal notifications as read when fetching detail.
        return notificationApi.getMyNotificationById(id);
    },

    markAllAsRead: async (): Promise<void> => {
        const list = await notificationApi.getMyNotifications({ page: 1, size: 200 });
        const unread = list.notifications.filter((n) => n.status === 'unread');
        await Promise.all(unread.map((n) => notificationApi.markAsRead(n.id)));
    },

    getUnreadCount: async (): Promise<UnreadCountResponse> => {
        const list = await notificationApi.getMyNotifications({ page: 1, size: 200 });
        return { unread_count: list.notifications.filter((n) => n.status === 'unread').length };
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
