// Branded sticky header for the /admin area, matching the public site's nav.
export default function AdminHeader({ email, onSignOut }) {
  return (
    <header className="admin-nav">
      <a className="admin-nav-brand" href="/" aria-label="Back to gadisjangok.com">
        <img src="/gadisjangok.PNG" alt="Gadis Jangok" />
        <span className="admin-nav-badge">Admin</span>
      </a>
      <div className="admin-nav-right">
        {email && <span className="admin-nav-user">{email}</span>}
        <a className="admin-nav-link" href="/">
          View site
        </a>
        {onSignOut && (
          <button type="button" className="admin-nav-signout" onClick={onSignOut}>
            Sign out
          </button>
        )}
      </div>
    </header>
  )
}
