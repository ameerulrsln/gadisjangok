# Updating images & content

Every section owns **one data file** and **one image folder**. To change a photo you
only ever touch those two places — never the components.

| Section | Data file | Image folder |
|---|---|---|
| Our Workshops | `src/data/workshops.js` | `public/images/workshops/` |
| Our Works (gallery) | `src/data/gallery.js` | `public/images/gallery/` |
| Upcoming Events | `src/data/upcomingEvents.js` | `public/images/events/upcoming/` |
| Past Events | `src/data/pastEvents.js` | `public/images/events/past/` |
| Collaborators | `src/data/collabs.js` | `public/images/collabs/` |
| About | `src/data/about.js` | `public/images/about/` |
| Nav + form endpoint | `src/data/site.js` | — |

Each image folder has its own `README.md` listing the exact file names it expects.

## Replace a photo (the common case)

Drop your file into the folder using the name already referenced in the data file.
For example, to set the Batik workshop photo:

```
public/images/workshops/batik.jpg
```

That's it — no code change. The name is already wired up in `src/data/workshops.js`.

## Use a different file name

Edit the `img()` call in that section's data file:

```js
img('workshops', 'batik-2026.jpg')   // → /images/workshops/batik-2026.jpg
```

The first argument is the folder key (see `src/data/images.js`); the second is the
file name inside it. A typo in the folder key throws a clear error at startup
instead of silently rendering nothing.

## Add a new card / tile / slide

Copy an existing block in the data file, change its text, and point `img()` at your
new file. Grids, carousel dots and the lightbox all size themselves off the list
length — nothing else to update.

## Leave a slot empty

Pass `null` instead of a file name:

```js
img('gallery', null)
```

## Placeholders

Missing or not-yet-added images never show a broken-image icon. `SmartImage`
(`src/components/SmartImage.jsx`) falls back to that section's placeholder
gradient or emoji, so the site always looks intentional while you gather photos.
The collaborator carousel goes one better and prints the exact path it wants.

Placeholder gradients come from `PLACEHOLDER` in `src/data/images.js` and follow
the site palette (Papaya Whip / Cool Horizon / Grapefruit Pink) — use those rather
than hardcoding hex values in data files.

## Image tips

- **Format:** `.jpg` for photos, `.png` only if you need transparency.
- **Size:** roughly 1200–1600px on the long edge; compress before committing
  (e.g. [squoosh.app](https://squoosh.app)) — these files ship to every visitor.
- **Crop:** match the shape noted in each folder's README (landscape for workshop
  and event cards, portrait for the About frame and tall gallery tile).
- **Alt text:** update `alt` in the data file when you change a photo. It's what
  screen readers announce and what shows if the file ever fails to load.
