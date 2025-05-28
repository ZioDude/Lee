import React, { useEffect, useRef } from 'react';
import VaultModel from '@/../adverlead/src/components/landing/VaultModel'; // Corrected path
import { Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Button } from '@/components/ui/button'; // Import Button component
import Link from 'next/link'; // For CTA buttons
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";

// Removed duplicate gsap.registerPlugin(ScrollTrigger);

const NewHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // const paragraphRef = useRef<HTMLParagraphElement>(null); // Removed unused ref
  const ctaContainerRef = useRef<HTMLDivElement>(null); // Ref for CTA buttons container
  const modelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current; // For cleanup
    const elementsToAnimate = [
      titleRef.current,
      ctaContainerRef.current,
      modelContainerRef.current,
    ].filter(Boolean); 

    if (elementsToAnimate.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: currentSectionRef, // Use variable
        start: 'top 80%', 
        toggleActions: 'play none none none', 
      },
    });

    gsap.set(elementsToAnimate, { opacity: 0, y: 50 });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
      .to(ctaContainerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6') 
      .to(modelContainerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6'); 
      
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === currentSectionRef) { // Use variable in cleanup
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 bg-transparent text-text-headline overflow-hidden min-h-screen flex items-center"> {/* Adjusted padding, bg-transparent */}
      {/* Background div removed, will be handled by parent in pages/index.tsx */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-headline mb-6 leading-tight">
              <AuroraText colors={["#FF6B35", "#8B5CF6", "#FF8F65", "#FF4081"]}>Meet Lee </AuroraText>
              – Your AI Lead Generation Assistant
            </h1>
            <TextAnimate
              as="p"
              className="text-lg md:text-xl text-text-body max-w-xl mb-10"
              animation="slideUp" // Changed animation
              by="word"
              delay={0.2} 
              duration={1.0} // Made animation slower
            >
              Lee is your built-in AI assistant inside Adverlead, crafted specifically for renovation pros. 
              From automating Facebook ads to qualifying leads and booking appointments, Lee handles the heavy lifting.
            </TextAnimate>
            
            <div ref={ctaContainerRef} className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                asChild 
                size="lg" 
                className="font-semibold px-8 py-3 w-full sm:w-auto 
                           bg-transparent border-2 border-brand-deep-purple hover:bg-brand-deep-purple/10 /* Changed background, added border */
                           shadow-lg hover:shadow-xl hover:shadow-brand-deep-purple/20 
                           transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/get-started" className="block"> 
                  <AnimatedGradientText colorFrom="#FF6B35" colorTo="#8B5CF6" className="text-base md:text-lg"> {/* Ensure text size is appropriate */}
                    Start Generating Leads Now
                  </AnimatedGradientText>
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                className="font-semibold px-8 py-3 w-full sm:w-auto 
                           bg-transparent border-2 border-brand-primary-orange
                           hover:bg-brand-primary-orange/10
                           shadow-lg hover:shadow-xl hover:shadow-brand-primary-orange/20
                           transition-all duration-300 transform hover:scale-105"
              >
                {/* Apply gradient to text for the "Watch Demo" button */}
                <Link href="/demo" className="text-text-headline hover:brightness-125">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Spline Animation */}
          <div ref={modelContainerRef} className="flex justify-center items-center h-full min-h-[300px] md:min-h-[500px]">
            <Suspense fallback={<div className="text-text-muted-strong">Loading 3D Model...</div>}>
              <VaultModel />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
