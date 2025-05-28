import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; // Updated Lenis import

import Navbar from '@/components/landing/Navbar';
import NewHeroSection from '@/components/landing/NewHeroSection';
import AdCreativeSection from '@/components/landing/AdCreativeSection';
import MetaCampaignsSection from '@/components/landing/MetaCampaignsSection'; // Import the Meta Campaigns section
import LeadsQualificationSection from '@/components/landing/LeadsQualificationSection'; // Added import
import Footer from '@/components/landing/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function NewLandingPage() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const pinContainerRef2 = useRef<HTMLDivElement>(null); // Added ref for second pin container
  const horizontalTrackRef2 = useRef<HTMLDivElement>(null); // Added ref for second horizontal track

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
      // const sections = gsap.utils.toArray<HTMLElement>(horizontalTrack.children); // trackWidth not used
      // const trackWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0); // trackWidth not used
      // Ensure track is wide enough if sections aren't exactly 100vw due to padding/margins
      // horizontalTrack.style.width = `${trackWidth}px`;


      const tl = gsap.timeline({ // Changed let to const
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
      const refreshHandler1 = () => tl.scrollTrigger?.refresh(); // Renamed for clarity
      ScrollTrigger.addEventListener("refresh", refreshHandler1);
      
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
        ScrollTrigger.removeEventListener("refresh", refreshHandler1);
      };
    }
  }, []);

  // useEffect for second horizontal scroll animation (MetaCampaigns and LeadsQualification)
  useEffect(() => {
    const pinContainer2 = pinContainerRef2.current;
    const horizontalTrack2 = horizontalTrackRef2.current;

    if (pinContainer2 && horizontalTrack2) {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer2,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalTrack2.offsetWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });

      tl2.to(horizontalTrack2, {
        x: () => -(horizontalTrack2.offsetWidth - window.innerWidth),
        ease: "none"
      });

      const refreshHandler2 = () => tl2.scrollTrigger?.refresh();
      ScrollTrigger.addEventListener("refresh", refreshHandler2);
      
      return () => {
        if (tl2.scrollTrigger) {
          tl2.scrollTrigger.kill();
        }
        tl2.kill();
        ScrollTrigger.removeEventListener("refresh", refreshHandler2);
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
            className="flex w-[200vw]" // Reverted width for two horizontal sections
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
        
        {/* New Pin Container for MetaCampaigns and LeadsQualification */}
        <div 
          ref={pinContainerRef2} 
          className="relative w-full" 
          style={{ 
            backgroundImage: `radial-gradient(ellipse at center, rgba(255, 107, 53, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(0, 0, 0, 0) 70%)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          <div 
            ref={horizontalTrackRef2} 
            className="flex w-[200vw]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='rgba(255,107,53,0.07)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          >
            <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center">
              <MetaCampaignsSection />
            </div>
            <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center">
              <LeadsQualificationSection />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
