"use client";

import { use, useState } from "react";
import { TenantInfoCard } from "@/components/super-admin/tenants/tenant-info-card";
import { UsageMetricsCard } from "@/components/super-admin/tenants/usage-metrics-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Trash2, Ban, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data fetcher (replace with API call)
const getTenantData = (id: string) => {
    return {
        id,
        name: "TechStart Inc",
        email: "contact@techstart.io",
        phone: "+1 (555) 123-4567",
        website: "https://techstart.io",
        address: "123 Innovation Dr, Tech City, TC 90210",
        joinedDate: "2023-11-15",
        status: "active",
        plan: "Enterprise",
        logo: "",
        metrics: {
            eventsCreated: 12,
            eventsLimit: 50,
            totalAttendees: 1540,
            attendeesLimit: 5000,
            storageUsed: 4.5,
            storageLimit: 20,
        },
    };
};

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const tenant = getTenantData(resolvedParams.id);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{tenant.name}</h2>
                        <p className="text-muted-foreground text-sm">Tenant ID: {tenant.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {tenant.status === "active" ? (
                        <Button variant="outline" className="text-yellow-600 border-yellow-200 hover:bg-yellow-50">
                            <Ban className="mr-2 h-4 w-4" /> Suspend
                        </Button>
                    ) : (
                        <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                            <CheckCircle className="mr-2 h-4 w-4" /> Activate
                        </Button>
                    )}
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4">
                            <TenantInfoCard tenant={tenant} />
                        </div>
                        <div className="col-span-3">
                            <UsageMetricsCard metrics={tenant.metrics} />
                        </div>
                    </div>
                    {/* Add more overview widgets here, e.g., Revenue Summary for this tenant */}
                </TabsContent>

                <TabsContent value="events">
                    <div className="text-center py-10 text-muted-foreground">
                        Tenant Events List Component will come here.
                    </div>
                </TabsContent>

                <TabsContent value="financials">
                    <div className="text-center py-10 text-muted-foreground">
                        Tenant Financial Breakdown Component will come here.
                    </div>
                </TabsContent>

                <TabsContent value="settings">
                    <div className="text-center py-10 text-muted-foreground">
                        Tenant Settings Component will come here.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
