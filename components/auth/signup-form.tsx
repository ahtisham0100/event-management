"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { authService } from "@/lib/auth"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

// Updated schema to match backend requirements
// The backend expects `organizer_profile` and `attendee_profile` as objects if they are provided.
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string(),
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    phone: z.string().min(10, "Phone number is required"),
    // Roles must match Role58bEnum: SUPER_ADMIN, ORGANIZER, STAFF, ATTENDEE (underscores instead of none)
    role: z.enum(["SUPER_ADMIN", "ORGANIZER", "STAFF", "ATTENDEE"]),
    // For simplicity, we'll keep these separate fields in the form but map them to the profile object on submit
    company_name: z.string().optional(),
    job_title: z.string().optional(),
}).refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
})

export default function SignupForm() {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            password_confirm: "",
            first_name: "",
            last_name: "",
            phone: "",
            role: "ATTENDEE",
            company_name: "",
            job_title: "",
        },
    })

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        setIsLoading(true)
        try {
            // Construct the payload for the backend
            const payload: any = {
                email: values.email,
                password: values.password,
                password_confirm: values.password_confirm,
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                role: values.role,
            };

            // Add profile data based on role
            if (values.role === "ORGANIZER") {
                payload.organizer_profile = {
                    company_name: values.company_name || "Default Company", // Schema requires company_name
                    verification_status: "PENDING"
                };
            } else if (values.role === "ATTENDEE") {
                payload.attendee_profile = {
                    job_title: values.job_title || "",
                    allow_networking: true
                };
            }

            await authService.register(payload)
            toast.success("Account created successfully!")
            router.push("/login")
        } catch (error: any) {
            console.error("Signup Error:", error);
            const msg = error.response?.data ? JSON.stringify(error.response.data) : "Something went wrong. Please try again.";
            toast.error(msg);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create an account</h1>
                <p className="text-zinc-500">Enter your information to get started</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
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
                        <FormField
                            control={form.control}
                            name="password_confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ATTENDEE">Attendee</SelectItem>
                                        <SelectItem value="ORGANIZER">Organizer</SelectItem>
                                        <SelectItem value="STAFF">Staff</SelectItem>
                                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.watch("role") === "ORGANIZER" && (
                        <FormField
                            control={form.control}
                            name="company_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Inc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {form.watch("role") === "ATTENDEE" && (
                        <FormField
                            control={form.control}
                            name="job_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Software Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign Up
                    </Button>
                </form>
            </Form>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Log in
                </Link>
            </div>
        </div>
    )
}
