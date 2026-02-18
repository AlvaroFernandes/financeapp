import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Family Finance Organizer</h1>
        <p style={styles.subtitle}>
          Private household dashboard for tracking accounts, transactions, and budgets.
        </p>

        <div style={styles.links}>
          <Link to="/login" style={styles.primary}>
            Log in
          </Link>
          <Link to="/register" style={styles.secondary}>
            Create account
          </Link>
          <Link to="/app" style={styles.secondary}>
            Go to app
          </Link>
        </div>

        <small style={styles.note}>
          Tip: bookmark <strong>/app</strong> once you’re set up.
        </small>
      </div>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: 16,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    background: '#fafafa',
  },
  card: {
    width: '100%',
    maxWidth: 520,
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  },
  title: { margin: 0, fontSize: 32, lineHeight: 1.1 },
  subtitle: { marginTop: 10, marginBottom: 18, color: '#444', fontSize: 16 },
  links: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  primary: {
    padding: '12px 16px',
    borderRadius: 12,
    background: '#111',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
  },
  secondary: {
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid #ddd',
    color: '#111',
    textDecoration: 'none',
    fontWeight: 600,
    background: '#fff',
  },
  note: { display: 'block', marginTop: 16, color: '#666' },
}
