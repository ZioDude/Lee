import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$19',
    period: '/month',
    description: 'Essential tools to get started with lead generation.',
    features: [
      'Real-Time Inventory Tracking',
      'Basic Analytics & Reports',
      'Standard Security Features',
      '1 Warehouse Management',
      'Email Support',
    ],
    isPopular: false,
  },
  {
    name: 'Standard',
    price: '$59',
    period: '/month',
    description: 'Unlock more power and features for growing businesses.',
    features: [
      'AI Demand Forecasting',
      'Third-Party Integrations',
      'Automated Order Processing',
      'Multi-Warehouse Management',
      'Priority Support',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'Comprehensive solutions for large-scale operations.',
    features: [
      'Custom Workflow Automation',
      'Role-Based Access Control',
      'Advanced AI Analytics',
      'Enterprise-Grade Security',
      // Adding more to match screenshot length
      'Dedicated API Access',
      'Service Level Agreement (SLA)',
      'Onboarding & Training',
    ],
    isPopular: false,
  },
];

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const sectionRef = useRef<HTMLElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleBlockRef.current;
    const toggleEl = toggleRef.current;
    const cardElements = cardsRef.current.filter(el => el !== null) as HTMLDivElement[];

    if (sectionEl && titleEl && toggleEl && cardElements.length > 0) {
      // Animate title block
      gsap.fromTo(titleEl.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: titleEl, start: "top 85%", toggleActions: "play none none none" }
        }
      );

      // Animate toggle
      gsap.fromTo(toggleEl,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            delay: 0.2, // GSAP tween delay
            scrollTrigger: { trigger: toggleEl, start: "top 85%", toggleActions: "play none none none" }
        }
      );

      // Animate pricing cards
      cardElements.forEach((cardEl, index) => {
        gsap.fromTo(cardEl,
          { opacity: 0, y: 50, scale: 0.9 },
          { 
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out',
            delay: 0.3 + index * 0.15, // Stagger: This delay is for the tween itself
            scrollTrigger: {
              trigger: cardEl,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === titleEl || trigger.trigger === toggleEl || cardElements.includes(trigger.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);


  return (
    // Removed relative, bg-background, and the background div. These will be handled by a parent wrapper.
    // Increased bottom padding to allow background effect to show more
    <section ref={sectionRef} className="pt-16 md:pt-24 pb-24 md:pb-32 text-text-headline overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleBlockRef} className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-brand-warm-pink bg-brand-warm-pink/20 rounded-full uppercase mb-3">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-headline">
            Plans for Every Business
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-text-body">
            Choose the perfect plan to scale your inventory management with AI-driven efficiency.
          </p>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div ref={toggleRef} className="flex justify-center mb-10">
          <div className="inline-flex bg-card p-1 rounded-lg space-x-1 border border-border">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                          ${billingCycle === 'monthly' 
                            ? 'bg-brand-primary-orange text-white shadow-md' 
                            : 'text-text-body hover:bg-brand-primary-orange/10 hover:text-brand-sunset-orange'}`}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                          ${billingCycle === 'yearly' 
                            ? 'bg-brand-primary-orange text-white shadow-md' 
                            : 'text-text-body hover:bg-brand-primary-orange/10 hover:text-brand-sunset-orange'}`}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
              className={`flex flex-col rounded-xl transition-all duration-300 ease-in-out relative overflow-hidden opacity-0 backdrop-blur-sm
                         ${plan.isPopular 
                           ? 'bg-gradient-to-br from-brand-warm-pink/20 via-[rgba(var(--card-rgb),0.85)] to-brand-deep-purple/20 border-2 border-brand-warm-pink hover:scale-[1.03] ring-4 ring-brand-warm-pink/30 shadow-[-7px_-7px_35px_rgba(var(--brand-warm-pink-rgb),0.25),_7px_7px_35px_rgba(var(--brand-deep-purple-rgb),0.25)] hover:shadow-[-10px_-10px_45px_rgba(var(--brand-warm-pink-rgb),0.3),_10px_10px_45px_rgba(var(--brand-deep-purple-rgb),0.3)]' 
                           : 'border border-brand-deep-purple/30 shadow-[0_0_12px_2px_rgba(var(--brand-deep-purple-rgb),0.2)] hover:border-brand-primary-orange/60 hover:scale-[1.03] hover:shadow-[0_0_20px_4px_rgba(var(--brand-deep-purple-rgb),0.35),_0_0_30px_8px_rgba(var(--brand-primary-orange-rgb),0.2)]'
                         }`}
              style={!plan.isPopular ? { backgroundColor: 'rgba(var(--brand-deep-purple-rgb), 0.08)' } : {}} // Very transparent purple for non-popular
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 z-10"> {/* Ensure badge is above gradient */}
                  <span className="block w-32 py-1 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-brand-warm-pink to-brand-sunset-orange text-center uppercase shadow-lg"> {/* Explicit gradient for badge */}
                    Popular
                  </span>
                </div>
              )}
              <CardHeader className={`pb-6 pt-8 px-6 text-center ${plan.isPopular ? 'pt-12' : 'pt-8'}`}>
                <CardTitle className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-subheading)' }}>{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-headline)' }}>
                    {plan.price}
                  </span>
                  <span className="ml-1.5 text-xl font-medium" style={{ color: 'var(--text-body)' }}>
                    {plan.period}
                  </span>
                </div>
                 <CardDescription className="pt-3 text-sm text-center h-10" style={{ color: 'var(--text-muted-strong)' }}>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow px-6 pt-6">
                <ul className="space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-sunset-orange mr-2.5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm" style={{ color: 'var(--text-body)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="px-6 pb-8 pt-6 mt-auto">
                <Button
                  asChild
                  className={`w-full font-semibold py-3 text-base text-white hover:opacity-90 transition-opacity
                              ${plan.isPopular ? 'bg-cta-gradient' : 'bg-brand-primary-orange/80 hover:bg-brand-primary-orange'}`}
                  size="lg"
                >
                  <a href="/get-started">GET STARTED</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
