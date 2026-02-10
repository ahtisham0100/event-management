'use client'

import React, { useState } from 'react'
import { Star, Clock, MapPin, Play } from 'lucide-react'

interface Session {
  id: string
  title: string
  speaker: string
  room: string
  startTime: string
  endTime: string
  isFavorited: boolean
  isLive: boolean
}

export default function AttendeedDashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 'S1',
      title: 'Keynote: Future of AI',
      speaker: 'Dr. Sarah Chen',
      room: 'Main Hall',
      startTime: '09:00 AM',
      endTime: '09:45 AM',
      isFavorited: true,
      isLive: true,
    },
    {
      id: 'S2',
      title: 'Web3 Workshop',
      speaker: 'Alex Rodriguez',
      room: 'Room B1',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      isFavorited: true,
      isLive: false,
    },
    {
      id: 'S3',
      title: 'Design Systems Talk',
      speaker: 'Emma Davis',
      room: 'Room B2',
      startTime: '11:15 AM',
      endTime: '12:00 PM',
      isFavorited: false,
      isLive: false,
    },
  ])

  const toggleFavorite = (id: string) => {
    setSessions(
      sessions.map((s) =>
        s.id === id ? { ...s, isFavorited: !s.isFavorited } : s
      )
    )
  }

  const favoritedSessions = sessions.filter((s) => s.isFavorited)

  return (
    <div className="space-y-6">
      {/* QR Entry Ticket Card */}
      <div className="rounded-2xl border border-white/30 bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-xl backdrop-blur-xl">
        <div className="space-y-4">
          {/* Ticket Header */}
          <div>
            <p className="text-sm font-medium opacity-90">Your Event Pass</p>
            <p className="mt-1 text-2xl font-bold">Tech Summit 2024</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="rounded-lg bg-white/20 p-6 backdrop-blur-sm">
              <div className="h-40 w-40 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs opacity-75">QR Code</p>
                  <p className="mt-2 text-sm font-mono">ATT_12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
            <div>
              <p className="text-xs opacity-75">Name</p>
              <p className="text-sm font-semibold">Jordan Lee</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Tier</p>
              <p className="text-sm font-semibold">General</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Entry</p>
              <p className="text-sm font-semibold">Valid</p>
            </div>
          </div>

          {/* Scan Instructions */}
          <p className="text-xs opacity-75">
            Show this code at the entrance for check-in
          </p>
        </div>
      </div>

      {/* Timeline View */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">My Schedule</h2>
        {favoritedSessions.length > 0 ? (
          favoritedSessions.map((session) => (
            <div
              key={session.id}
              className="group rounded-xl border border-white/30 bg-white/40 p-4 backdrop-blur-md transition-all hover:bg-white/50 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  {/* Live Indicator */}
                  {session.isLive && (
                    <div className="mb-2 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-xs font-semibold text-red-600">
                        LIVE NOW
                      </span>
                    </div>
                  )}

                  {/* Session Title */}
                  <h3 className="text-lg font-bold text-zinc-900">
                    {session.title}
                  </h3>

                  {/* Speaker */}
                  <p className="mt-1 text-sm text-zinc-600">{session.speaker}</p>

                  {/* Details */}
                  <div className="mt-3 flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                      <Clock size={16} />
                      {session.startTime} - {session.endTime}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                      <MapPin size={16} />
                      {session.room}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {session.isLive && (
                    <button className="flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">
                      <Play size={14} />
                      Join
                    </button>
                  )}
                  <button
                    onClick={() => toggleFavorite(session.id)}
                    className={`rounded-lg p-2 transition-colors ${
                      session.isFavorited
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    <Star
                      size={16}
                      fill={session.isFavorited ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-8 text-center">
            <p className="text-sm text-zinc-600">
              Add sessions to your schedule to see them here
            </p>
          </div>
        )}
      </div>

      {/* All Sessions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900">All Sessions</h2>
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-lg border border-white/30 bg-white/30 p-3 backdrop-blur-sm"
            >
              <div>
                <p className="font-medium text-zinc-900">{session.title}</p>
                <p className="text-xs text-zinc-600">
                  {session.startTime} • {session.room}
                </p>
              </div>
              <button
                onClick={() => toggleFavorite(session.id)}
                className="rounded-lg p-1.5 transition-colors"
              >
                <Star
                  size={18}
                  className={
                    session.isFavorited
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-zinc-400'
                  }
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
