"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { mockLogin } from "@/lib/auth"
import { useAuth } from "@/context/auth-context"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
})

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { login } = useAuth();

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true)
        try {
            const response = await mockLogin(values.email, values.password)
            console.log("Login Response:", response)
            console.log("User Role:", response.user.role);
            // Update context state

            login(response);

            toast.success("Logged in successfully!")

            // Redirect based on role - UPDATED to match backend enums (SUPER_ADMIN)
            switch (response.user.role) {
                case 'SUPER_ADMIN':
                    router.push('/superadmin')
                    break;
                case 'ORGANIZER':
                    router.push('/organizer') // placeholder
                    toast.info("Redirecting to Organizer Dashboard (Not implemented)")
                    break;
                case 'STAFF':
                    router.push('/staff') // placeholder
                    toast.info("Redirecting to Staff Dashboard (Not implemented)")
                    break;
                case 'ATTENDEE':
                    router.push('/attendee') // placeholder
                    toast.info("Redirecting to Attendee Dashboard (Not implemented)")
                    break;
                default:
                    router.push('/')
            }

        } catch (error: any) {
            console.error("Login Error:", error);
            const errorMsg = error.response?.data
                ? JSON.stringify(error.response.data)
                : "Invalid credentials or server error.";
            console.error("Backend Error Data:", error.response?.data);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-zinc-500">Enter your credentials to access your account</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="m@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </form>
            </Form>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
