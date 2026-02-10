"use client";

import Link from "next/link";
import { Ticket, Twitter, Facebook, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Ticket className="text-primary" size={18} />
                            </div>
                            <span className="font-bold text-xl tracking-tight">EventX</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            The all-in-one platform for planning, managing, and experiencing world-class events.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink icon={Twitter} href="#" />
                            <SocialLink icon={Facebook} href="#" />
                            <SocialLink icon={Instagram} href="#" />
                            <SocialLink icon={Linkedin} href="#" />
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Enterprise</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="font-semibold mb-4">Stay Updated</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Join our newsletter for the latest event tech trends.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter email"
                                className="bg-white/5 border-white/10 focus-visible:ring-primary"
                            />
                            <Button size="icon" className="bg-primary hover:bg-primary/90">
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2026 EventX Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-muted-foreground">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon: Icon, href }: { icon: any, href: string }) {
    return (
        <Link
            href={href}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
        >
            <Icon size={16} />
        </Link>
    );
}
