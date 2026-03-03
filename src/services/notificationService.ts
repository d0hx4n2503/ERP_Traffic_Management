import notificationApi from '@/api/modules/notification.api';
import { Notification, PaginatedNotificationResponse } from '@/types/notification.types';

export const notificationService = {
    // Admin
    getAllNotifications: async (page = 1, size = 20) => {
        return await notificationApi.getAllNotifications({ page, size });
    },

    getNotificationById: async (id: string): Promise<Notification> => {
        return await notificationApi.getNotificationById(id);
    },

    createNotification: async (data: Partial<Notification>): Promise<Notification> => {
        return await notificationApi.createNotification(data);
    },

    updateNotification: async (
        id: string,
        data: Partial<Notification>
    ): Promise<Notification> => {
        return await notificationApi.updateNotification(id, data);
    },

    deleteNotification: async (id: string): Promise<void> => {
        await notificationApi.deleteNotification(id);
    },

    // User
    getMyNotifications: async (
        page = 1,
        size = 20
    ): Promise<PaginatedNotificationResponse> => {
        return await notificationApi.getMyNotifications({ page, size });
    },

    getMyNotificationDetail: async (id: string): Promise<Notification> => {
        return await notificationApi.getMyNotificationById(id);
    },

    markAsRead: async (id: string): Promise<Notification> => {
        return await notificationApi.markAsRead(id);
    },

    markAllAsRead: async (): Promise<void> => {
        await notificationApi.markAllAsRead();
    },

    getUnreadCount: async (): Promise<number> => {
        const res = await notificationApi.getUnreadCount();
        return res.unread_count;
    },

    // Admin extra
    sendNow: async (id: string): Promise<void> => {
        await notificationApi.sendNotification(id);
    },

    schedule: async (notificationId: string, scheduledAt: string): Promise<void> => {
        await notificationApi.scheduleNotification({
            notification_id: notificationId,
            scheduled_at: scheduledAt,
        });
    },

    // Helper: Lọc thông báo chưa đọc
    getUnreadNotifications: (list: PaginatedNotificationResponse) => {
        return list.notifications.filter((n) => n.status === 'unread');
    },

    // Helper: Kiểm tra có thông báo quan trọng chưa đọc
    hasImportantUnread: (list: PaginatedNotificationResponse) => {
        return list.notifications.some(
            (n) => n.status === 'unread' && n.type === 'important'
        );
    },
};

export default notificationService;
