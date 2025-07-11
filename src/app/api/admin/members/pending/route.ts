import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic' // ← ADD THIS LINE

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')

    // Check if user is admin
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin access required',
        },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Get pending members
    const [members, totalCount] = await Promise.all([
      db.user.findMany({
        where: { status: 'PENDING' },
        include: {
          member: {
            select: {
              id: true,
              membershipNo: true,
              firstName: true,
              lastName: true,
              fatherName: true,
              motherName: true,
              gotra: true,
              locality: true,
              phone: true,
              occupation: true,
              education: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.user.count({
        where: { status: 'PENDING' },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        members,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          limit,
        },
      },
    })
  } catch (error) {
    console.error('Get pending members error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get pending members',
      },
      { status: 500 }
    )
  }
}
