import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function NextSessionNav() {
    const nextSession = {
        name: "Keynote: The Future of AI",
        location: "Auditorium (Level 2)",
        startTime: "10:00 AM",
        startsIn: 15, // minutes
        walkTime: 10, // minutes
    };

    const isUrgent = nextSession.startsIn <= nextSession.walkTime + 5;

    return (
        <Card className={`border-l-4 ${isUrgent ? 'border-l-amber-500' : 'border-l-primary'}`}>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Up Next</p>
                        <h4 className="font-bold text-lg leading-tight">{nextSession.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" /> Starts in {nextSession.startsIn} mins
                        </p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Navigation className="h-3 w-3 mr-2" /> Navigate
                    </Button>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span>Walk time: {nextSession.walkTime} mins</span>
                        <span>{nextSession.location}</span>
                    </div>
                    <Progress value={(nextSession.walkTime / nextSession.startsIn) * 100} className="h-1.5" />
                </div>
            </CardContent>
        </Card>
    );
}
