'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Heart, Building, TrendingUp, Star, Bell } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'

export default function DashboardPage() {
  const { user, isLoading, refreshUser } = useAuthStore()

  useEffect(() => {
    if (!user && !isLoading) {
      refreshUser()
    }
  }, [user, isLoading, refreshUser])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const firstName = user?.member?.firstName || 'Member'

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {firstName}! 👋</h1>
          <p className="mt-2 text-muted-foreground">
            Here's what's happening in your community today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/profile">Edit Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">89</p>
                <p className="mt-1 flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12 this week
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events Joined</p>
                <p className="text-2xl font-bold">3</p>
                <p className="mt-1 flex items-center text-xs text-blue-600">
                  <Calendar className="mr-1 h-3 w-3" />2 upcoming
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connections</p>
                <p className="text-2xl font-bold">234</p>
                <p className="mt-1 flex items-center text-xs text-purple-600">
                  <Star className="mr-1 h-3 w-3" />
                  Community active
                </p>
              </div>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                <p className="text-2xl font-bold">5</p>
                <p className="mt-1 flex items-center text-xs text-orange-600">
                  <Bell className="mr-1 h-3 w-3" />2 unread
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest community interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <Calendar className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Registered for Maharaja Agrasen Jayanti</p>
                  <p className="text-xs text-muted-foreground">
                    September 15, 2024 • Community Hall
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <Users className="mt-0.5 h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile viewed by 12 members</p>
                  <p className="text-xs text-muted-foreground">
                    Members from Delhi and Mumbai showed interest
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <Heart className="mt-0.5 h-5 w-5 text-pink-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Connected with 3 new members</p>
                  <p className="text-xs text-muted-foreground">From your locality and same gotra</p>
                  <p className="mt-1 text-xs text-muted-foreground">3 days ago</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you're registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium">Maharaja Agrasen Jayanti</h4>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Confirmed
                  </span>
                </div>
                <p className="mb-2 text-xs text-muted-foreground">Sept 15, 2024 • 6:00 PM</p>
                <p className="text-xs text-muted-foreground">Community Hall, Delhi</p>
                <Button size="sm" variant="outline" className="mt-3 w-full">
                  View Details
                </Button>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium">Diwali Celebration</h4>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    Registered
                  </span>
                </div>
                <p className="mb-2 text-xs text-muted-foreground">Oct 28, 2024 • 7:00 PM</p>
                <p className="text-xs text-muted-foreground">Grand Ballroom, Mumbai</p>
                <Button size="sm" variant="outline" className="mt-3 w-full">
                  View Details
                </Button>
              </div>
            </div>

            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button variant="outline" className="flex h-auto flex-col space-y-2 p-4" asChild>
              <Link href="/members">
                <Users className="h-6 w-6" />
                <span className="text-sm">Find Members</span>
              </Link>
            </Button>

            <Button variant="outline" className="flex h-auto flex-col space-y-2 p-4" asChild>
              <Link href="/events">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Browse Events</span>
              </Link>
            </Button>

            <Button variant="outline" className="flex h-auto flex-col space-y-2 p-4" asChild>
              <Link href="/gallery">
                <Heart className="h-6 w-6" />
                <span className="text-sm">View Gallery</span>
              </Link>
            </Button>

            <Button variant="outline" className="flex h-auto flex-col space-y-2 p-4" asChild>
              <Link href="/news">
                <Building className="h-6 w-6" />
                <span className="text-sm">Latest News</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
