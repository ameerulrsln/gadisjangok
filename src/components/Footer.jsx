import { navLinks } from '../data/site.js'

export default function Footer() {
  return (
    <footer>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.1rem' }}>
        <img
          src="gadisjangok.PNG"
          alt="Gadis Jangok"
          style={{ width: 'clamp(120px,14vw,170px)', height: 'auto', objectFit: 'contain' }}
        />
      </div>
      <p className="f-tagline">Craft · Create · Connect</p>
      <ul className="f-links">
        {navLinks.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <p className="f-copy">© 2026 Gadis Jangok · gadisjangok.com · All rights reserved</p>
    </footer>
  )
}
