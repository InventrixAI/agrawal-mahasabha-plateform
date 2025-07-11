import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.user.findUnique({
      where: { email: 'admin@agarwalsabha.com' },
    })

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' })
    }

    // Create admin
    const hashedPassword = await hashPassword('Admin@123')

    const adminUser = await db.user.create({
      data: {
        email: 'admin@agarwalsabha.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        isVerified: true,
      },
    })

    await db.member.create({
      data: {
        userId: adminUser.id,
        membershipNo: 'AGR202400001',
        firstName: 'System',
        lastName: 'Administrator',
        fatherName: 'System',
        gotra: 'Admin',
        gender: 'MALE',
        locality: 'System',
      },
    })

    return NextResponse.json({ message: 'Admin created successfully!' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 })
  }
}
