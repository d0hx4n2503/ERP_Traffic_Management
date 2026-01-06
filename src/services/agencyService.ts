import { govAgencyApi } from "@/api/modules/gov_agency.api";
import { ConnectWalletRequest, GovAgency, PaginatedAgenciesResponse, TokenResponse } from "@/types/agency.types";

export const agencyService = {
    getAllAgencies: async (page = 1, size = 20) => {
        return await govAgencyApi.getAllAgencies({ page, size });
    },

    getAgenciesById: async (id: string): Promise<GovAgency> => {
        return await govAgencyApi.getAgencyById(id);
    },

    createAgencies: async (newsData: Partial<GovAgency>): Promise<GovAgency> => {
        return await govAgencyApi.createAgency(newsData);
    },

    updateAgencies: async (id: string, newsData: Partial<GovAgency>): Promise<GovAgency> => {
        return await govAgencyApi.updateAgency(id, newsData);
    },

    deleteAgencies: async (id: string): Promise<GovAgency> => {
        return await govAgencyApi.deleteAgency(id);
    },

    searchAgency: async (): Promise<PaginatedAgenciesResponse> => {
        return await govAgencyApi.search();
    },

    connectWallet: async (credentials: ConnectWalletRequest): Promise<TokenResponse> => {
        return await govAgencyApi.connectWallet(credentials);
    }
}