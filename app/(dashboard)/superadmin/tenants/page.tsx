'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, LogIn, MoreVertical } from 'lucide-react'
import CreateTenantModal from '../components/CreateTenantModal'

interface Tenant {
  id: string
  name: string
  email: string
  status: 'active' | 'suspended' | 'trial'
  joinDate: string
  eventsCount: number
  revenue: string
}

const tenants: Tenant[] = [
  {
    id: '1',
    name: 'TechConf 2024',
    email: 'admin@techconf.com',
    status: 'active',
    joinDate: '2023-06-15',
    eventsCount: 12,
    revenue: '$45,200',
  },
  {
    id: '2',
    name: 'EventPro Enterprise',
    email: 'support@eventpro.com',
    status: 'active',
    joinDate: '2023-01-20',
    eventsCount: 28,
    revenue: '$128,500',
  },
  {
    id: '3',
    name: 'MegaEvent Live',
    email: 'hello@megaevent.com',
    status: 'active',
    joinDate: '2023-09-10',
    eventsCount: 8,
    revenue: '$32,100',
  },
  {
    id: '4',
    name: 'Festival Masters',
    email: 'contact@festivalmasters.com',
    status: 'trial',
    joinDate: '2024-01-05',
    eventsCount: 2,
    revenue: '$0',
  },
  {
    id: '5',
    name: 'Corporate Events Inc',
    email: 'admin@corpevents.com',
    status: 'suspended',
    joinDate: '2023-03-22',
    eventsCount: 15,
    revenue: '$67,800',
  },
  {
    id: '6',
    name: 'Wedding Planners Pro',
    email: 'info@weddingpro.com',
    status: 'active',
    joinDate: '2023-11-30',
    eventsCount: 19,
    revenue: '$92,300',
  },
]

const getStatusBadge = (status: string) => {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  switch (status) {
    case 'active':
      return `${baseClasses} bg-emerald-100 text-emerald-800`
    case 'suspended':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'trial':
      return `${baseClasses} bg-indigo-100 text-indigo-800`
    default:
      return baseClasses
  }
}

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filteredTenants = useMemo(() => {
    return tenants.filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Tenant Onboarding</h1>
          <p className="mt-1 text-zinc-600">
            Manage all organizations and tenants
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={20} />
          Create New Tenant
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          placeholder="Search organizations by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Events
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-zinc-700">
                  Quick Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-zinc-200 hover:bg-zinc-50">
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {tenant.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {tenant.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(tenant.status)}>
                      {tenant.status.charAt(0).toUpperCase() +
                        tenant.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {tenant.eventsCount}
                  </td>
                  <td className="px-6 py-4 font-semibold text-zinc-900">
                    {tenant.revenue}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {tenant.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50">
                        <LogIn size={16} />
                        <span className="hidden sm:inline">Impersonate</span>
                      </button>
                      <button className="rounded p-1 hover:bg-zinc-100">
                        <MoreVertical size={18} className="text-zinc-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTenants.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-zinc-600">No organizations found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && <CreateTenantModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
