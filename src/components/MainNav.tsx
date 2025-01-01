"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link
        href="/"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Home
      </Link>
      <Link
        href="/courses"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/courses") ? "text-foreground" : "text-foreground/60"
        )}
      >
        Courses
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/dashboard") ? "text-foreground" : "text-foreground/60"
        )}
      >
        Dashboard
      </Link>
    </nav>
  )
} 