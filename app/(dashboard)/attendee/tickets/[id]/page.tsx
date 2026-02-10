"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export default function TicketDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const ticketId = resolvedParams.id;

    // Mock ticket data
    const ticket = {
        eventName: "Tech Summit 2026",
        attendeeName: "Abdullah Devji",
        type: "VIP Pass",
        date: "March 15, 2026",
        time: "09:00 AM",
        location: "Grand Convention Center, Tech City",
        seat: "Row A, Seat 12"
    };

    return (
        <div className="max-w-md mx-auto space-y-6 pt-10">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Tickets
            </Button>

            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-primary-foreground text-center">
                    <h2 className="text-2xl font-bold">{ticket.eventName}</h2>
                    <p className="opacity-90">{ticket.date} • {ticket.time}</p>
                </div>
                <CardContent className="flex flex-col items-center p-8 space-y-6 bg-white">
                    <div className="p-4 border-4 border-black rounded-xl">
                        <QRCodeSVG value={`TICKET-${ticketId}-${ticket.attendeeName}`} size={200} />
                    </div>
                    <div className="text-center space-y-1 text-black">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">Attendee</p>
                        <p className="text-xl font-bold">{ticket.attendeeName}</p>
                    </div>
                    <div className="text-center space-y-1 text-black">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">Ticket Type</p>
                        <p className="font-semibold text-lg">{ticket.type}</p>
                    </div>
                    <div className="text-center space-y-1 text-black">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">Location</p>
                        <p className="text-sm">{ticket.location}</p>
                    </div>
                </CardContent>
                <div className="border-t-2 border-dashed border-gray-300 relative">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full border-r-2 border-gray-300" />
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full border-l-2 border-gray-300" />
                </div>
                <CardFooter className="bg-gray-50 p-4 flex justify-between gap-4">
                    <Button className="flex-1" variant="outline">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground">
                Show this QR code at the entrance to check in.
            </p>
        </div>
    );
}
