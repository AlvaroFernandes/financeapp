import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Next: household setup, accounts, categories, transactions.</p>
    </div>
  )
}
