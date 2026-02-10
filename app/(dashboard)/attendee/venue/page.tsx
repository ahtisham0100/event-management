"use client";

import { InteractiveFloorPlan } from "@/components/attendee/floor-plan/interactive-floor-plan";
import { RoomFinder } from "@/components/attendee/floor-plan/room-finder";
import { NextSessionNav } from "@/components/attendee/floor-plan/next-session-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VenueNavigationPage() {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Venue Navigation</h2>
                <p className="text-muted-foreground">Find your way around the event venue.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Left Column: Map */}
                <div className="lg:col-span-2 space-y-4">
                    <InteractiveFloorPlan />
                    <div className="hidden lg:block">
                        <NextSessionNav />
                    </div>
                </div>

                {/* Right Column: Search & Tools */}
                <div className="space-y-4">
                    <div className="lg:hidden">
                        <NextSessionNav />
                    </div>

                    <Tabs defaultValue="find-room">
                        <TabsList className="w-full">
                            <TabsTrigger value="find-room" className="flex-1">Find Room</TabsTrigger>
                            <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
                        </TabsList>
                        <TabsContent value="find-room">
                            <RoomFinder />
                        </TabsContent>
                        <TabsContent value="nearby">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Nearby Amenities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">Select a location on the map to see nearby amenities.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
