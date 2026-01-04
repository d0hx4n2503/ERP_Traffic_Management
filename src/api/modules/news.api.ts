import { News, PaginatedNewsResponse } from "@/types/news.types";
import { API_ENDPOINTS, buildUrl } from '../base/endpoints';
import { api } from "../base/apiClient";

export const newsApi = {
    getAllNews: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedNewsResponse> => {
        const url = buildUrl(API_ENDPOINTS.NEWS.LIST, params);
        const response = await api.get<PaginatedNewsResponse>(url);
        return response.data;
    },

    getNewsById: async (id: string): Promise<News> => {
        const url = API_ENDPOINTS.NEWS.GET(id);
        const response = await api.get<News>(url);
        return response.data;
    },

    createNews: async (newsData: Partial<News>): Promise<News> => {
        const url = API_ENDPOINTS.NEWS.CREATE;
        return (await api.post<News>(url, newsData)).data;
    },

    updateNews: async (id: string, newsData: Partial<News>): Promise<News> => {
        const url = API_ENDPOINTS.NEWS.UPDATE(id);
        return (await api.put<News>(url, newsData)).data;
    },

    deleteNews: async (id: string): Promise<News> => {
        const url = API_ENDPOINTS.NEWS.DELETE(id);
        return (await api.delete<News>(url)).data;
    },
}

export default newsApi;