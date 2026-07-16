// Central registry of where each section's images live.
//
// To add or replace a photo:
//   1. Drop the file into the matching folder under public/images/ (see below).
//   2. Reference the file name in that section's data file.
// No other code changes are needed.
//
// Pass `null` as the file name to leave a slot empty — the section falls back to
// its placeholder gradient/emoji until a real photo is dropped in.

const BASE = '/images'

/** Folder on disk (under public/) for each section. */
export const IMAGE_DIRS = {
  workshops: `${BASE}/workshops`,
  gallery: `${BASE}/gallery`,
  upcomingEvents: `${BASE}/events/upcoming`,
  pastEvents: `${BASE}/events/past`,
  collabs: `${BASE}/collabs`,
  about: `${BASE}/about`,
}

/** Build the public URL for a file in one of the IMAGE_DIRS folders. */
export function img(section, file) {
  const dir = IMAGE_DIRS[section]
  if (!dir) {
    throw new Error(
      `Unknown image section "${section}". Expected one of: ${Object.keys(IMAGE_DIRS).join(', ')}`,
    )
  }
  return file ? `${dir}/${file}` : null
}

/** Placeholder gradients, drawn from the site palette, shown before a photo exists. */
export const PLACEHOLDER = {
  coral: 'linear-gradient(135deg,#FFE3D2,#FFC4C4)',
  blue: 'linear-gradient(135deg,#DCEBFF,#BFD9FF)',
  cream: 'linear-gradient(135deg,#FFEDD5,#FFD9CF)',
  peach: 'linear-gradient(135deg,#FFE1D0,#FFD8CC)',
  sky: 'linear-gradient(135deg,#EAF2FF,#CFE6FF)',
}
