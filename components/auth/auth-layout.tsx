import { ReactNode } from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <ShieldCheck size={32} />
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
        </div>
        
        <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
