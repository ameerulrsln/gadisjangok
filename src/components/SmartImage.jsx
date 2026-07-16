import { useState } from 'react'

/**
 * Renders `src` if it loads, otherwise renders `fallback`.
 *
 * This is what lets every section ship with a placeholder gradient/emoji and
 * swap in a real photo simply by dropping a file into public/images/.
 * A missing or not-yet-added file degrades to the placeholder instead of a
 * broken-image icon.
 */
export default function SmartImage({ src, alt = '', fallback = null, ...rest }) {
  // Tracked by src (not a bare boolean) so changing the src retries the load.
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) return fallback

  return <img src={src} alt={alt} onError={() => setFailedSrc(src)} {...rest} />
}
