"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data
const mockEvents = [
  {
    id: "1",
    name: "Tech Summit 2026",
    date: "Mar 15, 2026",
    location: "Grand Convention Center",
    status: "Published",
    registrations: 450,
  },
  {
    id: "2",
    name: "React Workshop",
    date: "Apr 02, 2026",
    location: "Online",
    status: "Draft",
    registrations: 0,
  },
  {
    id: "3",
    name: "Design Systems Meetup",
    date: "May 20, 2026",
    location: "Innovation Hub",
    status: "Published",
    registrations: 120,
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = mockEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">
            Manage your upcoming and past events.
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/organizer/events/new">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Registrations</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  {event.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={event.status === "Published" ? "default" : "secondary"}
                    className={event.status === "Published" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-3 w-3" />
                    {event.date}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-3 w-3" />
                    {event.location}
                  </div>
                </TableCell>
                <TableCell className="text-right">{event.registrations}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/organizer/events/${event.id}`}>Edit Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/organizer/events/${event.id}/schedule`}>Manage Schedule</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Cancel Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredEvents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
