import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Crown } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Agarwal Sabha</span>
          </Link>
        </div>

        <nav className="mx-6 hidden space-x-6 md:flex">
          <Link
            href="/about"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/members"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Members
          </Link>
          <Link
            href="/events"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Events
          </Link>
          <Link href="/news" className="text-foreground/60 transition-colors hover:text-foreground">
            News
          </Link>
          <Link
            href="/gallery"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Gallery
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Join Us</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
