"use client";

import { useState } from "react";
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

interface Tenant {
    id: string;
    name: string;
    email: string;
    status: "active" | "suspended" | "inactive";
    plan: "Free" | "Pro" | "Enterprise";
    eventsCount: number;
    joinedDate: string;
}

const mockTenants: Tenant[] = [
    {
        id: "1",
        name: "TechStart Inc",
        email: "contact@techstart.io",
        status: "active",
        plan: "Enterprise",
        eventsCount: 12,
        joinedDate: "2023-11-15",
    },
    {
        id: "2",
        name: "Community Events Local",
        email: "events@local.org",
        status: "active",
        plan: "Pro",
        eventsCount: 5,
        joinedDate: "2024-01-20",
    },
    {
        id: "3",
        name: "John Doe Personal",
        email: "john@doe.com",
        status: "suspended",
        plan: "Free",
        eventsCount: 1,
        joinedDate: "2024-02-10",
    },
    {
        id: "4",
        name: "Global Summits LLC",
        email: "info@globalsummits.com",
        status: "active",
        plan: "Enterprise",
        eventsCount: 45,
        joinedDate: "2023-08-05",
    },
    {
        id: "5",
        name: "Creative Workshops",
        email: "hello@creative.art",
        status: "inactive",
        plan: "Pro",
        eventsCount: 0,
        joinedDate: "2024-03-01",
    },
];

export function TenantTable() {
    const [tenants, setTenants] = useState<Tenant[]>(mockTenants);

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
                    {tenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell className="font-medium flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{tenant.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold">{tenant.name}</div>
                                    <div className="text-xs text-muted-foreground">{tenant.email}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        tenant.status === "active"
                                            ? "default" // "success" if you have it, else default
                                            : tenant.status === "suspended"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className={tenant.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                                >
                                    {tenant.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{tenant.plan}</TableCell>
                            <TableCell className="text-right">{tenant.eventsCount}</TableCell>
                            <TableCell className="text-right">{tenant.joinedDate}</TableCell>
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
                                        {tenant.status === "active" ? (
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
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
