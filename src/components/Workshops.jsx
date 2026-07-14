import { workshops } from '../data/content.js'

const hideOnError = (e) => {
  e.currentTarget.style.display = 'none'
}

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

export default function Workshops() {
  return (
    <section id="workshops">
      <div className="container">
        <div className="wshops-head reveal">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">
            Our <em>Workshops</em>
          </h2>
          <p className="section-desc">
            Small-group sessions designed to slow down, get messy, and make something you're
            truly proud of.
          </p>
        </div>
        <div className="workshop-grid">
          {workshops.map((w, i) => (
            <div
              className="w-card reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
              key={w.title}
            >
              <div className={`w-img ${w.imgClass}`}>
                {w.tag && <span className="w-tag">{w.tag}</span>}
                <img src={w.img} alt={w.alt} onError={hideOnError} />
              </div>
              <div className="w-body">
                <h3 className="w-title">{w.title}</h3>
                <p className="w-desc">{w.desc}</p>
                <div className="w-meta">
                  {w.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <div className="w-footer">
                  <div
                    className="w-price"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-light)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Community event · Free / low cost
                  </div>
                  <button className="w-btn" onClick={scrollToContact}>
                    Upcoming Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
