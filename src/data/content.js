// Index of the site's content. Each section owns its own file — edit those,
// not this one. This barrel just re-exports them so any import style works.
//
//   Section              Data file            Image folder
//   ─────────────────────────────────────────────────────────────────────
//   Our Workshops        workshops.js         public/images/workshops/
//   Our Works (gallery)  gallery.js           public/images/gallery/
//   Upcoming Events      upcomingEvents.js    public/images/events/upcoming/
//   Past Events          pastEvents.js        public/images/events/past/
//   Collaborators        collabs.js           public/images/collabs/
//   About                about.js             public/images/about/
//   Nav + form endpoint  site.js              —
//
// See IMAGES.md in the project root for the full guide to swapping photos.

export { workshops } from './workshops.js'
export { galleryItems } from './gallery.js'
export { upcomingEvents } from './upcomingEvents.js'
export { pastEvents } from './pastEvents.js'
export { collabSlides } from './collabs.js'
export { about } from './about.js'
export { navLinks, SHEET_URL } from './site.js'
export { img, IMAGE_DIRS, PLACEHOLDER } from './images.js'
