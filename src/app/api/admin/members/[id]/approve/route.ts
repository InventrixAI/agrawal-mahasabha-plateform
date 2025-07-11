import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { memberApprovalSchema } from '@/lib/validations'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const validatedData = memberApprovalSchema.parse(body)
    const { action, reason } = validatedData
    const userId = params.id

    // Find the user
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        member: true,
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

    if (user.status !== 'PENDING') {
      return NextResponse.json(
        {
          success: false,
          message: 'User is not pending approval',
        },
        { status: 400 }
      )
    }

    // Update user status
    const newStatus = action === 'approve' ? 'ACTIVE' : 'REJECTED'

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        status: newStatus,
        isVerified: action === 'approve',
      },
      include: {
        member: true,
      },
    })

    // Log the approval action (you can create an audit log table later)
    console.log(`User ${user.email} ${action}d by admin. Reason: ${reason || 'No reason provided'}`)

    return NextResponse.json({
      success: true,
      message: `Member ${action}d successfully`,
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          status: updatedUser.status,
          member: updatedUser.member,
        },
      },
    })
  } catch (error: any) {
    console.error('Member approval error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process member approval',
      },
      { status: 500 }
    )
  }
}
