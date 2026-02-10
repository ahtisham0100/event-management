import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Activity } from "lucide-react";
import Link from 'next/link';

export function ActiveEventsWidget() {
    const activeEvents = [
        {
            id: "1",
            name: "Tech Summit 2026",
            attendees: 450,
            status: "Live Now",
            live: true,
        },
        {
            id: "2",
            name: "Workshop: React Server Components",
            attendees: 120,
            status: "Starts in 2h",
            live: false,
        },
    ];

    return (
        <Card className="col-span-3 lg:col-span-2">
            <CardHeader>
                <CardTitle>Active & Upcoming Events</CardTitle>
                <CardDescription>Monitor your ongoing events in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activeEvents.map((event) => (
                        <div
                            key={event.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{event.name}</span>
                                    {event.live && (
                                        <Badge variant="destructive" className="animate-pulse">
                                            Live
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {event.attendees} attendees checked in
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={`/organizer/events/${event.id}`}>
                                        <Eye className="mr-2 h-4 w-4" /> View
                                    </Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href={`/organizer/events/${event.id}/analytics`}>
                                        <Activity className="mr-2 h-4 w-4" /> Analytics
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                    {activeEvents.length === 0 && (
                        <p className="text-muted-foreground text-sm">No active events at the moment.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
