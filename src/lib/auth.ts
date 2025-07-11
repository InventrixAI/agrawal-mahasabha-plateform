import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './db'

interface JWTPayload {
  userId: string
  email: string
  role: string
}

export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-for-development',
  jwtExpiresIn: '7d' as const,
  bcryptRounds: 12,
}

// Validate JWT secret exists in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required in production')
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, authConfig.bcryptRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  const secret = authConfig.jwtSecret
  if (!secret) {
    throw new Error('JWT secret is not configured')
  }

  // Use any to bypass TypeScript issues
  return (jwt.sign as any)(payload, secret, {
    expiresIn: authConfig.jwtExpiresIn,
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = authConfig.jwtSecret
    if (!secret) {
      throw new Error('JWT secret is not configured')
    }

    // Use any to bypass TypeScript issues
    const decoded = (jwt.verify as any)(token, secret)
    return decoded as JWTPayload
  } catch {
    return null
  }
}

export async function getCurrentUser(token: string) {
  try {
    const payload = verifyToken(token)
    if (!payload) return null

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      include: {
        member: true,
      },
    })

    if (!user || user.status !== 'ACTIVE') return null

    return user
  } catch {
    return null
  }
}

export function generateMembershipNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `AGR${timestamp}${random}`
}
