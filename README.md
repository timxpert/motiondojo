# Motion Dojo — Official Website

The official main website for **Motion Dojo** ([motiondojo.com](https://motiondojo.com)): an exclusive, focused community platform for smartphone motion designers. Built with Next.js App Router and Tailwind CSS v4.

---

## 🛠️ Project Configuration & Quick Guide

### 1. How to Change `LEARN_MORE_URL`
All "Learn more" buttons across the entire website use a single source of truth defined in:
`src/config/site.ts`

```typescript
// src/config/site.ts
export const LEARN_MORE_URL = "https://blackbelt.motiondojo.com";
```
Simply edit this value and all call-to-action buttons across the site will automatically update and open in the same tab.

---

### 2. How to Add a Ninja to the Spotlight
Student profiles displayed in the **Meet the Keyframe Ninjas** spotlight are loaded from:
`src/data/ninjas.ts`

To add a new ninja:
1. Open `src/data/ninjas.ts`.
2. Add an approved student object to the `NINJAS` array:

```typescript
{
  slug: 'new-ninja-slug',
  name: 'Student Name',
  specialty: '3D Motion & Kinetic Typography',
  status: 'graduate', // 'graduate' | 'training'
  phase: 'Black Belt',
  cohort: 'Cohort 01',
  openToWork: true,
  photo: '/assets/student-photo.jpg', // Optional: leave empty '' to use neutral geometric shape avatar
  bio: "Student's own approved bio...",
  project: {
    title: 'Capstone Title',
    video: 'https://vimeo.com/123456789',
    note: 'Technical summary of the capstone project...',
    poster: '/images/project-poster.webp',
  },
  links: {
    website: 'https://example.com',
    instagram: 'student_handle',
    x: 'student_handle',
    linkedin: 'student-handle',
    email: 'student@example.com',
  },
  isSample: false,
}
```

*Note: Never invent achievements, employers, or people. All placeholders are strictly marked with `// TODO:` comments.*

---

### 3. How to Change a Story Video
Student testimonial cards and video modals are configured in:
`src/data/stories.ts`

To update a story video:
1. Open `src/data/stories.ts`.
2. Update the Vimeo URL, poster image, and quote summary for any student entry:

```typescript
{
  id: 'mary',
  name: 'Mary',
  role: 'Keyframe Ninja • Cohort 01',
  poster: '/images/testimonial-mary.webp',
  videoUrl: 'https://vimeo.com/1238665663', // Replace with any Vimeo link or ID
  summary: 'How the structured phases took her from struggling with graph curves to producing confident commercial work.',
}
```
The Vimeo embed automatically extracts the video ID and lazy-loads the player only when the student card is tapped.

---

## 🎨 Theme & Styling

- **CSS Variables**: Defined in `src/app/globals.css`.
  - Light theme: `bg #FFFFFF`, `surface #F7F5FC`, `surface-2 #F1EAFF`, `border #E7E3F1`, `text #14102A`, `muted #5E5877`, `accent #6D32E8`.
  - Dark theme: `bg #0D0A1A`, `surface #15112A`, `surface-2 #1D1838`, `border #2A2447`, `text #F4F1FF`, `muted #A9A2C6`, `accent #A77BFF`.
  - Accents: Kinetic Lime `#C8FF3D` (buttons, badges) with dark text `#14102A` in both modes to meet WCAG AA contrast.
- **Pre-paint Theme Detection**: Embedded inline script prevents theme flash on first load while respecting system preferences and `localStorage`.
- **Accessibility**: Meets WCAG AA contrast standards and honors `prefers-reduced-motion` and data saving mode (`saveData`).

---

## 🚀 Development & Build

```bash
# Run development server
npm run dev

# Run production build
npm run build

# Start production server
npm start
```
