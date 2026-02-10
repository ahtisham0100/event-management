import { api } from './api';

export interface CreateTenantData {
    name: string;
    email: string;
    plan: string;
    eventLimit: number;
    attendeeLimit: number;
}

export const tenantService = {
    async createTenant(data: CreateTenantData) {
        // In a real app, this would be a POST request to /api/tenants/ or similar
        // For now, we'll mock it or use a generic endpoint if available.
        // mimicking network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock response
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: 'Active',
            createdAt: new Date().toISOString()
        };
    },

    async getTenants() {
        // Mock data fetch
        // await api.get('/api/tenants/');
        // Return mock for now
        return [];
    }
};
