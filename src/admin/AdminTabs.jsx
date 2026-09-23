import { useLayoutEffect, useRef, useState } from 'react'
import AdminIcon from './AdminIcons.jsx'

// Section switcher inside the header. The filled pill slides from the old tab
// to the new one so the eye follows the change; on narrow screens the chosen
// tab is scrolled into view. Arrow keys move between tabs (ARIA tabs pattern).
export default function AdminTabs({ items, active, count, onChange }) {
  const listRef = useRef(null)
  const [pill, setPill] = useState(null)

  useLayoutEffect(() => {
    const list = listRef.current
    const el = list && list.querySelector('[aria-selected="true"]')
    if (!el) return
    const measure = () => setPill({ left: el.offsetLeft, width: el.offsetWidth })
    measure()

    const scroller = list.parentElement
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollTo({
        left: el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2,
        behavior: 'smooth',
      })
    }

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(list)
    return () => ro.disconnect()
  }, [active, items])

  function onKeyDown(e) {
    const keys = items.map((i) => i.key)
    const idx = keys.indexOf(active)
    let next
    if (e.key === 'ArrowRight') next = keys[(idx + 1) % keys.length]
    else if (e.key === 'ArrowLeft') next = keys[(idx - 1 + keys.length) % keys.length]
    else if (e.key === 'Home') next = keys[0]
    else if (e.key === 'End') next = keys[keys.length - 1]
    if (!next) return
    e.preventDefault()
    onChange(next)
    const btn = listRef.current && listRef.current.querySelector(`[data-key="${next}"]`)
    if (btn) btn.focus()
  }

  return (
    <div className="admin-tabs" role="tablist" ref={listRef} onKeyDown={onKeyDown}>
      {pill && (
        <span
          className="admin-tab-pill"
          aria-hidden="true"
          style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
        />
      )}
      {items.map((item) => {
        const selected = item.key === active
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            id={`tab-${item.key}`}
            aria-selected={selected}
            aria-controls={`panel-${item.key}`}
            tabIndex={selected ? 0 : -1}
            data-key={item.key}
            className={`admin-tab ${selected ? 'active' : ''}`}
            onClick={() => onChange(item.key)}
          >
            <AdminIcon name={item.icon} size={15} />
            {item.label}
            {selected && count != null && <span className="admin-tab-count">{count}</span>}
          </button>
        )
      })}
    </div>
  )
}
