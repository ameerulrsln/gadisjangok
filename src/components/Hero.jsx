export default function Hero() {
  return (
    <section id="home">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="hero-floats">
        <div className="fe fe1">🌸</div>
        <div className="fe fe2">🌿</div>
        <div className="fe fe3">🎨</div>
        <div className="fe fe4">✿</div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">Art community · Kuala Terengganu , Malaysia</div>
        <h1 className="hero-title">
          Messy, happy
          <br />
          <em>creative days</em>
        </h1>
        <p className="hero-sub">
          A brighter, more playful space for batik painting, zine-making and flower crafting,
          made for curious people who want to create something joyful together.
        </p>
        <div className="hero-btns">
          <a href="#workshops" className="btn-primary">
            Explore Workshops
          </a>
          <a href="#about" className="btn-outline">
            Our Story
          </a>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line"></div>
          scroll
        </div>
      </div>
    </section>
  )
}
