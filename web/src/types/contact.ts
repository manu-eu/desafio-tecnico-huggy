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