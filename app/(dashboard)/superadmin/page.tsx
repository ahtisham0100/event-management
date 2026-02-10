'use client'

import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'
import StatCard from './components/StatCard'
import TrendChart from './components/TrendChart'
import SystemLogsTable from './components/SystemLogsTable'

export default function OverviewPage() {
  const stats = [
    {
      label: 'Total Tenants',
      value: '2,847',
      change: '+12.5%',
      positive: true,
      icon: Users,
    },
    {
      label: 'Aggregated Revenue',
      value: '$1.2M',
      change: '+8.2%',
      positive: true,
      icon: DollarSign,
    },
    {
      label: 'Active Events (Live)',
      value: '156',
      change: '+4.1%',
      positive: true,
      icon: Calendar,
    },
    {
      label: 'System Health',
      value: '99.98%',
      change: '+0.2%',
      positive: true,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          Global Health & Revenue
        </h1>
        <p className="mt-1 text-zinc-600">
          Real-time infrastructure and platform performance overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts and Logs */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trend Chart */}
        <div className="lg:col-span-2">
          <TrendChart />
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              Infrastructure Metrics
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">API Response Time</span>
                <span className="font-semibold text-zinc-900">124ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">
                  WebSocket Connections
                </span>
                <span className="font-semibold text-zinc-900">12,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">
                  Database Latency
                </span>
                <span className="font-semibold text-zinc-900">32ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">
                  Platform Uptime
                </span>
                <span className="font-semibold text-emerald-600">99.98%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              System Load
            </h3>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">API Servers</span>
                  <span className="font-semibold text-zinc-900">67%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-zinc-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: '67%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Database</span>
                  <span className="font-semibold text-zinc-900">45%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-zinc-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Cache</span>
                  <span className="font-semibold text-zinc-900">82%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-zinc-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: '82%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <SystemLogsTable />
    </div>
  )
}
