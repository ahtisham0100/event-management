'use client'

import React from "react"

import { useState } from 'react'
import {
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  DollarSign,
  Calendar,
} from 'lucide-react'

interface TicketTier {
  id: string
  name: string
  price: number
  quantity: number
  startDate: string
  endDate: string
}

interface FormField {
  id: string
  label: string
  type: 'text' | 'select' | 'checkbox'
  required: boolean
  options?: string[]
}

export default function RegistrationPage() {
  const [tiers, setTiers] = useState<TicketTier[]>([
    {
      id: '1',
      name: 'Early Bird',
      price: 49,
      quantity: 100,
      startDate: '2024-01-01',
      endDate: '2024-03-01',
    },
    {
      id: '2',
      name: 'General Admission',
      price: 79,
      quantity: 300,
      startDate: '2024-03-02',
      endDate: '2024-05-15',
    },
  ])

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: '1',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      id: '2',
      label: 'Email',
      type: 'text',
      required: true,
    },
    {
      id: '3',
      label: 'Dietary Preferences',
      type: 'select',
      required: false,
      options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'None'],
    },
    {
      id: '4',
      label: 'T-Shirt Size',
      type: 'select',
      required: false,
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
  ])

  const [editingTier, setEditingTier] = useState<string | null>(null)
  const [tierFormData, setTierFormData] = useState<Partial<TicketTier>>({})
  const [addingField, setAddingField] = useState(false)
  const [newFieldData, setNewFieldData] = useState({
    label: '',
    type: 'text' as const,
  })

  const handleAddTier = () => {
    const newTier: TicketTier = {
      id: String(Date.now()),
      name: 'New Tier',
      price: 0,
      quantity: 0,
      startDate: '',
      endDate: '',
    }
    setTiers([...tiers, newTier])
  }

  const handleDeleteTier = (id: string) => {
    setTiers(tiers.filter((t) => t.id !== id))
  }

  const handleDeleteField = (id: string) => {
    setFormFields(formFields.filter((f) => f.id !== id))
  }

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault()
    const newField: FormField = {
      id: String(Date.now()),
      label: newFieldData.label,
      type: newFieldData.type,
      required: false,
      options: newFieldData.type === 'select' ? [] : undefined,
    }
    setFormFields([...formFields, newField])
    setNewFieldData({ label: '', type: 'text' })
    setAddingField(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Registration & Tiers
        </h1>
        <p className="mt-1 text-slate-600">
          Configure ticket tiers and registration form fields
        </p>
      </div>

      {/* Ticket Tiers Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Ticket Tiers</h2>
          <button
            onClick={handleAddTier}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Tier
          </button>
        </div>

        <div className="space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="flex items-start justify-between rounded-lg border border-slate-200 p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <GripVertical size={16} className="text-slate-400" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{tier.name}</h3>
                    <div className="mt-2 grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <DollarSign size={16} />
                        ${tier.price}
                      </div>
                      <div className="text-sm text-slate-600">
                        {tier.quantity} tickets available
                      </div>
                      <div className="text-xs text-slate-500">
                        {tier.startDate} to {tier.endDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg p-2 hover:bg-slate-100">
                  <Edit2 size={18} className="text-slate-600" />
                </button>
                <button
                  onClick={() => handleDeleteTier(tier.id)}
                  className="rounded-lg p-2 hover:bg-red-50"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Form Builder */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Form Fields</h2>
          {!addingField && (
            <button
              onClick={() => setAddingField(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              Add Field
            </button>
          )}
        </div>

        <div className="space-y-3">
          {formFields.map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <GripVertical size={16} className="text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900">{field.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {field.type}
                      </span>
                      {field.required && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteField(field.id)}
                className="rounded-lg p-2 hover:bg-red-50"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Field Form */}
        {addingField && (
          <form
            onSubmit={handleAddField}
            className="mt-4 rounded-lg border-2 border-dashed border-slate-300 p-4"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Field Label
                </label>
                <input
                  type="text"
                  value={newFieldData.label}
                  onChange={(e) =>
                    setNewFieldData({ ...newFieldData, label: e.target.value })
                  }
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="e.g., Dietary Preferences"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Field Type
                </label>
                <select
                  value={newFieldData.type}
                  onChange={(e) =>
                    setNewFieldData({
                      ...newFieldData,
                      type: e.target.value as 'text' | 'select' | 'checkbox',
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="text">Text</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Field
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingField(false)
                  setNewFieldData({ label: '', type: 'text' })
                }}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Form Preview</h2>
        <div className="max-w-md space-y-4">
          {formFields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-slate-900">
                {field.label}
                {field.required && <span className="text-red-600">*</span>}
              </label>
              {field.type === 'text' && (
                <input
                  type="text"
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-slate-50"
                  placeholder="Disabled for preview"
                />
              )}
              {field.type === 'select' && (
                <select
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-slate-50"
                >
                  <option>Choose an option</option>
                </select>
              )}
              {field.type === 'checkbox' && (
                <input
                  type="checkbox"
                  disabled
                  className="mt-1"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
