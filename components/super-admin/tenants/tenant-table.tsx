"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Lock, Unlock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Tenant } from "@/types/dashboard-types";

interface TenantTableProps {
    tenants: Tenant[];
}

export function TenantTable({ tenants }: TenantTableProps) {
    // Map backend tenant data to UI format
    const formatTenantData = (tenant: Tenant) => {
        const fullName = `${tenant.organizer.first_name} ${tenant.organizer.last_name}`.trim() || "Unknown";
        const status: "active" | "suspended" | "inactive" = tenant.is_active ? "active" : "inactive";

        // Format date
        const joinDate = new Date(tenant.created_at).toLocaleDateString();

        return {
            id: tenant.id.toString(),
            name: fullName,
            email: tenant.organizer.email,
            status,
            plan: "Free", // Backend doesn't return plan info yet
            eventsCount: tenant.usage.events_created,
            joinedDate: joinDate,
        };
    };

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead className="text-right">Events</TableHead>
                        <TableHead className="text-right">Joined</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No tenants found
                            </TableCell>
                        </TableRow>
                    ) : (
                        tenants.map((tenant) => {
                            const formattedTenant = formatTenantData(tenant);
                            return (
                                <TableRow key={formattedTenant.id}>
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{formattedTenant.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold">{formattedTenant.name}</div>
                                            <div className="text-xs text-muted-foreground">{formattedTenant.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                formattedTenant.status === "active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={formattedTenant.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                                        >
                                            {formattedTenant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formattedTenant.plan}</TableCell>
                                    <TableCell className="text-right">{formattedTenant.eventsCount}</TableCell>
                                    <TableCell className="text-right">{formattedTenant.joinedDate}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>View Events</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {formattedTenant.status === "active" ? (
                                                    <DropdownMenuItem className="text-yellow-600 focus:text-yellow-600">
                                                        <Lock className="mr-2 h-4 w-4" /> Suspend
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="text-green-600 focus:text-green-600">
                                                        <Unlock className="mr-2 h-4 w-4" /> Activate
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div >
    );
}
