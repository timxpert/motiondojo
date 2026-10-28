import React from 'react';
import { Hero } from '../components/Hero';
import { HeroVideo } from '../components/HeroVideo';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { NinjaPath } from '../components/NinjaPath';
import { NinjasShowcase } from '../components/NinjasShowcase';
import { StoriesSection } from '../components/StoriesSection';
import { FAQSection } from '../components/FAQSection';

interface HomePageProps {
  onLearnMore: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLearnMore }) => {
  const scrollToPath = () => {
    const el = document.getElementById('ninja-path');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* 1. Hero Section */}
      <Hero onLearnMore={onLearnMore} onExplorePath={scrollToPath} />

      {/* 2. Hero Cinematic 16:9 Video */}
      <HeroVideo />

      {/* 3. About Motion Dojo Homepage Section */}
      <AboutSection onLearnMore={onLearnMore} />

      {/* 4. Our Mission (3 Connected Environments: Learn, Belong, Work) */}
      <MissionSection />

      {/* 5. Community Philosophy (Memorable Oversized Typographic Spread) */}
      <PhilosophySection />

      {/* 6. The Ninja Path (4 Structured Phases to Black Belt) */}
      <NinjaPath />

      {/* 7. Keyframe Ninjas Showcase (Real student capstones & portfolios) */}
      <NinjasShowcase />

      {/* 8. Student Experiences (Stories from the Dojo - Testimonial Videos) */}
      <StoriesSection />

      {/* 9. Frequently Asked Questions (Minimalist Accessible Accordion) */}
      <FAQSection />
    </main>
  );
};
