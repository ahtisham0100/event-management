"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

export function TenantFilters() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4">
            <div className="flex flex-1 items-center space-x-2">
                <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tenants..."
                        className="pl-8"
                    />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
            <div>
                <Button className="w-full md:w-auto" asChild>
                    <Link href="/super-admin/tenants/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Tenant
                    </Link>
                </Button>
            </div>
        </div>
    );
}
