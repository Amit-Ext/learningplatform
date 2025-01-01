"use client"

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  BookOpen, 
  BarChart, 
  Users, 
  Settings,
  Award
} from 'lucide-react'

export function Sidebar() {
  const { user } = useAuth()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart
    },
    {
      name: 'Courses',
      href: '/courses',
      icon: BookOpen
    },
    {
      name: 'Progress',
      href: '/progress',
      icon: Award
    },
    {
      name: 'Community',
      href: '/community',
      icon: Users
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings
    }
  ]

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 