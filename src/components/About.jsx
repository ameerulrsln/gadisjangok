import { about } from '../data/about.js'
import SmartImage from './SmartImage.jsx'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual reveal">
            <div className="about-frame">
              <SmartImage
                src={about.img}
                alt={about.alt}
                fallback={about.emoji}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="about-deco"></div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">500+</div>
              <div className="about-stat-lbl">Happy makers &amp; counting</div>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              Born from <em>a love of making</em>
            </h2>
            <blockquote className="about-quote">
              "We believe every woman holds an artist within — she just needs the right space to
              bloom."
            </blockquote>
            <p className="section-desc" style={{ marginBottom: '1rem' }}>
              Gadis Jangok started as a small creative gathering among friends who simply wanted to
              make pretty things together. What began in a cozy corner has grown into a warm
              community of makers across Malaysia.
            </p>
            <p className="section-desc">
              We run workshops that feel like a warm hug — welcoming, unhurried, and full of
              laughter. All materials are provided. No experience required, just a willing heart.
            </p>
            <div className="badges">
              <span className="badge">Est. 2025</span>
              <span className="badge">Terengganu based</span>
              <span className="badge">Women-led</span>
              <span className="badge">Beginner-friendly</span>
            </div>
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
