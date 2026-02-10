'use client'

import { Mail, Lock, Bell, Database, Shield } from 'lucide-react'
import SettingsSection from '../components/SettingsSection'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
        <p className="mt-1 text-zinc-600">
          Configure platform-wide settings and preferences
        </p>
      </div>

      {/* Email Settings */}
      <SettingsSection
        icon={Mail}
        title="Email Configuration"
        description="Configure SMTP settings for system notifications"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              SMTP Server
            </label>
            <input
              type="text"
              value="smtp.gmail.com"
              className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              SMTP Port
            </label>
            <input
              type="text"
              value="587"
              className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              From Email Address
            </label>
            <input
              type="email"
              value="noreply@eventplatform.com"
              className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </SettingsSection>

      {/* Security Settings */}
      <SettingsSection
        icon={Shield}
        title="Security Settings"
        description="Manage authentication and security policies"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
            <div>
              <p className="font-medium text-zinc-900">Two-Factor Authentication</p>
              <p className="text-sm text-zinc-600">
                Require 2FA for all admin accounts
              </p>
            </div>
            <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-zinc-200">
              <span className="inline-block h-6 w-6 translate-x-1 transform rounded-full bg-white"></span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
            <div>
              <p className="font-medium text-zinc-900">IP Whitelist</p>
              <p className="text-sm text-zinc-600">
                Restrict admin access to specific IP addresses
              </p>
            </div>
            <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-indigo-600">
              <span className="inline-block h-6 w-6 translate-x-7 transform rounded-full bg-white"></span>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium text-zinc-900">Session Timeout</p>
            <p className="mt-1 text-sm text-zinc-600">Minutes of inactivity</p>
            <input
              type="number"
              value="30"
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection
        icon={Bell}
        title="Notification Settings"
        description="Configure alert and notification preferences"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
            <div>
              <p className="font-medium text-zinc-900">System Alerts</p>
              <p className="text-sm text-zinc-600">
                Receive alerts for critical system issues
              </p>
            </div>
            <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-indigo-600">
              <span className="inline-block h-6 w-6 translate-x-7 transform rounded-full bg-white"></span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
            <div>
              <p className="font-medium text-zinc-900">Performance Warnings</p>
              <p className="text-sm text-zinc-600">
                Alert when performance degrades
              </p>
            </div>
            <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-indigo-600">
              <span className="inline-block h-6 w-6 translate-x-7 transform rounded-full bg-white"></span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
            <div>
              <p className="font-medium text-zinc-900">Daily Summary</p>
              <p className="text-sm text-zinc-600">Receive daily platform summary</p>
            </div>
            <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-zinc-200">
              <span className="inline-block h-6 w-6 translate-x-1 transform rounded-full bg-white"></span>
            </div>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </SettingsSection>

      {/* Database Settings */}
      <SettingsSection
        icon={Database}
        title="Database Settings"
        description="Configure database backup and maintenance"
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium text-zinc-900">Backup Frequency</p>
            <select className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              <option>Every 6 hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium text-zinc-900">Backup Retention</p>
            <select className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>1 year</option>
            </select>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </SettingsSection>

      {/* API Settings */}
      <SettingsSection
        icon={Lock}
        title="API Settings"
        description="Manage API keys and rate limits"
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium text-zinc-900">Rate Limit</p>
            <p className="text-sm text-zinc-600">Requests per minute per IP</p>
            <input
              type="number"
              value="1000"
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium text-zinc-900">API Key Rotation</p>
            <p className="text-sm text-zinc-600">
              Force API key rotation every
            </p>
            <select className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>Never</option>
            </select>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </SettingsSection>
    </div>
  )
}
