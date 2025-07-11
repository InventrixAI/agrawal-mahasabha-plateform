'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'

interface PendingMember {
  id: string
  email: string
  status: string
  createdAt: string
  member: {
    id: string
    membershipNo: string
    firstName: string
    lastName: string
    gotra: string
    locality: string
    phone?: string
    occupation?: string
  }
}

export default function AdminDashboardPage() {
  const { user } = useAuthStore()
  const [pendingMembers, setPendingMembers] = useState<PendingMember[]>([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedThisMonth: 0,
    rejectedThisMonth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch pending members
      const pendingResponse = await fetch('/api/admin/members/pending?limit=5')
      const pendingData = await pendingResponse.json()

      if (pendingData.success) {
        setPendingMembers(pendingData.data.members)
        setStats((prev) => ({
          ...prev,
          pendingMembers: pendingData.data.pagination.totalCount,
        }))
      }

      // Mock stats for now - you can create separate API endpoints for these
      setStats((prev) => ({
        ...prev,
        totalMembers: 245,
        approvedThisMonth: 12,
        rejectedThisMonth: 2,
      }))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleMemberAction = async (memberId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/admin/members/${memberId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(`Member ${action}d successfully`)
        // Remove from pending list
        setPendingMembers((prev) => prev.filter((member) => member.id !== memberId))
        // Update stats
        setStats((prev) => ({
          ...prev,
          pendingMembers: prev.pendingMembers - 1,
          [action === 'approve' ? 'approvedThisMonth' : 'rejectedThisMonth']:
            prev[action === 'approve' ? 'approvedThisMonth' : 'rejectedThisMonth'] + 1,
        }))
      } else {
        toast.error(data.message || `Failed to ${action} member`)
      }
    } catch (error) {
      console.error(`Failed to ${action} member:`, error)
      toast.error(`Failed to ${action} member`)
    }
  }

  if (loading) {
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

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage your community platform and members</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/admin/content/news/new">Create News</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/content/events/new">Create Event</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
                <p className="mt-1 flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />+{stats.approvedThisMonth} this month
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
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">{stats.pendingMembers}</p>
                <p className="mt-1 flex items-center text-xs text-orange-600">
                  <Clock className="mr-1 h-3 w-3" />
                  Requires action
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved This Month</p>
                <p className="text-2xl font-bold">{stats.approvedThisMonth}</p>
                <p className="mt-1 flex items-center text-xs text-green-600">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  New members
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected This Month</p>
                <p className="text-2xl font-bold">{stats.rejectedThisMonth}</p>
                <p className="mt-1 flex items-center text-xs text-red-600">
                  <XCircle className="mr-1 h-3 w-3" />
                  Applications
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Members */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Member Approvals</CardTitle>
              <CardDescription>Review and approve new member registrations</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/members/pending">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingMembers.length === 0 ? (
              <div className="py-8 text-center">
                <UserCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No pending member approvals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingMembers.map((member) => (
                  <div key={member.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {member.member.firstName[0]}
                        {member.member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {member.member.firstName} {member.member.lastName}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {member.member.gotra}
                        </Badge>
                      </div>
                      <p className="mb-1 text-xs text-muted-foreground">{member.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.member.locality} •{' '}
                        {member.member.occupation || 'No occupation listed'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Registered: {new Date(member.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:bg-green-50 hover:text-green-700"
                        onClick={() => handleMemberAction(member.id, 'approve')}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleMemberAction(member.id, 'reject')}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/members">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Members
                </Link>
              </Button>

              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/content/news">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage News
                </Link>
              </Button>

              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/content/events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Events
                </Link>
              </Button>

              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/content/gallery">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Manage Gallery
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
