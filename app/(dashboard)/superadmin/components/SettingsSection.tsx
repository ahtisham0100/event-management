import React from "react"
import { Type as type, type LucideIcon } from 'lucide-react'

interface SettingsSectionProps {
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}

export default function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
          <Icon size={24} className="text-indigo-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
          <p className="mt-1 text-zinc-600">{description}</p>
        </div>
      </div>
      <div className="border-t border-zinc-200 pt-6">{children}</div>
    </div>
  )
}
