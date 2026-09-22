import { upcomingEvents } from '../data/upcomingEvents.js'
import { pastEvents } from '../data/pastEvents.js'
import SmartImage from './SmartImage.jsx'
import { useTable } from '../hooks/useContent.js'

// Map a DB row to the shape EventCard already renders.
const fromDb = (ev) => ({
  img: ev.image_url,
  alt: ev.image_alt || ev.title,
  date: ev.event_date,
  title: ev.title,
  loc: ev.location,
})

function EventCard({ ev, status, index = 0 }) {
  return (
    <div className="ev-card reveal" style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="ev-img" style={{ background: ev.bg }}>
        <SmartImage src={ev.img} alt={ev.alt} />
        <span className={`ev-status ${status}`}>{status === 'upcoming' ? 'Upcoming' : 'Past'}</span>
      </div>
      <div className="ev-body">
        <div className="ev-date">{ev.date}</div>
        <div className="ev-title">{ev.title}</div>
        <div className="ev-loc">{ev.loc}</div>
      </div>
    </div>
  )
}

export default function Events() {
  const dbEvents = useTable('events', { fallback: null })
  const hasDb = Array.isArray(dbEvents) && dbEvents.length > 0 && dbEvents[0].kind !== undefined
  const upcoming = hasDb
    ? dbEvents.filter((e) => e.kind === 'upcoming').map(fromDb)
    : upcomingEvents
  const past = hasDb ? dbEvents.filter((e) => e.kind === 'past').map(fromDb) : pastEvents

  return (
    <section id="contact">
      <div className="container">
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="reveal">
            <span className="section-label">What's On</span>
            <h2 className="section-title">
              Upcoming <em>Events</em>
            </h2>
          </div>
          <div className="events-grid">
            {upcoming.map((ev, i) => (
              <EventCard ev={ev} status="upcoming" index={i} key={i} />
            ))}
          </div>
        </div>

        <div>
          <div className="reveal">
            <span className="section-label">Looking Back</span>
            <h2 className="section-title">
              Past <em>Events</em>
            </h2>
          </div>
          <div className="events-grid">
            {past.map((ev, i) => (
              <EventCard ev={ev} status="past" index={i} key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
