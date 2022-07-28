import { defineStore } from 'pinia';

import router from '../services/router';
import { backend } from '../services/backend';

export interface AuthStore {
    apitoken: string | null;
}

export interface OauthTokenResponse {
    data: {
        token_type: string;
        expires_in: number;
        access_token: string;
        refresh_token: string;
    }
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        apitoken: localStorage.getItem('api_token'),
    } as AuthStore),
    actions: {
        async huggySocialLogin(code: string) {
            const requestOptions = {
                grant_type: "social",
                provider: 'huggy',
                access_token: code,
                client_id: import.meta.env.VITE_BACKEND_SERVICE_CLIENT_ID,
                client_secret: import.meta.env.VITE_BACKEND_SERVICE_CLIENT_SECRET,
            };

            const { data } = await backend.post('oauth/token', requestOptions) as OauthTokenResponse;

            this.apitoken = data.access_token;
            localStorage.setItem('api_token', data.access_token);

            router.push({ name: 'Contacts' });
        },
        async isLoggedIn(): Promise<boolean> {
            if (this.apitoken) {
                try {
                    const { status } = await backend.get('api/user', {
                        headers: {
                            Authorization: `Bearer ${this.apitoken}`,
                        }
                    });
                    return status === 200;
                } catch (error) {
                    return false;
                }
            }

            return false;
        },
        logout() {
            this.apitoken = null;
            localStorage.removeItem('api_token');
            router.push({ name: 'Login' });
        }
    }
});