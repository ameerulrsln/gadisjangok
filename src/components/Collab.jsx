import { useEffect, useState } from 'react'
import { collabSlides } from '../data/collabs.js'
import SmartImage from './SmartImage.jsx'

export default function Collab() {
  const [current, setCurrent] = useState(0)
  const total = collabSlides.length

  const goToSlide = (n) => setCurrent(((n % total) + total) % total)
  const nextSlide = () => goToSlide(current + 1)
  const prevSlide = () => goToSlide(current - 1)

  // Auto-advance every 4s; resets whenever the slide changes (manual nav included).
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 4000)
    return () => clearInterval(timer)
  }, [current, total])

  return (
    <section id="collab">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-label">People We've Made With</span>
          <h2 className="section-title">
            Past <em>Collaborators</em>
          </h2>
        </div>

        <div className="carousel-wrap reveal">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {collabSlides.map((s, i) => (
              <div className="carousel-slide" key={i}>
                <div className="carousel-slide-placeholder" style={{ background: s.bg }}>
                  <SmartImage
                    src={s.img}
                    alt={s.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      inset: 0,
                    }}
                    fallback={
                      <>
                        <span style={{ position: 'relative' }}>Your Photo Here</span>
                        <span style={{ position: 'relative', fontSize: '0.68rem', opacity: 0.6 }}>
                          Add: {s.img}
                        </span>
                      </>
                    }
                  />
                </div>
                <div className="slide-caption">
                  <div className="slide-caption-title">{s.title}</div>
                  <div className="slide-caption-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {collabSlides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`.trim()}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
            ></button>
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="carousel-arrow" aria-label="Previous slide" onClick={prevSlide}>
            &#8592;
          </button>
          <button className="carousel-arrow" aria-label="Next slide" onClick={nextSlide}>
            &#8594;
          </button>
        </div>

        <div className="social-row" style={{ marginTop: '3rem' }}>
          <a href="https://www.instagram.com/gadisjangok/" target="_blank" rel="noreferrer" className="soc-btn">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@gadisjangok" target="_blank" rel="noreferrer" className="soc-btn">
            TikTok
          </a>
          <a href="https://wa.me/60120000404" target="_blank" rel="noreferrer" className="soc-btn">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
