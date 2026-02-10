"use client";

import { Button } from "@/components/ui/button";
import { VenueCard } from "@/components/organizer/venues/venue-card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock Data
const mockVenues = [
    {
        id: "1",
        name: "Grand Convention Center",
        address: "101 Expo Blvd, Tech City",
        capacity: 5000,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Innovation Hub",
        address: "45 Startup Way, Valley",
        capacity: 800,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "Downtown Hotel & Suites",
        address: "777 Main St, Metropolis",
        capacity: 1200,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function VenuesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Venues</h2>
                    <p className="text-muted-foreground">Manage your event locations and floor plans.</p>
                </div>
                <Button asChild className="mt-4 md:mt-0">
                    <Link href="/organizer/venues/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Venue
                    </Link>
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search venues..." className="pl-8" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}
            </div>
        </div>
    );
}
