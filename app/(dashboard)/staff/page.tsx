"use client";

import { CurrentShiftCard } from "@/components/staff/overview/current-shift-card";
import { AssignedEventsWidget } from "@/components/staff/overview/assigned-events-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, ClipboardList, Printer, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Workspace</h2>
        <p className="text-muted-foreground">Manage your tasks and assignments.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CurrentShiftCard />
        <AssignedEventsWidget />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Link href="/staff/check-in" className="block">
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <QrCode className="h-8 w-8 text-primary" />
                <span className="font-medium">Check-in</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/staff/check-in/manual" className="block">
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <ClipboardList className="h-8 w-8 text-primary" />
                <span className="font-medium">Manual List</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/staff/badge-printing" className="block">
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <Printer className="h-8 w-8 text-primary" />
                <span className="font-medium">Print Badges</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/staff/messages" className="block">
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                <span className="font-medium">Messages</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
