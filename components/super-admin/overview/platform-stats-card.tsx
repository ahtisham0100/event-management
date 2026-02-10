import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

interface PlatformStatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend: {
        value: number;
        isPositive: boolean;
    };
    description: string;
}

export function PlatformStatsCard({
    title,
    value,
    icon: Icon,
    trend,
    description,
}: PlatformStatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    <span
                        className={
                            trend.isPositive ? "text-green-500" : "text-red-500"
                        }
                    >
                        {trend.isPositive ? <ArrowUp className="inline h-3 w-3 mr-1" /> : <ArrowDown className="inline h-3 w-3 mr-1" />}
                        {trend.value}%
                    </span>
                    {" "}{description}
                </p>
            </CardContent>
        </Card>
    );
}
