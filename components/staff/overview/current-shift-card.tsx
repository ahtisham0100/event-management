import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

export function CurrentShiftCard() {
    return (
        <Card className="border-l-4 border-l-primary">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">Current Shift: Tech Summit 2026</CardTitle>
                        <CardDescription className="mt-1">Role: Check-in Staff</CardDescription>
                    </div>
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active Now</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>08:00 AM - 04:00 PM (2 hours remaining)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Main Entrance, Gate A</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href="/staff/check-in">
                        Go to Check-in Scanner
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
