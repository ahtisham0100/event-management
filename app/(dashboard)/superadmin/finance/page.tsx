'use client'

import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Settings } from 'lucide-react'

interface Transaction {
  id: string
  date: string
  tenant: string
  type: 'payment' | 'payout' | 'refund'
  amount: string
  gateway: 'stripe' | 'paypal'
  status: 'completed' | 'pending' | 'failed'
}

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-10',
    tenant: 'TechConf 2024',
    type: 'payment',
    amount: '$2,450.00',
    gateway: 'stripe',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-02-10',
    tenant: 'EventPro Enterprise',
    type: 'payout',
    amount: '$5,200.00',
    gateway: 'stripe',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-02-09',
    tenant: 'Festival Masters',
    type: 'payment',
    amount: '$890.50',
    gateway: 'paypal',
    status: 'completed',
  },
  {
    id: '4',
    date: '2024-02-09',
    tenant: 'MegaEvent Live',
    type: 'refund',
    amount: '$125.00',
    gateway: 'stripe',
    status: 'completed',
  },
  {
    id: '5',
    date: '2024-02-08',
    tenant: 'Wedding Planners Pro',
    type: 'payment',
    amount: '$3,650.00',
    gateway: 'stripe',
    status: 'completed',
  },
  {
    id: '6',
    date: '2024-02-08',
    tenant: 'Corporate Events Inc',
    type: 'payment',
    amount: '$1,200.00',
    gateway: 'paypal',
    status: 'pending',
  },
]

const getTransactionIcon = (type: string) => {
  if (type === 'payout')
    return <ArrowDownLeft size={18} className="text-red-600" />
  return <ArrowUpRight size={18} className="text-emerald-600" />
}

const getStatusColor = (status: string) => {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-emerald-100 text-emerald-800`
    case 'pending':
      return `${baseClasses} bg-amber-100 text-amber-800`
    case 'failed':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return baseClasses
  }
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('ledger')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Global Finance</h1>
        <p className="mt-1 text-zinc-600">
          Platform transaction ledger and revenue management
        </p>
      </div>

      {/* Finance Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-600">Total Revenue (MTD)</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">$125,420.00</p>
          <p className="mt-2 text-sm text-emerald-600">+15.3% vs last month</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-600">Platform Fees (MTD)</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">$12,542.00</p>
          <p className="mt-2 text-sm text-zinc-500">10% commission</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-600">Payouts (MTD)</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">$112,878.00</p>
          <p className="mt-2 text-sm text-indigo-600">Pending: $5,200</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200">
        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'ledger'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Transaction Ledger
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'payouts'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Payouts
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'fees'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Platform Fees
        </button>
      </div>

      {/* Ledger Tab */}
      {activeTab === 'ledger' && (
        <div className="rounded-lg border border-zinc-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                    Gateway
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-zinc-200 hover:bg-zinc-50">
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      {transaction.tenant}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="text-sm text-zinc-600">
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-zinc-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {transaction.gateway === 'stripe' ? 'Stripe' : 'PayPal'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-zinc-900">
            Manage Payouts
          </h3>
          <p className="mt-2 text-zinc-600">
            Configure automatic payout schedules and settings for all tenants
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900">Weekly Payouts</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Every Monday at 9:00 AM UTC
                  </p>
                </div>
                <button className="rounded-lg bg-zinc-100 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-200">
                  Edit
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900">Minimum Threshold</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Payout only when balance exceeds $500
                  </p>
                </div>
                <button className="rounded-lg bg-zinc-100 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-200">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Platform Fee Configuration
              </h3>
              <p className="mt-1 text-zinc-600">
                Set the global commission rate for all tenant transactions
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
              <Settings size={20} />
              Configure
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-4">
              <p className="text-sm font-medium text-zinc-600">Current Rate</p>
              <p className="mt-2 text-3xl font-bold text-zinc-900">10%</p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <p className="text-sm font-medium text-zinc-600">Effective Date</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">
                Jan 1, 2024
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
