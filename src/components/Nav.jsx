import { useEffect, useState } from 'react'
import { navLinks } from '../data/site.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    function onScroll() {
      const cur = window.scrollY
      setScrolled(cur > 30)
      setHidden(cur > 120 && cur > lastScrollY)
      lastScrollY = cur
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const className = ['', scrolled && 'scrolled', hidden && 'nav-hidden']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <nav className={className}>
        <div className="nav-logo">
          <img src="gadisjangok.PNG" alt="Gadis Jangok" />
        </div>
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contactus" className="nav-cta">
          Say Hi 🌸
        </a>
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`.trim()}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`.trim()}
        hidden={!menuOpen}
      >
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contactus" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Say Hi 🌸
        </a>
      </div>
    </>
  )
}
