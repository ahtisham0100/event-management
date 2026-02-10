import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, FileText, Settings } from "lucide-react";
import Link from "next/link";

export function QuickActionsPanel() {
    return (
        <Card className="col-span-3 lg:col-span-1">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Button className="w-full justify-start" asChild>
                    <Link href="/organizer/events/new">
                        <Plus className="mr-2 h-4 w-4" /> Create New Event
                    </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/organizer/staff">
                        <Users className="mr-2 h-4 w-4" /> Manage Staff
                    </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/organizer/financials/reports">
                        <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/organizer/settings">
                        <Settings className="mr-2 h-4 w-4" /> Organizer Settings
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
