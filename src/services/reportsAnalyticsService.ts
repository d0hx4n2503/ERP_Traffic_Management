import reportsApi from '@/api/modules/reports.api';

export const reportsAnalyticsService = {
  getAnalytics: async () => {
    return reportsApi.getAnalytics();
  },
};

export default reportsAnalyticsService;
