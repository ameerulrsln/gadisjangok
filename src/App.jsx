import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Workshops from './components/Workshops.jsx'
import About from './components/About.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import Collab from './components/Collab.jsx'
import ContactUs from './components/ContactUs.jsx'
import Footer from './components/Footer.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'

export default function App() {
  useScrollReveal()

  return (
    <>
      <a href="#workshops" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Workshops />
        <About />
        <Gallery />
        <Events />
        <Collab />
        <ContactUs />
      </main>
      <Footer />
    </>
  )
}
