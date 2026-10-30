import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HeroVideo } from '@/components/HeroVideo';
import { AboutSection } from '@/components/AboutSection';
import { MissionSection } from '@/components/MissionSection';
import { StatementSection } from '@/components/StatementSection';
import { NinjaPathSection } from '@/components/NinjaPathSection';
import { NinjasSection } from '@/components/NinjasSection';
import { StoriesSection } from '@/components/StoriesSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Sticky Navigation Header with Theme Toggle */}
      <Header />

      <main className="flex-1">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Full-width 16:9 Video */}
        <HeroVideo />

        {/* 3. About Motion Dojo */}
        <AboutSection />

        {/* 4. Our Mission */}
        <MissionSection />

        {/* 5. Statement */}
        <StatementSection />

        {/* 6. The Ninja Path */}
        <NinjaPathSection />

        {/* 7. Spotlight: Meet the Keyframe Ninjas */}
        <NinjasSection />

        {/* 8. Stories from the Dojo */}
        <StoriesSection />

        {/* 9. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
