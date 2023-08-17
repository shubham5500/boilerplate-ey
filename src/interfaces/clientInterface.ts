import { Pagination } from "./utilsInterface";

export interface ClientData {
    id: string | null,
    user_id: string,
    email: string,
    useName: string,
    organization_name: string,
    organization_id: string,
    description: string,
    subdomain: string,
    website: string,
    logo: string,
}

export interface ClientDataList extends Pagination {
    results: ClientData[]
}