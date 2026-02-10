'use client'

import React, { useState } from 'react'
import { MapPin, Navigation, Zap } from 'lucide-react'

interface Room {
  id: string
  name: string
  type: 'session' | 'rest' | 'booth' | 'vip'
  x: number
  y: number
  highlighted: boolean
}

export default function MapPage() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'MAIN',
      name: 'Main Hall',
      type: 'session',
      x: 150,
      y: 100,
      highlighted: false,
    },
    {
      id: 'BOOTH1',
      name: 'Tech Booths',
      type: 'booth',
      x: 300,
      y: 100,
      highlighted: false,
    },
    {
      id: 'REST1',
      name: 'Rest Area',
      type: 'rest',
      x: 450,
      y: 100,
      highlighted: false,
    },
    {
      id: 'B1',
      name: 'Room B1',
      type: 'session',
      x: 150,
      y: 200,
      highlighted: false,
    },
    {
      id: 'B2',
      name: 'Room B2',
      type: 'session',
      x: 300,
      y: 200,
      highlighted: false,
    },
    {
      id: 'VIP',
      name: 'VIP Lounge',
      type: 'vip',
      x: 450,
      y: 200,
      highlighted: false,
    },
  ])

  const [handsFreeModeActive, setHandsFreeModeActive] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const getRoomColor = (type: string) => {
    switch (type) {
      case 'session':
        return '#3b82f6'
      case 'booth':
        return '#8b5cf6'
      case 'rest':
        return '#10b981'
      case 'vip':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }

  const highlightRoom = (roomId: string) => {
    setRooms(
      rooms.map((r) => ({
        ...r,
        highlighted: r.id === roomId,
      }))
    )
    const room = rooms.find((r) => r.id === roomId)
    setSelectedRoom(room || null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Venue Map</h1>
        <p className="mt-1 text-zinc-600">Interactive floor plan</p>
      </div>

      {/* Gesture Control Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-amber-600" />
          <div>
            <p className="font-medium text-zinc-900">Hands-Free Mode</p>
            <p className="text-xs text-zinc-600">Swipe to navigate agenda</p>
          </div>
        </div>
        <button
          onClick={() => setHandsFreeModeActive(!handsFreeModeActive)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            handsFreeModeActive ? 'bg-blue-600' : 'bg-zinc-300'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              handsFreeModeActive ? 'translate-x-7' : 'translate-x-1'
            }`}
          ></span>
        </button>
      </div>

      {/* SVG Floor Plan */}
      <div className="rounded-xl border border-white/30 bg-gradient-to-br from-white/40 to-white/20 p-6 backdrop-blur-md">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 600 300"
          className="rounded-lg bg-white/30"
        >
          {/* Grid background */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="600" height="300" fill="url(#grid)" />

          {/* Rooms */}
          {rooms.map((room) => (
            <g key={room.id}>
              <rect
                x={room.x - 40}
                y={room.y - 30}
                width="80"
                height="60"
                fill={getRoomColor(room.type)}
                fillOpacity={room.highlighted ? 1 : 0.6}
                stroke={room.highlighted ? '#000' : '#fff'}
                strokeWidth={room.highlighted ? 3 : 1}
                rx="4"
                onClick={() => highlightRoom(room.id)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={room.x}
                y={room.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
                pointerEvents="none"
              >
                {room.name.split(' ')[0]}
              </text>
            </g>
          ))}

          {/* Navigation arrow */}
          <path
            d="M 50 250 L 80 270 L 50 290 Z"
            fill="#3b82f6"
            opacity="0.7"
          />
          <text x="50" y="310" textAnchor="middle" fontSize="10" fill="#6b7280">
            Entrance
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{ backgroundColor: '#3b82f6' }}
          ></div>
          <span className="text-xs text-zinc-700">Sessions</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{ backgroundColor: '#8b5cf6' }}
          ></div>
          <span className="text-xs text-zinc-700">Booths</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{ backgroundColor: '#10b981' }}
          ></div>
          <span className="text-xs text-zinc-700">Rest Area</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{ backgroundColor: '#f59e0b' }}
          ></div>
          <span className="text-xs text-zinc-700">VIP Lounge</span>
        </div>
      </div>

      {/* Room Info */}
      {selectedRoom && (
        <div className="rounded-xl border border-white/30 bg-white/40 p-4 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <MapPin className="flex-shrink-0 text-blue-600" size={20} />
            <div className="flex-1">
              <p className="font-bold text-zinc-900">{selectedRoom.name}</p>
              <p className="mt-1 text-sm capitalize text-zinc-600">
                {selectedRoom.type} • Currently active
              </p>
              <button className="mt-3 flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700">
                <Navigation size={14} />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Placeholder */}
      {handsFreeModeActive && (
        <div className="rounded-xl border-2 border-dashed border-amber-400 bg-black/20 p-4">
          <div className="flex h-32 items-center justify-center rounded-lg border border-white/20 bg-black/40">
            <div className="text-center">
              <p className="text-xs text-white/70">Camera Feed</p>
              <p className="mt-1 text-xs text-white/50">Gesture Control Active</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-amber-600">
            Swipe left/right to navigate sessions
          </p>
        </div>
      )}
    </div>
  )
}
