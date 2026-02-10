'use client'

import { useState } from 'react'
import { Plus, Upload, Copy, Trash2 } from 'lucide-react'
import TemplateCard from '../components/TemplateCard'

interface Template {
  id: string
  name: string
  category: 'floor-plan' | 'badge'
  description: string
  usageCount: number
  preview: string
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Standard Theater Layout',
    category: 'floor-plan',
    description: 'Classic theater seating with center and side sections',
    usageCount: 145,
    preview: '🎭',
  },
  {
    id: '2',
    name: 'Banquet Hall Setup',
    category: 'floor-plan',
    description: 'Round tables arrangement for dining events',
    usageCount: 89,
    preview: '🍽️',
  },
  {
    id: '3',
    name: 'Conference Grid',
    category: 'floor-plan',
    description: 'Classroom style seating for presentations',
    usageCount: 203,
    preview: '🎯',
  },
  {
    id: '4',
    name: 'VIP Lounge',
    category: 'floor-plan',
    description: 'Premium seating with exclusive areas',
    usageCount: 67,
    preview: '💎',
  },
  {
    id: '5',
    name: 'Gold Badge',
    category: 'badge',
    description: 'Premium attendee badge with gold accents',
    usageCount: 234,
    preview: '⭐',
  },
  {
    id: '6',
    name: 'Silver Badge',
    category: 'badge',
    description: 'Standard attendee badge design',
    usageCount: 156,
    preview: '🎖️',
  },
  {
    id: '7',
    name: 'VIP Badge',
    category: 'badge',
    description: 'VIP pass with special privileges indicator',
    usageCount: 128,
    preview: '🔑',
  },
  {
    id: '8',
    name: 'Staff Badge',
    category: 'badge',
    description: 'Staff and crew identification badge',
    usageCount: 92,
    preview: '👤',
  },
]

const floorPlans = templates.filter((t) => t.category === 'floor-plan')
const badges = templates.filter((t) => t.category === 'badge')

export default function TemplatesPage() {
  const [uploadHover, setUploadHover] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Resource Control</h1>
          <p className="mt-1 text-zinc-600">
            Manage global master assets available to all tenants
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
          <Upload size={20} />
          Upload Master Asset
        </button>
      </div>

      {/* Upload Area */}
      <div
        onMouseEnter={() => setUploadHover(true)}
        onMouseLeave={() => setUploadHover(false)}
        className={`rounded-lg border-2 border-dashed transition-colors ${
          uploadHover ? 'border-indigo-600 bg-indigo-50' : 'border-zinc-300 bg-zinc-50'
        } p-8 text-center`}
      >
        <Upload size={40} className="mx-auto mb-3 text-indigo-600" />
        <h3 className="text-lg font-semibold text-zinc-900">
          Upload Badge or Floor Plan Template
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          SVG, PNG, or JPG files. Max size: 5MB
        </p>
        <input
          type="file"
          accept=".svg,.png,.jpg,.jpeg"
          className="mt-4"
          onChange={(e) => console.log('[v0] File selected:', e.target.files?.[0]?.name)}
        />
      </div>

      {/* Floor Plans Section */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-zinc-900">Floor Plan SVGs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {floorPlans.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-zinc-900">Badge Templates</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Template Stats */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">Master Asset Statistics</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm text-zinc-600">Global Templates</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{templates.length}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm text-zinc-600">Floor Plans</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {floorPlans.length}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm text-zinc-600">Total Tenant Usage</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {templates.reduce((acc, t) => acc + t.usageCount, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
