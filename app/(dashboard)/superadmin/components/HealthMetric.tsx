import { CheckCircle } from 'lucide-react'

interface Metric {
  name: string
  status: 'healthy' | 'warning' | 'error'
  uptime: string
  responseTime: string
  [key: string]: string
}

interface HealthMetricProps {
  metric: Metric
}

export default function HealthMetric({ metric }: HealthMetricProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-100 text-emerald-700'
      case 'warning':
        return 'bg-amber-100 text-amber-700'
      case 'error':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-zinc-100 text-zinc-700'
    }
  }

  const { name, status, uptime, responseTime, ...otherMetrics } = metric

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-zinc-900">{name}</h3>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                status
              )}`}
            >
              <CheckCircle size={16} />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-xs font-medium text-zinc-600 uppercase">
                Uptime
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900">{uptime}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-600 uppercase">
                Response Time
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                {responseTime}
              </p>
            </div>
            {Object.entries(otherMetrics).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs font-medium text-zinc-600 uppercase">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="mt-1 text-lg font-bold text-zinc-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
