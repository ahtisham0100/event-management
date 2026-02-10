'use client'

import { useState } from 'react'
import { Save, AlertCircle } from 'lucide-react'

interface LimitConfig {
  maxEventsPerTenant: number
  maxAttendeesPerEvent: number
  platformFeePercent: number
}

export default function LimitsPage() {
  const [config, setConfig] = useState<LimitConfig>({
    maxEventsPerTenant: 100,
    maxAttendeesPerEvent: 50000,
    platformFeePercent: 15,
  })

  const [saved, setSaved] = useState(false)

  const handleInputChange = (field: keyof LimitConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    console.log('[v0] Saving limits config:', config)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          Limits & Policy Configuration
        </h1>
        <p className="mt-1 text-zinc-600">
          Define global constraints and default settings for all tenants
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <AlertCircle size={20} />
          <span>Configuration saved successfully</span>
        </div>
      )}

      {/* Configuration Sections */}
      <div className="space-y-6">
        {/* Max Events Per Tenant */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700">
                Max Events Per Tenant
              </label>
              <p className="mt-1 text-sm text-zinc-600">
                Maximum number of events each tenant organization can create
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="500"
                value={config.maxEventsPerTenant}
                onChange={(e) =>
                  handleInputChange('maxEventsPerTenant', Number(e.target.value))
                }
                className="flex-1"
              />
              <input
                type="number"
                value={config.maxEventsPerTenant}
                onChange={(e) =>
                  handleInputChange('maxEventsPerTenant', Number(e.target.value))
                }
                className="w-20 rounded-lg border border-zinc-200 px-3 py-2 text-right text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* Max Attendees Per Event */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700">
                Max Attendees Per Event
              </label>
              <p className="mt-1 text-sm text-zinc-600">
                Maximum number of attendees allowed per event across all tenants
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="100"
                max="100000"
                step="1000"
                value={config.maxAttendeesPerEvent}
                onChange={(e) =>
                  handleInputChange('maxAttendeesPerEvent', Number(e.target.value))
                }
                className="flex-1"
              />
              <input
                type="number"
                value={config.maxAttendeesPerEvent}
                onChange={(e) =>
                  handleInputChange(
                    'maxAttendeesPerEvent',
                    Number(e.target.value)
                  )
                }
                className="w-24 rounded-lg border border-zinc-200 px-3 py-2 text-right text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* Platform Fee */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700">
                Platform Fee (%)
              </label>
              <p className="mt-1 text-sm text-zinc-600">
                Percentage commission taken on all tenant transactions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={config.platformFeePercent}
                onChange={(e) =>
                  handleInputChange('platformFeePercent', Number(e.target.value))
                }
                className="flex-1"
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={config.platformFeePercent}
                  onChange={(e) =>
                    handleInputChange(
                      'platformFeePercent',
                      Number(e.target.value)
                    )
                  }
                  step="0.1"
                  className="w-16 rounded-lg border border-zinc-200 px-3 py-2 text-right text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
                <span className="text-zinc-600">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <p className="text-sm font-medium text-indigo-900">
          These settings apply globally to all tenants. Individual tenant overrides can be configured in the tenant settings.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          <Save size={20} />
          Save Configuration
        </button>
      </div>
    </div>
  )
}
