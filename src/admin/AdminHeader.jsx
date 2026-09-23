// Stripe-style sticky header: gradient bar, logo left, centered section nav,
// white pill action on the right.
export default function AdminHeader({ email, onSignOut, children }) {
  return (
    <header className="admin-nav">
      <a className="admin-nav-brand" href="/" aria-label="Back to gadisjangok.com">
        <img src="/gadisjangok.PNG" alt="Gadis Jangok" />
        <span className="admin-nav-badge">Admin</span>
      </a>
      {children && <nav className="admin-nav-center">{children}</nav>}
      <div className="admin-nav-right">
        {email && (
          <span className="admin-nav-user" title={email}>
            {email}
          </span>
        )}
        <a className="admin-nav-link" href="/">
          View site
        </a>
        {onSignOut && (
          <button type="button" className="admin-nav-signout" onClick={onSignOut}>
            Sign out <span className="admin-nav-arrow">›</span>
          </button>
        )}
      </div>
    </header>
  )
}
