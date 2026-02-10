// Types for Super Admin Dashboard API responses

export interface PlatformSummary {
    total_tenants: number;
    active_tenants: number;
    inactive_tenants: number;
    total_events: number;
    active_events: number;
    completed_events: number;
    total_attendees: number;
    total_revenue: string;
    total_platform_fees: string;
    growth_metrics: {
        new_tenants_this_month: number;
        new_events_this_month: number;
        revenue_growth_percentage: number;
    };
}

export interface SystemHealth {
    database_status: string;
    redis_status: string;
    celery_status: string;
    elasticsearch_status: string;
    storage_used_gb: number;
    storage_limit_gb: number;
}

export interface Activity {
    id: string;
    type: string;
    message: string;
    timestamp: string;
    user?: string;
}

export interface SuperAdminOverviewResponse {
    platform_summary: PlatformSummary;
    recent_activity: Activity[];
    system_health: SystemHealth;
}

export interface TenantOrganizer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface TenantUsage {
    events_created: number;
    events_limit: number;
    total_attendees: number;
    attendees_limit: number;
    total_revenue: string;
    total_fees_collected: string;
}

export interface Tenant {
    id: number;
    organizer: TenantOrganizer;
    usage: TenantUsage;
    platform_fee_percentage: string;
    is_active: boolean;
    created_at: string;
    last_activity: string | null;
}

export interface TenantListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Tenant[];
}
