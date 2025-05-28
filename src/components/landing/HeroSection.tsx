import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChartBig, Users, Settings, Bell, LayoutDashboard, TrendingUp, DollarSign, ShoppingBag, MessageSquare, Send, Image as ImageIcon, CheckCircle } from 'lucide-react'; // Added MessageSquare, Send, ImageIcon, CheckCircle
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; // For typing animation
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Updated with user-provided local images
const placeholderAdImages = [
  "/PLACELIFT.png",
  "/renovation-Bathroom-1747859972116.jpg",
  // We can add a third one if available, or just show two
  // "https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Ad+Creative+3", 
];

const HeroSection = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const innerDashboardRef = useRef<HTMLDivElement>(null);

  // Refs for hero text content animation
  const heroBadgeRef = useRef<HTMLDivElement>(null); // Changed from HTMLSpanElement
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroParagraphRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);

  // State for the interactive dashboard sequence
  const [currentDashboardView, setCurrentDashboardView] = useState<'initialStatic' | 'chat' | 'loading' | 'results'>('initialStatic');
  
  // Refs for text elements
  const userPromptRef = useRef<HTMLParagraphElement>(null);
  const leeReplyRef = useRef<HTMLParagraphElement>(null);
  const adImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Removed publishButtonRef

  // Sidebar component
  const DashboardSidebar = () => (
    <div className="w-16 md:w-20 flex-shrink-0 bg-card/10 rounded-lg p-2 md:p-3 flex flex-col items-center space-y-3 md:space-y-4">
      <div className="h-7 w-7 md:h-8 md:w-8 bg-brand-primary-orange/40 rounded-full flex items-center justify-center text-brand-primary-orange">
        <LayoutDashboard className="h-3.5 w-3.5 md:h-4 md:w-4" />
      </div>
      {[BarChartBig, Users, ShoppingBag, Settings].map((Icon, i) => (
        <div key={`sb-icon-${i}`} className={`h-5 w-5 md:h-6 md:w-6 rounded-md flex items-center justify-center ${i === 1 ? 'bg-brand-deep-purple/30 text-brand-deep-purple' : 'bg-card/30 text-text-muted-strong/70 hover:bg-brand-sunset-orange/20 hover:text-brand-sunset-orange'}`}>
          <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
        </div>
      ))}
      <div className="!mt-auto h-5 w-5 md:h-6 md:w-6 rounded-full bg-brand-warm-pink/30 text-brand-warm-pink flex items-center justify-center">
        <Bell className="h-3 w-3 md:h-3.5 md:w-3.5" />
      </div>
    </div>
  );

  // Main content area rendering based on state - defined within HeroSection to access state and refs
  const renderDashboardContent = () => {
    // ... (cases for 'chat', 'loading', 'results', 'initialStatic' as previously defined)
    // This function will use userPromptRef, leeReplyRef, currentDashboardView directly from HeroSection's scope
    switch (currentDashboardView) {
      case 'chat':
        return (
          // Reverted to simpler chat log style, messages appear directly in the main content area
          <div className="flex-grow flex flex-col justify-end p-3 md:p-4 space-y-3 w-full"> {/* Ensure it takes width and pushes content to bottom */}
            {/* User prompt bubble */}
            <div className="bg-card/60 p-2.5 rounded-lg self-end max-w-[80%] shadow-md">
              <p ref={userPromptRef} className="text-sm md:text-base text-text-body min-h-[1.2em]">&nbsp;</p>
            </div>
            {/* AI reply bubble */}
            <div className="bg-brand-deep-purple/40 p-2.5 rounded-lg self-start max-w-[80%] shadow-md">
              <p ref={leeReplyRef} className="text-sm md:text-base text-text-subheading min-h-[1.2em]">&nbsp;</p>
            </div>
          </div>
        );
      case 'loading':
        return (
          <div className="flex-grow flex flex-col items-center justify-center p-3 md:p-4"> {/* Loading remains centered */}
            <div className="animate-spin rounded-full h-12 w-12 md:h-14 md:w-14 border-t-2 border-b-2 border-brand-primary-orange"></div>
            <p className="mt-4 text-base text-text-muted-strong">Generating ads...</p>
          </div>
        );
      case 'results':
        return (
          <div className="flex-grow flex flex-col items-center justify-center p-1 md:p-2">
            {/* Pop-up like window for results - increased size */}
            <div className="w-full max-w-2xl bg-card/60 rounded-xl shadow-2xl p-4 md:p-5 border border-brand-primary-orange/40 flex flex-col">
              <div className="flex items-center bg-green-500/20 p-2.5 rounded-md border border-green-500/50 shadow-sm mb-3 md:mb-4">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2.5 flex-shrink-0" />
                <p className="text-sm md:text-base text-green-300">Successfully generated ad creatives!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 p-1 flex-grow">
                {placeholderAdImages.slice(0, 2).map((src, index) => (
                  <div 
                    key={index} 
                    ref={el => { adImageRefs.current[index] = el; }} 
                    className="aspect-video bg-card/40 rounded-lg overflow-hidden shadow-xl opacity-0"
                  >
                    <img src={src} alt={`Ad Creative ${index + 1}`} className="w-full h-full object-contain p-1.5" />
                  </div>
                ))}
              </div>
              {/* Removed Publish button from here */}
            </div>
          </div>
        );
      // Removed 'publishedSuccess' case
      case 'initialStatic':
      default: 
        return (
          <div className="flex-grow flex flex-col items-center justify-center p-2 md:p-3">
            <div className="flex items-center bg-card/30 p-2 rounded-lg border border-brand-deep-purple/40 shadow-lg w-full max-w-lg">
              <MessageSquare className="h-5 w-5 text-brand-deep-purple/80 mr-2.5" />
              <input 
                type="text" 
                placeholder="Ask Lee to generate ad creatives..." 
                className="flex-grow bg-transparent text-xs md:text-sm text-text-body placeholder-text-muted-strong focus:outline-none" 
                readOnly 
              />
              <Send className="h-4 w-4 text-brand-primary-orange ml-2" />
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    const dashboardElement = dashboardRef.current;
    const sectionElement = sectionRef.current;
    const innerContentContainer = innerDashboardRef.current;

    // Animate Hero Text Content on Mount
    const heroBadgeEl = heroBadgeRef.current;
    const heroTitleEl = heroTitleRef.current;
    const heroParagraphEl = heroParagraphRef.current;
    const heroButtonsEl = heroButtonsRef.current;

    if (heroBadgeEl && heroTitleEl && heroParagraphEl && heroButtonsEl) {
      // Set initial states for GSAP animations (opacity 0, slightly offset)
      gsap.set([heroBadgeEl, heroTitleEl, heroParagraphEl, heroButtonsEl.children], { opacity: 0, y: 20 });
      
      const heroTextTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      heroTextTl
        .to(heroBadgeEl, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
        .to(heroTitleEl, { opacity: 1, y: 0, duration: 0.7, delay: -0.3 }) // Overlap for smoother sequence
        .to(heroParagraphEl, { opacity: 1, y: 0, duration: 0.7, delay: -0.4 })
        .to(heroButtonsEl.children, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, delay: -0.4 });
    }

    if (dashboardElement && sectionElement) {
      // Dashboard floating, parallax, tilt animations
      gsap.to(dashboardElement, { y: "-=15px", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(dashboardElement, {
        yPercent: -20, scale: 0.9, opacity: 0.7,
        scrollTrigger: { trigger: sectionElement, start: "center center", end: "bottom top", scrub: 1 }
      });
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const dashboardEl = dashboardElement as HTMLElement;
        const { offsetWidth, offsetHeight } = dashboardEl;
        const { left, top } = dashboardEl.getBoundingClientRect();
        const x = clientX - (left + offsetWidth / 2);
        const y = clientY - (top + offsetHeight / 2);
        gsap.to(dashboardElement, { rotationY: x * 0.02, rotationX: -y * 0.02, duration: 0.5, ease: "power1.out" });
      };
      const onMouseLeave = () => {
        gsap.to(dashboardElement, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
      };
      dashboardElement.addEventListener('mousemove', onMouseMove);
      dashboardElement.addEventListener('mouseleave', onMouseLeave);
      
      const mainDashboardCleanup = () => {
        dashboardElement.removeEventListener('mousemove', onMouseMove);
        dashboardElement.removeEventListener('mouseleave', onMouseLeave);
      };

      // Ensure inner container is visible for the sequence
      if (innerContentContainer) {
        gsap.set(innerContentContainer, { opacity: 1 }); // Make sure it's visible
      }
      
      let mainSequenceTimeline: gsap.core.Timeline | null = null;

      const st = ScrollTrigger.create({
        trigger: dashboardElement,
        start: "top 70%", 
        once: true, // Play sequence once when scrolled into view
        onEnter: () => {
          if (mainSequenceTimeline && mainSequenceTimeline.isActive()) return;

          setCurrentDashboardView('chat');
          
          setTimeout(() => { 
            if (!userPromptRef.current || !leeReplyRef.current) {
              setCurrentDashboardView('initialStatic'); 
              return;
            }

            mainSequenceTimeline = gsap.timeline();
            const userQuery = "Generate me ads for my renovation business";
            const aiReply = "Sure! Generating ad creatives for your renovation business...";
            const typingSpeedFactor = 0.025; // Halved from 0.05

            mainSequenceTimeline.set(userPromptRef.current, {text: ""}) 
              .set(leeReplyRef.current, {text: ""})
              .to(userPromptRef.current, { duration: userQuery.length * typingSpeedFactor, text: userQuery, ease: "none" })
              .to(leeReplyRef.current, { duration: aiReply.length * typingSpeedFactor, text: aiReply, ease: "none" }, "+=0.35") // Halved delay
              .call(() => setCurrentDashboardView('loading'), [], "+=0.5") // Halved delay
              .to({}, {duration: 1.25}) // Halved loading time
              .call(() => setCurrentDashboardView('results'), []) 
              // Wait for ad images to display (their animation will also be faster)
              .to({}, {duration: 1.25}) // Halved time to view images
              .call(() => {
                // Ensure ad images are hidden again for any potential future re-trigger (though ScrollTrigger is 'once')
                adImageRefs.current.forEach(imgRef => {
                  if (imgRef) gsap.set(imgRef, { opacity: 0, y: 20, scale: 0.95 });
                });
                setCurrentDashboardView('initialStatic');
              });
          }, 100); 
        }
      });
      
      return () => {
        st.kill(); 
        if (mainSequenceTimeline) mainSequenceTimeline.kill();
        mainDashboardCleanup();
        if (userPromptRef.current) gsap.killTweensOf(userPromptRef.current);
        if (leeReplyRef.current) gsap.killTweensOf(leeReplyRef.current);
      };
    }
  }, []); 

  // Effect for animating ad results
  useEffect(() => {
    if (currentDashboardView === 'results') {
      const images = adImageRefs.current.filter(el => el !== null);
      if (images.length > 0) {
        gsap.set(images, { opacity: 0, y: 20, scale: 0.95 }); 
        gsap.to(images, 
          { 
            opacity: 1, y: 0, scale: 1,
            duration: 0.3, stagger: 0.125, ease: 'power2.out', delay: 0.1 // Halved durations and delays
          }
        );
      }
    }
  }, [currentDashboardView]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 lg:py-40 bg-background text-text-headline overflow-hidden">
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            radial-gradient(ellipse at center, rgba(255, 107, 53, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(0, 0, 0, 0) 70%),
            url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='rgba(255,107,53,0.07)'/%3E%3C/svg%3E")
          `,
          backgroundRepeat: 'repeat, repeat',
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6" ref={heroBadgeRef}> {/* Added ref, removed animation classes */}
          <span className="inline-flex items-center rounded-full bg-brand-warm-pink px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-brand-warm-pink/30">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white/70"></span>
            Now Update v1.0 is live
          </span>
        </div>
        <h1 ref={heroTitleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-text-headline mb-8 leading-tight"> {/* Added ref, removed animation classes */}
          AI-Powered Super <br className="hidden md:block" /> Smart Lead Generation
        </h1>
        <p ref={heroParagraphRef} className="max-w-3xl mx-auto text-lg md:text-xl text-text-body mb-12"> {/* Added ref, removed animation classes */}
          Adverlead is a comprehensive lead generation platform that combines CRM
          functionality, AI-powered ad creative generation, and an intelligent
          chatbot assistant named Lee that can perform actions throughout the
          application.
        </p>
        <div ref={heroButtonsRef} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"> {/* Added ref, removed animation classes */}
          <Button 
            asChild 
            size="lg" 
            className="font-semibold text-base px-8 py-6 bg-gradient-to-r from-brand-primary-orange via-brand-sunset-orange to-brand-warm-pink text-white shadow-lg hover:shadow-xl hover:shadow-brand-warm-pink/30 transition-all duration-300 transform hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-warm-pink focus:ring-offset-2 focus:ring-offset-background"
          >
            <Link href="/get-started" legacyBehavior passHref><a>GET STARTED</a></Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="font-semibold text-base px-8 py-6 border-2 border-brand-sunset-orange text-brand-sunset-orange shadow-md hover:shadow-lg hover:bg-brand-sunset-orange/10 hover:text-brand-sunset-orange hover:border-brand-warm-pink transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-sunset-orange focus:ring-offset-2 focus:ring-offset-background"
          >
            <Link href="/try-free" legacyBehavior passHref><a>TRY FREE NOW</a></Link>
          </Button>
        </div>
        
        <div ref={dashboardRef} className="mt-16 md:mt-24 relative" style={{ perspective: '1000px' }}> {/* Removed animation class, dashboard has its own GSAP reveal */}
          <div 
            className="aspect-video max-w-5xl mx-auto bg-dashboard-panel-bg rounded-xl border border-brand-primary-orange/30 shadow-orange-purple-glow p-2 md:p-3 overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex h-full space-x-1.5 md:space-x-2"> {/* Main flex container for sidebar and content */}
              <DashboardSidebar />
              <div ref={innerDashboardRef} className="flex-grow flex flex-col h-full overflow-hidden items-center justify-center"> {/* Added items-center justify-center */}
                 {renderDashboardContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
