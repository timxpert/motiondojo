/**
 * Editable content for sections that will grow over time.
 * Add real items here; components render whatever is listed and skip empty lists.
 */

import { Story } from '@/types';

/* ------------------------------------------------------------------
   Black Belt in Motion Design — the four phases
------------------------------------------------------------------- */
export const COURSE_PHASES = [
  { title: 'Foundations', body: 'Principles of motion, typography, colour and your first animations.' },
  { title: 'Tool Mastery', body: 'Keyframes, the graph editor, effects and camera moves.' },
  { title: 'Creative Execution', body: 'Turn ideas into finished motion graphics and product visuals.' },
  { title: 'Portfolio & Mastery', body: 'Build your portfolio and prepare for real client work.' },
];

/* ------------------------------------------------------------------
   Dojo's AI
   Nothing below is invented. Add real details when they're ready:
   - features: short title + one-line description each
   - screenshots: image paths in /public (e.g. '/images/dojo-ai-1.webp')
   - demoVideo: a Vimeo/YouTube URL or '/videos/dojo-ai.mp4'
   - access: one line on who can use it and how
------------------------------------------------------------------- */
export const DOJO_AI = {
  features: [] as { title: string; body: string }[],
  screenshots: [] as { src: string; alt: string }[],
  demoVideo: '',
  access: '',
};

/* ------------------------------------------------------------------
   Community gallery
   Replace or extend with photos from sessions, challenges and collaborations.
   `shape` controls the tile: 'tall' | 'wide' | 'square'.
------------------------------------------------------------------- */
export type GalleryItem = { src: string; alt: string; caption: string; shape: 'tall' | 'wide' | 'square'; focus?: string };

export const GALLERY: GalleryItem[] = [
  { src: '/assets/Timxpert.jpg', alt: 'Timxpert', caption: 'Timxpert, founder', shape: 'tall', focus: '50% 25%' },
  {
    src: '/images/testimonial-mary.webp',
    alt: 'Mary sharing her story',
    caption: 'Mary, Cohort 01',
    shape: 'wide',
  },
  {
    src: '/images/about-visual.webp',
    alt: 'An Alight Motion project open on a phone',
    caption: 'Made on a phone in Alight Motion',
    shape: 'tall',
    focus: '50% 30%',
  },
  {
    src: '/assets/Muhammad Fatihi Abdullahi.jpg',
    alt: 'Muhammad Fatihi Abdullahi',
    caption: 'Fatihi, community manager',
    shape: 'square',
    focus: '50% 30%',
  },
  {
    src: '/assets/Osho Elizabeth Oluwatobiloba.jpg',
    alt: 'Osho Elizabeth Oluwatobiloba',
    caption: 'Elizabeth, moderator',
    shape: 'square',
    focus: '50% 25%',
  },
  {
    src: '/images/testimonial-fatihi.webp',
    alt: 'Muhammad Fatihi sharing his story',
    caption: 'Muhammad Fatihi, Cohort 02',
    shape: 'wide',
  },
  {
    src: '/assets/George Junior.jpg',
    alt: 'George Junior',
    caption: 'Junior, social media manager',
    shape: 'wide',
    focus: '50% 30%',
  },
];

/* ------------------------------------------------------------------
   Keyframe Ninjas — students of Black Belt in Motion Design.
   Only real, approved members. `photo` can be a portrait or a video still;
   `focus` sets the crop (CSS object-position).
------------------------------------------------------------------- */
export type NinjaProfile = {
  name: string;
  cohort: string;
  photo: string;
  focus: string;
  note: string;
};

export const NINJAS: NinjaProfile[] = [
  {
    name: 'Mary',
    cohort: 'Cohort 01',
    photo: '/images/testimonial-mary.webp',
    focus: '50% 40%',
    note: 'Went from struggling with graph curves to confident commercial work.',
  },
  {
    name: 'Roseline Ibironke',
    cohort: 'Cohort 02',
    photo: '/images/testimonial-roseline.webp',
    focus: '50% 38%',
    note: 'Built momentum at her own pace with direct mentor critiques.',
  },
  {
    name: 'Muhammad Fatihi',
    cohort: 'Cohort 02',
    photo: '/images/testimonial-fatihi.webp',
    focus: '50% 40%',
    note: 'Levelled up his portfolio and earned the Black Belt.',
  },
];

/* ------------------------------------------------------------------
   Testimonials — supplied by the Motion Dojo team (video interviews on Vimeo).
------------------------------------------------------------------- */
export const TESTIMONIALS: (Story & { portrait?: boolean })[] = [
  {
    id: 'mary',
    name: 'Mary',
    role: 'Keyframe Ninja, Cohort 01',
    poster: '/images/testimonial-mary.webp',
    videoUrl: 'https://vimeo.com/1238665663',
    summary:
      'How the structured phases took her from struggling with graph curves to producing confident commercial work.',
  },
  {
    id: 'roseline',
    name: 'Roseline',
    role: 'Keyframe Ninja, Cohort 02',
    poster: '/images/testimonial-roseline.webp',
    videoUrl: 'https://vimeo.com/1238666245',
    summary: 'Direct mentor critiques, self-paced momentum, and learning a professional motion workflow.',
    portrait: true,
  },
  {
    id: 'fatihi',
    name: 'Muhammad Fatihi',
    role: 'Keyframe Ninja, Cohort 02',
    poster: '/images/testimonial-fatihi.webp',
    videoUrl: 'https://vimeo.com/1238668293',
    summary: 'From design theory to fast client delivery, levelling up his portfolio and earning the Black Belt.',
  },
];
