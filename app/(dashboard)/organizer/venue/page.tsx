'use client'

import { useState } from 'react'
import {
  Square,
  Circle,
  Home,
  Crown,
  Trash2,
  Copy,
  Save,
} from 'lucide-react'

interface VenueElement {
  id: string
  type: 'booth-small' | 'booth-large' | 'room' | 'rest' | 'vip'
  x: number
  y: number
  width: number
  height: number
  label: string
}

export default function VenueDesignerPage() {
  const [elements, setElements] = useState<VenueElement[]>([
    {
      id: '1',
      type: 'booth-small',
      x: 50,
      y: 50,
      width: 60,
      height: 60,
      label: 'Booth 1',
    },
    {
      id: '2',
      type: 'room',
      x: 200,
      y: 50,
      width: 150,
      height: 100,
      label: 'Room A',
    },
  ])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draggingTool, setDraggingTool] = useState<string | null>(null)

  const getElementColor = (type: string) => {
    switch (type) {
      case 'booth-small':
      case 'booth-large':
        return '#3b82f6'
      case 'room':
        return '#8b5cf6'
      case 'rest':
        return '#10b981'
      case 'vip':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }

  const getElementLabel = (type: string) => {
    switch (type) {
      case 'booth-small':
        return 'Booth (Small)'
      case 'booth-large':
        return 'Booth (Large)'
      case 'room':
        return 'Session Room'
      case 'rest':
        return 'Rest Area'
      case 'vip':
        return 'VIP Zone'
      default:
        return 'Element'
    }
  }

  const handleAddElement = (type: string) => {
    const newElement: VenueElement = {
      id: String(Date.now()),
      type: type as VenueElement['type'],
      x: 100,
      y: 100,
      width: type === 'booth-large' ? 100 : type === 'room' ? 150 : 60,
      height: type === 'booth-large' ? 100 : type === 'room' ? 100 : 60,
      label: `${getElementLabel(type)} ${elements.length + 1}`,
    }
    setElements([...elements, newElement])
  }

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const selected = elements.find((el) => el.id === selectedId)

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Main Canvas */}
      <div className="lg:col-span-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Floor Plan Editor
          </h2>
          <div className="rounded-lg border-2 border-slate-200 bg-slate-50 overflow-auto"
            style={{ width: '100%', height: '500px', position: 'relative' }}>
            <svg
              width="100%"
              height="500"
              className="bg-white"
              style={{ minWidth: '600px' }}
            >
              {/* Grid */}
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
                    stroke="#e2e8f0"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="500" fill="url(#grid)" />

              {/* Elements */}
              {elements.map((element) => (
                <g key={element.id} onClick={() => setSelectedId(element.id)}>
                  <rect
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    fill={getElementColor(element.type)}
                    fillOpacity="0.8"
                    stroke={selectedId === element.id ? '#000' : getElementColor(element.type)}
                    strokeWidth={selectedId === element.id ? 3 : 1}
                    rx="4"
                    className="cursor-pointer hover:fill-opacity-100"
                  />
                  <text
                    x={element.x + element.width / 2}
                    y={element.y + element.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="white"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {element.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Tools */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 font-semibold text-slate-900">Tools</h3>
          <div className="space-y-2">
            {[
              { type: 'booth-small', icon: Square, label: 'Booth (S)' },
              { type: 'booth-large', icon: Square, label: 'Booth (L)' },
              { type: 'room', icon: Home, label: 'Room' },
              { type: 'rest', icon: Circle, label: 'Rest Area' },
              { type: 'vip', icon: Crown, label: 'VIP Zone' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => handleAddElement(type)}
                className="w-full flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties */}
        {selected && (
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-3 font-semibold text-slate-900">Properties</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Label
                </label>
                <input
                  type="text"
                  value={selected.label}
                  onChange={(e) => {
                    setElements(
                      elements.map((el) =>
                        el.id === selectedId
                          ? { ...el, label: e.target.value }
                          : el
                      )
                    )
                  }}
                  className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Type
                </label>
                <p className="mt-1 text-sm text-slate-700">
                  {getElementLabel(selected.type)}
                </p>
              </div>
              <div className="flex gap-2 border-t border-slate-200 pt-3">
                <button
                  onClick={() => handleDeleteElement(selectedId || '')}
                  className="flex-1 rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                </button>
                <button className="flex-1 rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700">
            <Save size={16} className="inline mr-2" />
            Save Floor Plan
          </button>
        </div>
      </div>
    </div>
  )
}
