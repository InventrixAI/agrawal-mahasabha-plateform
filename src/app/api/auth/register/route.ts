import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, generateMembershipNumber } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    const {
      email,
      password,
      firstName,
      lastName,
      gotra,
      locality,
      fatherName,
      motherName,
      phone,
      occupation,
      education,
    } = validatedData

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already registered',
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate membership number
    const membershipNo = generateMembershipNumber()

    // Create user and member in transaction
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'MEMBER',
          status: 'PENDING', // Requires admin approval
        },
      })

      const member = await tx.member.create({
        data: {
          userId: user.id,
          membershipNo,
          firstName,
          lastName,
          fatherName: fatherName || '',
          motherName: motherName || '',
          gotra,
          locality,
          phone: phone || '',
          occupation: occupation || '',
          education: education || '',
          gender: 'MALE', // Default, can be updated later
        },
      })

      return { user, member }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Your account is pending admin approval.',
        data: {
          membershipNo: result.member.membershipNo,
          status: 'PENDING',
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)

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
        message: 'Registration failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
