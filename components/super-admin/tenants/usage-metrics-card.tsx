"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageMetricsProps {
    metrics: {
        eventsCreated: number;
        eventsLimit: number;
        totalAttendees: number;
        attendeesLimit: number;
        storageUsed: number; // in GB
        storageLimit: number; // in GB
    };
}

export function UsageMetricsCard({ metrics }: UsageMetricsProps) {
    const eventsPercentage = Math.round((metrics.eventsCreated / metrics.eventsLimit) * 100);
    const attendeesPercentage = Math.round((metrics.totalAttendees / metrics.attendeesLimit) * 100);
    const storagePercentage = Math.round((metrics.storageUsed / metrics.storageLimit) * 100);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Usage & Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Events Created</span>
                        <span className="text-muted-foreground">
                            {metrics.eventsCreated} / {metrics.eventsLimit}
                        </span>
                    </div>
                    <Progress value={eventsPercentage} className="h-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Total Attendees</span>
                        <span className="text-muted-foreground">
                            {metrics.totalAttendees.toLocaleString()} / {metrics.attendeesLimit.toLocaleString()}
                        </span>
                    </div>
                    <Progress value={attendeesPercentage} className="h-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Storage Used</span>
                        <span className="text-muted-foreground">
                            {metrics.storageUsed}GB / {metrics.storageLimit}GB
                        </span>
                    </div>
                    <Progress value={storagePercentage} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
}
