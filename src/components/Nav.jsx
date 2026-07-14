import { useEffect, useState } from 'react'
import { navLinks } from '../data/content.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

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

  const className = ['', scrolled && 'scrolled', hidden && 'nav-hidden']
    .filter(Boolean)
    .join(' ')

  return (
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
    </nav>
  )
}
