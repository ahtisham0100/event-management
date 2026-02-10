import { Type as type, LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
}

export default function StatCard({
  label,
  value,
  change,
  positive,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-600">{label}</p>
          <p className="mt-2 text-2xl font-bold text-zinc-900">{value}</p>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                positive ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            {positive ? (
              <TrendingUp size={16} className="text-emerald-600" />
            ) : (
              <TrendingDown size={16} className="text-red-600" />
            )}
          </div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3">
          <Icon size={24} className="text-indigo-600" />
        </div>
      </div>
    </div>
  )
}
