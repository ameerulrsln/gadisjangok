import { useState } from 'react'
import CraftIcon from './CraftIcon.jsx'

/**
 * Renders a photo or an original craft illustration. Custom React fallbacks are preserved.
 *
 * This is what lets every section ship with a craft illustration and
 * swap in a real photo simply by dropping a file into public/images/.
 * A missing or not-yet-added file degrades to the placeholder instead of a
 * broken-image icon.
 */
export default function SmartImage({ src, alt = '', fallback = null, ...rest }) {
  // Tracked by src (not a bare boolean) so changing the src retries the load.
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {
    if (fallback && typeof fallback !== 'string') return fallback
    const name = /zine|book/i.test(alt) ? 'book' : /batik|paint/i.test(alt) ? 'brush' : /workshop|makers/i.test(alt) ? 'spark' : 'flower'
    return <span className={`image-icon art-${name}`} aria-label={`${alt || 'Craft'} illustration`} role="img"><CraftIcon name={name} /></span>
  }

  return <img src={src} alt={alt} onError={() => setFailedSrc(src)} {...rest} />
}
