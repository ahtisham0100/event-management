'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', registrations: 400, revenue: 2400 },
  { month: 'Feb', registrations: 520, revenue: 2210 },
  { month: 'Mar', registrations: 480, revenue: 2290 },
  { month: 'Apr', registrations: 650, revenue: 2000 },
  { month: 'May', registrations: 720, revenue: 2800 },
  { month: 'Jun', registrations: 890, revenue: 2908 },
  { month: 'Jul', registrations: 950, revenue: 3200 },
  { month: 'Aug', registrations: 1100, revenue: 3500 },
]

export default function TrendChart() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-zinc-900">
        Registration Trends
      </h3>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: 12 }} />
            <YAxis stroke="#71717a" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="registrations"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ fill: '#4f46e5', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
