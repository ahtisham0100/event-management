"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, MapPin, Calendar, Tag } from "lucide-react";
import Link from "next/link";

const featuredEvents = [
    {
        id: "1",
        name: "Global Tech Summit 2026",
        date: "Nov 15-17, 2026",
        location: "San Francisco, CA",
        category: "Technology",
        price: "$299",
        image: "https://images.unsplash.com/photo-1475721027760-f75cf6370895?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Creative Arts Festival",
        date: "Aug 20, 2026",
        location: "Austin, TX",
        category: "Art & Culture",
        price: "$45",
        image: "https://images.unsplash.com/photo-1459749411177-287ce14650e4?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "Future of Finance",
        date: "Sep 10, 2026",
        location: "New York, NY",
        category: "Business",
        price: "$150",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
    },
    {
        id: "4",
        name: "Health & Wellness Expo",
        date: "Jul 05, 2026",
        location: "Los Angeles, CA",
        category: "Health",
        price: "Free",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function ExploreEventsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Explore Events</h2>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search events, topics, or locations..." className="pl-8" />
                    </div>
                    <Button>Search</Button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {["All", "Technology", "Business", "Music", "Art", "Food & Drink", "Health"].map((cat) => (
                        <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-secondary/80 px-4 py-1">
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {featuredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/3] w-full bg-muted relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={event.image}
                                alt={event.name}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-bold">
                                {event.price}
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">{event.category}</Badge>
                            </div>
                            <CardTitle className="line-clamp-1 text-lg">{event.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full" variant="secondary" asChild>
                                <Link href={`/attendee/events/${event.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
