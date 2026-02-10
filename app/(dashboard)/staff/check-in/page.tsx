"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, X, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock implementation of a scanner UI since we can't access real camera easily here
export default function QRScannerPage() {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);

    // Simulate scan effect
    useEffect(() => {
        if (isScanning) {
            const timer = setTimeout(() => {
                setScanResult("John Doe - VIP Ticket");
                setIsScanning(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isScanning]);

    const startScan = () => {
        setScanResult(null);
        setIsScanning(true);
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">QR Check-in</h2>
                <Button variant="outline" onClick={() => router.push("/staff/check-in/manual")}>
                    Manual Entry
                </Button>
            </div>

            <Card className="flex-1 relative overflow-hidden bg-black flex flex-col items-center justify-center">
                {!isScanning && !scanResult && (
                    <div className="text-center space-y-4 p-6">
                        <Camera className="h-16 w-16 text-muted mx-auto" />
                        <h3 className="text-white text-xl">Ready to Scan</h3>
                        <p className="text-gray-400">Point camera at attendee's QR code</p>
                        <Button size="lg" onClick={startScan} className="w-full max-w-xs">
                            Start Camera
                        </Button>
                    </div>
                )}

                {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        {/* Scanning Animation */}
                        <div className="w-64 h-64 border-2 border-primary rounded-xl relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-scan-down shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                        </div>
                        <p className="absolute bottom-20 text-white animate-pulse">Scanning...</p>
                        <Button
                            variant="ghost"
                            className="absolute top-4 right-4 text-white hover:bg-white/20"
                            onClick={() => setIsScanning(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                )}

                {scanResult && (
                    <div className="absolute inset-0 bg-background z-20 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Check-in Successful!</h3>
                        <p className="text-xl text-center mb-2">{scanResult}</p>
                        <p className="text-muted-foreground mb-8">Checked in at {new Date().toLocaleTimeString()}</p>

                        <div className="flex gap-4 w-full max-w-sm">
                            <Button className="flex-1" onClick={startScan}>Scan Next</Button>
                            <Button variant="outline" className="flex-1" onClick={() => setScanResult(null)}>Close</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
