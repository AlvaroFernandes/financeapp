import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(10).max(72),
  displayName: z.string().min(1).max(120).optional(),
})

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(72),
})
