import { api } from '../base/apiClient';
import { API_ENDPOINTS } from '../base/endpoints';
import licenseApi from './license.api';
import vehicleApi from './vehicle.api';
import { govAgencyApi } from './gov_agency.api';
import newsApi from './news.api';
import notificationApi from './notification.api';

type ViolationSummary = {
  total_violations: number;
  total_fine_amount: number;
  total_paid_fine_amount: number;
  total_unpaid_fine_amount: number;
};

type ViolationStatusStat = {
  status: string;
  total_count: number;
  total_fine_amount: number;
  overdue_count: number;
  overdue_fine_amount: number;
  not_overdue_count: number;
  not_overdue_amount: number;
};

export interface ReportsAnalyticsApiResponse {
  licenseStatus: Awaited<ReturnType<typeof licenseApi.getStatusStats>> | null;
  licenseType: Awaited<ReturnType<typeof licenseApi.getLicenseTypeStats>> | null;
  licenseTypeDetail: Awaited<ReturnType<typeof licenseApi.getLicenseTypeDetailStats>> | null;
  licenseCityDetail: Awaited<ReturnType<typeof licenseApi.getCityDetailStats>> | null;
  vehicleType: Awaited<ReturnType<typeof vehicleApi.getStatsByType>>;
  vehicleBrand: Awaited<ReturnType<typeof vehicleApi.getStatsByBrand>>;
  vehicleStatus: Awaited<ReturnType<typeof vehicleApi.getStatsByStatus>>;
  violationSummary: ViolationSummary | null;
  violationStatus: ViolationStatusStat[];
  agencies: Awaited<ReturnType<typeof govAgencyApi.getAllAgencies>> | null;
  news: Awaited<ReturnType<typeof newsApi.getAllNews>> | null;
  notifications: Awaited<ReturnType<typeof notificationApi.getAllNotifications>> | null;
}

const safe = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.error('reportsApi request failed:', error);
    return fallback;
  }
};

export const reportsApi = {
  getAnalytics: async (): Promise<ReportsAnalyticsApiResponse> => {
    const [
      licenseStatus,
      licenseType,
      licenseTypeDetail,
      licenseCityDetail,
      vehicleType,
      vehicleBrand,
      vehicleStatus,
      violationSummary,
      violationStatus,
      agencies,
      news,
      notifications,
    ] = await Promise.all([
      safe(() => licenseApi.getStatusStats(), null),
      safe(() => licenseApi.getLicenseTypeStats(), null),
      safe(() => licenseApi.getLicenseTypeDetailStats(), null),
      safe(() => licenseApi.getCityDetailStats(), null),
      safe(() => vehicleApi.getStatsByType(), []),
      safe(() => vehicleApi.getStatsByBrand(), []),
      safe(() => vehicleApi.getStatsByStatus(), []),
      safe(() => api.get<ViolationSummary>(API_ENDPOINTS.VIOLATIONS.STATISTICS).then((r) => r.data), null),
      safe(() => api.get<ViolationStatusStat[]>(API_ENDPOINTS.VIOLATIONS.STATS_STATUS).then((r) => r.data), []),
      safe(() => govAgencyApi.getAllAgencies({ page: 1, size: 500 }), null),
      safe(() => newsApi.getAllNews({ page: 1, size: 200 }), null),
      safe(() => notificationApi.getAllNotifications({ page: 1, size: 200 }), null),
    ]);

    return {
      licenseStatus,
      licenseType,
      licenseTypeDetail,
      licenseCityDetail,
      vehicleType,
      vehicleBrand,
      vehicleStatus,
      violationSummary,
      violationStatus,
      agencies,
      news,
      notifications,
    };
  },
};

export default reportsApi;
