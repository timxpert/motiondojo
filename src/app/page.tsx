import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HeroVideo } from '@/components/HeroVideo';
import { Belonging } from '@/components/Belonging';
import { About } from '@/components/About';
import { NinjaPath } from '@/components/NinjaPath';
import { Spotlight } from '@/components/Spotlight';
import { Stories } from '@/components/Stories';
import { FAQ } from '@/components/FAQ';
import { Closing } from '@/components/Closing';
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
        <HeroVideo />
        <Belonging />
        <About />
        <NinjaPath />
        <Stories />
        <Spotlight />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
