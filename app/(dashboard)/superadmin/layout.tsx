'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Building2,
  DollarSign,
  Layout,
  Menu,
  Settings,
  X,
  Activity,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavCategory {
  label: string
  items: NavItem[]
}

const navCategories: NavCategory[] = [
  {
    label: 'Operational',
    items: [
      { label: 'Overview', href: '/superadmin', icon: BarChart3 },
      { label: 'Tenants', href: '/superadmin/tenants', icon: Building2 },
      { label: 'Global Finance', href: '/superadmin/finance', icon: DollarSign },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Templates', href: '/superadmin/templates', icon: Layout },
      { label: 'Health', href: '/superadmin/system-health', icon: Activity },
      { label: 'Settings', href: '/superadmin/settings', icon: Settings },
    ],
  },
]

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    if (pathname === '/superadmin') return 'Overview'
    const segments = pathname.split('/').filter(Boolean)
    return segments[segments.length - 1]
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }

  const getSystemStatus = () => {
    // Simulated system status
    return 'Operational'
  }

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-zinc-200 bg-white transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-4">
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all ${
              sidebarOpen ? 'w-full' : 'w-0'
            }`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <BarChart3 size={20} />
            </div>
            <span className="whitespace-nowrap text-lg font-bold text-zinc-900">
              SuperAdmin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden rounded-lg p-1 hover:bg-zinc-100 md:block"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X size={20} className="text-zinc-600" />
            ) : (
              <Menu size={20} className="text-zinc-600" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {navCategories.map((category) => (
            <div key={category.label} className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {sidebarOpen ? category.label : ''}
              </p>
              <ul className="space-y-1">
                {category.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <Icon size={20} className="flex-shrink-0" />
                        <span
                          className={`whitespace-nowrap transition-opacity ${
                            sidebarOpen ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-zinc-200 p-4">
          <div className="rounded-lg bg-indigo-50 p-3">
            <p className="text-xs font-semibold text-zinc-600">
              {sidebarOpen ? 'Status' : ''}
            </p>
            <p
              className={`text-sm font-semibold text-indigo-600 ${
                sidebarOpen ? '' : 'hidden'
              }`}
            >
              Operational
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="border-b border-zinc-200 bg-white">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-1 hover:bg-zinc-100 md:hidden"
                aria-label="Toggle mobile menu"
              >
                <Menu size={24} className="text-zinc-600" />
              </button>
              <div className="hidden sm:block">
                <p className="text-sm text-zinc-600">Dashboard</p>
                <p className="text-lg font-semibold text-zinc-900">
                  {getBreadcrumbs()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                <span className="text-sm font-medium text-indigo-700">
                  System {getSystemStatus()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 sm:px-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  )
}
