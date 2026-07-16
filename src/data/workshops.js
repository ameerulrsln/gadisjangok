// OUR WORKSHOPS section (#workshops)
// Images live in: public/images/workshops/
// Replace a photo by dropping the file in that folder and updating the img() name below.

import { img } from './images.js'

export const workshops = [
  {
    imgClass: 'w-batik',
    tag: 'Most Loved ✨',
    img: img('workshops', 'batik.jpg'),
    alt: 'Batik Painting Workshop',
    title: 'Batik Painting',
    desc: "Learn the traditional wax-resist technique on fabric. Design your own patterns and leave with a one-of-a-kind wearable piece of art you made yourself.",
    meta: ['⏱ 3 hours', '👥 Max 10 pax', '🌟 All levels'],
  },
  {
    imgClass: 'w-zine',
    img: img('workshops', 'zine.jpg'),
    alt: 'Zine Workshop',
    title: 'Zine Workshop',
    desc: 'Cut, paste, draw and collage your way to a mini-magazine. Express yourself across 8 tiny pages — no art experience needed, just curiosity.',
    meta: ['⏱ 2 hours', '👥 Max 12 pax', '🌟 All levels'],
  },
  {
    imgClass: 'w-flower',
    img: img('workshops', 'flower.jpg'),
    alt: 'Flower Making Workshop',
    title: 'Flower Making',
    desc: 'Craft delicate fabric or paper blooms using traditional techniques. Make a beautiful bouquet you can keep forever as a timeless keepsake.',
    meta: ['⏱ 2.5 hours', '👥 Max 8 pax', '🌟 All levels'],
  },
]
