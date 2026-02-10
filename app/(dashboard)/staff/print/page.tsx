'use client'

import React, { useState } from 'react'
import { Search, Printer, Download } from 'lucide-react'

interface Attendee {
  id: string
  name: string
  company: string
  ticketTier: string
  qrCode: string
}

export default function PrinterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)

  const allAttendees: Attendee[] = [
    {
      id: 'ATT001',
      name: 'Sarah Johnson',
      company: 'TechCorp',
      ticketTier: 'VIP',
      qrCode: 'ATT001_QR',
    },
    {
      id: 'ATT002',
      name: 'Marcus Chen',
      company: 'Innovation Labs',
      ticketTier: 'General',
      qrCode: 'ATT002_QR',
    },
    {
      id: 'ATT003',
      name: 'Emma Davis',
      company: 'Cloud Systems',
      ticketTier: 'General',
      qrCode: 'ATT003_QR',
    },
    {
      id: 'ATT004',
      name: 'Alex Rodriguez',
      company: 'Digital First',
      ticketTier: 'Speaker',
      qrCode: 'ATT004_QR',
    },
    {
      id: 'ATT005',
      name: 'Jamie Lee',
      company: 'Future Tech',
      ticketTier: 'General',
      qrCode: 'ATT005_QR',
    },
  ]

  const filteredAttendees = allAttendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800'
      case 'Speaker':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-zinc-100 text-zinc-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Badge Printer</h1>
        <p className="mt-1 text-zinc-600">Print attendee badges with QR codes</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          placeholder="Search attendees by name or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-white py-3 pl-10 pr-4 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {/* Results Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Attendee List */}
        <div className="space-y-2">
          <h2 className="font-semibold text-zinc-900">Attendees</h2>
          <div className="space-y-2 rounded-lg border border-zinc-200 bg-white p-3">
            {filteredAttendees.length > 0 ? (
              filteredAttendees.map((attendee) => (
                <button
                  key={attendee.id}
                  onClick={() => setSelectedAttendee(attendee)}
                  className={`w-full rounded-lg px-4 py-3 text-left transition-colors ${
                    selectedAttendee?.id === attendee.id
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <p className="font-medium text-zinc-900">{attendee.name}</p>
                  <p className="text-sm text-zinc-600">{attendee.company}</p>
                  <div className="mt-2">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${getTierColor(attendee.ticketTier)}`}
                    >
                      {attendee.ticketTier}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <p className="py-8 text-center text-zinc-500">No attendees found</p>
            )}
          </div>
        </div>

        {/* Badge Preview */}
        <div>
          <h2 className="font-semibold text-zinc-900">Badge Preview</h2>
          {selectedAttendee ? (
            <div className="space-y-3">
              {/* Badge Card Preview */}
              <div className="rounded-lg border-2 border-zinc-300 bg-white p-6 shadow-sm">
                {/* Badge Header */}
                <div className="mb-4 text-center">
                  <p className="text-xs font-medium uppercase text-zinc-600">
                    Event Badge
                  </p>
                </div>

                {/* Attendee Info */}
                <div className="mb-4 text-center">
                  <p className="text-xl font-bold text-zinc-900">
                    {selectedAttendee.name}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {selectedAttendee.company}
                  </p>
                  <div className="mt-3">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${getTierColor(selectedAttendee.ticketTier)}`}
                    >
                      {selectedAttendee.ticketTier}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-zinc-100">
                  <div className="text-center">
                    <p className="text-xs text-zinc-600">QR Code</p>
                    <p className="mt-1 text-xs font-mono text-zinc-500">
                      {selectedAttendee.qrCode}
                    </p>
                  </div>
                </div>

                {/* Badge ID */}
                <div className="border-t border-zinc-200 pt-3 text-center">
                  <p className="text-xs font-mono text-zinc-600">
                    ID: {selectedAttendee.id}
                  </p>
                </div>
              </div>

              {/* Print Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700">
                  <Printer size={18} />
                  Print Badge
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-700 hover:bg-zinc-50">
                  <Download size={18} />
                  Export PDF
                </button>
              </div>

              {/* Printer Status */}
              <div className="rounded-lg bg-emerald-50 p-3">
                <p className="text-sm text-emerald-700">
                  Connected to thermal printer in main lobby
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50">
              <p className="text-center text-zinc-500">
                Select an attendee to preview badge
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
