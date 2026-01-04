export type NotificationCategory = 'info' | 'warning' | 'important' | 'system' | 'news';

export interface News {
    id: string;
    code?: string;
    image: string;
    title: string;
    content: string;
    category: NotificationCategory;
    author: string;
    type: string;
    tag: any[];
    view: number;
    status: string;
    version: number
    creator_id: string;
    modifier_id?: string | null;
    created_at: string;
    updated_at: string;
    active: boolean;
}

export interface PaginatedNewsResponse {
    total_count: number;
    total_pages: number;
    page: number;
    size: number;
    has_more: boolean;
    news: News[];
}
