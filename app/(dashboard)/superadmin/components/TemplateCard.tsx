import { Copy, Trash2 } from 'lucide-react'

interface Template {
  id: string
  name: string
  category: 'floor-plan' | 'badge'
  description: string
  usageCount: number
  preview: string
}

interface TemplateCardProps {
  template: Template
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="group rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-lg">
      {/* Preview */}
      <div className="flex h-32 items-center justify-center rounded-lg bg-indigo-50">
        <span className="text-5xl">{template.preview}</span>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-semibold text-zinc-900">{template.name}</h3>
        <p className="mt-1 text-sm text-zinc-600">{template.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            Used {template.usageCount}x
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
          <Copy size={16} />
          <span className="hidden sm:inline">Duplicate</span>
        </button>
        <button className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
