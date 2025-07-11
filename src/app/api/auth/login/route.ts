import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword, generateToken } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData

    // Find user with member data
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        member: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            membershipNo: true,
            profilePhoto: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      )
    }

    // Check if user is approved
    if (user.status === 'PENDING') {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account is pending admin approval. Please wait for approval.',
        },
        { status: 403 }
      )
    }

    if (user.status === 'REJECTED') {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account has been rejected. Please contact admin.',
        },
        { status: 403 }
      )
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account has been suspended. Please contact admin.',
        },
        { status: 403 }
      )
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Prepare user data for response
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      member: user.member,
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        token,
      },
    })
  } catch (error: any) {
    console.error('Login error:', error)

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
        message: 'Login failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
