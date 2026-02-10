import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { SystemHealth } from "@/types/dashboard-types";

interface SystemHealthMonitorProps {
    health: SystemHealth;
}

type ServiceStatus = "healthy" | "degraded" | "down";

const StatusIcon = ({ status }: { status: ServiceStatus }) => {
    switch (status) {
        case "healthy":
            return <CheckCircle2 className="h-4 w-4 text-green-500" />;
        case "degraded":
            return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        case "down":
            return <XCircle className="h-4 w-4 text-red-500" />;
    }
};

export function SystemHealthMonitor({ health }: SystemHealthMonitorProps) {
    // Map backend health status to service status type
    const getServiceStatus = (status: string): ServiceStatus => {
        if (status.toLowerCase() === "healthy") return "healthy";
        if (status.toLowerCase() === "degraded") return "degraded";
        return "down";
    };

    const services = [
        { name: "Database", status: getServiceStatus(health.database_status) },
        { name: "Redis Cache", status: getServiceStatus(health.redis_status) },
        { name: "Celery", status: getServiceStatus(health.celery_status) },
        { name: "Elasticsearch", status: getServiceStatus(health.elasticsearch_status) },
    ];

    const storagePercentage = health.storage_limit_gb > 0
        ? Math.round((health.storage_used_gb / health.storage_limit_gb) * 100)
        : 0;

    return (
        <Card className="col-span-3 lg:col-span-2">
            <CardHeader>
                <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {services.map((service) => (
                        <div key={service.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <StatusIcon status={service.status} />
                                <span className="text-sm font-medium">{service.name}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-xs text-muted-foreground capitalize">{service.status}</span>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Storage Usage</span>
                            <span className="font-medium">
                                {health.storage_used_gb}GB / {health.storage_limit_gb}GB ({storagePercentage}%)
                            </span>
                        </div>
                        <Progress value={storagePercentage} className="mt-2 h-2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
