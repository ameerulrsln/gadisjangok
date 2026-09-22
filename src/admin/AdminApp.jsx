import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import AdminDashboard from './AdminDashboard.jsx'

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
        <form onSubmit={signIn} className="admin-card">
          <h1>Gadis Jangok · Admin</h1>
          <p>Sign in to publish reports, photos and site content.</p>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    )
  }

  return <AdminDashboard session={session} />
}
