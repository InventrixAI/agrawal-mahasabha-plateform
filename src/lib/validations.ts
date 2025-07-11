import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    gotra: z.string().min(2, 'Gotra is required'),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    phone: z.string().optional(),
    locality: z.string().min(2, 'Locality is required'),
    occupation: z.string().optional(),
    education: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

// Member schemas
export const memberUpdateSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  phone: z.string().optional(),
  locality: z.string().min(2, 'Locality is required'),
  occupation: z.string().optional(),
  education: z.string().optional(),
  bio: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']).optional(),
  isPublic: z.boolean().optional(),
})

// Content schemas
export const contentSchema = z.object({
  type: z.enum(['NEWS', 'EVENT', 'PAGE', 'ANNOUNCEMENT']),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  featuredImage: z.string().optional(),
  metadata: z.record(z.any()).optional(),
})

export const eventRegistrationSchema = z.object({
  eventId: z.string().cuid(),
  guestCount: z.number().min(0).max(10).optional(),
  notes: z.string().optional(),
})

// Admin schemas
export const memberApprovalSchema = z.object({
  action: z.enum(['approve', 'reject']),
  reason: z.string().optional(),
})
