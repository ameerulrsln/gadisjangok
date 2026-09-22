// Lightweight inline SVG icons for the admin UI (stroke-based, inherit currentColor).
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const PATHS = {
  post: (
    <>
      <path d="M4 4h16v16H4z" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </>
  ),
  event: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  workshop: (
    <>
      <path d="M12 3l2.2 4.6 5 .6-3.7 3.4 1 4.9L12 14.9 7.5 16.5l1-4.9L4.8 8.2l5-.6z" />
    </>
  ),
  gallery: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M21 16l-4.5-4.5L8 20" />
    </>
  ),
  collab: (
    <>
      <circle cx="8.5" cy="9" r="3" />
      <circle cx="16" cy="10" r="2.4" />
      <path d="M3.5 19c.6-2.8 2.6-4.4 5-4.4s4.4 1.6 5 4.4M14.5 15.4c2 .3 3.6 1.6 4.1 3.6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M21 16l-4.5-4.5L8 20" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.3-6.5-10a6.5 6.5 0 1 1 13 0c0 4.7-6.5 10-6.5 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  tag: (
    <>
      <path d="M3 11V4h7l9 9-7 7z" />
      <circle cx="8" cy="9" r="1.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M10 7V5h4v2M6.5 7l1 13h9l1-13" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  logout: (
    <>
      <path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10" />
    </>
  ),
}

export default function AdminIcon({ name, size }) {
  const style = size ? { width: size, height: size } : undefined
  return (
    <svg {...base} style={style}>
      {PATHS[name] || null}
    </svg>
  )
}
