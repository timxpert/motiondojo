/**
 * Editable content for sections that will grow over time.
 * Add real items here; components render whatever is listed and skip empty lists.
 */

import { Story } from '@/types';

/* ------------------------------------------------------------------
   Black Belt in Motion Design: the four phases
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
   Meet the team: names, roles, bios and WhatsApp links as published on
   joinmotiondojo.vercel.app.
------------------------------------------------------------------- */
export type TeamMember = {
  name: string;
  short: string;
  role: string;
  bio: string;
  photo: string;
  focus: string;
  whatsapp: string;
};

export const TEAM: TeamMember[] = [
  {
    name: 'Muhammad Fatihi Abdullahi',
    short: 'Fatihi',
    role: 'Community manager',
    bio: 'I create engaging video ads for businesses and brands using AI video, professional editing, and motion design.',
    photo: '/assets/Muhammad Fatihi Abdullahi.jpg',
    focus: '50% 30%',
    whatsapp: 'https://wa.link/be49ci',
  },
  {
    name: 'Osho Elizabeth Oluwatobiloba',
    short: 'Elizabeth',
    role: 'Moderator',
    bio: 'Founder of Growth Code Builders. I help young people build digital skills, grow with purpose, and turn their potential into impact.',
    photo: '/assets/Osho Elizabeth Oluwatobiloba.jpg',
    focus: '50% 25%',
    whatsapp: 'https://wa.link/9z7uus',
  },
  {
    name: 'George Junior',
    short: 'Junior',
    role: 'Social media manager',
    bio: '2D animator and storyteller. Turning imagination into animation.',
    photo: '/assets/George Junior.jpg',
    focus: '50% 30%',
    whatsapp: 'https://wa.link/fw3u5j',
  },
];

/* ------------------------------------------------------------------
   Testimonials: supplied by the Motion Dojo team (video interviews on Vimeo).
------------------------------------------------------------------- */
export const TESTIMONIALS: (Story & { portrait?: boolean })[] = [
  {
    id: 'mary',
    name: 'Mary',
    role: 'Keyframe Ninja, Cohort 01',
    poster: '/images/testimonial-mary.webp',
    videoUrl: 'https://vimeo.com/1238665663/df4d75a3d5',
    summary:
      'How the structured phases took her from struggling with graph curves to producing confident commercial work.',
  },
  {
    id: 'roseline',
    name: 'Roseline',
    role: 'Keyframe Ninja, Cohort 02',
    poster: '/images/testimonial-roseline.webp',
    videoUrl: 'https://vimeo.com/1238666245/5ac2fba1a7',
    summary: 'Direct mentor critiques, self-paced momentum, and learning a professional motion workflow.',
    portrait: true,
  },
  {
    id: 'fatihi',
    name: 'Muhammad Fatihi',
    role: 'Keyframe Ninja, Cohort 02',
    poster: '/images/testimonial-fatihi.webp',
    videoUrl: 'https://vimeo.com/1238668293/f2b3558f85',
    summary: 'From design theory to fast client delivery, levelling up his portfolio and earning the Black Belt.',
  },
];
