// PAST EVENTS section (#contact → "Past Events")
// Images live in: public/images/events/past/
//
// When an event in upcomingEvents.js has happened, move its block here and
// re-point img() at a photo in the past-events folder.

import { img, PLACEHOLDER } from './images.js'

export const pastEvents = [
  {
    bg: PLACEHOLDER.cream,
    img: img('pastEvents', 'past-1.jpg'),
    alt: 'Photo from a past event',
    date: '📅 Past Date',
    title: 'Event Name Here',
    loc: '📍 Venue Name',
  },
  {
    bg: PLACEHOLDER.sky,
    img: img('pastEvents', 'past-2.jpg'),
    alt: 'Photo from a past event',
    date: '📅 Past Date',
    title: 'Event Name Here',
    loc: '📍 Venue Name',
  },
  {
    bg: PLACEHOLDER.peach,
    img: img('pastEvents', 'past-3.jpg'),
    alt: 'Photo from a past event',
    date: '📅 Past Date',
    title: 'Event Name Here',
    loc: '📍 Venue Name',
  },
]
