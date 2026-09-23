import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import { supabaseReady } from './lib/supabase.js'
import './styles/global.css'
import './styles/admin.css'

// The admin is reachable at /admin on the main site, and at the root of the
// admin subdomain (admin.gadisjangok.com). It needs Supabase configured.
const isAdminHost = window.location.hostname.startsWith('admin.')
const isAdminPath = window.location.pathname.startsWith('/admin')
const isAdmin = isAdminHost || isAdminPath

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? (
      supabaseReady ? (
        <AdminApp />
      ) : (
        <div className="admin-boot">
          Admin needs VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY set. See supabase/README.md.
        </div>
      )
    ) : (
      <App />
    )}
  </StrictMode>,
)
