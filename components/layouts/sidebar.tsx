"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    BarChart,
    LogOut,
    Shield,
    CreditCard,
    Map,
    Ticket,
    UserCheck,
    Printer
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface SidebarProps {
    role: "SUPER_ADMIN" | "ORGANIZER" | "STAFF" | "ATTENDEE";
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const commonLinks = [
        {
            href: "/login",
            label: "Logout",
            icon: LogOut,
            onClick: logout,
            variant: "destructive",
        },
    ];

    const roleLinks = {
        SUPER_ADMIN: [
            { href: "/super-admin", label: "Overview", icon: LayoutDashboard },
            { href: "/super-admin/tenants", label: "Tenants", icon: Users },
            { href: "/super-admin/revenue", label: "Revenue", icon: BarChart },
            { href: "/super-admin/settings", label: "Settings", icon: Settings },
        ],
        ORGANIZER: [
            { href: "/organizer", label: "Overview", icon: LayoutDashboard },
            { href: "/organizer/events", label: "Events", icon: Calendar },
            { href: "/organizer/venues", label: "Venues", icon: Map },
            { href: "/organizer/financials", label: "Financials", icon: CreditCard },
            { href: "/organizer/staff", label: "Staff", icon: Users },
        ],
        STAFF: [
            { href: "/staff", label: "Overview", icon: LayoutDashboard },
            { href: "/staff/check-in", label: "Check-in", icon: UserCheck },
            { href: "/staff/badge-printing", label: "Badges", icon: Printer },
            { href: "/staff/sessions", label: "Sessions", icon: Calendar },
        ],
        ATTENDEE: [
            { href: "/attendee", label: "Overview", icon: LayoutDashboard },
            { href: "/attendee/agenda", label: "My Agenda", icon: Calendar },
            { href: "/attendee/tickets", label: "Tickets", icon: Ticket },
        ],
    };

    const links = roleLinks[role] || [];

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Event X
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {role.replace("_", " ")}
                    </span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <nav className="grid gap-1">
                    {commonLinks.map((link, index) => (
                        <button
                            key={index}
                            onClick={link.onClick}
                            className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive",
                                link.variant === "destructive" ? "text-destructive" : "text-muted-foreground"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
