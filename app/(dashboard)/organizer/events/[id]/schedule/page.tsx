"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    User,
    MoreHorizontal,
    Plus,
    ArrowLeft
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Mock Sessions Data
const mockSessions = [
    {
        id: "1",
        title: "Opening Keynote: The Future of Events",
        speaker: "Sarah Connor",
        time: "09:00 AM - 10:00 AM",
        location: "Main Hall",
        track: "Main Stage",
        type: "Keynote"
    },
    {
        id: "2",
        title: "React Server Components Deep Dive",
        speaker: "John Doe",
        time: "10:30 AM - 11:30 AM",
        location: "Room A",
        track: "Engineering",
        type: "Tech Talk"
    },
    {
        id: "3",
        title: "Design Systems at Scale",
        speaker: "Jane Smith",
        time: "10:30 AM - 11:30 AM",
        location: "Room B",
        track: "Design",
        type: "Workshop"
    },
    {
        id: "4",
        title: "Networking Lunch",
        speaker: "-",
        time: "12:00 PM - 01:00 PM",
        location: "Cafeteria",
        track: "General",
        type: "Networking"
    }
];

export default function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Schedule Management</h2>
                    <p className="text-muted-foreground">Event ID: {resolvedParams.id}</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <Tabs defaultValue="day1">
                    <TabsList>
                        <TabsTrigger value="day1">Day 1</TabsTrigger>
                        <TabsTrigger value="day2">Day 2</TabsTrigger>
                        <TabsTrigger value="day3">Day 3</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Session
                </Button>
            </div>

            <div className="space-y-4">
                {/* Timeline / List View */}
                {mockSessions.map((session) => (
                    <Card key={session.id} className="relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${session.track === 'Main Stage' ? 'bg-primary' :
                                session.track === 'Engineering' ? 'bg-blue-500' :
                                    session.track === 'Design' ? 'bg-pink-500' : 'bg-gray-300'
                            }`} />
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center p-6 gap-4">
                                <div className="min-w-[150px] flex flex-col gap-1">
                                    <div className="flex items-center text-sm font-medium">
                                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                        {session.time}
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <MapPin className="mr-2 h-3 w-3" />
                                        {session.location}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg hover:underline cursor-pointer">
                                            {session.title}
                                        </h3>
                                        <Badge variant="outline" className="text-xs font-normal">
                                            {session.type}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <User className="mr-2 h-3 w-3" />
                                        {session.speaker}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{session.track}</Badge>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit Session</DropdownMenuItem>
                                            <DropdownMenuItem>Assign Speakers</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
