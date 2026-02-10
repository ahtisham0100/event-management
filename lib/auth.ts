import { api } from './api';

// --- Types based on OpenAPI Schema ---

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    role: 'SUPER_ADMIN' | 'ORGANIZER' | 'STAFF' | 'ATTENDEE';
    phone?: string;
    profile_image?: string;
    is_active: boolean;
    is_email_verified: boolean;
    organizer_profile?: OrganizerProfile;
    attendee_profile?: AttendeeProfile;
}

export interface OrganizerProfile {
    company_name: string;
    company_website?: string;
    bio?: string;
    tax_id?: string;
    business_address?: string;
}

export interface AttendeeProfile {
    company?: string;
    job_title?: string;
    industry?: string;
    bio?: string;
    linkedin_url?: string;
    twitter_url?: string;
    allow_networking?: boolean;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: User; // Backend usually returns user info on login, if not we might need to fetch it
}

export interface RegisterData {
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    // Dynamic fields for profiles
    organizer_profile?: Record<string, any>;
    attendee_profile?: Record<string, any>;
}

// --- Auth Service ---

export const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await api.post('/api/auth/login/', { email, password });

        // Assuming backend returns { access, refresh, user }
        // If backend only returns { access, refresh }, we need to fetch user separately
        // Based on standard JWT, we usually get tokens. Let's check schema if available.
        // Schema says: 
        // Login -> { email, password }
        // Response -> { access, refresh } (TokenRefresh schema used? No, Login endpoint returns `access` and `refresh`)

        // We might need to fetch user profile after login if not included.
        // Let's assume for now we save tokens and then fetch user.
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
    },

    async register(data: RegisterData): Promise<User> {
        const response = await api.post('/api/auth/register/', data);
        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get('/api/users/profile/');
        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Optional: Refresh the page or redirect
        window.location.href = '/login';
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }
};

// --- Mock Functions Wrappers (for backward compatibility if needed temporarily) ---
export const mockLogin = async (email: string, password: string) => {
    // We will now delegate to the real auth service
    // But since the signature expects a promise returning mock data,
    // we should adapt the response to match the existing component expectation
    // which seems to expect { user: { role: ... } }

    const data = await authService.login(email, password);

    // If the login response doesn't have user, we need to fetch it
    let user = (data as any).user;
    if (!user) {
        user = await authService.getCurrentUser();
    }

    return {
        user,
        access: data.access,
        refresh: data.refresh
    };
};

export const mockSignup = async (data: any) => {
    return authService.register(data);
};
