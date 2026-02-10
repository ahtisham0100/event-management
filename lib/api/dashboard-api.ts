import { api } from '../api';
import type {
    SuperAdminOverviewResponse,
    TenantListResponse,
} from '@/types/dashboard-types';

/**
 * Dashboard API Service
 * Centralized service for all dashboard-related API calls
 */
export const dashboardApi = {
    /**
     * Get Super Admin Dashboard Overview
     * Fetches platform statistics, recent activity, and system health
     */
    async getSuperAdminOverview(): Promise<SuperAdminOverviewResponse> {
        const response = await api.get<SuperAdminOverviewResponse>(
            '/api/dashboard/super-admin/overview/'
        );
        return response.data;
    },

    /**
     * Get Tenant List
     * Fetches list of all organizers with their usage statistics
     */
    async getTenants(): Promise<TenantListResponse> {
        const response = await api.get<TenantListResponse>(
            '/api/dashboard/super-admin/tenants/'
        );
        return response.data;
    },
};
