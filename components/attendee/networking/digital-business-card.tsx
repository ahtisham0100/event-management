"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2, QrCode, Linkedin, Twitter, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface Profile {
    name: string;
    role: string;
    company: string;
    email: string;
    linkedin?: string;
    twitter?: string;
    avatar?: string;
}

export function DigitalBusinessCard({ profile }: { profile: Profile }) {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:${profile.company}
TITLE:${profile.role}
EMAIL:${profile.email}
END:VCARD`;

    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-1 rounded-full bg-white/10 backdrop-blur-sm w-24 h-24 flex items-center justify-center">
                    <Avatar className="w-20 h-20 border-2 border-white/20">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-slate-900 font-bold text-2xl">{profile.name[0]}</AvatarFallback>
                    </Avatar>
                </div>
                <CardTitle className="text-2xl font-bold text-white">{profile.name}</CardTitle>
                <p className="text-slate-300 font-medium">{profile.role}</p>
                <p className="text-slate-400 text-sm">{profile.company}</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 pt-2">
                <div className="bg-white p-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-200">
                    <QRCodeSVG value={vCardData} size={150} />
                </div>
                <p className="text-xs text-slate-400">Scan to add to contacts</p>

                <div className="flex gap-4">
                    {profile.linkedin && (
                        <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                            <Linkedin className="h-5 w-5" />
                        </Button>
                    )}
                    {profile.twitter && (
                        <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                            <Twitter className="h-5 w-5" />
                        </Button>
                    )}
                    <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                        <Mail className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="bg-white/5 p-4 flex gap-2">
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                    <Share2 className="mr-2 h-4 w-4" /> Share Profile
                </Button>
            </CardFooter>
        </Card>
    );
}
