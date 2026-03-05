import { govAgencyApi } from "@/api/modules/gov_agency.api";
import { AgencyAuthResponse, ConnectWalletRequest, GovAgency, PaginatedAgenciesResponse } from "@/types/agency.types";
import { issueGovAgencyOnChain, revokeGovAgencyOnChain, updateGovAgencyOnChain } from "@/contracts/govAgencyService";
import { ethers } from "ethers";

const formatSyncError = (action: string, error: unknown): Error => {
    const detail = error instanceof Error ? error.message : "Unknown blockchain error";
    return new Error(`${action} tren API thanh cong nhung dong bo blockchain that bai: ${detail}`);
};

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

    syncAgencyToBlockchain: async (agencyId: string, walletAddress: string): Promise<GovAgency> => {
        if (!ethers.isAddress(walletAddress)) {
            throw new Error("Dia chi wallet khong hop le");
        }
        const agency = await govAgencyApi.getAgencyById(agencyId);
        try {
            try {
                await issueGovAgencyOnChain(agency, walletAddress);
            } catch {
                await updateGovAgencyOnChain({ ...agency, user_address: walletAddress });
            }
        } catch (error) {
            throw formatSyncError("Luu GovAgency len blockchain", error);
        }

        return await govAgencyApi.updateAgency(agencyId, { user_address: walletAddress });
    },

    revokeAgencyBlockchain: async (agencyId: string): Promise<GovAgency> => {
        const agency = await govAgencyApi.getAgencyById(agencyId);
        try {
            await revokeGovAgencyOnChain(agency.id);
        } catch (error) {
            throw formatSyncError("Thu hoi GovAgency tren blockchain", error);
        }

        return await govAgencyApi.revokeAgency(agencyId);
    },

    searchAgency: async (): Promise<PaginatedAgenciesResponse> => {
        return await govAgencyApi.search();
    },

    connectWallet: async (credentials: ConnectWalletRequest): Promise<AgencyAuthResponse> => {
        return await govAgencyApi.connectWallet(credentials);
    }
}
