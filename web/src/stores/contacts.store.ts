import { defineStore } from 'pinia';

import { backend } from '../services/backend';
import { Contact } from '../types/contact';

import { useAuthStore } from './';

export interface ContactStoreState {
    items: Contact[];
    loading: boolean;
    search: string,
    sortBy: keyof Contact;
    sortOrder: 'asc' | 'desc';
}

export const useContactsStore = defineStore({
    id: 'users',
    state: (): ContactStoreState => {
        const auth = useAuthStore();
        backend.defaults.headers.common['Authorization'] = `Bearer ${auth.apitoken}`;

        return {
            items: [],
            loading: false,
            search: '',
            sortBy: 'name',
            sortOrder: 'desc',
        };
    },
    actions: {
        resetFilters() {
            this.search = '';
            this.sortBy = 'name';
            this.sortOrder = 'desc';
            return this;
        },
        async updateItems(): Promise<Contact[]> {
            this.loading = true;

            const queryParams = new URLSearchParams();

            queryParams.append('sortBy', this.sortBy);
            queryParams.append('sortOrder', this.sortOrder);
            queryParams.append('search', this.search);

            return backend.get(`api/contacts?${queryParams.toString()}`).then(resp => {
                this.items = resp.data as Contact[];
                this.loading = false;
                return resp.data;
            });
        },
        async showItem(id: number): Promise<Contact> {
            return backend.get(`api/contacts/${id}`).then(resp => {
                return resp.data;
            });
        },
        async createItem(contact: Contact): Promise<Contact> {
            this.loading = true;
            this.resetFilters();
            return backend.post('api/contacts', contact).then(resp => {
                this.updateItems();
                return resp.data;
            });
        },
        async updateItem(id: number, contact: Contact): Promise<Contact> {
            this.loading = true;
            this.resetFilters();
            return backend.put(`api/contacts/${id}`, contact).then(resp => {
                this.updateItems();
                return resp.data;
            });
        },
        async deleteItem(id: number): Promise<void> {
            this.loading = true;
            this.resetFilters();
            return backend.delete(`api/contacts/${id}`).then(() => {
                this.updateItems();
            });
        },
    }
});



