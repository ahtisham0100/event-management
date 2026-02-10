"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Event Details: {resolvedParams.id}</h2>
                </div>
            </div>

            <div className="border rounded-lg p-10 text-center text-muted-foreground">
                Edit Event Form and Event specific management links will go here.
            </div>
        </div>
    )
}
