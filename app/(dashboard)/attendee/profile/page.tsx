"use client";

import { DigitalBusinessCard } from "@/components/attendee/networking/digital-business-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockProfile = {
    name: "Abdullah Devji",
    role: "Senior Software Engineer",
    company: "Tech Innovators Inc.",
    email: "abdullah@example.com",
    linkedin: "linkedin.com/in/abdullah",
    twitter: "twitter.com/abdullah",
};

export default function NetworkingProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Networking Profile</h2>
                <p className="text-muted-foreground">Manage your digital presence and connections.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Left Column: Business Card Preview */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Your Digital Card</h3>
                    <DigitalBusinessCard profile={mockProfile} />
                </div>

                {/* Right Column: Edit Profile & Settings */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="edit">
                        <TabsList className="w-full">
                            <TabsTrigger value="edit" className="flex-1">Edit Profile</TabsTrigger>
                            <TabsTrigger value="privacy" className="flex-1">Privacy & Visibility</TabsTrigger>
                            <TabsTrigger value="connections" className="flex-1">My Connections</TabsTrigger>
                        </TabsList>

                        <TabsContent value="edit">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Edit Profile Information</CardTitle>
                                    <CardDescription>Update what others see when they scan your card.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input defaultValue={mockProfile.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Job Title</Label>
                                            <Input defaultValue={mockProfile.role} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Company / Organization</Label>
                                        <Input defaultValue={mockProfile.company} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Bio</Label>
                                        <Textarea placeholder="Tell us about yourself..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>LinkedIn URL</Label>
                                            <Input defaultValue={mockProfile.linkedin} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Twitter/X Handle</Label>
                                            <Input defaultValue={mockProfile.twitter} />
                                        </div>
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <Button>Save Changes</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="privacy">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Visibility Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Discoverable in Directory</p>
                                            <p className="text-sm text-muted-foreground">Allow other attendees to find you.</p>
                                        </div>
                                        <Button variant="outline">Enabled</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Show Email Address</p>
                                            <p className="text-sm text-muted-foreground">Visible on your digital card.</p>
                                        </div>
                                        <Button variant="outline">Enabled</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="connections">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Connections (0)</CardTitle>
                                    <CardDescription>People you have connected with at events.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-8 text-muted-foreground">
                                    No connections yet. Start networking!
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
