import { useEffect, useState } from 'react'
import { supabase, uploadImage } from '../lib/supabase.js'
import AdminHeader from './AdminHeader.jsx'

// Which fields each content type shows in the admin form.
const SECTIONS = {
  posts: {
    label: 'Reports / Posts',
    folder: 'posts',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea' },
      { name: 'image', type: 'image' },
    ],
  },
  events: {
    label: 'Events',
    folder: 'events',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'event_date', type: 'text', placeholder: '14 June 2026 · 2pm' },
      { name: 'location', type: 'text', placeholder: 'PPAT, Kuala Terengganu' },
      { name: 'kind', type: 'select', options: ['upcoming', 'past'], default: 'upcoming' },
      { name: 'image', type: 'image' },
    ],
  },
  workshops: {
    label: 'Workshops',
    folder: 'workshops',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      { name: 'tag', type: 'text', placeholder: 'Most Loved' },
      { name: 'meta', type: 'text', placeholder: '3 hours, Max 10 pax, All levels' },
      { name: 'image', type: 'image' },
    ],
    transform: (v) => ({
      ...v,
      meta: v.meta ? v.meta.split(',').map((m) => m.trim()).filter(Boolean) : [],
    }),
  },
  gallery_items: {
    label: 'Gallery',
    folder: 'gallery',
    fields: [
      { name: 'image_alt', type: 'text', placeholder: 'Describe the photo', required: true },
      { name: 'modifier', type: 'select', options: ['', 'tall', 'wide'], default: '' },
      { name: 'image', type: 'image', required: true },
    ],
  },
  collaborators: {
    label: 'Collaborators',
    folder: 'collabs',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'text', placeholder: 'PPAT · 2025' },
      { name: 'image', type: 'image' },
    ],
  },
}

export default function AdminDashboard({ session }) {
  const [tab, setTab] = useState('posts')
  const [rows, setRows] = useState([])
  const [message, setMessage] = useState('')
  const cfg = SECTIONS[tab]

  async function load() {
    const { data } = await supabase.from(tab).select('*').order('created_at', { ascending: false })
    setRows(data || [])
  }

  useEffect(() => {
    load()
  }, [tab])

  async function togglePublish(row) {
    const next = row.status === 'published' ? 'draft' : 'published'
    const patch = { status: next }
    if (tab === 'posts' && next === 'published') patch.published_at = new Date().toISOString()
    await supabase.from(tab).update(patch).eq('id', row.id)
    load()
  }

  async function remove(id) {
    if (!window.confirm('Delete this item?')) return
    await supabase.from(tab).delete().eq('id', id)
    load()
  }

  async function onSubmit(e) {
    e.preventDefault()
    setMessage('')
    const form = new FormData(e.target)
    const values = {}
    for (const f of cfg.fields) {
      if (f.type === 'image') {
        const file = form.get('image')
        if (file && file.size) {
          values.image_url = await uploadImage(file, cfg.folder)
          values.image_alt = form.get('image_alt') || form.get('title') || ''
        }
      } else {
        values[f.name] = form.get(f.name) || ''
      }
    }
    const payload = cfg.transform ? cfg.transform(values) : values
    if (!payload.status) payload.status = 'published'
    const { error } = await supabase.from(tab).insert(payload)
    setMessage(error ? error.message : 'Published ✓')
    e.target.reset()
    load()
  }


  return (
    <div className="admin-shell">
      <AdminHeader email={session.user.email} onSignOut={() => supabase.auth.signOut()} />

      <nav className="admin-tabs">
        {Object.entries(SECTIONS).map(([key, s]) => (
          <button key={key} className={key === tab ? 'active' : ''} onClick={() => setTab(key)}>
            {s.label}
          </button>
        ))}
      </nav>

      <form className="admin-card" onSubmit={onSubmit}>
        <h2>New {cfg.label.replace(/s$/, '')}</h2>
        {cfg.fields.map((f) =>
          f.type === 'textarea' ? (
            <label key={f.name}>
              {f.name}
              <textarea name={f.name} placeholder={f.placeholder} required={f.required} />
            </label>
          ) : f.type === 'select' ? (
            <label key={f.name}>
              {f.name}
              <select name={f.name} defaultValue={f.default}>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o || '(none)'}
                  </option>
                ))}
              </select>
            </label>
          ) : f.type === 'image' ? (
            <label key={f.name}>
              Picture {f.required && '*'}
              <input type="file" name="image" accept="image/*" required={f.required} />
            </label>
          ) : (
            <label key={f.name}>
              {f.name}
              <input name={f.name} placeholder={f.placeholder} required={f.required} />
            </label>
          ),
        )}
        <button type="submit">Publish</button>
        {message && <p className="admin-ok">{message}</p>}
      </form>

      <div className="admin-list">
        {rows.map((r) => (
          <div className={`admin-row ${r.status}`} key={r.id}>
            {r.image_url && <img src={r.image_url} alt="" />}
            <div className="admin-row-main">
              <strong>{r.title || r.image_alt || '(untitled)'}</strong>
              <span>{r.status}</span>
            </div>
            <button onClick={() => togglePublish(r)}>
              {r.status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
            <button className="danger" onClick={() => remove(r.id)}>
              Delete
            </button>
          </div>
        ))}
        {!rows.length && <p className="admin-empty">Nothing here yet — publish your first one.</p>}
      </div>
    </div>
  )
}
