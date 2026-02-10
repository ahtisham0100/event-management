"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { tenantService } from "@/lib/tenant";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tenantFormSchema = z.object({
    name: z.string().min(2, {
        message: "Organization name must be at least 2 characters.",
    }),
    email: z.string().email(),
    plan: z.string({
        required_error: "Please select a plan.",
    }),
    eventLimit: z.coerce.number().min(1),
    attendeeLimit: z.coerce.number().min(1),
});

type TenantFormValues = z.infer<typeof tenantFormSchema>;

const defaultValues: Partial<TenantFormValues> = {
    plan: "Free",
    eventLimit: 5,
    attendeeLimit: 100,
};

export function TenantForm() {
    const form = useForm<TenantFormValues>({
        resolver: zodResolver(tenantFormSchema),
        defaultValues,
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: TenantFormValues) {
        setIsLoading(true);
        try {
            await tenantService.createTenant(data);
            toast.success("Tenant created successfully", {
                description: `${data.name} has been onboarded.`
            });
            router.push("/super-admin/tenants");
        } catch (error) {
            toast.error("Failed to create tenant", {
                description: "Please try again later."
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Tenant</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Corp" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Admin Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="admin@acme.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This email will be used for the primary admin account.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="plan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subscription Plan</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a plan" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Free">Free Tier</SelectItem>
                                                <SelectItem value="Pro">Pro Tier</SelectItem>
                                                <SelectItem value="Enterprise">Enterprise</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="eventLimit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Limit</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="attendeeLimit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Attendee Limit (Per Event)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline">Cancel</Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Tenant"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
