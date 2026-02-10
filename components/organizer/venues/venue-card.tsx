import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Edit } from "lucide-react";
import Link from 'next/link';

interface Venue {
    id: string;
    name: string;
    address: string;
    capacity: number;
    image?: string;
}

interface VenueCardProps {
    venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-muted relative">
                {venue.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={venue.image}
                        alt={venue.name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-secondary/20 text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle>{venue.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {venue.address}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Capacity: {venue.capacity.toLocaleString()}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button size="sm" variant="secondary">
                    Floor Plan
                </Button>
            </CardFooter>
        </Card>
    );
}
