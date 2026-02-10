import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityItem {
    id: string;
    user: {
        name: string;
        avatar?: string;
        email: string;
    };
    action: string;
    target?: string;
    timestamp: string;
}

const mockActivities: ActivityItem[] = [
    {
        id: "1",
        user: { name: "Alice Smith", email: "alice@example.com" },
        action: "registered as a new organizer",
        timestamp: "2 minutes ago",
    },
    {
        id: "2",
        user: { name: "Bob Jones", email: "bob@example.com" },
        action: "created a new event",
        target: "Tech Conference 2026",
        timestamp: "15 minutes ago",
    },
    {
        id: "3",
        user: { name: "Charlie Day", email: "charlie@example.com" },
        action: "upgraded subscription to",
        target: "Pro Plan",
        timestamp: "1 hour ago",
    },
    {
        id: "4",
        user: { name: "System", email: "system@admin.com" },
        action: "Automatic backup completed",
        timestamp: "3 hours ago",
    },
    {
        id: "5",
        user: { name: "David Lee", email: "david@example.com" },
        action: "requested a payout of",
        target: "$5,000",
        timestamp: "5 hours ago",
    },
];

export function RecentActivityFeed() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Latest actions across the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] w-full pr-4">
                    <div className="space-y-8">
                        {mockActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                    <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {activity.user.name}{" "}
                                        <span className="text-muted-foreground font-normal">
                                            {activity.action}
                                        </span>{" "}
                                        {activity.target && <span className="font-medium">{activity.target}</span>}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
