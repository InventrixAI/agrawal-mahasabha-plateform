import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './db'

interface JWTPayload {
  userId: string
  email: string
  role: string
}

export const authConfig = {
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: '7d',
  bcryptRounds: 12,
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, authConfig.bcryptRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn,
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, authConfig.jwtSecret) as JWTPayload
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
