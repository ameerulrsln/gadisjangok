import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase, uploadImage } from '../lib/supabase.js'
import AdminHeader from './AdminHeader.jsx'
import AdminIcon from './AdminIcons.jsx'
import AdminTabs from './AdminTabs.jsx'

// Content sections. Each defines the form fields shown for that type.
const SECTIONS = {
  posts: {
    label: 'Reports',
    singular: 'Report',
    icon: 'post',
    folder: 'posts',
    hint: 'Write-ups & stories that appear in the Reports section.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Weekend at PPAT' },
      { name: 'body', label: 'Body', type: 'textarea', placeholder: 'What happened, who came, what you made…' },
      { name: 'image', label: 'Cover photo', type: 'image' },
    ],
  },
  events: {
    label: 'Events',
    singular: 'Event',
    icon: 'event',
    folder: 'events',
    hint: 'Upcoming & past events shown on the site.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Crochet picnic' },
      { name: 'event_date', label: 'Date & time', type: 'text', placeholder: '14 June 2026 · 2pm' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'PPAT, Kuala Terengganu' },
      { name: 'kind', label: 'Type', type: 'select', options: ['upcoming', 'past'], default: 'upcoming' },
      { name: 'image', label: 'Photo', type: 'image' },
    ],
  },
  workshops: {
    label: 'Workshops',
    singular: 'Workshop',
    icon: 'workshop',
    folder: 'workshops',
    hint: 'Hands-on sessions people can join.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Beginner amigurumi' },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'What you will learn & make…' },
      { name: 'tag', label: 'Tag', type: 'text', placeholder: 'Most Loved' },
      {
        name: 'meta',
        label: 'Details',
        type: 'text',
        placeholder: '3 hours, Max 10 pax, All levels',
        help: 'Separate each detail with a comma.',
      },
      { name: 'image', label: 'Photo', type: 'image' },
    ],
    transform: (v) => ({
      ...v,
      meta: v.meta ? v.meta.split(',').map((m) => m.trim()).filter(Boolean) : [],
    }),
  },
  gallery_items: {
    label: 'Gallery',
    singular: 'Photo',
    icon: 'gallery',
    folder: 'gallery',
    hint: 'Photos in the community gallery grid.',
    fields: [
      { name: 'image_alt', label: 'Caption', type: 'text', required: true, placeholder: 'Describe the photo' },
      {
        name: 'modifier',
        label: 'Size',
        type: 'select',
        options: ['', 'tall', 'wide'],
        default: '',
        labels: { '': 'Normal', tall: 'Tall', wide: 'Wide' },
      },
      { name: 'image', label: 'Photo', type: 'image', required: true },
    ],
  },
  collaborators: {
    label: 'Collaborators',
    singular: 'Collaborator',
    icon: 'collab',
    folder: 'collabs',
    hint: 'Venues & partners we work with.',
    fields: [
      { name: 'title', label: 'Name', type: 'text', required: true, placeholder: 'PPAT' },
      { name: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'PPAT · 2025' },
      { name: 'image', label: 'Logo / photo', type: 'image' },
    ],
  },
}

const TABS = Object.entries(SECTIONS).map(([key, s]) => ({ key, label: s.label, icon: s.icon }))

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

// Image field with a styled picker + live preview.
function ImageField({ field, resetKey }) {
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    setPreview('')
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }, [resetKey])

  function onChange(e) {
    const file = e.target.files && e.target.files[0]
    setFileName(file ? file.name : '')
    setPreview(file ? URL.createObjectURL(file) : '')
  }

  return (
    <div className="af-field">
      <span className="af-label">
        {field.label}
        {field.required && <em>*</em>}
      </span>
      <label className={`af-file ${preview ? 'has-preview' : ''}`}>
        <input
          ref={inputRef}
          type="file"
          name="image"
          accept="image/*"
          required={field.required}
          onChange={onChange}
        />
        {preview ? (
          <img src={preview} alt="" className="af-file-preview" />
        ) : (
          <span className="af-file-icon">
            <AdminIcon name="image" size={22} />
          </span>
        )}
        <span className="af-file-text">
          <strong>{fileName || 'Choose an image'}</strong>
          <small>{fileName ? 'Click to change' : 'PNG or JPG, up to a few MB'}</small>
        </span>
      </label>
    </div>
  )
}

export default function AdminDashboard({ session }) {
  const [tab, setTab] = useState('posts')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null) // { type: 'ok' | 'err', text }
  const [resetKey, setResetKey] = useState(0)
  const cfg = SECTIONS[tab]

  async function load() {
    setLoading(true)
    const { data } = await supabase.from(tab).select('*').order('created_at', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }

  useEffect(() => {
    setMessage(null)
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setBusy(true)
    setMessage(null)
    const form = new FormData(e.target)
    const values = {}
    try {
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
      if (error) throw error
      setMessage({ type: 'ok', text: `${cfg.singular} published ✓` })
      e.target.reset()
      setResetKey((k) => k + 1)
      load()
    } catch (err) {
      setMessage({ type: 'err', text: err.message || 'Something went wrong' })
    } finally {
      setBusy(false)
    }
  }

  const firstName = useMemo(() => {
    const local = (session.user.email || '').split('@')[0]
    return local ? local.charAt(0).toUpperCase() + local.slice(1) : 'there'
  }, [session])


  return (
    <>
      <AdminHeader onSignOut={() => supabase.auth.signOut()}>
        <AdminTabs items={TABS} active={tab} count={loading ? null : rows.length} onChange={setTab} />
      </AdminHeader>

      <div className="admin-shell">
        <div className="admin-welcome">
          <h1>Hi, {firstName}</h1>
          <p>Signed in as {session.user.email}. Publish, unpublish or remove anything below.</p>
        </div>

        <div className="admin-panel" key={tab} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          <p className="admin-panel-hint">{cfg.hint}</p>

          <form className="admin-card" onSubmit={onSubmit}>
            <div className="admin-card-head">
              <span className="admin-card-icon">
                <AdminIcon name="plus" size={16} />
              </span>
              <h2>New {cfg.singular}</h2>
            </div>

            {cfg.fields.map((f) =>
              f.type === 'textarea' ? (
                <div className="af-field" key={f.name}>
                  <label className="af-label" htmlFor={`f-${f.name}`}>
                    {f.label}
                    {f.required && <em>*</em>}
                  </label>
                  <textarea id={`f-${f.name}`} name={f.name} placeholder={f.placeholder} required={f.required} />
                  {f.help && <small className="af-help">{f.help}</small>}
                </div>
              ) : f.type === 'select' ? (
                <div className="af-field" key={f.name}>
                  <label className="af-label" htmlFor={`f-${f.name}`}>
                    {f.label}
                  </label>
                  <select id={`f-${f.name}`} name={f.name} defaultValue={f.default}>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {(f.labels && f.labels[o]) || o || '(none)'}
                      </option>
                    ))}
                  </select>
                </div>
              ) : f.type === 'image' ? (
                <ImageField field={f} key={`${f.name}-${resetKey}`} resetKey={resetKey} />
              ) : (
                <div className="af-field" key={f.name}>
                  <label className="af-label" htmlFor={`f-${f.name}`}>
                    {f.label}
                    {f.required && <em>*</em>}
                  </label>
                  <input id={`f-${f.name}`} name={f.name} placeholder={f.placeholder} required={f.required} />
                  {f.help && <small className="af-help">{f.help}</small>}
                </div>
              ),
            )}

            <div className="admin-card-foot">
              <button type="submit" className="admin-submit" disabled={busy}>
                {busy ? 'Publishing…' : `Publish ${cfg.singular}`}
              </button>
              {message && <p className={`admin-msg ${message.type}`}>{message.text}</p>}
            </div>
          </form>

          <div className="admin-list-head">
            <h3>
              Published &amp; drafts <span>{rows.length}</span>
            </h3>
          </div>


          {loading ? (
            <div className="admin-loading">
              <span className="admin-spinner" /> Loading…
            </div>
          ) : (
            <div className="admin-list">
              {rows.map((r) => (
                <article className={`admin-row ${r.status}`} key={r.id}>
                  {r.image_url ? (
                    <img src={r.image_url} alt="" className="admin-row-thumb" />
                  ) : (
                    <span className="admin-row-thumb admin-row-nothumb">
                      <AdminIcon name={cfg.icon} size={20} />
                    </span>
                  )}
                  <div className="admin-row-main">
                    <strong>{r.title || r.image_alt || '(untitled)'}</strong>
                    <span className="admin-row-meta">
                      <em className={`admin-badge ${r.status}`}>{r.status}</em>
                      {r.event_date && (
                        <i>
                          <AdminIcon name="calendar" size={13} /> {r.event_date}
                        </i>
                      )}
                      {r.location && (
                        <i>
                          <AdminIcon name="pin" size={13} /> {r.location}
                        </i>
                      )}
                      {r.tag && (
                        <i>
                          <AdminIcon name="tag" size={13} /> {r.tag}
                        </i>
                      )}
                      {r.subtitle && <i>{r.subtitle}</i>}
                      {r.created_at && <i>{fmtDate(r.created_at)}</i>}
                    </span>
                  </div>
                  <div className="admin-row-actions">
                    <button
                      type="button"
                      className={`admin-action ${r.status === 'published' ? 'muted' : 'go'}`}
                      onClick={() => togglePublish(r)}
                    >
                      {r.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      className="admin-action danger"
                      onClick={() => remove(r.id)}
                      aria-label="Delete"
                    >
                      <AdminIcon name="trash" size={15} />
                    </button>
                  </div>
                </article>
              ))}
              {!rows.length && (
                <div className="admin-empty">
                  <AdminIcon name={cfg.icon} size={26} />
                  <p>
                    Nothing here yet.
                    <br />
                    <span>Publish your first {cfg.singular.toLowerCase()} using the form above.</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
