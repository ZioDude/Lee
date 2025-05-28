import React, { useEffect, useRef, Suspense } from 'react'; // Added Suspense
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Uncommented ScrollTrigger
import { ShieldCheck, Lock, Users, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import VaultModel from '@/../adverlead/src/components/landing/VaultModel'; // Corrected VaultModel import path

// Commented out LottieSecurityAnimation as it's being replaced
// const LottieSecurityAnimation = dynamic(() => import('./LottieSecurityAnimation'), { 
//   ssr: false,
//   loading: () => <div className="w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center text-text-muted-strong">Loading Animation...</div> 
// });

const securityFeatures = [
  {
    icon: <Users className="h-6 w-6 text-brand-primary-orange mb-2" />,
    title: 'Role-Based Control',
    description: 'Limits data access to authorized users.',
    position: 'md:col-start-1 md:row-start-1', 
  },
  {
    icon: <Eye className="h-6 w-6 text-brand-primary-orange mb-2" />,
    title: 'AI Fraud Detection',
    description: 'Stops suspicious transactions instantly.',
    position: 'md:col-start-3 md:row-start-1 text-center md:text-right', 
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-brand-primary-orange mb-2" />,
    title: 'Secure Cloud',
    description: 'Ensures safety with backups and compliance.',
    position: 'md:col-start-1 md:row-start-2', 
  },
  {
    icon: <Lock className="h-6 w-6 text-brand-primary-orange mb-2" />,
    title: 'End-to-End Encryption',
    description: 'Keeps data secure from unauthorized access.',
    position: 'md:col-start-3 md:row-start-2 text-center md:text-right', 
  },
];

const SecuritySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleBlockRef.current;
    const cubeEl = cubeRef.current;
    const featureElements = featuresRef.current.filter(el => el !== null) as HTMLDivElement[];

    if (sectionEl && titleEl && cubeEl && featureElements.length > 0) {
      // Animate title block
      gsap.fromTo(titleEl.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: titleEl, start: "top 85%", toggleActions: "play none none none" }
        }
      );

      // Animate cube - Modified to only animate opacity and y-position to avoid layout shifts with Spline
      gsap.fromTo(cubeEl,
        { opacity: 0, y: 50 }, // Start slightly lower and faded out
        { 
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', // Fade in and slide up
          scrollTrigger: { trigger: cubeEl, start: "top 80%", toggleActions: "play none none none" }
        }
      );

      // Animate security features
      featureElements.forEach((featEl, index) => {
        gsap.fromTo(featEl,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 }, // Alternate slide direction
          { 
            opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: featEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: 0.2 + index * 0.1 // Stagger
          }
        );
      });
    }
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === titleEl || trigger.trigger === cubeEl || featureElements.includes(trigger.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    // Removed relative, bg-background, and the background div. These will be handled by a parent wrapper.
    <section ref={sectionRef} className="py-16 md:py-24 text-text-headline overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Removed relative z-10, parent will handle stacking */}
        <div ref={titleBlockRef} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-brand-warm-pink bg-brand-warm-pink/20 rounded-full uppercase mb-3">
            Security
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-headline">
            Supremacy of Security
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-text-body">
            Advanced protection to keep your data, transactions, and business
            secure from threats and breaches.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] md:grid-rows-2 gap-x-8 gap-y-10 items-center">
          {/* Central Graphic Placeholder */}
          <div ref={cubeRef} className="md:col-start-2 md:row-span-2 flex justify-center items-center my-8 md:my-0 w-full h-full min-h-[300px] md:min-h-[350px]">
            {/* Replaced LottieSecurityAnimation with VaultModel */}
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-text-muted-strong">Loading 3D Model...</div>}>
              <VaultModel />
            </Suspense>
          </div>

          {securityFeatures.map((feature, index) => (
            <div 
              key={feature.title} 
              ref={(el: HTMLDivElement | null) => { featuresRef.current[index] = el; }}
              className={`${feature.position} p-4 rounded-lg transition-all duration-300 group opacity-0 
                         border border-brand-deep-purple/30 backdrop-blur-sm 
                         shadow-[0_0_12px_2px_rgba(var(--brand-deep-purple-rgb),0.25)] /* Base subtle purple glow */
                         hover:shadow-[0_0_22px_4px_rgba(var(--brand-deep-purple-rgb),0.45),_0_0_35px_10px_rgba(var(--brand-warm-pink-rgb),0.25)] /* Enhanced dual glow on hover */
                         hover:border-brand-warm-pink/60 hover:scale-[1.03]`}
              style={{ backgroundColor: 'rgba(var(--brand-deep-purple-rgb), 0.08)' }} // Very transparent purple base
            >
              <div className={`flex flex-col items-center ${feature.position.includes('md:text-right') ? 'md:items-end' : 'md:items-start'}`}>
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-sunset-orange">{feature.icon}</div> {/* Icon color can also change on hover */}
                <h3 className="text-xl font-semibold mb-1 mt-1" style={{ color: 'var(--text-subheading)' }}>{feature.title}</h3> {/* Using CSS var */}
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>{feature.description}</p> {/* Using CSS var */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
