"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, MapPin, UserCheck, Ticket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

// Mock Attendees
const attendees = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", ticket: "General Admission", status: "Checked In" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", ticket: "VIP", status: "Not Checked In" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", ticket: "Speaker", status: "Not Checked In" },
    { id: "4", name: "Diana Prince", email: "diana@example.com", ticket: "Media", status: "Not Checked In" },
];

export default function ManualCheckInPage() {
    const [search, setSearch] = useState("");

    const filtered = attendees.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleCheckIn = (id: string, name: string) => {
        alert(`Checked in ${name}`);
        // Logic to update status would go here
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                    <Link href="/staff/check-in">Back to Scanner</Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Manual Check-in</h2>
                    <p className="text-muted-foreground">Search for attendees by name or email.</p>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search attendee..."
                    className="pl-10 h-10 text-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="grid gap-4">
                {filtered.map(attendee => (
                    <Card key={attendee.id} className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">{attendee.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{attendee.email}</span>
                                    <span>•</span>
                                    <Badge variant="outline" className="text-xs">{attendee.ticket}</Badge>
                                </div>
                            </div>
                        </div>
                        <div>
                            {attendee.status === "Checked In" ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    <UserCheck className="w-3 h-3 mr-1" /> Checked In
                                </Badge>
                            ) : (
                                <Button size="sm" onClick={() => handleCheckIn(attendee.id, attendee.name)}>
                                    Check In
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
                {filtered.length === 0 && search && (
                    <div className="text-center py-10 text-muted-foreground">
                        No attendee found matching "{search}"
                    </div>
                )}
            </div>
        </div>
    );
}
