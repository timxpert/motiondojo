import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Reel } from '@/components/Reel';
import { Intro } from '@/components/Intro';
import { Inside } from '@/components/Inside';
import { Course } from '@/components/Course';
import { DojoAI } from '@/components/DojoAI';
import { Community } from '@/components/Community';
import { Testimonials } from '@/components/Testimonials';
import { Philosophy } from '@/components/Philosophy';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Reel />
        <Intro />
        <Inside />
        <Course />
        <DojoAI />
        <Community />
        <Testimonials />
        <Philosophy />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
