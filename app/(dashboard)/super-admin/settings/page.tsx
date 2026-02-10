"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
                <p className="text-muted-foreground">
                    Manage your platform configurations and system preferences.
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="billing">Billing & Limits</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="api">API Keys</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Global Limits</CardTitle>
                            <CardDescription>
                                Set default limits for new tenants.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="default-event-limit">Default Event Limit</Label>
                                <Input id="default-event-limit" type="number" defaultValue="5" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="default-attendee-limit">Default Attendee Limit</Label>
                                <Input id="default-attendee-limit" type="number" defaultValue="100" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Configuration</CardTitle>
                            <CardDescription>Configure platform fees and payment gateways.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="platform-fee">Platform Fee Percentage (%)</Label>
                                <Input id="platform-fee" type="number" step="0.1" defaultValue="10.0" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Manage system-wide email alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="new-tenant-alert" className="flex flex-col space-y-1">
                                    <span>New Tenant Alert</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receive an email when a new organizer signs up.</span>
                                </Label>
                                <Switch id="new-tenant-alert" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="system-health-alert" className="flex flex-col space-y-1">
                                    <span>System Health Alert</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receive an email if system health degrades.</span>
                                </Label>
                                <Switch id="system-health-alert" defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
