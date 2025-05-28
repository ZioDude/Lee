import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Already registered in HeroSection
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot, Briefcase, ShoppingCart, CreditCard } from 'lucide-react'; // New icons

const integrationFeatures = [
  {
    icon: <Bot className="h-7 w-7 text-brand-primary-orange mb-3" />,
    title: 'AI Chatbot & CRM',
    description: 'Connect with AI chatbots to improve engagement.',
  },
  {
    icon: <Briefcase className="h-7 w-7 text-brand-deep-purple mb-3" />,
    title: 'ERP System Integration',
    description: 'Sync inventory with enterprise resource (ERP) systems.',
  },
  {
    icon: <ShoppingCart className="h-7 w-7 text-brand-sunset-orange mb-3" />,
    title: 'Supplier & Procurement',
    description: 'Seamlessly connect with for automated restocking.',
  },
  {
    icon: <CreditCard className="h-7 w-7 text-brand-warm-pink mb-3" />,
    title: 'POS Integration',
    description: 'Sync inventory with POS for real-time updates.',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardElements = cardsRef.current.filter(el => el !== null) as HTMLDivElement[];

    if (sectionEl && cardElements.length > 0) {
      cardElements.forEach((cardEl, index) => {
        gsap.fromTo(cardEl,
          { opacity: 0, y: 50, scale: 0.95 },
          { 
            opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: cardEl,
              start: "top 85%", // Trigger when card is 85% from top of viewport
              toggleActions: "play none none none",
            },
            delay: index * 0.1 // Stagger delay
          }
        );
      });
    }
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (cardElements.includes(trigger.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    // Removed relative, bg-background, and the background div. These will be handled by a parent wrapper.
    <section 
      ref={sectionRef} 
      className="pb-16 md:pb-24 overflow-hidden" // text-text-headline will be inherited
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Removed relative z-10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {integrationFeatures.map((feature, index) => (
            <Card
              key={feature.title}
              ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
              className="flex flex-col border border-brand-deep-purple/30 rounded-xl 
                         transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 
                         shadow-[0_0_15px_2px_rgba(var(--brand-deep-purple-rgb),0.25)] /* Base subtle purple glow */
                         hover:shadow-[0_0_20px_4px_rgba(var(--brand-deep-purple-rgb),0.4),_0_0_30px_8px_rgba(var(--brand-warm-pink-rgb),0.2)] /* Enhanced dual glow on hover */
                         hover:border-brand-warm-pink/50 opacity-0 backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(var(--brand-deep-purple-rgb), 0.08)', // Very transparent purple base
              }}
            >
              <CardHeader className="items-center text-center pt-6">
                <div className="flex justify-center w-full">{feature.icon}</div> {/* Ensure icon is centered */}
                <CardTitle className="text-lg font-semibold" style={{ color: 'var(--text-subheading)' }}>{feature.title}</CardTitle> {/* Using CSS var */}
              </CardHeader>
              <CardContent className="text-center pb-6 flex-grow">
                <CardDescription className="text-sm" style={{ color: 'var(--text-body)' }}>{feature.description}</CardDescription> {/* Using CSS var */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
