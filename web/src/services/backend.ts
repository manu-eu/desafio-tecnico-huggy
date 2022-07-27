import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const backend = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

const checkForStatusCode = (status: number, expectedStatuses: number[]) => {
    expectedStatuses.forEach(expectedStatus => {
        if (status !== expectedStatus) {
            throw new Error(`Unexpected status code: ${status}`);
        }
    });
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string | null;
    address?: string | null;
    district?: string | null;
    landline?: string | null;
    state?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ListContactsParams {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export default {
    async listContacts(params?: ListContactsParams): Promise<Contact[]> {
        const requestOptions = {
            params: params || {}
        };
        return backend.get(`contacts`, requestOptions).then(resp => {
            checkForStatusCode(resp.status, [200]);
            return resp.data;
        });
    },
    async getContact(id: number): Promise<Contact> {
        return backend.get(`/contacts/${id}`).then(resp => {
            checkForStatusCode(resp.status, [200]);
            return resp.data;
        });
    },
    async createContact(contact: Contact): Promise<Contact> {
        return backend.post(`/contacts`, contact).then(resp => {
            checkForStatusCode(resp.status, [200]);
            return resp.data;
        });
    },
    async updateContact(id: number, contact: Contact): Promise<Contact> {
        return backend.put(`/contacts/${id}`, contact).then(resp => {
            checkForStatusCode(resp.status, [200]);
            return resp.data;
        });
    },
    async deleteContact(id: number): Promise<void> {
        return backend.delete(`/contacts/${id}`).then(resp => {
            checkForStatusCode(resp.status, [204]);
        });
    }
}

