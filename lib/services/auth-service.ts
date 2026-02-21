import { api } from "../api-client";

export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone?: string;
    current_location?: string;
    nationality?: string;
    education?: string;
    experience?: string;
    skills?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
    is_active?: boolean;
    date_joined?: string;
}

export const authService = {
    async login(credentials: any): Promise<any> {
        return api.post("/accounts/login/", credentials, { skipAuth: true });
    },

    async register(userData: any): Promise<any> {
        return api.post("/accounts/register/", userData, { skipAuth: true });
    },

    async getProfile(): Promise<UserProfile> {
        return api.get<UserProfile>("/accounts/profile/");
    },

    async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
        return api.patch<UserProfile>("/accounts/profile/", data);
    },

    async logout(refreshToken: string): Promise<void> {
        const secondaryUrl = process.env.NEXT_PUBLIC_SECONDARY_API_URL;
        const endpoint = secondaryUrl ? `${secondaryUrl}/accounts/logout/` : "/accounts/logout/";
        return api.post(endpoint, { refresh_token: refreshToken }, { skipAuth: true });
    },

    async getAllUsers(): Promise<UserProfile[]> {
        return api.get<UserProfile[]>("/users/");
    }
};
