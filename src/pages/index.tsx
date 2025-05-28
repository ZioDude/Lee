import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'; // Import Lenis

import Navbar from '@/components/landing/Navbar';
import NewHeroSection from '@/components/landing/NewHeroSection';
import AdCreativeSection from '@/components/landing/AdCreativeSection'; // Import the new section
import Footer from '@/components/landing/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function NewLandingPage() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // useEffect for Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // If you're using GSAP's ticker, you might prefer this:
    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000); // Lenis expects time in milliseconds
    // });
    // gsap.ticker.lagSmoothing(0);


    return () => {
      lenis.destroy();
      // If using GSAP ticker, remove the listener:
      // gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
    };
  }, []);

  // useEffect for horizontal scroll animation
  useEffect(() => {
    const pinContainer = pinContainerRef.current;
    const horizontalTrack = horizontalTrackRef.current;

    if (pinContainer && horizontalTrack) {
      const sections = gsap.utils.toArray<HTMLElement>(horizontalTrack.children);
      const trackWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
      // Ensure track is wide enough if sections aren't exactly 100vw due to padding/margins
      // horizontalTrack.style.width = `${trackWidth}px`;


      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: 1, // Smooth scrubbing
          start: "top top",
          end: () => `+=${horizontalTrack.offsetWidth - window.innerWidth}`, // End when the track has scrolled one section width
          invalidateOnRefresh: true, // Recalculate on resize
        }
      });

      tl.to(horizontalTrack, {
        x: () => -(horizontalTrack.offsetWidth - window.innerWidth), // Scroll one section width
        ease: "none" // Linear movement
      });

      // Refresh ScrollTrigger on window resize to handle responsive adjustments
      ScrollTrigger.addEventListener("refresh", () => tl.scrollTrigger?.refresh());
      
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  return (
    <>
      <Head>
        <title>Adverlead - Meet Lee</title> {/* Updated title */}
        <meta
          name="description"
          content="Meet Lee, your intelligent AI assistant for Adverlead."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Ensure no horizontal scrollbar from the main page layout itself */}
      <div style={{ overflowX: 'hidden' }}> 
        <Navbar />
        {/* Pin Container for Horizontal Scroll */}
        <div 
          ref={pinContainerRef} 
          className="relative w-full" 
          style={{ 
            backgroundImage: `radial-gradient(ellipse at center, rgba(255, 107, 53, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(0, 0, 0, 0) 70%)`,
            backgroundRepeat: 'no-repeat', // Radial gradient should not repeat by default, but explicit here
            backgroundPosition: 'center center', // Center the radial gradient
            // backgroundSize: 'cover', // Ensure it covers the area, might need adjustment
          }}
        >
          <div 
            ref={horizontalTrackRef} 
            className="flex w-[200vw]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='rgba(255,107,53,0.07)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          >
            <div className="w-screen h-screen flex-shrink-0"> {/* Section 1 Wrapper */}
              <NewHeroSection />
            </div>
            <div className="w-screen h-screen flex-shrink-0"> {/* Section 2 Wrapper */}
              <AdCreativeSection />
            </div>
          </div>
        </div>
        
        {/* Other sections will be added here later, after the pinned horizontal scroll */}
        <Footer />
      </div>
    </>
  );
}
