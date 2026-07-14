import { upcomingEvents, pastEvents } from '../data/content.js'

const hideOnError = (e) => {
  e.currentTarget.style.display = 'none'
}

function EventCard({ ev, status }) {
  return (
    <div className="ev-card">
      <div className="ev-img" style={{ background: ev.bg }}>
        <img src={ev.img} alt={ev.alt} onError={hideOnError} />
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
  return (
    <section id="contact">
      <div className="container">
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">What's On</span>
          <h2 className="section-title">
            Upcoming <em>Events</em>
          </h2>
          <div className="events-grid">
            {upcomingEvents.map((ev, i) => (
              <EventCard ev={ev} status="upcoming" key={i} />
            ))}
          </div>
        </div>

        <div>
          <span className="section-label">Looking Back</span>
          <h2 className="section-title">
            Past <em>Events</em>
          </h2>
          <div className="events-grid">
            {pastEvents.map((ev, i) => (
              <EventCard ev={ev} status="past" key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
