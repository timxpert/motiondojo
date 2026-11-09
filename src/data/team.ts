export interface TeamMember {
  name: string;
  /** Short name used on the hero timeline */
  short: string;
  role: string;
  photo: string;
}

// The people who run the dojo day to day (names and roles as listed on joinmotiondojo).
export const TEAM: TeamMember[] = [
  {
    name: 'Timxpert',
    short: 'Timxpert',
    role: 'Founder',
    photo: '/assets/Timxpert.jpg',
  },
  {
    name: 'Muhammad Fatihi Abdullahi',
    short: 'Fatihi',
    role: 'Community manager',
    photo: '/assets/Muhammad Fatihi Abdullahi.jpg',
  },
  {
    name: 'Osho Elizabeth Oluwatobiloba',
    short: 'Elizabeth',
    role: 'Moderator',
    photo: '/assets/Osho Elizabeth Oluwatobiloba.jpg',
  },
  {
    name: 'George Junior',
    short: 'Junior',
    role: 'Social media manager',
    photo: '/assets/George Junior.jpg',
  },
];
