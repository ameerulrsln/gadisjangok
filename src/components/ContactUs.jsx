import { useState } from 'react'
import { SHEET_URL } from '../data/site.js'

export default function ContactUs() {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submitFeedback() {
    const trimmedName = name.trim()
    const trimmedMsg = msg.trim()

    if (!trimmedName || !trimmedMsg) {
      alert('Please fill in both fields 🌸')
      return
    }

    setSending(true)
    setSuccess(false)

    const form = new FormData()
    form.append('name', trimmedName)
    form.append('feedback', trimmedMsg)

    try {
      await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: form })
      setName('')
      setMsg('')
      setSuccess(true)
    } catch (err) {
      alert('Failed to send feedback. Please try again.')
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contactus">
      <div className="container">
        <div className="cu-inner reveal">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Say <em>Hello</em> 🌸
          </h2>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
            Have questions, ideas, or just want to say hi? Leave us your name and a little note —
            we read every single one.
          </p>

          <div className="cu-form">
            <div className="cu-field">
              <label htmlFor="cu-name">Your Name</label>
              <input
                type="text"
                id="cu-name"
                placeholder="e.g. Aliah "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="cu-field">
              <label htmlFor="cu-msg">Your Feedback / Message</label>
              <textarea
                id="cu-msg"
                placeholder="Tell us anything — what you loved, what you'd like to see, or just drop a kind word 🌸"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="button"
              className="cu-submit"
              onClick={submitFeedback}
              disabled={sending}
            >
              {sending ? 'Sending...' : ' Send Feedback 🌸'}
            </button>
            {success && (
              <div className="cu-success">
                ✅ Thank you so much! We got your message and will read it with love 🌸
              </div>
            )}
          </div>

          <div className="social-row" style={{ marginTop: '2.5rem' }}>
            <a href="https://www.instagram.com/gadisjangok/" target="_blank" rel="noreferrer" className="soc-btn">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@gadisjangok" target="_blank" rel="noreferrer" className="soc-btn">
              TikTok
            </a>
            <a href="https://wa.me/60142945456" target="_blank" rel="noreferrer" className="soc-btn">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
