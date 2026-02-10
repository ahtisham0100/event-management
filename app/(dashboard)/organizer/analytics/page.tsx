'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react'

const ticketSalesData = [
  { tier: 'Early Bird', sales: 85, revenue: 4165 },
  { tier: 'General', sales: 120, revenue: 9480 },
  { tier: 'VIP', sales: 45, revenue: 4050 },
  { tier: 'Student', sales: 30, revenue: 900 },
]

const trendData = [
  { date: 'Jan 1', registrations: 0 },
  { date: 'Jan 8', registrations: 45 },
  { date: 'Jan 15', registrations: 120 },
  { date: 'Jan 22', registrations: 185 },
  { date: 'Jan 29', registrations: 250 },
  { date: 'Feb 5', registrations: 310 },
  { date: 'Feb 12', registrations: 280 },
]

const checkInData = [
  { name: 'Day 1', checkins: 200, total: 250 },
  { name: 'Day 2', checkins: 230, total: 250 },
  { name: 'Day 3', checkins: 210, total: 250 },
]

const registrationSourceData = [
  { name: 'Website', value: 240, color: '#3b82f6' },
  { name: 'Email', value: 140, color: '#8b5cf6' },
  { name: 'Social Media', value: 130, color: '#ec4899' },
  { name: 'Referral', value: 90, color: '#f59e0b' },
]

export default function AnalyticsPage() {
  const kpis = [
    {
      label: 'Tickets Sold',
      value: '280',
      change: '+12%',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Net Revenue',
      value: '$18,595',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Check-in Rate',
      value: '88%',
      change: '+5%',
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Registrations',
      value: '310',
      change: '+28%',
      icon: Users,
      color: 'bg-orange-50 text-orange-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Event Analytics</h1>
        <p className="mt-1 text-slate-600">
          Real-time insights and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="rounded-lg border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {kpi.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-emerald-600">
                    {kpi.change}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${kpi.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ticket Sales by Tier */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Ticket Sales by Tier
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketSalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="tier" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Tickets Sold" />
              <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Registration Trend */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Registration Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Registration Source */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Registration Source
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={registrationSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {registrationSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Check-in Rate */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Daily Check-in Rate
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={checkInData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="checkins" fill="#10b981" name="Checked In" />
              <Bar dataKey="total" fill="#d1d5db" name="Expected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Table */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  metric: 'Total Revenue',
                  value: '$18,595',
                  target: '$20,000',
                  status: 'On Track',
                },
                {
                  metric: 'Tickets Sold',
                  value: '280',
                  target: '300',
                  status: 'On Track',
                },
                {
                  metric: 'Check-in Rate',
                  value: '88%',
                  target: '85%',
                  status: 'Exceeded',
                },
                {
                  metric: 'Registrations',
                  value: '310',
                  target: '300',
                  status: 'Exceeded',
                },
              ].map((row) => (
                <tr key={row.metric} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{row.value}</td>
                  <td className="px-6 py-4 text-slate-700">{row.target}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        row.status === 'Exceeded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
