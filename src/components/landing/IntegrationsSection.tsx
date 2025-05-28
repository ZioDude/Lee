import React, { useEffect, useRef } from 'react';
import { CheckCircle, Cloud, BarChart2, MessageCircle, Settings, Zap, Share2 } from 'lucide-react';
import { gsap } from 'gsap';
// ScrollTrigger should have been registered in HeroSection, but good practice to ensure it if used standalone
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

const integrationPoints = [
  'Unicommerce Integration',
  'Logistics Partner Integration',
  'Customer Care Tools Integration',
  'Accounting & Finance Integration',
];

const IntegrationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const textEl = textContentRef.current;
    const graphicEl = graphicRef.current;

    if (sectionEl && textEl && graphicEl) {
      // Animate text content
      gsap.fromTo(textEl.children, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: textEl, start: "top 80%", toggleActions: "play none none none" }
        }
      );

      // Animate graphic container
      gsap.fromTo(graphicEl,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)', delay: 0.3, // Moved delay here
          scrollTrigger: { trigger: graphicEl, start: "top 80%", toggleActions: "play none none none" }
        }
      );
      
      // Animate individual icons within the graphic
      iconsRef.current.forEach((iconEl, index) => { // Added index for potential keying if needed
        if (iconEl) {
          gsap.fromTo(iconEl,
            { opacity: 0, scale: 0.5, y: 20 },
            { 
              opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out',
              delay: parseFloat(iconEl.dataset.delay || "0"),
              scrollTrigger: {
                trigger: iconEl,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              onComplete: () => {
                // Continuous, more pronounced floating/drifting animation
                // Each icon gets its own slightly different looping animation
                const floatTimeline = gsap.timeline({
                  repeat: -1,
                  yoyo: true,
                  delay: Math.random() * 1.5, // Stagger start of continuous animation
                });

                floatTimeline.to(iconEl, {
                  x: `random(-10, 10, 2)`, // Random x drift between -10 and 10, snapping to 2px increments
                  y: `random(-12, 12, 2)`, // Random y drift between -12 and 12
                  rotationZ: `random(-15, 15, 5)`, // Slight random rotation
                  scale: `random(0.95, 1.05)`, // Slight random scale
                  duration: 2.5 + Math.random() * 2, // Duration 2.5s to 4.5s
                  ease: "sine.inOut",
                }).to(iconEl, { // Return to a state near original for smoother loop with yoyo
                  x: `random(-5, 5, 1)`,
                  y: `random(-6, 6, 1)`,
                  rotationZ: `random(-5, 5, 1)`,
                  scale: 1,
                  duration: 2 + Math.random() * 1.5,
                  ease: "sine.inOut",
                });
                // Store the timeline on the element to kill it later if needed, though ScrollTrigger cleanup might handle it
                (iconEl as any)._continuousAnimation = floatTimeline; 
              }
            }
          );
        }
      });
    }
    // Cleanup ScrollTriggers and continuous animations
    return () => {
      iconsRef.current.forEach(iconEl => {
        if (iconEl && (iconEl as any)._continuousAnimation) {
          ((iconEl as any)._continuousAnimation as gsap.core.Timeline).kill();
          delete (iconEl as any)._continuousAnimation; // Clean up the stored property
        }
      });
      // Corrected cleanup for ScrollTriggers
      const triggersToKill = ScrollTrigger.getAll().filter(trigger => {
        const triggerElement = trigger.trigger;
        return triggerElement === textEl || 
               triggerElement === graphicEl || 
               (iconsRef.current && iconsRef.current.includes(triggerElement as HTMLDivElement));
      });
      triggersToKill.forEach(trigger => trigger.kill());
    }; // Removed one extra closing brace here that was causing issues
  }, []);

  const iconData = [
    { icon: Cloud, color: 'text-brand-deep-purple', position: 'top-[10%] left-1/2 -translate-x-1/2', delay: 0.1 },
    { icon: BarChart2, color: 'text-brand-primary-orange', position: 'bottom-[10%] left-1/2 -translate-x-1/2', delay: 0.2 },
    { icon: MessageCircle, color: 'text-brand-sunset-orange', position: 'left-[10%] top-1/2 -translate-y-1/2', delay: 0.3 },
    { icon: Settings, color: 'text-brand-warm-pink', position: 'right-[10%] top-1/2 -translate-y-1/2', delay: 0.4 },
    { icon: Zap, color: 'text-brand-primary-orange', position: 'top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2', size: 'w-5 h-5', delay: 0.5 },
    { icon: Share2, color: 'text-brand-deep-purple', position: 'top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2', size: 'w-5 h-5', delay: 0.6 },
    { icon: CheckCircle, color: 'text-brand-sunset-orange', position: 'bottom-[25%] left-[25%] -translate-x-1/2 translate-y-1/2', size: 'w-5 h-5', delay: 0.7 },
    { icon: Zap, color: 'text-brand-warm-pink', position: 'bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2', size: 'w-5 h-5', delay: 0.8 },
  ];

  return (
    // Removed relative, bg-background, and the background div. These will be handled by a parent wrapper.
    <section ref={sectionRef} className="py-16 md:py-24 text-text-headline overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Removed relative z-10 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textContentRef}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-brand-deep-purple bg-brand-deep-purple/20 rounded-full uppercase mb-3">
              Integration
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-text-headline">
              Seamless Integrations
            </h2>
            <p className="text-lg text-text-body mb-8">
              Connect with unicommerce, logistics, and customer care tools to
              streamline your operations.
            </p>
            <ul className="space-y-3">
              {integrationPoints.map((point) => (
                <li 
                  key={point} 
                  className="flex items-center text-text-body hover:text-brand-sunset-orange transition-colors duration-200"
                >
                  <CheckCircle className="h-5 w-5 text-brand-sunset-orange mr-3 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div ref={graphicRef} className="relative flex items-center justify-center">
            <div 
              className="w-80 h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center border-2 border-brand-deep-purple/60 shadow-mixed-glow relative"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(25,17,12,0.9) 0%, rgba(45,27,62,0.8) 100%)' }} // Subtle radial gradient: card to deep purple hint
            >
              {iconData.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    ref={(el: HTMLDivElement | null) => { iconsRef.current[idx] = el; }}
                    data-delay={item.delay}
                    className={`absolute p-3 bg-card/70 backdrop-blur-sm rounded-full shadow-lg ${item.position} transition-all duration-300 opacity-0 
                                hover:scale-110 hover:shadow-[0_0_20px_3px_rgba(var(--brand-primary-orange-rgb),0.4)] hover:border border-brand-primary-orange/50`}
                  >
                    <IconComponent className={`${item.size || 'w-6 h-6'} ${item.color}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
