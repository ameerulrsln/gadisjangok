/** Original SVG marks, shared by illustrations and small interface details. */
export default function CraftIcon({ name = 'flower', className = '' }) {
  const paths = {
    flower: <><path d="M32 22C12 2 2 30 22 32 2 52 30 62 32 42c20 20 30-8 10-10C62 12 34 2 32 22Z" fill="currentColor" fillOpacity=".2"/><circle cx="32" cy="32" r="7"/><path d="M32 43v17m0-8c8 0 13-4 14-10-9 0-14 4-14 10"/></>,
    brush: <><path d="m27 37 23-29c5-5 10 0 6 5L35 43Z" fill="currentColor" fillOpacity=".2"/><path d="M27 37c-13-1-8 16-19 17 17 5 30-2 27-11M25 39l9 7"/></>,
    book: <><path d="M9 12c8-3 16-1 23 4 7-5 15-7 23-4v39c-8-3-16-1-23 4-7-5-15-7-23-4Z" fill="currentColor" fillOpacity=".15"/><path d="M32 16v39M16 24l9 2m-9 8 9 2m14-10 9-2m-9 12 9-2"/></>,
    spark: <path d="M32 5c2 19 8 25 27 27-19 2-25 8-27 27C30 40 24 34 5 32 24 30 30 24 32 5Z" fill="currentColor" fillOpacity=".2"/>,
    clock: <><circle cx="32" cy="32" r="23"/><path d="M32 17v16l12 7"/></>,
    people: <><circle cx="24" cy="22" r="10"/><path d="M6 53v-6c0-16 36-16 36 0v6M43 13c15 0 15 19 0 19m4 8c10 0 12 5 12 13"/></>,
  }
  return <svg className={`craft-icon ${className}`} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.flower}</svg>
}