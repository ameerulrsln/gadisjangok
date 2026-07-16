// OUR WORKS / gallery section (#gallery)
// Images live in: public/images/gallery/
//
// `emoji` is the fallback shown until the matching file exists in that folder.
// `modifier` controls the grid shape: 'tall' | 'wide' | '' (normal).
// `cls` picks the placeholder gradient defined in styles/global.css (.g1–.g5).

import { img } from './images.js'

export const galleryItems = [
  { cls: 'g1', emoji: '🎨', modifier: 'tall', img: img('gallery', 'work-1.jpg'), alt: 'Batik painting in progress' },
  { cls: 'g2', emoji: '🌿', modifier: '', img: img('gallery', 'work-2.jpg'), alt: 'Handmade craft detail' },
  { cls: 'g3', emoji: '📒', modifier: '', img: img('gallery', 'work-3.jpg'), alt: 'Zine spread made at a workshop' },
  { cls: 'g4', emoji: '✨', modifier: 'wide', img: img('gallery', 'work-4.jpg'), alt: 'Workshop table full of makers' },
  { cls: 'g5', emoji: '💐', modifier: '', img: img('gallery', 'work-5.jpg'), alt: 'Finished paper flower bouquet' },
]
