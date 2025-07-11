'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, FileText, Image, User, LogOut, Crown, Bell } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Define the types for your data structures
interface Event {
  id: number
  title: string
  date: string
  time: string
}

interface NewsItem {
  id: number
  title: string
  date: string
}

export default function MemberDashboard() {
  const { user, logout } = useAuthStore()
  // Explicitly type the state with the defined interfaces
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [recentNews, setRecentNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUpcomingEvents([
        { id: 1, title: 'Diwali Celebration 2024', date: '2024-11-01', time: '18:00' },
        { id: 2, title: 'Community Meet', date: '2024-11-15', time: '19:00' },
        { id: 3, title: 'Cultural Program', date: '2024-12-01', time: '17:00' },
      ])
      setRecentNews([
        { id: 1, title: 'New Community Hall Inauguration', date: '2024-10-25' },
        { id: 2, title: 'Annual Sports Event Results', date: '2024-10-20' },
        { id: 3, title: 'Community Welfare Drive', date: '2024-10-15' },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  const quickActions = [
    { label: 'Update Profile', icon: User, href: '/profile' },
    { label: 'View Events', icon: Calendar, href: '/events' },
    { label: 'Browse Gallery', icon: Image, href: '/gallery' },
    { label: 'Read News', icon: FileText, href: '/news' },
    { label: 'Directory', icon: Users, href: '/members' },
    { label: 'Contact Us', icon: Bell, href: '/contact' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Agarwal Sabha</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.member?.firstName || 'Admin'}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="flex items-center justify-start space-x-3 p-4"
                      onClick={() => (window.location.href = action.href)}
                    >
                      <action.icon className="h-4 w-4" />
                      <span>{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
              <CardDescription>Next community events</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-orange-500 py-2 pl-4">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="mt-4 w-full">
                    View All Events
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent News</span>
              </CardTitle>
              <CardDescription>Stay updated with community news</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentNews.map((news) => (
                    <div key={news.id} className="border-l-4 border-blue-500 py-2 pl-4">
                      <h4 className="font-medium text-gray-900">{news.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(news.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="mt-4 w-full">
                    View All News
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
