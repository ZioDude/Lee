import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'; // Added useRef, useCallback
import Link from 'next/link'; // Added for buttons
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"; // Added for button text
import { Button } from '@/components/ui/button'; // Added for buttons
import { cn } from '@/lib/utils';
import { MessageSquare, Zap, CheckSquare } from 'lucide-react'; // Removed Clock, Users, Bot

// Define message types
interface Message {
  id: number;
  sender: 'Lee' | 'Lead';
  text: string;
  avatar?: string; // Optional: for Lee's avatar
}

const LeadsQualificationSection = () => {
  const conversation = useMemo((): Message[] => [
    { id: 1, sender: 'Lead', text: "Hi, I saw your ad for home renovations." },
    { id: 2, sender: 'Lee', text: "Hello! Thank you for reaching out. I'd be happy to help you with your renovation project." },
    { id: 3, sender: 'Lee', text: "To start, could you please tell me which part of your house you are considering renovating?" },
    { id: 4, sender: 'Lead', text: "We're thinking about the kitchen." },
    { id: 5, sender: 'Lee', text: "The kitchen is a wonderful choice for a renovation! It can truly transform a home." },
    { id: 6, sender: 'Lee', text: "Do you have an approximate budget in mind for this project?" },
    { id: 7, sender: 'Lead', text: "We're hoping to keep it under $20,000." },
    { id: 8, sender: 'Lee', text: "Thank you for sharing that. Understanding your budget helps us tailor the best possible solutions for your kitchen renovation." },
  ], []);

  const [visibleMessagesCount, setVisibleMessagesCount] = useState(0); // How many messages are "structurally" visible
  const [currentAnimatingMessageIndex, setCurrentAnimatingMessageIndex] = useState(0);
  const [hasChatAnimationStarted, setHasChatAnimationStarted] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null); // To trigger animation
  const messageTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  messageTextRefs.current = []; // Clear refs array on each render before collecting them

  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  useEffect(() => {
    const triggerElement = chatContainerRef.current;
    if (triggerElement && !scrollTriggerInstanceRef.current && !hasChatAnimationStarted) {
      scrollTriggerInstanceRef.current = ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom-=100px",
        once: true,
        onEnter: () => {
          setHasChatAnimationStarted(true);
        },
      });
    }
    return () => {
      scrollTriggerInstanceRef.current?.kill();
      scrollTriggerInstanceRef.current = null;
    };
  }, [hasChatAnimationStarted]); // Rerun if animation has started to ensure ST is killed if component re-renders

  useEffect(() => {
    if (!hasChatAnimationStarted || currentAnimatingMessageIndex >= conversation.length) {
      return;
    }

    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (currentAnimatingMessageIndex < conversation.length -1) {
          setCurrentAnimatingMessageIndex(prev => prev + 1);
        }
        animationTimelineRef.current = null;
      }
    });
    animationTimelineRef.current = tl;

    // Ensure the message bubble for the current message is rendered before trying to animate it
    // This happens by incrementing visibleMessagesCount first for the current message
    if (visibleMessagesCount <= currentAnimatingMessageIndex) {
        setVisibleMessagesCount(currentAnimatingMessageIndex + 1);
    }
    
    // Delay slightly to allow React to render the new message bubble if just added
    tl.call(() => {
        const messageToAnimate = conversation[currentAnimatingMessageIndex];
        const targetRef = messageTextRefs.current[currentAnimatingMessageIndex];
        
        if (messageToAnimate && targetRef) {
            // Make parent message bubble visible
            if(targetRef.parentElement?.parentElement) { // Assuming p -> div.message-content -> div.message-wrapper
                 gsap.set(targetRef.parentElement.parentElement, { opacity: 0, y: 10 });
                 tl.to(targetRef.parentElement.parentElement, { opacity: 1, y: 0, duration: 0.3 });
            }

            const typingSpeedFactor = 0.04;
            tl.set(targetRef, { text: "" })
              .to(targetRef, {
                duration: messageToAnimate.text.length * typingSpeedFactor,
                text: messageToAnimate.text,
                ease: "none",
              });
        }
    }, [], "+=0.1"); // Small delay for render

    return () => {
      tl.kill();
      animationTimelineRef.current = null;
    };
  }, [hasChatAnimationStarted, currentAnimatingMessageIndex, conversation, visibleMessagesCount]);

    // Effect to advance to the next message to be structurally visible,
    // if the current one has finished animating (handled by timeline onComplete)
    // This ensures that the next message bubble is ready.
    useEffect(() => {
        if (hasChatAnimationStarted && currentAnimatingMessageIndex < conversation.length && visibleMessagesCount <= currentAnimatingMessageIndex) {
            setVisibleMessagesCount(currentAnimatingMessageIndex + 1);
        }
    }, [hasChatAnimationStarted, currentAnimatingMessageIndex, visibleMessagesCount, conversation.length]);


  // Simple avatar for Lee (e.g., a letter or a small icon)
  const LeeAvatar = () => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-deep-purple text-white flex items-center justify-center text-sm font-semibold">
      L
    </div>
  );

  const LeadAvatar = () => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-semibold">
      U
    </div>
  );


  return (
    <section ref={sectionRef} className="relative h-full w-full flex items-center justify-center text-text-headline p-4 md:p-8 overflow-hidden"> {/* Removed bg-background, adjusted min-h-screen w-screen */}
      <div className="container mx-auto h-full flex items-center relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
          {/* Left Column: Chat Window Mockup */}
          <div 
            ref={chatContainerRef} 
            className="w-full bg-card/50 backdrop-blur-md rounded-xl shadow-2xl p-4 md:p-6 border border-brand-primary-orange/30 aspect-[9/10] max-h-[70vh] flex flex-col"
          >
            <div className="h-full overflow-y-auto flex flex-col space-y-3 pr-2 mb-3 scrollbar-thin scrollbar-thumb-brand-primary-orange/50 scrollbar-track-transparent">
              {conversation.slice(0, visibleMessagesCount).map((msg, index) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end max-w-[85%] md:max-w-[75%]",
                    "opacity-0", // Initially hidden, GSAP will reveal
                    msg.sender === 'Lee' ? "self-start" : "self-end"
                  )}
                >
                  {msg.sender === 'Lee' && <LeeAvatar />}
                  <div
                    className={cn(
                      "ml-2 mr-2 p-3 rounded-xl shadow",
                      msg.sender === 'Lee'
                        ? "bg-brand-deep-purple/20 text-text-body rounded-bl-none"
                        : "bg-brand-primary-orange/20 text-text-body rounded-br-none"
                    )}
                  >
                    <p 
                      ref={el => { messageTextRefs.current[index] = el; }} 
                      className="text-sm md:text-base min-h-[1.2em]" // min-h for layout stability
                    >
                      {/* Text will be animated by GSAP if it's the current message, otherwise pre-fill if already shown */}
                      {(hasChatAnimationStarted && index < currentAnimatingMessageIndex) ? msg.text : ""}
                    </p>
                  </div>
                  {msg.sender === 'Lead' && <LeadAvatar />}
                </div>
              ))}
              {/* Removed isTyping (dots) indicator */}
            </div>
            {/* Optional: Input area mockup */}
            <div className="mt-auto pt-3 border-t border-text-muted/20">
              <div className="w-full h-10 bg-card/30 rounded-lg flex items-center px-3">
                <p className="text-sm text-text-muted">Chat disabled in demo</p>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 leading-tight">
              <AuroraText colors={["#FF6B35", "#8B5CF6", "#FF8F65", "#FF4081"]}>
                Convert More Leads with Lee
              </AuroraText>
            </h2>
            <TextAnimate
              as="h3"
              className="text-xl sm:text-2xl md:text-3xl text-text-subheading mb-6"
              animation="fadeIn"
              delay={0.1}
              duration={0.8}
            >
              {'Your AI-Powered Qualification Expert'}
            </TextAnimate>
            <TextAnimate
              as="p"
              className="text-base md:text-lg text-text-body max-w-xl mb-8"
              animation="fadeIn"
              delay={0.2}
              duration={0.8}
            >
              {'Lee, our intelligent AI, works tirelessly to engage, qualify, and nurture your leads. Free up your sales team to focus on closing deals, not chasing cold prospects. Experience higher conversion rates and a streamlined sales pipeline.'}
            </TextAnimate>

            <div className="space-y-4 mb-8 w-full max-w-md">
              {[
                { Icon: Zap, text: "24/7 Automated Engagement: Lee never sleeps, ensuring every lead is contacted instantly." },
                { Icon: CheckSquare, text: "Laser-Focused Qualification: Get only high-intent leads that match your ideal customer profile." },
                { Icon: MessageSquare, text: "Tailored Conversations: Fully customize Lee's scripts and tone to reflect your unique brand voice." },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-brand-primary-orange/20 text-brand-primary-orange rounded-full flex items-center justify-center">
                    <benefit.Icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm md:text-base text-text-body">{benefit.text.replace(/'/g, "\u0027")}</p> {/* Alternative for dynamic text if needed, or ensure static text is pre-escaped or uses JS strings */}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                asChild 
                size="lg" 
                className="font-semibold px-8 py-3 w-full sm:w-auto 
                           bg-transparent border-2 border-brand-deep-purple hover:bg-brand-deep-purple/10
                           shadow-lg hover:shadow-xl hover:shadow-brand-deep-purple/20 
                           transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/features/ai-qualification" className="block"> 
                  <AnimatedGradientText colorFrom="#FF6B35" colorTo="#8B5CF6" className="text-base md:text-lg">
                    Learn More
                  </AnimatedGradientText>
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="font-semibold px-8 py-3 w-full sm:w-auto 
                           border-2 border-brand-primary-orange text-brand-primary-orange
                           hover:bg-brand-primary-orange/10 hover:text-brand-sunset-orange
                           shadow-lg hover:shadow-xl hover:shadow-brand-primary-orange/20
                           transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/demo-lee">{'Try Lee\'s Demo'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadsQualificationSection;
