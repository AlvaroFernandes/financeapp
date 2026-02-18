import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { authQuery } from '../lib/db/authDb'
import { useAppSession } from '../lib/session'
import { hashPassword, verifyPassword } from '../lib/security/password'
import { registerSchema, loginSchema } from '../lib/validation/authSchemas'

// Simple ULID generator (you can swap for a ULID lib later)
function ulidLike() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 26)
}

export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => registerSchema.parse(input))
  .handler(async ({ data }) => {
    const existing = await authQuery<any[]>(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [data.email.toLowerCase()],
    )
    if (existing.length) {
      return { ok: false, error: 'Email already registered' } as const
    }

    const userId = ulidLike()
    const passwordHash = await hashPassword(data.password)

    await authQuery(
      `INSERT INTO users (id, email, password_hash, display_name)
       VALUES (?, ?, ?, ?)`,
      [userId, data.email.toLowerCase(), passwordHash, data.displayName ?? null],
    )

    const session = await useAppSession()
    await session.update({ userId, email: data.email.toLowerCase(), role: 'user' })

    throw redirect({ to: '/app' })
  })

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => loginSchema.parse(input))
  .handler(async ({ data }) => {
    const rows = await authQuery<any[]>(
      `SELECT id, email, password_hash
       FROM users
       WHERE email = ? AND is_active = 1
       LIMIT 1`,
      [data.email.toLowerCase()],
    )

    const user = rows[0]
    if (!user) return { ok: false, error: 'Invalid email or password' } as const

    const ok = await verifyPassword(user.password_hash, data.password)
    if (!ok) return { ok: false, error: 'Invalid email or password' } as const

    const session = await useAppSession()
    await session.update({ userId: user.id, email: user.email, role: 'user' })

    throw redirect({ to: '/app' })
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  if (!session.data.userId) return null

  const rows = await authQuery<any[]>(
    `SELECT id, email, display_name
     FROM users
     WHERE id = ? LIMIT 1`,
    [session.data.userId],
  )
  return rows[0] ?? null
})
