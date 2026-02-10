'use client'

import React, { useState } from 'react'
import { QrCode, Trash2 } from 'lucide-react'

interface Connection {
  id: string
  name: string
  role: string
  company: string
  scannedAt: string
  qrCode: string
}

export default function ConnectPage() {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: 'C1',
      name: 'Sarah Chen',
      role: 'Head of Product',
      company: 'TechCorp',
      scannedAt: '2 min ago',
      qrCode: 'CARD_C1',
    },
    {
      id: 'C2',
      name: 'Marcus Johnson',
      role: 'CTO',
      company: 'Innovation Labs',
      scannedAt: '15 min ago',
      qrCode: 'CARD_C2',
    },
    {
      id: 'C3',
      name: 'Emma Davis',
      role: 'Designer',
      company: 'Cloud Systems',
      scannedAt: '32 min ago',
      qrCode: 'CARD_C3',
    },
  ])

  const [showMyCard, setShowMyCard] = useState(false)

  const removeConnection = (id: string) => {
    setConnections(connections.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Networking Hub</h1>
        <p className="mt-1 text-zinc-600">Connect with other attendees</p>
      </div>

      {/* My Business Card */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-zinc-700">Your Digital Card</p>
        <div className="rounded-xl border border-white/30 bg-gradient-to-br from-indigo-500 to-blue-500 p-6 text-white shadow-lg backdrop-blur-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Your Profile</p>
              <p className="mt-1 text-xl font-bold">Jordan Lee</p>
              <p className="mt-1 text-sm opacity-90">Product Manager</p>
              <p className="text-sm opacity-90">Creative Digital</p>
            </div>
            <div className="rounded-lg bg-white/20 p-2">
              <QrCode size={24} className="text-white" />
            </div>
          </div>

          {/* Share QR */}
          <button
            onClick={() => setShowMyCard(!showMyCard)}
            className="w-full rounded-lg bg-white/20 py-2 text-sm font-medium text-white transition-all hover:bg-white/30 backdrop-blur-sm"
          >
            {showMyCard ? 'Hide QR Code' : 'Show QR Code'}
          </button>

          {/* QR Code */}
          {showMyCard && (
            <div className="mt-4 flex justify-center">
              <div className="rounded-lg bg-white/20 p-4 backdrop-blur-sm">
                <div className="h-24 w-24 rounded-lg bg-white/10 flex items-center justify-center">
                  <p className="text-xs font-mono text-white/70">QR</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan Peer Button */}
      <button className="w-full rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 font-medium text-indigo-700 transition-all hover:bg-indigo-100">
        <QrCode size={18} className="mb-0.5 inline-block mr-2" />
        Scan Peer Business Card
      </button>

      {/* Card Wallet */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900">Card Wallet</h2>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {connections.length} cards
          </span>
        </div>

        <div className="grid gap-3">
          {connections.length > 0 ? (
            connections.map((connection) => (
              <div
                key={connection.id}
                className="group rounded-xl border border-white/30 bg-white/40 p-4 backdrop-blur-md transition-all hover:bg-white/60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Name */}
                    <h3 className="font-bold text-zinc-900">{connection.name}</h3>

                    {/* Role & Company */}
                    <p className="mt-0.5 text-sm text-zinc-600">{connection.role}</p>
                    <p className="text-sm text-zinc-600">{connection.company}</p>

                    {/* Scanned At */}
                    <p className="mt-2 text-xs text-zinc-500">
                      Scanned {connection.scannedAt}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeConnection(connection.id)}
                    className="rounded-lg p-2 transition-colors hover:bg-red-100"
                  >
                    <Trash2 size={16} className="text-zinc-400 hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-8 text-center">
              <p className="text-sm text-zinc-600">
                Start scanning business cards to build your wallet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="rounded-lg border border-white/30 bg-white/30 p-4 backdrop-blur-sm">
        <p className="text-sm font-semibold text-zinc-900 mb-3">Export Connections</p>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-white/60 px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-white/80">
            Export CSV
          </button>
          <button className="flex-1 rounded-lg bg-white/60 px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-white/80">
            Share Contacts
          </button>
        </div>
      </div>
    </div>
  )
}
