'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, FileText, Image, User, LogOut, Crown, Bell } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function MemberDashboard() {
  const { user, logout } = useAuthStore()
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [recentNews, setRecentNews] = useState([])
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
                <h1 className="text-xl font-bold text-gray-900">Agarwal Sabha</h1>
                <p className="text-sm text-gray-500">Member Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.member?.firstName} {user?.member?.lastName}
                </p>
                <p className="text-xs text-gray-500">Member ID: {user?.member?.membershipNo}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Welcome, {user?.member?.firstName}!
          </h2>
          <p className="text-gray-600">
            Stay connected with your community activities and updates.
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access common features and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={index}
                    onClick={() => console.log(`Navigate to ${action.href}`)}
                    className="flex flex-col items-center rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  >
                    <Icon className="mb-2 h-6 w-6 text-gray-600" />
                    <span className="text-center text-sm font-medium text-gray-700">
                      {action.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
              <CardDescription>Don&apos;t miss these community events</CardDescription>
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
                  {upcomingEvents.map((event: any) => (
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
                  {recentNews.map((news: any) => (
                    <div key={news.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="cursor-pointer font-medium text-gray-900 hover:text-orange-600">
                        {news.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(news.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="mt-4 w-full">
                    Read All News
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Member Profile Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Your Profile</span>
            </CardTitle>
            <CardDescription>Your membership information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="font-medium text-gray-900">
                  {user?.member?.firstName} {user?.member?.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Membership ID</label>
                <p className="font-medium text-gray-900">{user?.member?.membershipNo}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {user?.status}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline">Update Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
