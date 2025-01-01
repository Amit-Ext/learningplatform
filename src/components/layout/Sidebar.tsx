"use client"

import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function Sidebar() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return (
    <div className="flex h-full w-64 flex-col bg-gray-800 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-bold">Learning Platform</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <Link
          href="/dashboard"
          className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href="/courses"
          className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-700"
        >
          Courses
        </Link>
        <Link
          href="/dashboard/settings"
          className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-700"
        >
          Settings
        </Link>
      </nav>
    </div>
  )
} 