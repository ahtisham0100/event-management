'use client'

import React, { useState } from 'react'
import { AlertTriangle, Users, BarChart3 } from 'lucide-react'

interface Room {
  id: string
  name: string
  capacity: number
  currentAttendees: number
  session: string
  waitlistCount: number
}

export default function RoomMonitorPage() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'ROOM-A',
      name: 'Main Hall A',
      capacity: 500,
      currentAttendees: 475,
      session: 'Keynote: Future of AI',
      waitlistCount: 12,
    },
    {
      id: 'ROOM-B',
      name: 'Breakout Room B1',
      capacity: 100,
      currentAttendees: 95,
      session: 'Web3 Workshop',
      waitlistCount: 8,
    },
    {
      id: 'ROOM-C',
      name: 'Breakout Room B2',
      capacity: 80,
      currentAttendees: 62,
      session: 'Design Systems Talk',
      waitlistCount: 0,
    },
    {
      id: 'ROOM-D',
      name: 'Networking Lounge',
      capacity: 200,
      currentAttendees: 145,
      session: 'Open networking',
      waitlistCount: 0,
    },
  ])

  const getFullnessPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100)
  }

  const getFullnessColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-red-600'
    if (percentage >= 80) return 'bg-amber-600'
    return 'bg-emerald-600'
  }

  const isAtCapacity = (room: Room) => getFullnessPercentage(room.currentAttendees, room.capacity) >= 95

  const atCapacityRooms = rooms.filter(isAtCapacity)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Room Monitor</h1>
        <p className="mt-1 text-zinc-600">Real-time venue capacity management</p>
      </div>

      {/* Capacity Alerts */}
      {atCapacityRooms.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="flex-shrink-0 text-red-600" size={20} />
            <div>
              <p className="font-medium text-red-900">High Capacity Alert</p>
              <p className="mt-1 text-sm text-red-700">
                {atCapacityRooms.length} room(s) at 95% capacity: {atCapacityRooms.map((r) => r.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Room Grid */}
      <div className="grid gap-4">
        {rooms.map((room) => {
          const fullness = getFullnessPercentage(room.currentAttendees, room.capacity)
          const isFull = fullness >= 95

          return (
            <div
              key={room.id}
              className={`rounded-lg border-2 p-4 transition-colors ${
                isFull
                  ? 'border-red-300 bg-red-50'
                  : 'border-zinc-200 bg-white'
              }`}
            >
              {/* Room Header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900">{room.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{room.session}</p>
                </div>
                {isFull && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    <AlertTriangle size={14} />
                    Full
                  </span>
                )}
              </div>

              {/* Capacity Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Occupancy</span>
                  <span className="font-medium text-zinc-900">
                    {room.currentAttendees} / {room.capacity} ({fullness}%)
                  </span>
                </div>
                <div className="h-3 rounded-full bg-zinc-100">
                  <div
                    className={`h-full rounded-full transition-all ${getFullnessColor(fullness)}`}
                    style={{ width: `${fullness}%` }}
                  ></div>
                </div>
              </div>

              {/* Waitlist */}
              {room.waitlistCount > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                  <Users size={16} className="text-amber-600" />
                  <p className="text-sm text-amber-700">
                    {room.waitlistCount} attendees waiting
                  </p>
                  <button className="ml-auto rounded px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100">
                    Manage
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Capacity Summary */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 size={20} className="text-zinc-600" />
          <h3 className="font-semibold text-zinc-900">Venue Summary</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-zinc-600">Total Capacity</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">
              {rooms.reduce((sum, r) => sum + r.capacity, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-600">Total Occupancy</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">
              {rooms.reduce((sum, r) => sum + r.currentAttendees, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-600">Total Waitlist</p>
            <p className="mt-1 text-xl font-bold text-amber-600">
              {rooms.reduce((sum, r) => sum + r.waitlistCount, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
