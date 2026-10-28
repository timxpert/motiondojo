export type ThemeMode = 'dark' | 'light';

export interface ProjectInfo {
  title: string;
  video: string;
  note: string;
  poster: string;
}

export interface StudentLinks {
  instagram?: string;
  x?: string;
  linkedin?: string;
  behance?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  whatsapp?: string;
  email?: string;
}

export interface StudentNinja {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  status: 'graduate' | 'training';
  phase: string;
  cohort: string;
  openToWork: boolean;
  photo: string;
  bio: string;
  project: ProjectInfo;
  links: StudentLinks;
}

export interface TestimonialStory {
  id: string;
  name: string;
  role: string;
  poster: string;
  videoUrl: string;
  summary: string;
  quote?: string;
}

export interface NinjaPhase {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  tag: string;
  skills: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
