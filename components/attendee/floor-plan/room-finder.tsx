"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Navigation } from "lucide-react";

interface Room {
    id: string;
    name: string;
    level: string;
    distance: string; // Mock distance
}

const mockRooms: Room[] = [
    { id: "1", name: "Main Hall", level: "L1", distance: "2 mins" },
    { id: "2", name: "Workshop A", level: "L1", distance: "5 mins" },
    { id: "3", name: "Workshop B", level: "L1", distance: "6 mins" },
    { id: "4", name: "Auditorium", level: "L2", distance: "10 mins" },
    { id: "5", name: "Cafeteria", level: "L1", distance: "3 mins" },
];

export function RoomFinder() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Room[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 0) {
            const filtered = mockRooms.filter(r => r.name.toLowerCase().includes(val.toLowerCase()));
            setResults(filtered);
        } else {
            setResults([]);
        }
    };

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Find room or amenity..."
                        className="pl-9"
                        value={query}
                        onChange={handleSearch}
                    />
                </div>

                {results.length > 0 ? (
                    <div className="space-y-2">
                        {results.map(room => (
                            <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{room.name}</p>
                                        <p className="text-xs text-muted-foreground">Level {room.level} • {room.distance} walk</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost">
                                    <Navigation className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : query.length > 0 && (
                    <p className="text-center text-sm text-muted-foreground py-4">No rooms found.</p>
                )}
            </CardContent>
        </Card>
    );
}
