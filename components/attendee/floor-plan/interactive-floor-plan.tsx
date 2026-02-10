"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, MapPin, Navigation } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface POI {
    id: string;
    x: number;
    y: number;
    name: string;
    type: "room" | "restroom" | "exit" | "food";
}

const mockPOIs: POI[] = [
    { id: "1", x: 200, y: 150, name: "Main Hall", type: "room" },
    { id: "2", x: 500, y: 150, name: "Workshop A", type: "room" },
    { id: "3", x: 500, y: 300, name: "Restroom", type: "restroom" },
    { id: "4", x: 100, y: 300, name: "Cafeteria", type: "food" },
];

export function InteractiveFloorPlan() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);

        // Draw Floor Plan (Simple Rectangle Structure)
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, 700, 400); // Outer walls

        // Draw Rooms
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(150, 100, 200, 100); // Main Hall
        ctx.strokeRect(150, 100, 200, 100);

        ctx.fillRect(450, 100, 100, 100); // Workshop A
        ctx.strokeRect(450, 100, 100, 100);

        // Draw POIs
        mockPOIs.forEach((poi) => {
            ctx.beginPath();
            ctx.arc(poi.x, poi.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = poi.type === "restroom" ? "#3b82f6" : poi.type === "food" ? "#f59e0b" : "#ef4444";
            ctx.fill();
            ctx.stroke();
        });

        // Draw "You are here" marker
        ctx.beginPath();
        ctx.arc(400, 400, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }, [scale, offset]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setOffset({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoom = (direction: 'in' | 'out') => {
        setScale((prev) => Math.max(0.5, Math.min(3, prev + (direction === 'in' ? 0.2 : -0.2))));
    };

    return (
        <div className="relative border rounded-lg overflow-hidden h-[500px] bg-white">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <Button size="icon" variant="secondary" onClick={() => handleZoom('in')}>
                    <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => handleZoom('out')}>
                    <Minus className="h-4 w-4" />
                </Button>
            </div>

            <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur p-2 rounded-md shadow-sm text-xs">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" /> Room
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500" /> Restroom
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" /> Food
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" /> You
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="cursor-move w-full h-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />
        </div>
    );
}
