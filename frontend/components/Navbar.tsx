"use client"

import Link from 'next/link'
import { Car } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl text-gray-800 dark:text-white">ANPDS</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors ${pathname === '/' ? 'font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/detect" 
              className={`text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors ${pathname === '/detect' ? 'font-semibold' : ''}`}
            >
              Detect
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

