"use client";

import { OrganizerStats } from "@/components/organizer/overview/organizer-stats";
import { ActiveEventsWidget } from "@/components/organizer/overview/active-events-widget";
import { QuickActionsPanel } from "@/components/organizer/overview/quick-actions-panel";

export default function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Organizer Dashboard</h2>
        <p className="text-muted-foreground">Manage your events and performance.</p>
      </div>

      <OrganizerStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ActiveEventsWidget />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
