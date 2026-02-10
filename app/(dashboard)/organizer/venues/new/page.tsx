"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateVenuePage() {
    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add New Venue</h2>
                    <p className="text-muted-foreground">Create a location for your events.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Venue Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="venue-name">Venue Name</Label>
                        <Input id="venue-name" placeholder="Convention Center" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Street address" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" type="number" placeholder="5000" />
                    </div>
                    <div className="pt-4 flex justify-end">
                        <Button>Save Venue</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
