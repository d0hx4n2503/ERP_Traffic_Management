export type NotificationType = 'info' | 'warning' | 'important' | 'system';

export type NotificationTarget = 'all' | 'personal' | 'group';

export type NotificationStatus = 'unread' | 'read' | 'success';

export interface Notification {
    id: string;
    code?: string;
    title: string;
    content: string;
    type: NotificationType;
    target: NotificationTarget;
    target_user?: string; // CCCD 
    status: NotificationStatus;
    creator_id: string;
    created_at: string;
    updated_at: string;
    active: boolean;
}

export interface PaginatedNotificationResponse {
    total_count: number;
    total_pages: number;
    page: number;
    size: number;
    has_more: boolean;
    notifications: Notification[];
}

export interface UnreadCountResponse {
    unread_count: number;
}