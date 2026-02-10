import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Globe, MapPin, CalendarDays } from "lucide-react";

interface TenantInfoCardProps {
    tenant: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        website?: string;
        address?: string;
        joinedDate: string;
        status: string;
        plan: string;
        logo?: string;
    };
}

export function TenantInfoCard({ tenant }: TenantInfoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tenant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={tenant.logo} />
                        <AvatarFallback className="text-xl">{tenant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-bold">{tenant.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{tenant.plan} Plan</Badge>
                            <Badge
                                variant={tenant.status === "active" ? "default" : "secondary"}
                                className={tenant.status === "active" ? "bg-green-500" : ""}
                            >
                                {tenant.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{tenant.email}</span>
                    </div>
                    {tenant.phone && (
                        <div className="flex items-center space-x-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{tenant.phone}</span>
                        </div>
                    )}
                    {tenant.website && (
                        <div className="flex items-center space-x-3 text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a href={tenant.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                {tenant.website}
                            </a>
                        </div>
                    )}
                    {tenant.address && (
                        <div className="flex items-center space-x-3 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{tenant.address}</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-3 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {tenant.joinedDate}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
