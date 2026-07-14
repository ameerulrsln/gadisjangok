import { useEffect, useState } from 'react'
import { galleryItems } from '../data/content.js'

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null

  const close = () => setOpenIndex(null)
  const prev = () => setOpenIndex((i) => (i + galleryItems.length - 1) % galleryItems.length)
  const next = () => setOpenIndex((i) => (i + 1) % galleryItems.length)

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const active = isOpen ? galleryItems[openIndex] : null

  return (
    <section id="gallery">
      <div className="container">
        <div className="gallery-head reveal">
          <div>
            <span className="section-label">Our Works</span>
            <h2 className="section-title">
              A glimpse of the <em>magic</em>
            </h2>
          </div>
          <a
            href="https://instagram.com/gadisjangok/"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            Follow on Instagram
          </a>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((g, i) => (
            <button
              type="button"
              className={`g-item reveal ${g.modifier}`.trim()}
              style={{ transitionDelay: `${i * 70}ms` }}
              key={i}
              aria-label={`Open gallery image ${i + 1}`}
              onClick={() => setOpenIndex(i)}
            >
              <div
                className={`g-pic ${g.cls}`}
                style={g.modifier === 'tall' ? { height: '100%' } : undefined}
              >
                {g.img ? <img src={g.img} alt={g.alt || ''} /> : g.emoji}
              </div>
              <div className="g-overlay"></div>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`lightbox ${isOpen ? 'open' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery viewer"
        hidden={!isOpen}
        onClick={close}
      >
        <button className="lightbox-btn lightbox-close" aria-label="Close" onClick={close}>
          ✕
        </button>
        <button
          className="lightbox-btn lightbox-prev"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
        >
          ‹
        </button>
        {active && (
          <div className={`lightbox-stage ${active.cls}`} onClick={(e) => e.stopPropagation()}>
            {active.img ? <img src={active.img} alt={active.alt || ''} /> : active.emoji}
          </div>
        )}
        <button
          className="lightbox-btn lightbox-next"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
        >
          ›
        </button>
      </div>
    </section>
  )
}
