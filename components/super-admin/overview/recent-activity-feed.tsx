import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Activity } from "@/types/dashboard-types";

interface RecentActivityFeedProps {
    activities: Activity[];
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
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
                    {activities.length === 0 ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <p className="text-sm text-muted-foreground">No recent activity</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{activity.user?.[0] || "S"}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.user && (
                                                <span className="font-medium">{activity.user}{" "}</span>
                                            )}
                                            <span className="text-muted-foreground font-normal">
                                                {activity.message}
                                            </span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
