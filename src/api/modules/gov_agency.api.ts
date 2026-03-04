import { API_ENDPOINTS, buildUrl } from '../base/endpoints';
import { api, setAuthToken } from "../base/apiClient";
import { ConnectWalletRequest, GovAgency, PaginatedAgenciesResponse, TokenResponse } from "@/types/agency.types"

export const govAgencyApi = {
    getAllAgencies: async (params?: {
        page?: number;
        size?: number;
    }): Promise<PaginatedAgenciesResponse> => {
        const url = buildUrl(API_ENDPOINTS.GOV_AGENCY.LIST, params);
        const response = await api.get<PaginatedAgenciesResponse>(url);
        return response.data;
    },

    getAgencyById: async (id: string): Promise<GovAgency> => {
        const url = API_ENDPOINTS.GOV_AGENCY.GET(id);
        const response = await api.get<GovAgency>(url);
        return response.data;
    },

    createAgency: async (newsData: Partial<GovAgency>): Promise<GovAgency> => {
        const url = API_ENDPOINTS.GOV_AGENCY.CREATE;
        return (await api.post<GovAgency>(url, newsData)).data;
    },

    updateAgency: async (id: string, newsData: Partial<GovAgency>): Promise<GovAgency> => {
        const url = API_ENDPOINTS.GOV_AGENCY.UPDATE(id);
        return (await api.put<GovAgency>(url, newsData)).data;
    },

    deleteAgency: async (id: string): Promise<GovAgency> => {
        const url = API_ENDPOINTS.GOV_AGENCY.DELETE(id);
        return (await api.delete<GovAgency>(url)).data;
    },

    revokeAgency: async (id: string): Promise<GovAgency> => {
        const url = API_ENDPOINTS.GOV_AGENCY.REVOKE(id);
        return (await api.put<GovAgency>(url)).data;
    },

    search: async (): Promise<PaginatedAgenciesResponse> => {
        const url = API_ENDPOINTS.GOV_AGENCY.SEARCH;
        return (await api.get<PaginatedAgenciesResponse>(url)).data;
    },

    connectWallet: async (credentials: ConnectWalletRequest): Promise<TokenResponse> => {
        const url = API_ENDPOINTS.GOV_AGENCY.CONNECT_WALLET;
        const response = await api.post<TokenResponse>(url, credentials)
        const connectData = response.data;

        //Set auth token
        setAuthToken(connectData.token);

        return connectData;
    }
}
