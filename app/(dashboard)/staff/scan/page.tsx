'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface ScannedAttendee {
  id: string
  name: string
  email: string
  ticketTier: string
  checkedInAt: string
}

export default function ScannerPage() {
  const [scannedCode, setScannedCode] = useState('')
  const [recentScans, setRecentScans] = useState<ScannedAttendee[]>([
    {
      id: 'ATT001',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      ticketTier: 'VIP',
      checkedInAt: '09:15 AM',
    },
    {
      id: 'ATT002',
      name: 'Marcus Chen',
      email: 'marcus@example.com',
      ticketTier: 'General',
      checkedInAt: '09:08 AM',
    },
    {
      id: 'ATT003',
      name: 'Emma Davis',
      email: 'emma@example.com',
      ticketTier: 'General',
      checkedInAt: '08:52 AM',
    },
  ])
  const [duplicateScan, setDuplicateScan] = useState<ScannedAttendee | null>(null)

  const handleScan = () => {
    if (scannedCode.trim()) {
      const isDuplicate = recentScans.some(
        (scan) => scan.id === scannedCode.trim()
      )

      const newAttendee: ScannedAttendee = {
        id: scannedCode.trim(),
        name: `Attendee ${Math.random().toString(36).substring(7)}`,
        email: 'attendee@example.com',
        ticketTier: Math.random() > 0.7 ? 'VIP' : 'General',
        checkedInAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      if (isDuplicate) {
        setDuplicateScan(
          recentScans.find((scan) => scan.id === scannedCode.trim()) || null
        )
        setTimeout(() => setDuplicateScan(null), 3000)
      } else {
        setRecentScans([newAttendee, ...recentScans.slice(0, 4)])
      }

      setScannedCode('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Check-in Scanner</h1>
        <p className="mt-1 text-zinc-600">Fast on-site attendee check-in</p>
      </div>

      {/* Camera Viewfinder Placeholder */}
      <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-emerald-600 bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-lg border-2 border-emerald-500 p-8">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 animate-pulse rounded-lg border-2 border-emerald-500"></div>
                  <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-emerald-500"></div>
                  <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-emerald-500"></div>
                  <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-emerald-500"></div>
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-emerald-500"></div>
                </div>
              </div>
            </div>
            <p className="text-emerald-400">Ready to scan QR codes</p>
          </div>
        </div>
      </div>

      {/* Manual Input Fallback */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-700">
          Manual QR Code Input
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={scannedCode}
            onChange={(e) => setScannedCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            placeholder="Paste QR code here or type attendee ID..."
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            autoFocus
          />
          <button
            onClick={handleScan}
            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
          >
            Scan
          </button>
        </div>
      </div>

      {/* Duplicate Alert */}
      {duplicateScan && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <AlertCircle className="flex-shrink-0 text-amber-600" size={20} />
            <div>
              <p className="font-medium text-amber-900">Duplicate Scan</p>
              <p className="mt-1 text-sm text-amber-700">
                {duplicateScan.name} already checked in at {duplicateScan.checkedInAt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Check-in List */}
      <div className="space-y-3">
        <h2 className="font-semibold text-zinc-900">Recent Check-ins</h2>
        <div className="space-y-2">
          {recentScans.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-emerald-600" />
                <div>
                  <p className="font-medium text-zinc-900">{attendee.name}</p>
                  <p className="text-sm text-zinc-600">{attendee.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  {attendee.ticketTier}
                </span>
                <p className="mt-1 text-xs text-zinc-500">{attendee.checkedInAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
