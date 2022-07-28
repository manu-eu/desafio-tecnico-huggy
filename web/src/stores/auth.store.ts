import { defineStore } from 'pinia';

import router from '../services/router';
import { backend } from '../services/backend';

export interface AuthStore {
    apitoken: string | null;
}

export interface OauthTokenResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        apitoken: localStorage.getItem('api_token'),
    } as AuthStore),
    actions: {
        async huggySocialLogin(code: string) {
            const { access_token: token } = await backend.post('oauth/token', {
                grant_type: "social",
                provider: 'huggy',
                access_token: code,
                client_id: import.meta.env.VITE_BACKEND_SERVICE_CLIENT_ID,
                client_secret: import.meta.env.VITE_BACKEND_SERVICE_CLIENT_SECRET,
            }).then(resp => resp.data) as OauthTokenResponse;

            localStorage.setItem('api_token', token);
            this.apitoken = token;
            router.push({ name: 'Contacts' });
        },
        async isLoggedIn(): Promise<boolean> {
            if(this.apitoken) {
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