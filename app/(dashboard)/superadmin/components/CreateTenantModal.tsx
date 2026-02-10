'use client'

import React from "react"

import { useState } from 'react'
import { X } from 'lucide-react'

interface CreateTenantModalProps {
  onClose: () => void
}

export default function CreateTenantModal({ onClose }: CreateTenantModalProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    adminEmail: '',
    customDomain: '',
    planTier: 'starter',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Tenant creation submitted:', formData)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex max-w-md flex-col overflow-y-auto bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Create New Tenant</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Add a new organization to the platform
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-zinc-100"
            aria-label="Close panel"
          >
            <X size={24} className="text-zinc-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col p-6">
          <div className="space-y-6">
            {/* Organization Name */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700">
                Organization Name
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="e.g., TechConf 2024"
              />
            </div>

            {/* Admin Email */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700">
                Admin Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="admin@example.com"
              />
            </div>

            {/* Custom Domain */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700">
                Custom Domain Settings
              </label>
              <input
                type="text"
                name="customDomain"
                value={formData.customDomain}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="events.yourdomain.com"
              />
              <p className="mt-1 text-xs text-zinc-500">
                Optional: Configure a custom domain for this tenant
              </p>
            </div>

            {/* Plan Tier */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700">
                Plan Tier
              </label>
              <select
                name="planTier"
                value={formData.planTier}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="trial">Trial (14 days free)</option>
                <option value="starter">Starter - $99/month</option>
                <option value="professional">Professional - $299/month</option>
                <option value="enterprise">Enterprise - Custom</option>
              </select>
            </div>
          </div>

          {/* Footer with Buttons */}
          <div className="mt-auto flex gap-3 border-t border-zinc-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700"
            >
              Create Tenant
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
