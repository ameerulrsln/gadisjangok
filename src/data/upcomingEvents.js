// UPCOMING EVENTS section (#contact → "Upcoming Events")
// Images live in: public/images/events/upcoming/
//
// To announce a new event: copy a block below, drop its poster into that folder,
// and point img() at the file name. Remove a block to drop the event.
// When an event has passed, move its block into pastEvents.js.

import { img, PLACEHOLDER } from './images.js'

export const upcomingEvents = [
  {
    bg: PLACEHOLDER.coral,
    img: img('upcomingEvents', 'upcoming-1.jpg'),
    alt: 'Batik Painting Session poster',
    date: '📅 Date · Time',
    title: 'Batik Painting Session',
    loc: '📍 Venue Name, Kuala Terengganu',
  },
  {
    bg: PLACEHOLDER.blue,
    img: img('upcomingEvents', 'upcoming-2.jpg'),
    alt: 'Zine Making Workshop poster',
    date: '📅 Date · Time',
    title: 'Zine Making Workshop',
    loc: '📍 Venue Name, Kuala Terengganu',
  },
  {
    bg: PLACEHOLDER.peach,
    img: img('upcomingEvents', 'upcoming-3.jpg'),
    alt: 'Flower Making Day poster',
    date: '📅 Date · Time',
    title: 'Flower Making Day',
    loc: '📍 Venue Name, Kuala Terengganu',
  },
]
