// Sticky gradient bar. Wide screens: brand | tabs | actions on one row.
// Below 1000px the tabs drop to their own side-scrolling row, so the logo,
// tabs and buttons never overlap at any width.
export default function AdminHeader({ onSignOut, children }) {
  return (
    <header className="admin-nav">
      <a className="admin-nav-brand" href="/" aria-label="Back to gadisjangok.com">
        <img src="/gadisjangok.PNG" alt="Gadis Jangok" />
        <span className="admin-nav-badge">Admin</span>
      </a>
      {children && (
        <nav className="admin-nav-center" aria-label="Content sections">
          {children}
        </nav>
      )}
      <div className="admin-nav-right">
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
