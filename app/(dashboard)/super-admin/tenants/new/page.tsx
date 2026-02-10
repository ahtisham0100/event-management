"use client";

import { TenantForm } from "@/components/super-admin/tenants/tenant-form";

export default function CreateTenantPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Onboard New Tenant</h2>
                <p className="text-muted-foreground">
                    Create a new organizer account and configure their limits.
                </p>
            </div>
            <TenantForm />
        </div>
    );
}
