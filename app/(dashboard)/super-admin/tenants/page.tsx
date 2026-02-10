"use client";

import { TenantFilters } from "@/components/super-admin/tenants/tenant-filters";
import { TenantTable } from "@/components/super-admin/tenants/tenant-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TenantManagementPage() {
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
                    <TenantTable />
                </CardContent>
            </Card>
        </div>
    );
}
