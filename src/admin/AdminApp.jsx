import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import AdminDashboard from './AdminDashboard.jsx'
import AdminHeader from './AdminHeader.jsx'

export default function AdminApp() {
  const [session, setSession] = useState(undefined) // undefined = loading
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  async function signIn(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setBusy(false)
  }

  if (session === undefined) return <div className="admin-boot">Loading…</div>

  if (!session) {
    return (
      <div className="admin-login">
        <AdminHeader />
        <main className="admin-login-main">
          <form onSubmit={signIn} className="admin-card admin-login-card">
            <img className="admin-login-logo" src="/gadisjangok.PNG" alt="Gadis Jangok" />
            <h1>Welcome back</h1>
            <p>Sign in to publish reports, photos and site content.</p>
            <div className="af-field">
              <label className="af-label" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="af-field">
              <label className="af-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className="admin-msg err">{error}</p>}
            <button type="submit" className="admin-submit admin-submit-block" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </main>
      </div>
    )
  }

  return <AdminDashboard session={session} />
}
