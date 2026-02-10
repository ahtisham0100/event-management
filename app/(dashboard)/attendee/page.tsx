"use client";

import { TicketCard } from "@/components/attendee/tickets/ticket-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import Link from 'next/link';

// Mock Data
const myTickets = [
  {
    id: "1",
    eventName: "Tech Summit 2026",
    date: "Mar 15, 2026 • 09:00 AM",
    location: "Grand Convention Center",
    type: "VIP Pass",
    status: "Upcoming" as const,
    image: "https://images.unsplash.com/photo-1540575467063-178a50fb5561?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    eventName: "React Workshop",
    date: "Apr 02, 2026 • 10:00 AM",
    location: "Online",
    type: "General Admission",
    status: "Upcoming" as const,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    eventName: "Design Systems Meetup",
    date: "May 20, 2026 • 06:00 PM",
    location: "Innovation Hub",
    type: "Early Bird",
    status: "Upcoming" as const,
    image: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function AttendeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Tickets</h2>
          <p className="text-muted-foreground">Manage your upcoming events and tickets.</p>
        </div>
        <Button asChild>
          <Link href="/attendee/explore">
            <Search className="mr-2 h-4 w-4" /> Explore Events
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <p>No past events found.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <p>No saved events.</p>
              <Button variant="link" asChild>
                <Link href="/attendee/explore">Browse Events</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
