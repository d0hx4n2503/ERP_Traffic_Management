export interface GovAgency {
    id: string;
    name: string;
    user_address: string;
    address: string;
    city: string;
    type: string;
    phone: string;
    email: string;
    status: string;
    version: number
    created_at: string;
    updated_at: string;
    active: boolean;
}

export interface PaginatedAgenciesResponse {
    total_count: number;
    total_pages: number;
    page: number;
    size: number;
    has_more: boolean;
    agencies: GovAgency[];
}
