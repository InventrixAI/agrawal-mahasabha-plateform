import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic' // ← ADD THIS LINE

export async function GET(request: NextRequest) {
  try {
    // Get user ID from middleware headers
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required',
        },
        { status: 401 }
      )
    }

    // Find user with member data
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        member: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            membershipNo: true,
            profilePhoto: true,
            gotra: true,
            locality: true,
            phone: true,
            occupation: true,
            education: true,
            bio: true,
            dateOfBirth: true,
            bloodGroup: true,
            maritalStatus: true,
            isPublic: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      )
    }

    // Check if user is still active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        {
          success: false,
          message: 'Account is not active',
        },
        { status: 403 }
      )
    }

    // Prepare user data for response
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin,
      member: user.member,
    }

    return NextResponse.json({
      success: true,
      data: { user: userData },
    })
  } catch (error) {
    console.error('Get user error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get user data',
      },
      { status: 500 }
    )
  }
}
