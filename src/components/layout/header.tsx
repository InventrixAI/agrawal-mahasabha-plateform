'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Crown, Menu, User, LogOut, Settings, UserCircle } from 'lucide-react'
import { useAuthStore, useIsAdmin } from '@/stores/auth-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const isAdmin = useIsAdmin()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const getUserInitials = () => {
    if (user?.member?.firstName && user?.member?.lastName) {
      return `${user.member.firstName[0]}${user.member.lastName[0]}`
    }
    return user?.email?.[0]?.toUpperCase() || 'U'
  }

  const getUserName = () => {
    if (user?.member?.firstName && user?.member?.lastName) {
      return `${user.member.firstName} ${user.member.lastName}`
    }
    return user?.email || 'User'
  }

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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.member?.profilePhoto} alt={getUserName()} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{getUserName()}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    {user?.member?.membershipNo && (
                      <p className="text-xs leading-none text-muted-foreground">
                        Member: {user.member.membershipNo}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Join Us</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
