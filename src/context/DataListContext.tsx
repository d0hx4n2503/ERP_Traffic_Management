import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import type { DriverLicense, PaginatedResponse as LicensePaginatedResponse } from '@/types/DriverLicense.types';
import type {
  VehicleRegistration,
  VehicleRegistrationList,
} from '@/types/VehicleLicense.types';
import type { GovAgency, PaginatedAgenciesResponse } from '@/types/agency.types';
import type { News, PaginatedNewsResponse } from '@/types/news.types';
import type { Notification, PaginatedNotificationResponse } from '@/types/notification.types';
import licenseService from '@/services/licenseService';
import vehicleService from '@/services/vehicleService';
import { agencyService } from '@/services/agencyService';
import { newsService } from '@/services/newsService';
import notificationService from '@/services/notificationService';

type ListState<T> = {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
  lastQueryKey: string | null;
};

type DataListContextValue = {
  licenseList: ListState<DriverLicense>;
  vehicleList: ListState<VehicleRegistration>;
  agencyList: ListState<GovAgency>;
  newsList: ListState<News>;
  notificationList: ListState<Notification>;
  setLicensePage: (page: number) => void;
  setLicenseItemsPerPage: (size: number) => void;
  ensureLicenseList: () => Promise<void>;
  refreshLicenseList: () => Promise<void>;
  setVehiclePage: (page: number) => void;
  setVehicleItemsPerPage: (size: number) => void;
  ensureVehicleList: () => Promise<void>;
  refreshVehicleList: () => Promise<void>;
  setAgencyPage: (page: number) => void;
  setAgencyItemsPerPage: (size: number) => void;
  ensureAgencyList: () => Promise<void>;
  refreshAgencyList: () => Promise<void>;
  setNewsPage: (page: number) => void;
  setNewsItemsPerPage: (size: number) => void;
  ensureNewsList: () => Promise<void>;
  refreshNewsList: () => Promise<void>;
  setNotificationPage: (page: number) => void;
  setNotificationItemsPerPage: (size: number) => void;
  ensureNotificationList: () => Promise<void>;
  refreshNotificationList: () => Promise<void>;
};

const defaultListState = <T,>(): ListState<T> => ({
  items: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 20,
  loading: false,
  error: null,
  lastQueryKey: null,
});

const DataListContext = createContext<DataListContextValue | undefined>(undefined);

export function DataListProvider({ children }: { children: ReactNode }) {
  const [licenseList, setLicenseList] = useState<ListState<DriverLicense>>(defaultListState);
  const [vehicleList, setVehicleList] = useState<ListState<VehicleRegistration>>(defaultListState);
  const [agencyList, setAgencyList] = useState<ListState<GovAgency>>(defaultListState);
  const [newsList, setNewsList] = useState<ListState<News>>(defaultListState);
  const [notificationList, setNotificationList] = useState<ListState<Notification>>(defaultListState);

  const runFetch = async <T, R>(
    state: ListState<T>,
    setState: Dispatch<SetStateAction<ListState<T>>>,
    fetcher: (page: number, size: number) => Promise<R>,
    extract: (response: R) => { items: T[]; totalCount: number; totalPages: number },
    force = false
  ) => {
    const queryKey = `${state.currentPage}-${state.itemsPerPage}`;
    const canReuse =
      !force &&
      state.lastQueryKey === queryKey &&
      state.items.length > 0 &&
      !state.error;

    if (canReuse) return;

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await fetcher(state.currentPage, state.itemsPerPage);
      const parsed = extract(response);
      setState((prev) => ({
        ...prev,
        items: parsed.items,
        totalCount: parsed.totalCount,
        totalPages: parsed.totalPages,
        loading: false,
        error: null,
        lastQueryKey: queryKey,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không thể tải dữ liệu danh sách';
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  const ensureLicenseList = async () => {
    await runFetch<DriverLicense, LicensePaginatedResponse<DriverLicense>>(
      licenseList,
      setLicenseList,
      licenseService.getAllLicenses,
      (response) => ({
        items: response.driver_licenses,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      })
    );
  };

  const refreshLicenseList = async () => {
    await runFetch<DriverLicense, LicensePaginatedResponse<DriverLicense>>(
      licenseList,
      setLicenseList,
      licenseService.getAllLicenses,
      (response) => ({
        items: response.driver_licenses,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      }),
      true
    );
  };

  const ensureVehicleList = async () => {
    await runFetch<VehicleRegistration, VehicleRegistrationList>(
      vehicleList,
      setVehicleList,
      vehicleService.getAllVehicles,
      (response) => ({
        items: response.vehicle_registration,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      })
    );
  };

  const refreshVehicleList = async () => {
    await runFetch<VehicleRegistration, VehicleRegistrationList>(
      vehicleList,
      setVehicleList,
      vehicleService.getAllVehicles,
      (response) => ({
        items: response.vehicle_registration,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      }),
      true
    );
  };

  const ensureAgencyList = async () => {
    await runFetch<GovAgency, PaginatedAgenciesResponse>(
      agencyList,
      setAgencyList,
      agencyService.getAllAgencies,
      (response) => ({
        items: response.gov_agency,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      })
    );
  };

  const refreshAgencyList = async () => {
    await runFetch<GovAgency, PaginatedAgenciesResponse>(
      agencyList,
      setAgencyList,
      agencyService.getAllAgencies,
      (response) => ({
        items: response.gov_agency,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      }),
      true
    );
  };

  const ensureNewsList = async () => {
    await runFetch<News, PaginatedNewsResponse>(
      newsList,
      setNewsList,
      newsService.getAllNews,
      (response) => ({
        items: response.news,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      })
    );
  };

  const refreshNewsList = async () => {
    await runFetch<News, PaginatedNewsResponse>(
      newsList,
      setNewsList,
      newsService.getAllNews,
      (response) => ({
        items: response.news,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      }),
      true
    );
  };

  const ensureNotificationList = async () => {
    await runFetch<Notification, PaginatedNotificationResponse>(
      notificationList,
      setNotificationList,
      notificationService.getAllNotifications,
      (response) => ({
        items: response.notifications,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      })
    );
  };

  const refreshNotificationList = async () => {
    await runFetch<Notification, PaginatedNotificationResponse>(
      notificationList,
      setNotificationList,
      notificationService.getAllNotifications,
      (response) => ({
        items: response.notifications,
        totalCount: response.total_count,
        totalPages: response.total_pages,
      }),
      true
    );
  };

  const value: DataListContextValue = {
    licenseList,
    vehicleList,
    agencyList,
    newsList,
    notificationList,
    setLicensePage: (page) => setLicenseList((prev) => ({ ...prev, currentPage: page })),
    setLicenseItemsPerPage: (size) =>
      setLicenseList((prev) => ({ ...prev, itemsPerPage: size, currentPage: 1 })),
    ensureLicenseList,
    refreshLicenseList,
    setVehiclePage: (page) => setVehicleList((prev) => ({ ...prev, currentPage: page })),
    setVehicleItemsPerPage: (size) =>
      setVehicleList((prev) => ({ ...prev, itemsPerPage: size, currentPage: 1 })),
    ensureVehicleList,
    refreshVehicleList,
    setAgencyPage: (page) => setAgencyList((prev) => ({ ...prev, currentPage: page })),
    setAgencyItemsPerPage: (size) =>
      setAgencyList((prev) => ({ ...prev, itemsPerPage: size, currentPage: 1 })),
    ensureAgencyList,
    refreshAgencyList,
    setNewsPage: (page) => setNewsList((prev) => ({ ...prev, currentPage: page })),
    setNewsItemsPerPage: (size) =>
      setNewsList((prev) => ({ ...prev, itemsPerPage: size, currentPage: 1 })),
    ensureNewsList,
    refreshNewsList,
    setNotificationPage: (page) =>
      setNotificationList((prev) => ({ ...prev, currentPage: page })),
    setNotificationItemsPerPage: (size) =>
      setNotificationList((prev) => ({ ...prev, itemsPerPage: size, currentPage: 1 })),
    ensureNotificationList,
    refreshNotificationList,
  };

  return <DataListContext.Provider value={value}>{children}</DataListContext.Provider>;
}

export function useDataLists() {
  const context = useContext(DataListContext);
  if (!context) {
    throw new Error('useDataLists must be used within DataListProvider');
  }
  return context;
}
