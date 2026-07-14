// All editable site content lives here. Update text/images in one place.

export const workshops = [
  {
    imgClass: 'w-batik',
    tag: 'Most Loved ✨',
    img: 'images/batik-workshop.jpg',
    alt: 'Batik Painting Workshop',
    title: 'Batik Painting',
    desc: "Learn the traditional wax-resist technique on fabric. Design your own patterns and leave with a one-of-a-kind wearable piece of art you made yourself.",
    meta: ['⏱ 3 hours', '👥 Max 10 pax', '🌟 All levels'],
  },
  {
    imgClass: 'w-zine',
    img: 'images/zine-workshop.jpg',
    alt: 'Zine Workshop',
    title: 'Zine Workshop',
    desc: 'Cut, paste, draw and collage your way to a mini-magazine. Express yourself across 8 tiny pages — no art experience needed, just curiosity.',
    meta: ['⏱ 2 hours', '👥 Max 12 pax', '🌟 All levels'],
  },
  {
    imgClass: 'w-flower',
    img: 'images/flower-workshop.jpg',
    alt: 'Flower Making Workshop',
    title: 'Flower Making',
    desc: 'Craft delicate fabric or paper blooms using traditional techniques. Make a beautiful bouquet you can keep forever as a timeless keepsake.',
    meta: ['⏱ 2.5 hours', '👥 Max 8 pax', '🌟 All levels'],
  },
]

export const galleryItems = [
  { cls: 'g1', emoji: '🎨', modifier: 'tall' },
  { cls: 'g2', emoji: '🌿', modifier: '' },
  { cls: 'g3', emoji: '📒', modifier: '' },
  { cls: 'g4', emoji: '✨', modifier: 'wide' },
  { cls: 'g5', emoji: '💐', modifier: '' },
]

export const upcomingEvents = [
  { bg: 'linear-gradient(135deg,#F9E4D4,#F5C4D0)', img: 'images/event-upcoming-1.jpg', alt: 'Upcoming Event 1', date: '📅 Date · Time', title: 'Batik Painting Session', loc: '📍 Venue Name, Kuala Terengganu' },
  { bg: 'linear-gradient(135deg,#E8DCF0,#D4C4E8)', img: 'images/event-upcoming-2.jpg', alt: 'Upcoming Event 2', date: '📅 Date · Time', title: 'Zine Making Workshop', loc: '📍 Venue Name, Kuala Terengganu' },
  { bg: 'linear-gradient(135deg,#C8D8C0,#D8ECD4)', img: 'images/event-upcoming-3.jpg', alt: 'Upcoming Event 3', date: '📅 Date · Time', title: 'Flower Making Day', loc: '📍 Venue Name, Kuala Terengganu' },
]

export const pastEvents = [
  { bg: 'linear-gradient(135deg,#FFF4A8,#F5C4D0)', img: 'images/event-past-1.jpg', alt: 'Past Event 1', date: '📅 Past Date', title: 'Event Name Here', loc: '📍 Venue Name' },
  { bg: 'linear-gradient(135deg,#FFD3E3,#E8DCF0)', img: 'images/event-past-2.jpg', alt: 'Past Event 2', date: '📅 Past Date', title: 'Event Name Here', loc: '📍 Venue Name' },
  { bg: 'linear-gradient(135deg,#C8D8C0,#FFD3E3)', img: 'images/event-past-3.jpg', alt: 'Past Event 3', date: '📅 Past Date', title: 'Event Name Here', loc: '📍 Venue Name' },
]

export const collabSlides = [
  { bg: 'linear-gradient(135deg,#F9E4D4,#F5C4D0)', img: 'images/collab-1.jpg', alt: 'Collaborator 1', title: 'Collaborator / Event Name', sub: 'Location · Year' },
  { bg: 'linear-gradient(135deg,#E8DCF0,#D4C4E8)', img: 'images/collab-2.jpg', alt: 'Collaborator 2', title: 'Collaborator / Event Name', sub: 'Location · Year' },
  { bg: 'linear-gradient(135deg,#C8D8C0,#D8ECD4)', img: 'images/collab-3.jpg', alt: 'Collaborator 3', title: 'Collaborator / Event Name', sub: 'Location · Year' },
  { bg: 'linear-gradient(135deg,#FFF4A8,#FFD3E3)', img: 'images/collab-4.jpg', alt: 'Collaborator 4', title: 'Collaborator / Event Name', sub: 'Location · Year' },
]

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Events' },
  { href: '#collab', label: 'Collabs' },
  { href: '#contactus', label: 'Contact' },
]

// Feedback form → Google Sheets Apps Script endpoint
export const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbx4xHAb7agiQua3BsH6nKuhfZR14vA5UK8q05FTYQxXHIgVnsywYDgVxF62tDTOm4u8ww/exec'
