"use client";

import { PlatformStatsCard } from "@/components/super-admin/overview/platform-stats-card";
import { RecentActivityFeed } from "@/components/super-admin/overview/recent-activity-feed";
import { SystemHealthMonitor } from "@/components/super-admin/overview/system-health-monitor";
import { Users, Calendar, DollarSign, Activity } from "lucide-react";

export default function SuperAdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back, Super Admin. Here's what's happening today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <PlatformStatsCard
                    title="Total Tenants"
                    value="1,234"
                    icon={Users}
                    trend={{ value: 12, isPositive: true }}
                    description="from last month"
                />
                <PlatformStatsCard
                    title="Active Events"
                    value="573"
                    icon={Calendar}
                    trend={{ value: 4, isPositive: true }}
                    description="from last month"
                />
                <PlatformStatsCard
                    title="Total Revenue"
                    value="$45,231.89"
                    icon={DollarSign}
                    trend={{ value: 2.5, isPositive: false }}
                    description="from last month"
                />
                <PlatformStatsCard
                    title="Active Users"
                    value="24,300"
                    icon={Activity}
                    trend={{ value: 8, isPositive: true }}
                    description="current active sessions"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <RecentActivityFeed />
                <SystemHealthMonitor />
            </div>
        </div>
    );
}
