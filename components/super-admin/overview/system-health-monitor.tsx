import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface ServiceStatus {
    name: string;
    status: "healthy" | "degraded" | "down";
    uptime: string;
}

const services: ServiceStatus[] = [
    { name: "Database", status: "healthy", uptime: "99.99%" },
    { name: "Redis Cache", status: "healthy", uptime: "99.95%" },
    { name: "API Gateway", status: "degraded", uptime: "98.50%" },
    { name: "Storage", status: "healthy", uptime: "100%" },
    { name: "Email Service", status: "healthy", uptime: "99.99%" },
];

const StatusIcon = ({ status }: { status: ServiceStatus["status"] }) => {
    switch (status) {
        case "healthy":
            return <CheckCircle2 className="h-4 w-4 text-green-500" />;
        case "degraded":
            return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        case "down":
            return <XCircle className="h-4 w-4 text-red-500" />;
    }
};

export function SystemHealthMonitor() {
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
                                <span className="text-xs text-muted-foreground">{service.uptime} uptime</span>
                                {service.name === "Storage" && <Progress value={45} className="w-[60px]" />}
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">CPU Usage</span>
                            <span className="font-medium">32%</span>
                        </div>
                        <Progress value={32} className="mt-2 h-2" />
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Memory Usage</span>
                            <span className="font-medium">64%</span>
                        </div>
                        <Progress value={64} className="mt-2 h-2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
