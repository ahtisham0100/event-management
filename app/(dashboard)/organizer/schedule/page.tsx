'use client'

import { useState } from 'react'
import { Plus, AlertCircle, Clock, Users } from 'lucide-react'

interface Session {
  id: string
  title: string
  speaker: string
  room: string
  startTime: number
  duration: number
  capacity: number
  registered: number
  conflicts?: string[]
}

const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Keynote Address',
    speaker: 'John Smith',
    room: 'Main Hall',
    startTime: 9,
    duration: 1,
    capacity: 500,
    registered: 450,
  },
  {
    id: '2',
    title: 'AI Workshop',
    speaker: 'Sarah Johnson',
    room: 'Room A',
    startTime: 10,
    duration: 1.5,
    capacity: 50,
    registered: 52,
    conflicts: ['Room A over capacity'],
  },
  {
    id: '3',
    title: 'Networking Lunch',
    speaker: 'N/A',
    room: 'Foyer',
    startTime: 11.5,
    duration: 1.5,
    capacity: 500,
    registered: 400,
  },
  {
    id: '4',
    title: 'Tech Panel',
    speaker: 'Multiple',
    room: 'Room B',
    startTime: 13,
    duration: 1,
    capacity: 100,
    registered: 95,
  },
  {
    id: '5',
    title: 'Workshop (Duplicate Speaker)',
    speaker: 'Sarah Johnson',
    room: 'Room A',
    startTime: 14,
    duration: 1,
    capacity: 50,
    registered: 48,
    conflicts: ['Speaker double-booked'],
  },
]

const rooms = ['Main Hall', 'Room A', 'Room B', 'Room C', 'Foyer']
const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8) // 8 AM to 5 PM

export default function SmartSchedulerPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const getSessionColor = (session: Session) => {
    if (session.conflicts && session.conflicts.length > 0) {
      return 'bg-red-100 border-red-400'
    }
    if (session.registered > session.capacity) {
      return 'bg-orange-100 border-orange-400'
    }
    return 'bg-blue-100 border-blue-400'
  }

  const getSessionWidth = (duration: number) => {
    return `${(duration / 0.5) * 40}px`
  }

  const getSessionLeft = (startTime: number) => {
    const baseHour = 8
    const offset = (startTime - baseHour) * 40
    return `${offset}px`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Smart Scheduler</h1>
          <p className="mt-1 text-slate-600">
            Timeline view with conflict detection
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          <Plus size={20} />
          Add Session
        </button>
      </div>

      {/* Timeline View */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div className="min-w-full p-6">
          {/* Time Header */}
          <div className="mb-4 flex items-center">
            <div className="w-32 flex-shrink-0"></div>
            <div className="flex gap-1">
              {timeSlots.map((hour) => (
                <div
                  key={hour}
                  className="flex-shrink-0 text-center text-xs font-medium text-slate-600"
                  style={{ width: '80px' }}
                >
                  {hour}:00
                </div>
              ))}
            </div>
          </div>

          {/* Room Rows */}
          {rooms.map((room) => (
            <div key={room} className="mb-4 flex items-start border-t border-slate-200 pt-4">
              <div className="w-32 flex-shrink-0 pr-4">
                <p className="font-medium text-slate-900">{room}</p>
              </div>
              <div className="relative flex-1" style={{ height: '80px' }}>
                {/* Background grid */}
                <div className="absolute inset-0 flex">
                  {timeSlots.map((hour) => (
                    <div
                      key={hour}
                      className="border-r border-slate-200 flex-shrink-0"
                      style={{ width: '80px' }}
                    ></div>
                  ))}
                </div>

                {/* Sessions */}
                {sessions
                  .filter((s) => s.room === room)
                  .map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSession(session.id)}
                      className={`absolute top-0 rounded-lg border-2 p-2 text-left text-xs font-semibold text-slate-900 hover:shadow-lg transition-shadow ${getSessionColor(
                        session
                      )}`}
                      style={{
                        left: getSessionLeft(session.startTime),
                        width: `${(session.duration / 0.5) * 40}px`,
                        height: '100%',
                        minWidth: '60px',
                      }}
                    >
                      <div className="truncate">{session.title}</div>
                      <div className="text-xs opacity-75">{session.speaker}</div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Legend */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="mb-4 font-bold text-slate-900">Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded border-2 border-blue-400 bg-blue-100"></div>
              <span className="text-sm text-slate-700">Normal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded border-2 border-orange-400 bg-orange-100"></div>
              <span className="text-sm text-slate-700">Over Capacity</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded border-2 border-red-400 bg-red-100"></div>
              <span className="text-sm text-slate-700">Conflict</span>
            </div>
          </div>
        </div>

        {/* Conflicts */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="mb-4 font-bold text-slate-900">Conflicts</h3>
          <div className="space-y-3">
            {sessions
              .filter((s) => s.conflicts && s.conflicts.length > 0)
              .map((session) => (
                <div
                  key={session.id}
                  className="flex gap-2 rounded-lg border-l-4 border-red-400 bg-red-50 p-3"
                >
                  <AlertCircle size={16} className="flex-shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">
                      {session.title}
                    </p>
                    <p className="text-xs text-red-700">
                      {session.conflicts?.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Session Details */}
        {selectedSession && (
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="mb-4 font-bold text-slate-900">Session Details</h3>
            {(() => {
              const session = sessions.find((s) => s.id === selectedSession)
              if (!session) return null
              return (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">TITLE</p>
                    <p className="text-sm text-slate-900">{session.title}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600">SPEAKER</p>
                    <p className="text-sm text-slate-900">{session.speaker}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600">ROOM</p>
                    <p className="text-sm text-slate-900">{session.room}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock size={16} />
                    {session.startTime}:00 - {session.startTime + session.duration}:00
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users size={16} />
                    {session.registered} / {session.capacity} registered
                  </div>
                  {session.registered > session.capacity && (
                    <div className="rounded-lg bg-orange-50 p-2 text-xs text-orange-700">
                      Over capacity by {session.registered - session.capacity}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
