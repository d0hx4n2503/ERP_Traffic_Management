import newsApi from "@/api/modules/news.api";
import { News } from "@/types/news.types";

export const newsService = {
    getAllNews: async (page = 1, size = 20) => {
        return await newsApi.getAllNews({ page, size });
    },

    getNewsById: async (id: string): Promise<News> => {
        return await newsApi.getNewsById(id);
    },

    createNews: async (newsData: Partial<News>): Promise<News> => {
        return await newsApi.createNews(newsData);
    },

    updateNews: async (id: string, newsData: Partial<News>): Promise<News> => {
        return await newsApi.updateNews(id, newsData);
    },

    deleteNews: async (id: string): Promise<News> => {
        return await newsApi.deleteNews(id);
    },
}