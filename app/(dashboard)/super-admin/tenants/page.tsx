"use client";

import { useEffect, useState } from "react";
import { TenantFilters } from "@/components/super-admin/tenants/tenant-filters";
import { TenantTable } from "@/components/super-admin/tenants/tenant-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardApi } from "@/lib/api/dashboard-api";
import type { Tenant } from "@/types/dashboard-types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function TenantManagementPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                setLoading(true);
                const response = await dashboardApi.getTenants();
                setTenants(response.results);
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch tenants:", err);
                const errorMsg = err.response?.data?.detail || "Failed to load tenants";
                setError(errorMsg);
                toast.error(errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Tenant Management</h2>
                <p className="text-muted-foreground">
                    Manage organizers, subscription plans, and account statuses.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Organizers</CardTitle>
                    <CardDescription>
                        A list of all organizers delivering events on your platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TenantFilters />
                    {loading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <div className="text-center">
                                <p className="text-lg font-semibold text-destructive">Error loading tenants</p>
                                <p className="text-sm text-muted-foreground">{error}</p>
                            </div>
                        </div>
                    ) : (
                        <TenantTable tenants={tenants} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
