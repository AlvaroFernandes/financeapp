import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '../../server/auth.server'

export const Route = createFileRoute('/app/_layout')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()
    if (!user) {
      throw redirect({ to: '/login' })
    }
    return { user }
  },
  component: AppLayout,
})

function AppLayout() {
  const { user } = Route.useRouteContext()
  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <strong>Family Finance</strong>
        <span>Hi {user.display_name ?? user.email}</span>
      </header>
      <hr />
      <Outlet />
    </div>
  )
}
