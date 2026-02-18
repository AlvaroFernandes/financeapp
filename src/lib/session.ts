import { useSession } from '@tanstack/react-start/server'

export type SessionData = {
  userId?: string
  email?: string
  role?: string
}

export function useAppSession() {
  return useSession<SessionData>({
    name: 'family-finance',
    password: process.env.SESSION_SECRET!, // >= 32 chars
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    },
  })
}
