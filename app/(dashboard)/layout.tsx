"use client";

import { useAuth } from "@/context/auth-context";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            redirect("/login");
        }
    }, [user, loading]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Basic Role-Based Protection logic (can be refined)
    if (user) {
        if (pathname.includes("/super-admin") && user.role !== "SUPER_ADMIN") {
            redirect("/"); // or unauthorized page
        }
        if (pathname.includes("/organizer") && user.role !== "ORGANIZER") {
            redirect("/");
        }
        if (pathname.includes("/staff") && user.role !== "STAFF") {
            redirect("/");
        }
        // Attendee can likely access attendee routes, but maybe restricted from others?
    }


    return (
        <div className="min-h-screen bg-background text-foreground">
            {children}
        </div>
    );
}
