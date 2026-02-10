'use client'

import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface SystemLog {
  id: string
  timestamp: string
  event: string
  tenant: string
  status: 'success' | 'warning' | 'error'
}

const logs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2024-02-10 14:32:08',
    event: 'Tenant database backup completed',
    tenant: 'TechConf 2024',
    status: 'success',
  },
  {
    id: '2',
    timestamp: '2024-02-10 14:15:42',
    event: 'Payment gateway sync initiated',
    tenant: 'All Tenants',
    status: 'success',
  },
  {
    id: '3',
    timestamp: '2024-02-10 13:48:21',
    event: 'API rate limit threshold reached (85%)',
    tenant: 'EventPro Enterprise',
    status: 'warning',
  },
  {
    id: '4',
    timestamp: '2024-02-10 13:22:15',
    event: 'Template cache invalidated',
    tenant: 'System',
    status: 'success',
  },
  {
    id: '5',
    timestamp: '2024-02-10 12:55:33',
    event: 'WebSocket connection timeout - reconnected',
    tenant: 'MegaEvent Live',
    status: 'warning',
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle size={18} className="text-emerald-600" />
    case 'warning':
      return <AlertCircle size={18} className="text-amber-600" />
    case 'error':
      return <XCircle size={18} className="text-red-600" />
    default:
      return null
  }
}

const getStatusBadge = (status: string) => {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  switch (status) {
    case 'success':
      return `${baseClasses} bg-emerald-100 text-emerald-800`
    case 'warning':
      return `${baseClasses} bg-amber-100 text-amber-800`
    case 'error':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return baseClasses
  }
}

export default function SystemLogsTable() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 p-6">
        <h3 className="text-lg font-semibold text-zinc-900">
          Recent System Logs
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-zinc-200 hover:bg-zinc-50">
                <td className="px-6 py-4 text-sm text-zinc-600">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-900">{log.event}</td>
                <td className="px-6 py-4 text-sm text-zinc-600">
                  {log.tenant}
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(log.status)}>
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
