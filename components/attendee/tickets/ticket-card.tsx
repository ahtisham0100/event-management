import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, QrCode } from "lucide-react";
import Link from "next/link";

interface TicketProps {
    ticket: {
        id: string;
        eventName: string;
        date: string;
        location: string;
        type: string;
        status: "Upcoming" | "Past" | "Cancelled";
        image?: string;
    }
}

export function TicketCard({ ticket }: TicketProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video w-full bg-muted relative">
                {ticket.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={ticket.image}
                        alt={ticket.eventName}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-secondary/20 text-muted-foreground">
                        Event Image
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                    {ticket.type}
                </div>
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1">{ticket.eventName}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {ticket.date}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{ticket.location}</span>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button className="flex-1" variant="outline" asChild>
                    <Link href={`/attendee/tickets/${ticket.id}`}>
                        <QrCode className="mr-2 h-4 w-4" /> View Ticket
                    </Link>
                </Button>
                <Button className="flex-1" asChild>
                    <Link href={`/attendee/events/${ticket.id}`}>
                        Event Details
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
