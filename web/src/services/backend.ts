import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_SERVICE_URL;

export const backend = axios.create({
    baseURL: `${BACKEND_BASE_URL}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Accept-Language': '*',
        'Content-Language': 'pt-BR',
        'Content-Type': 'application/json',
    }
});
