import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import { supabaseReady } from './lib/supabase.js'
import './styles/global.css'
import './styles/admin.css'

// The admin lives only on the admin subdomain (admin.gadisjangok.com) at its
// root, and needs Supabase configured. The main site has no /admin route.
const isAdmin = window.location.hostname.startsWith('admin.')

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
