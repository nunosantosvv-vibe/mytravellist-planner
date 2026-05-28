# MyTravelList Assistant — Home Screen

A playful, vibrant collaborative travel planner. This plan covers the home screen UI and design system (no backend yet — trip data will be local placeholder data).

## Design System
Update `src/styles.css` with a travel-inspired palette in oklch:
- **Primary**: teal (buttons, logo, accents)
- **Secondary/Accent**: warm orange (tags, highlights, CTA pop)
- **Background**: soft white / warm off-white
- Generous border-radius (extra rounded — `--radius` bumped up) for the playful feel
- Soft shadows and a subtle teal→orange gradient token for the hero "New Trip" button

## Components & Layout

```text
┌────────────────────────────────────────────┐
│  [✈ MyTravelList]            My Trips        │  ← top nav
├────────────────────────────────────────────┤
│                                              │
│        [ + New Trip ]  (big, centered)       │  ← hero CTA
│                                              │
│  Upcoming Journeys                           │
│  ◀ [card] [card] [card] [card] ▶            │  ← horizontal carousel
│                                              │
│  Past Adventures                             │
│  [card] [card] [card]                        │  ← responsive grid
│  [card] [card] [card]                        │
└────────────────────────────────────────────┘
```

### Files
- `src/styles.css` — new color tokens + rounded radius
- `src/components/Navbar.tsx` — logo (plane icon + name) and "My Trips" link
- `src/components/TripCard.tsx` — destination photo, name, dates, Leisure/Business tag badge
- `src/components/NewTripButton.tsx` — prominent rounded gradient CTA
- `src/components/UpcomingCarousel.tsx` — horizontal scroll/carousel using existing shadcn `carousel`
- `src/components/PastAdventuresGrid.tsx` — responsive card grid
- `src/lib/trips-data.ts` — placeholder trip data (destination, dates, type, image)
- `src/routes/index.tsx` — assemble home screen, update SEO head

### Trip Card
Each card shows:
- High-quality destination photo (generated placeholders)
- Destination name
- Date range
- A pill tag: **Leisure** (teal) or **Business** (orange)
- Rounded corners, hover lift animation

## Imagery
Generate ~6 destination photos (e.g. Santorini, Tokyo, Bali, New York, Paris, Cape Town) saved to `src/assets/` and imported into the cards.

## Notes
- "New Trip" and "My Trips" will be visual/interactive placeholders for now (no trip creation flow or persistence yet). I can wire up a real trip-creation form and Lovable Cloud storage in a follow-up.
