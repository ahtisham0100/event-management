"use client";

import { useEffect, useState } from "react";
import { PlatformStatsCard } from "@/components/super-admin/overview/platform-stats-card";
import { RecentActivityFeed } from "@/components/super-admin/overview/recent-activity-feed";
import { SystemHealthMonitor } from "@/components/super-admin/overview/system-health-monitor";
import { Users, Calendar, DollarSign, Activity, Loader2 } from "lucide-react";
import { dashboardApi } from "@/lib/api/dashboard-api";
import type { SuperAdminOverviewResponse } from "@/types/dashboard-types";
import { toast } from "sonner";

export default function SuperAdminDashboard() {
    const [data, setData] = useState<SuperAdminOverviewResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await dashboardApi.getSuperAdminOverview();
                setData(response);
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch dashboard data:", err);
                const errorMsg = err.response?.data?.detail || "Failed to load dashboard data";
                setError(errorMsg);
                toast.error(errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="text-center">
                    <p className="text-lg font-semibold text-destructive">Error loading dashboard</p>
                    <p className="text-sm text-muted-foreground">{error || "Unknown error"}</p>
                </div>
            </div>
        );
    }

    const { platform_summary, recent_activity, system_health } = data;

    // Calculate trend percentages (simplified - using growth metrics)
    const tenantTrend = platform_summary.total_tenants > 0
        ? Math.round((platform_summary.growth_metrics.new_tenants_this_month / platform_summary.total_tenants) * 100)
        : 0;

    const eventTrend = platform_summary.total_events > 0
        ? Math.round((platform_summary.growth_metrics.new_events_this_month / platform_summary.total_events) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back, Super Admin. Here's what's happening today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <PlatformStatsCard
                    title="Total Tenants"
                    value={platform_summary.total_tenants.toLocaleString()}
                    icon={Users}
                    trend={{ value: tenantTrend, isPositive: tenantTrend >= 0 }}
                    description="from last month"
                />
                <PlatformStatsCard
                    title="Active Events"
                    value={platform_summary.active_events.toLocaleString()}
                    icon={Calendar}
                    trend={{ value: eventTrend, isPositive: eventTrend >= 0 }}
                    description="from last month"
                />
                <PlatformStatsCard
                    title="Total Revenue"
                    value={`$${parseFloat(platform_summary.total_revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    trend={{ value: platform_summary.growth_metrics.revenue_growth_percentage, isPositive: platform_summary.growth_metrics.revenue_growth_percentage >= 0 }}
                    description="from last month"
                />
                <PlatformStatsCard
                    title="Total Attendees"
                    value={platform_summary.total_attendees.toLocaleString()}
                    icon={Activity}
                    trend={{ value: 0, isPositive: true }}
                    description="registered users"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <RecentActivityFeed activities={recent_activity} />
                <SystemHealthMonitor health={system_health} />
            </div>
        </div>
    );
}
