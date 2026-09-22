import SmartImage from './SmartImage.jsx'
import { useTable } from '../hooks/useContent.js'

// Admin-published reports & photo stories. Hidden until posts exist in Supabase,
// so the static site is unchanged before the database is connected.
export default function Reports() {
  const posts = useTable('posts', { orderBy: 'published_at', fallback: null })
  const list = Array.isArray(posts)
    ? posts.filter((p) => p.title !== undefined).slice(0, 6)
    : []

  if (!list.length) return null

  return (
    <section id="reports">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Stories & Reports</span>
          <h2 className="section-title">
            Fresh from the <em>studio</em>
          </h2>
        </div>
        <div className="reports-grid">
          {list.map((p, i) => (
            <article className="report-card reveal" style={{ transitionDelay: `${i * 80}ms` }} key={p.id}>
              {p.image_url && (
                <div className="report-img">
                  <SmartImage src={p.image_url} alt={p.image_alt || p.title} />
                </div>
              )}
              <div className="report-body">
                {p.published_at && (
                  <time className="report-date">
                    {new Date(p.published_at).toLocaleDateString('en-MY', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                )}
                <h3 className="report-title">{p.title}</h3>
                {p.body && <p className="report-text">{p.body}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
