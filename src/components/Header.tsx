"use client"

import Link from 'next/link'
import { MainNav } from '@/components/MainNav'
import { UserNav } from '@/components/UserNav'

export function Header({ user }: { user: any | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Learning Platform</span>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
} 