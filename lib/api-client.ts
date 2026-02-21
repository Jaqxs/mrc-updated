/**
 * HRN Recruitment Agency - Robust API Client
 * This module provides a centralized, robust way to interact with the backend API.
 * It handles:
 * 1. Base URL management via environment variables
 * 2. Automatic bearer token injection
 * 3. Automatic token refresh logic
 * 4. Standardized error handling
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
    skipAuth?: boolean;
}

export class ApiError extends Error {
    status: number;
    data: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

async function refreshAccessToken(): Promise<string | null> {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return null;

    try {
        const res = await fetch(`${API_BASE_URL}/accounts/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({ refresh }),
        });

        if (!res.ok) throw new Error("Failed to refresh token");

        const data = await res.json();
        localStorage.setItem("accessToken", data.access);
        return data.access;
    } catch (error) {
        console.error("Token refresh failed:", error);
        return null;
    }
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, skipAuth, ...init } = options;

    // Construct URL with query params
    let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    if (!url.endsWith('/') && !url.includes('?') && !endpoint.startsWith('http')) {
        url += '/';
    }

    if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }

    // Handle headers
    const headers = new Headers(init.headers);
    headers.set('ngrok-skip-browser-warning', 'true');

    if (!headers.has('Content-Type') && !(init.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    // Auth injection
    if (!skipAuth) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    const performRequest = async (currentUrl: string, currentInit: RequestInit) => {
        const response = await fetch(currentUrl, currentInit);

        if (response.status === 401 && !skipAuth) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                const retryHeaders = new Headers(currentInit.headers);
                retryHeaders.set('Authorization', `Bearer ${newToken}`);
                return fetch(currentUrl, { ...currentInit, headers: retryHeaders });
            }
        }

        return response;
    };

    try {
        const response = await performRequest(url, { ...init, headers });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { detail: await response.text() };
            }
            throw new ApiError(errorData.detail || 'API Request Failed', response.status, errorData);
        }

        if (response.status === 204) return {} as T;
        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error instanceof Error ? error.message : 'Network Error', 500);
    }
}

export const api = {
    get: <T>(url: string, options?: RequestOptions) => apiRequest<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body: any, options?: RequestOptions) => apiRequest<T>(url, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
    patch: <T>(url: string, body: any, options?: RequestOptions) => apiRequest<T>(url, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
    put: <T>(url: string, body: any, options?: RequestOptions) => apiRequest<T>(url, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
    delete: <T>(url: string, options?: RequestOptions) => apiRequest<T>(url, { ...options, method: 'DELETE' }),
};
