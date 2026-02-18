import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { loginFn } from '../server/auth.server'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const login = useServerFn(loginFn)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <h1>Log in</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setLoading(true)
          setError(null)
          const res = await login({ email, password })
          setLoading(false)
          if (res && 'ok' in res && !res.ok) setError(res.error)
        }}
      >
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 10 }} />

        <label style={{ display: 'block', marginTop: 12 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 10 }} />

        {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

        <button disabled={loading} style={{ marginTop: 16, padding: 10, width: '100%' }}>
          {loading ? 'Signing in...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
