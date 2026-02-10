"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"; // Assuming shadcn calendar
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CreateEventPage() {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState<Date>();

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create New Event</h2>
                <p className="text-muted-foreground">Follow the steps to set up your event.</p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center justify-between px-10">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                            step === i ? "bg-primary text-primary-foreground" :
                                step > i ? "bg-primary/50 text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                            {i}
                        </div>
                        {i < 4 && <div className={cn("w-20 h-1 mx-2", step > i ? "bg-primary/50" : "bg-muted")} />}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {step === 1 && "Basic Information"}
                        {step === 2 && "Date & Location"}
                        {step === 3 && "Registration Settings"}
                        {step === 4 && "Review & Publish"}
                    </CardTitle>
                    <CardDescription>
                        {step === 1 && "Enter the core details of your event."}
                        {step === 2 && "When and where will it take place?"}
                        {step === 3 && "Configure how attendees can sign up."}
                        {step === 4 && "Review everything before going live."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Event Name</Label>
                                <Input id="name" placeholder="e.g. Annual Tech Conference" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Describe your event..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="conference">Conference</SelectItem>
                                        <SelectItem value="workshop">Workshop</SelectItem>
                                        <SelectItem value="meetup">Meetup</SelectItem>
                                        <SelectItem value="social">Social</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="space-y-2 flex flex-col">
                                <Label>Start Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Venue Name</Label>
                                <Input id="location" placeholder="e.g. Grand Hall" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St..." />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="capacity">Total Capacity</Label>
                                <Input id="capacity" type="number" placeholder="1000" />
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4">
                            <div className="rounded-md bg-muted p-4">
                                <h3 className="font-semibold">Summary</h3>
                                <p className="text-sm text-muted-foreground mt-2">Event Name: Annual Tech Conference</p>
                                <p className="text-sm text-muted-foreground">Date: {date ? format(date, "PPP") : "Not set"}</p>
                            </div>
                        </div>
                    )}

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    {step < 4 ? (
                        <Button onClick={nextStep}>
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button>Publish Event</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
