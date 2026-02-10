import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";

const assignedEvents = [
    {
        id: "1",
        name: "React Workshop",
        date: "Apr 02, 2026",
        role: "Room Monitor",
        status: "Upcoming"
    },
    {
        id: "2",
        name: "Design Systems Meetup",
        date: "May 20, 2026",
        role: "Registration",
        status: "Upcoming"
    }
];

export function AssignedEventsWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {assignedEvents.map((event) => (
                        <Link
                            key={event.id}
                            href={`/staff/events/${event.id}`}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <CalendarDays className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-medium">{event.name}</div>
                                    <div className="text-xs text-muted-foreground">{event.date} • {event.role}</div>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    ))}
                    {assignedEvents.length === 0 && (
                        <p className="text-muted-foreground text-sm">No upcoming assignments.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
