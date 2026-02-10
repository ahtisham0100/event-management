'use client'

import { useState } from 'react'
import { Activity, Server, Wifi, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import HealthMetric from '../components/HealthMetric'

export default function SystemHealthPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const healthMetrics = [
    {
      name: 'API Servers',
      status: 'healthy',
      uptime: '99.99%',
      responseTime: '45ms',
      requests: '12.5K/min',
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.98%',
      responseTime: '15ms',
      connections: '847/1000',
    },
    {
      name: 'Cache Layer',
      status: 'healthy',
      uptime: '100%',
      responseTime: '2ms',
      hitRate: '94.2%',
    },
    {
      name: 'WebSocket Service',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '12ms',
      activeConnections: '2.3K',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">System Health</h1>
        <p className="mt-1 text-zinc-600">
          Real-time monitoring of platform infrastructure and services
        </p>
      </div>

      {/* System Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600">Overall Status</p>
              <p className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-emerald-600">
                <CheckCircle size={20} />
                Operational
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-600">API Response Time</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">45ms</p>
          <p className="mt-2 text-sm text-emerald-600">↓ 8% from yesterday</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-600">Error Rate</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">0.02%</p>
          <p className="mt-2 text-sm text-emerald-600">Excellent</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-600">Active Connections</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">3.2K</p>
          <p className="mt-2 text-sm text-indigo-600">↑ 12% from last hour</p>
        </div>
      </div>

      {/* Service Health */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Infrastructure Services</h2>
        <div className="grid gap-4">
          {healthMetrics.map((metric, idx) => (
            <HealthMetric key={idx} metric={metric} />
          ))}
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">
              Maintenance Mode
            </h3>
            <p className="mt-1 text-zinc-600">
              Prevent new connections and display maintenance message to users
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                maintenanceMode ? 'bg-red-600' : 'bg-zinc-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  maintenanceMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              ></span>
            </button>
            <span
              className={`text-sm font-medium ${
                maintenanceMode ? 'text-red-600' : 'text-zinc-600'
              }`}
            >
              {maintenanceMode ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
        {maintenanceMode && (
          <div className="mt-4 rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-700">
              ⚠️ Maintenance mode is currently enabled. Users will see a maintenance
              message and cannot access the platform.
            </p>
          </div>
        )}
      </div>

      {/* WebSocket Connections */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">
          WebSocket Connections
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Active Connections</span>
              <span className="font-semibold text-zinc-900">2,847</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-zinc-200">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Connection Health</span>
              <span className="font-semibold text-zinc-900">99.95%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-zinc-200">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: '99.95%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Alerts */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">System Alerts</h3>
        <div className="mt-4 space-y-3">
          <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle size={20} className="flex-shrink-0 text-emerald-600" />
            <div className="flex-1">
              <p className="font-medium text-emerald-900">Database Backup</p>
              <p className="text-sm text-emerald-700">
                Successfully completed at 02:30 UTC
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertCircle size={20} className="flex-shrink-0 text-amber-600" />
            <div className="flex-1">
              <p className="font-medium text-amber-900">Memory Usage Alert</p>
              <p className="text-sm text-amber-700">
                API server memory at 78% - Monitoring closely
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle size={20} className="flex-shrink-0 text-emerald-600" />
            <div className="flex-1">
              <p className="font-medium text-emerald-900">Cache Refresh</p>
              <p className="text-sm text-emerald-700">
                All master assets cached successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
