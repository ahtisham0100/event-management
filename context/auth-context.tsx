"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, authService, LoginResponse } from "@/lib/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            if (authService.isAuthenticated()) {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            // If token is invalid, clear it
            authService.logout();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (data: LoginResponse) => {
        // Assuming data contains tokens and potentially user
        // authService.login already sets localStorage
        // We just need to update state
        // If data.user is present, use it, otherwise fetch it
        if (data.user) {
            setUser(data.user);
        } else {
            checkAuth(); // Fetch user profile
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        router.push("/login"); // Redirect to login after logout
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
