import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // Assuming Next.js Image component
import { BarChartBig, Users, Settings, Bell, LayoutDashboard, ShoppingBag, MessageSquare, Send, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { TextAnimate } from '@/components/magicui/text-animate'; // We can add this later for the right-side text

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Using placeholder images from HeroSection for now
const placeholderAdImages = [
  "/PLACELIFT.png",
  "/renovation-Bathroom-1747859972116.jpg",
];

const AdCreativeSection = () => {
  const animatedDashboardContainerRef = useRef<HTMLDivElement>(null); // Ref for the dashboard container in this section
  
  // State for the interactive dashboard sequence
  const [currentDashboardView, setCurrentDashboardView] = useState<'initialStatic' | 'chat' | 'loading' | 'results'>('initialStatic');
  
  // Refs for text elements within the animated dashboard
  const userPromptRef = useRef<HTMLParagraphElement>(null);
  const leeReplyRef = useRef<HTMLParagraphElement>(null);
  const adImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Ref for the main GSAP timeline of the dashboard sequence
  const mainSequenceTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const playDashboardAnimationSequence = () => {
    // Kill any existing timeline to prevent overlaps if re-triggered
    if (mainSequenceTimelineRef.current && mainSequenceTimelineRef.current.isActive()) {
      mainSequenceTimelineRef.current.kill();
    }

    // Reset ad images
    adImageRefs.current.forEach(imgRef => {
      if (imgRef) gsap.set(imgRef, { opacity: 0, y: 10, scale: 0.95 });
    });

    setCurrentDashboardView('chat');
    
    // Delay slightly to allow React to render the 'chat' view before GSAP targets refs
    setTimeout(() => { 
      if (!userPromptRef.current || !leeReplyRef.current) {
        setCurrentDashboardView('initialStatic'); // Fallback if refs not ready
        return;
      }

      const newTimeline = gsap.timeline();
      mainSequenceTimelineRef.current = newTimeline; // Store the new timeline

      const userQuery = "Generate ads for my renovation business"; 
      const aiReply = "Sure! Generating ad creatives...";
      const typingSpeedFactor = 0.03 * 1.33; 

      newTimeline.set(userPromptRef.current, {text: ""}) 
        .set(leeReplyRef.current, {text: ""})
        .to(userPromptRef.current, { duration: userQuery.length * typingSpeedFactor, text: userQuery, ease: "none" })
        .to(leeReplyRef.current, { duration: aiReply.length * typingSpeedFactor, text: aiReply, ease: "none" }, "+=0.4")
        .call(() => setCurrentDashboardView('loading'), [], "+=0.5")
        .to({}, {duration: 1.33}) 
        .call(() => setCurrentDashboardView('results'), []) 
        .to({}, {duration: 2.66}) 
        .call(() => {
          adImageRefs.current.forEach(imgRef => {
            if (imgRef) gsap.set(imgRef, { opacity: 0, y: 10, scale: 0.95 });
          });
          setCurrentDashboardView('initialStatic');
        });
    }, 2000); // Increased delay before animation starts
  };

  // Sidebar component (scaled down slightly if needed, or adjust padding/icon sizes)
  const DashboardSidebar = () => (
    <div className="w-14 md:w-16 flex-shrink-0 bg-card/10 rounded-lg p-2 flex flex-col items-center space-y-2 md:space-y-3">
      <div className="h-6 w-6 md:h-7 md:w-7 bg-brand-primary-orange/40 rounded-full flex items-center justify-center text-brand-primary-orange">
        <LayoutDashboard className="h-3 w-3 md:h-3.5 md:w-3.5" />
      </div>
      {[BarChartBig, Users, ShoppingBag, Settings].map((Icon, i) => (
        <div key={`sb-icon-${i}`} className={`h-4 w-4 md:h-5 md:w-5 rounded-md flex items-center justify-center ${i === 1 ? 'bg-brand-deep-purple/30 text-brand-deep-purple' : 'bg-card/30 text-text-muted-strong/70 hover:bg-brand-sunset-orange/20 hover:text-brand-sunset-orange'}`}>
          <Icon className="h-2.5 w-2.5 md:h-3 md:w-3" />
        </div>
      ))}
      <div className="!mt-auto h-4 w-4 md:h-5 md:w-5 rounded-full bg-brand-warm-pink/30 text-brand-warm-pink flex items-center justify-center">
        <Bell className="h-2.5 w-2.5 md:h-3 md:w-3" />
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (currentDashboardView) {
      case 'chat':
        return (
          <div className="flex-grow flex flex-col justify-end p-2 md:p-3 space-y-2 w-full">
            <div className="bg-card/60 p-2 rounded-md self-end max-w-[85%] shadow">
              <p ref={userPromptRef} className="text-xs md:text-sm text-text-body min-h-[1.1em]">&nbsp;</p>
            </div>
            <div className="bg-brand-deep-purple/40 p-2 rounded-md self-start max-w-[85%] shadow">
              <p ref={leeReplyRef} className="text-xs md:text-sm text-text-subheading min-h-[1.1em]">&nbsp;</p>
            </div>
          </div>
        );
      case 'loading':
        return (
          <div className="flex-grow flex flex-col items-center justify-center p-2 md:p-3">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-brand-primary-orange"></div>
            <p className="mt-3 text-sm text-text-muted-strong">Generating ads...</p>
          </div>
        );
      case 'results':
        return (
          <div className="flex-grow flex flex-col items-center justify-center p-1 md:p-2">
            <div className="w-full bg-card/60 rounded-lg shadow-xl p-2 md:p-3 border border-brand-primary-orange/40 flex flex-col">
              <div className="flex items-center bg-green-500/20 p-2 rounded-md border border-green-500/50 shadow-sm mb-2 md:mb-3">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                <p className="text-xs md:text-sm text-green-300">Ad creatives generated!</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-0.5 flex-grow">
                {placeholderAdImages.slice(0, 2).map((src, index) => (
                  <div 
                    key={index} 
                    ref={el => { adImageRefs.current[index] = el; }} 
                    className="aspect-video bg-card/40 rounded-md overflow-hidden shadow-lg opacity-0"
                  >
                    <img src={src} alt={`Ad Creative ${index + 1}`} className="w-full h-full object-contain p-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'initialStatic':
      default: 
        return (
          <div className="flex-grow flex flex-col items-center justify-center p-2">
            <div 
              className="flex items-center bg-card/30 p-1.5 rounded-md border border-brand-deep-purple/40 shadow-md w-full max-w-md cursor-pointer hover:bg-card/40 transition-colors"
              onClick={playDashboardAnimationSequence} // Added onClick to replay animation
            >
              <MessageSquare className="h-4 w-4 text-brand-deep-purple/80 mr-2" />
              <input 
                type="text" 
                placeholder="Ask Lee to generate ad creatives..." 
                className="flex-grow bg-transparent text-xs md:text-sm text-text-body placeholder-text-muted-strong focus:outline-none pointer-events-none" // Added pointer-events-none
                readOnly 
              />
              <Send className="h-3.5 w-3.5 text-brand-primary-orange ml-1.5" />
            </div>
          </div>
        );
    }
  };

  // Effect for the dashboard animation sequence triggered by ScrollTrigger
  useEffect(() => {
    const dashboardContainer = animatedDashboardContainerRef.current;
    let st: ScrollTrigger | null = null;

    if (dashboardContainer) {
      st = ScrollTrigger.create({
        trigger: dashboardContainer,
        start: "center center", 
        once: true, // Play once on scroll
        onEnter: () => {
          playDashboardAnimationSequence();
        }
      });
    }
    
    return () => {
      st?.kill(); 
      // Kill the timeline when the component unmounts or dependencies change
      if (mainSequenceTimelineRef.current) {
        mainSequenceTimelineRef.current.kill();
      }
      // Clean up tweens on individual elements if necessary, though timeline.kill() should handle children.
      // if (userPromptRef.current) gsap.killTweensOf(userPromptRef.current);
      // if (leeReplyRef.current) gsap.killTweensOf(leeReplyRef.current);
    };
  }, []); // Empty dependency array: runs once on mount for ScrollTrigger setup

  // Effect for animating ad results
  useEffect(() => {
    if (currentDashboardView === 'results') {
      const images = adImageRefs.current.filter(el => el !== null);
      if (images.length > 0) {
        gsap.set(images, { opacity: 0, y: 10, scale: 0.95 }); 
        gsap.to(images, 
          { 
            opacity: 1, y: 0, scale: 1,
            duration: 0.25 * 1.33, // Slower animation
            stagger: 0.1 * 1.33,  // Slower stagger
            ease: 'power2.out', 
            delay: 0.1 * 1.33     // Slower delay
          }
        );
      }
    }
  }, [currentDashboardView]);

  return (
    <section className="relative h-screen w-screen flex items-center justify-center bg-transparent text-text-headline p-4 md:p-8 overflow-hidden"> {/* bg-transparent */}
      {/* Background div removed, will be handled by parent in pages/index.tsx */}

      <div className="container mx-auto h-full flex items-center relative z-10">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center w-full">
          {/* Left Column: Animated Dashboard */}
          <div ref={animatedDashboardContainerRef} className="flex justify-center items-center bg-black/40 backdrop-blur-md p-2 md:p-3 rounded-lg shadow-2xl aspect-[16/10] max-h-[65vh] overflow-hidden border border-brand-deep-purple/30">
            <div className="flex h-full w-full space-x-1 md:space-x-1.5"> {/* Main flex container for sidebar and content */}
              <DashboardSidebar />
              <div className="flex-grow flex flex-col h-full overflow-hidden items-center justify-center">
                 {renderDashboardContent()}
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
              Automate Ad Creatives with Lee
            </h2>
            {/* We can wrap this with TextAnimate later */}
            <p className="text-base md:text-lg text-text-body max-w-md mb-4">
              Discover how Lee, your AI assistant, can revolutionize your ad creative process. 
              Generate compelling ad copy, design stunning visuals, and launch campaigns faster than ever before.
            </p>
            <p className="text-base md:text-lg text-text-body max-w-md">
              Focus on strategy while Lee handles the repetitive tasks, ensuring your ads are always fresh, engaging, and optimized for performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdCreativeSection;
