# Motion Dojo — Visual, Animated Community Website

A bespoke, production-grade community website for **Motion Dojo**, an exclusive global community for smartphone motion designers.

Built from scratch with **React 19**, **TypeScript**, **Vite**, and custom **CSS design tokens**.

---

## 🥋 Brand Identity & Design System

### 1. Official Color Palette
- **Dojo Midnight**: `#140A2E` — deep backgrounds, dark surfaces, and immersive sections.
- **Motion Violet**: `#6D32E8` — primary brand color for buttons, links, active states, and interactive elements.
- **Electric Lavender**: `#A77BFF` — secondary accent for illustrations, highlights, and visual depth.
- **Kinetic Lime**: `#C8FF3D` — energetic accents, selected words, indicators, and important details.
- **White**: `#F7F5FF` — light-theme background, light surfaces, and text on dark backgrounds.

### 2. Signature Extended Gradient
`#6D32E8 → #A77BFF → #C8FF3D`
Applied selectively to hero headlines, keyframe motion trails, stage connectors, and progress indicators.

### 3. Typography
- **Clash Display**: Hero headlines, large section headings, editorial display statements, short expressive moments. Loaded via official Fontshare CDN.
- **Sora**: Body text, navigation, buttons, captions, FAQ content, labels and interface elements. Loaded via official Google Fonts CDN.

---

## 🚀 Key Features

1. **Light & Dark Theme Engine**
   - High-contrast, custom-tailored dark and light palettes.
   - Smooth theme toggle button in the navigation bar.
   - System preference detection and `localStorage` persistence.
   - Zero-flash inline script execution in `index.html`.

2. **Hero & Interactive Keyframe Timeline**
   - Headline: *"You were never meant to figure it all out alone."*
   - Interactive 60fps playhead scrubber with real-time frame counter (`00:00:24f`).
   - Animated SVG motion trajectory path with custom cubic-bezier curvature.
   - Primary CTA: **LEARN MORE** opens the dedicated `/about` page.

3. **Cinematic 16:9 Hero Video & Modal Player**
   - Full 16:9 cinematic video player with authentic poster artwork (`/images/hero-video-poster.webp`).
   - Accessible modal dialog for Vimeo embed with ESC listener and backdrop blur.

4. **Speed Graph Lab (About Motion Dojo Section)**
   - Interactive visualizer demonstrating real cubic-bezier speed curves (*Kinetic Punch*, *Elastic Snap*, *Cinematic S-Curve*, *Linear*).
   - Real-time animated canvas element demonstrating the difference between amateur mechanical motion and professional easing.

5. **Our Mission: 3-Part Ecosystem**
   - Visualizing **LEARN**, **BELONG**, and **WORK** with kinetic cards, metrics, and animated stage transitions.

6. **Community Philosophy**
   - Oversized Clash Display typographic crescendo: *"A skill can change what you do. The right community can change how far you go."*
   - Core values triad: *No Lone Wolfing*, *Radical Standards*, *Lifelong Network*.

7. **The Ninja Path**
   - Structured 4-phase progression:
     - `01 — Foundations`
     - `02 — Alight Motion Mastery`
     - `03 — Execution`
     - `04 — Portfolio and Mastery`
     - `Final Milestone — Black Belt in Motion Design`
   - Direct CTA to the course portal: `https://blackbelt.motiondojo.com`.

8. **Keyframe Ninjas Showcase**
   - Authentic student capstone projects from the Dojo directory.
   - Interactive project previews with play modal triggers and student credentials.
   - External CTA linking to the full showcase: `https://ninjasmotiondojo.vercel.app`.

9. **Stories from the Dojo (Student Experiences)**
   - Real video testimonials from graduates: **Mary** (Cohort 01), **Roseline** (Cohort 02), and **Muhammad Fatihi** (Cohort 02).
   - Instant video playback modal with authentic Vimeo feeds.

10. **Frequently Asked Questions**
    - Accessible accordion component with all 7 exact questions & answers regarding split payments (₦20,000), virtual community, phone specifications, Alight Motion, and certification.

11. **Dedicated `/about` Page**
    - Deep dive into Motion Dojo's story, philosophy, and ecosystem.
    - Seamless client-side route navigation between `/` and `/about`.

---

## 🛠️ Development & Production

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
