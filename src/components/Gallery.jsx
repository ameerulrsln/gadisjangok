import { galleryItems } from '../data/content.js'

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="container">
        <div className="gallery-head">
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
            <div className={`g-item ${g.modifier}`.trim()} key={i}>
              <div
                className={`g-pic ${g.cls}`}
                style={g.modifier === 'tall' ? { height: '100%' } : undefined}
              >
                {g.emoji}
              </div>
              <div className="g-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
