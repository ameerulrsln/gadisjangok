import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import { supabaseReady } from './lib/supabase.js'
import './styles/global.css'
import './styles/admin.css'

// The admin lives at /admin and needs Supabase configured.
const isAdmin = window.location.pathname.startsWith('/admin')

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
