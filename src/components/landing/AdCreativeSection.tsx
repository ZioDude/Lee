import React, { useEffect, useRef, useState, useCallback } from 'react'; // Added useCallback
import NextImage from 'next/image';
import { BarChartBig, Users, Settings, Bell, LayoutDashboard, ShoppingBag, MessageSquare, Send, Image as ImageIcon, Zap, Target, Award, ShieldCheck, ArrowRight } from 'lucide-react'; // Removed CheckCircle
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const adImageSources = [
  "/ad1.png",
  "/ad2.png",
  "/ad3.png",
  "/ad4.png",
];

const benefits = [
  { icon: Zap, text: "Lightning-Fast Generation: Get ad creatives in seconds, not hours." },
  { icon: Target, text: "Hyper-Personalized Content: AI crafts ads that resonate with your audience." },
  { icon: Award, text: "Optimized for Performance: Maximize engagement and conversions." },
  { icon: ShieldCheck, text: "Brand Consistency: Maintain a cohesive brand voice effortlessly." },
];

const AdCreativeSection = () => {
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const animatedDashboardContainerRef = useRef<HTMLDivElement>(null); 
  const chatContentContainerRef = useRef<HTMLDivElement>(null); 
  
  const [currentView, setCurrentView] = useState<'initialStatic' | 'chatActive'>('initialStatic');
  const currentViewRef = useRef(currentView); 

  // const [hasScrolled, setHasScrolled] = useState(false); // Removed hasScrolled state

  const [showLoadingInChat, setShowLoadingInChat] = useState(false);
  const [showAdImages, setShowAdImages] = useState(false);
  const [showInstagramPrompt, setShowInstagramPrompt] = useState(false); 
  const [showPublishButton, setShowPublishButton] = useState(false); 
  
  const userPromptRef = useRef<HTMLParagraphElement>(null);
  const leeReplyRef = useRef<HTMLParagraphElement>(null);
  const adImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const instagramPromptRef = useRef<HTMLParagraphElement>(null); 
  const publishButtonContainerRef = useRef<HTMLDivElement>(null);

  const chatAnimationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    currentViewRef.current = currentView;
  }, [currentView]);

  // Removed useEffect for hasScrolled

  const resetAllAnimatedElements = () => {
    const textRefsAndParents = [ userPromptRef, leeReplyRef, instagramPromptRef ];
    textRefsAndParents.forEach(textRef => {
      if (textRef.current) {
        gsap.killTweensOf(textRef.current);
        textRef.current.textContent = ""; 
        if (textRef.current.parentElement) {
          gsap.killTweensOf(textRef.current.parentElement);
          gsap.set(textRef.current.parentElement, { opacity: 0, y: 10 });
        }
      }
    });

    adImageRefs.current.forEach(imgRef => {
      if (imgRef) {
        gsap.killTweensOf(imgRef);
        gsap.set(imgRef, { opacity: 0, y: 20, scale: 0.9 });
      }
    });
    if (publishButtonContainerRef.current) {
      gsap.killTweensOf(publishButtonContainerRef.current);
      gsap.set(publishButtonContainerRef.current, { opacity: 0, y: 10 });
    }
    if (chatAnimationTimelineRef.current) {
        chatAnimationTimelineRef.current.kill();
        chatAnimationTimelineRef.current = null;
    }
  };

  const startAnimationSequence = useCallback(() => { // Wrapped in useCallback
    resetAllAnimatedElements();
    setShowLoadingInChat(false);
    setShowAdImages(false);
    setShowInstagramPrompt(false);
    setShowPublishButton(false);
    setCurrentView('chatActive');
  }, []); // Added empty dependency array for useCallback, assuming no external dependencies for this function's definition
  
  useEffect(() => {
    if (currentView === 'chatActive') {
      const userQuery = "Generate ads for my renovation business";
      const aiReply = "Sure! Generating ad creatives...";
      const typingSpeedFactor = 0.04;
      const tl = gsap.timeline({ onComplete: () => { if (chatAnimationTimelineRef.current === tl) chatAnimationTimelineRef.current = null; } });
      chatAnimationTimelineRef.current = tl;

      if (userPromptRef.current?.parentElement) tl.to(userPromptRef.current.parentElement, { opacity: 1, y: 0, duration: 0.3 }, "+=0.1");
      tl.set(userPromptRef.current, { text: "" }).to(userPromptRef.current, { duration: userQuery.length * typingSpeedFactor, text: userQuery, ease: "none" });
      if (leeReplyRef.current?.parentElement) tl.to(leeReplyRef.current.parentElement, { opacity: 1, y: 0, duration: 0.3 }, "-=0.2");
      tl.set(leeReplyRef.current, { text: "" }).to(leeReplyRef.current, { duration: aiReply.length * typingSpeedFactor, text: aiReply, ease: "none" })
        .call(() => setShowLoadingInChat(true), [], "+=0.2")
        .to({}, { duration: 2 })  
        .call(() => { 
          setShowLoadingInChat(false); 
          setShowAdImages(true); 
        }, []);
    }
  }, [currentView]);

  useEffect(() => {
    if (showAdImages) {
      const images = adImageRefs.current.filter(el => el !== null) as HTMLDivElement[];
      if (images.length > 0) gsap.to(images, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out', delay: 0.1, onComplete: () => setShowInstagramPrompt(true) });
      else setShowInstagramPrompt(true);
    } else adImageRefs.current.forEach(imgRef => { if(imgRef) gsap.set(imgRef, {opacity:0, y:20, scale:0.9}); });
  }, [showAdImages]);

  useEffect(() => {
    const el = instagramPromptRef.current; const parent = el?.parentElement;
    if (showInstagramPrompt && el && parent) {
      const text = "Do you want me to upload them to your Instagram page and run ads?"; const speed = 0.04;
      gsap.fromTo(parent, {opacity:0, y:10}, {opacity:1, y:0, duration:0.3, ease: 'power1.out', delay: 0.2, onComplete: () => {
        gsap.set(el, { text: ""}); gsap.to(el, { duration: text.length * speed, text, ease: "none", delay: 0.1,  onComplete: () => setShowPublishButton(true) });
      }});
    } else if (!showInstagramPrompt && parent) { gsap.set(parent, {opacity:0, y:10}); if(el) el.textContent = ""; }
  }, [showInstagramPrompt]);

  useEffect(() => {
    const el = publishButtonContainerRef.current;
    if (showPublishButton && el) gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 });
    else if (!showPublishButton && el) gsap.set(el, {opacity:0, y:10});
  }, [showPublishButton]);

  useEffect(() => {
    const triggerElement = animatedDashboardContainerRef.current; 
    if (triggerElement && !scrollTriggerInstanceRef.current) { 
        scrollTriggerInstanceRef.current = ScrollTrigger.create({
            trigger: triggerElement, 
            start: "top 75%", // Trigger when the top of the element reaches 75% of the viewport height
            once: true, 
            onEnter: () => { 
              if (currentViewRef.current === 'initialStatic') {
                startAnimationSequence(); 
              }
            }
        });
    }
    // Cleanup function to kill the ScrollTrigger instance when the component unmounts or dependencies change
    return () => {
      if (scrollTriggerInstanceRef.current) {
        scrollTriggerInstanceRef.current.kill();
        scrollTriggerInstanceRef.current = null;
      }
    };
  }, [startAnimationSequence]); // Dependency: startAnimationSequence ensures ST is recreated if the function changes

  // Removed the separate cleanup useEffect as it's now part of the ScrollTrigger setup useEffect.

  const DashboardSidebar = () => ( <div className="w-14 md:w-16 flex-shrink-0 bg-card/10 rounded-lg p-2 flex flex-col items-center space-y-2 md:space-y-3"> <div className="h-6 w-6 md:h-7 md:w-7 bg-brand-primary-orange/40 rounded-full flex items-center justify-center text-brand-primary-orange"> <LayoutDashboard className="h-3 w-3 md:h-3.5 md:w-3.5" /> </div> {[ { Icon: ImageIcon, active: true, label: "Ad Creatives" }, { Icon: BarChartBig, active: false, label: "Analytics" }, { Icon: Users, active: false, label: "Audiences" }, { Icon: ShoppingBag, active: false, label: "Campaigns" }, { Icon: Settings, active: false, label: "Settings" } ].map(({ Icon, active, label }, i) => ( <div key={`sb-icon-${i}`} title={label} className={`h-5 w-5 md:h-6 md:w-6 rounded-md flex items-center justify-center cursor-pointer ${active ? 'bg-brand-deep-purple/30 text-brand-deep-purple' : 'bg-card/30 text-text-muted-strong/70 hover:bg-brand-sunset-orange/20 hover:text-brand-sunset-orange'}`} > <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" /> </div> ))} <div className="!mt-auto h-4 w-4 md:h-5 md:w-5 rounded-full bg-brand-warm-pink/30 text-brand-warm-pink flex items-center justify-center"> <Bell className="h-2.5 w-2.5 md:h-3 md:w-3" /> </div> </div> );
  const renderInitialStaticContent = () => ( <div className="flex-grow flex flex-col items-center justify-center p-2 h-full"> <div className="flex items-center bg-card/50 p-3 rounded-lg border border-brand-deep-purple/40 shadow-xl w-full max-w-lg cursor-pointer hover:bg-card/60 transition-colors" onClick={startAnimationSequence} > <MessageSquare className="h-5 w-5 text-brand-deep-purple/80 mr-3 flex-shrink-0" /> <input type="text" placeholder="Ask Lee to generate ad creatives..." className="flex-grow bg-transparent text-sm md:text-base text-text-body placeholder-text-muted-strong focus:outline-none pointer-events-none" readOnly /> <Send className="h-4 w-4 md:h-5 md:w-5 text-brand-primary-orange ml-3 flex-shrink-0" /> </div> </div> );
  
  const renderChatActiveContent = () => ( 
    <div ref={chatContentContainerRef} className="flex-grow flex flex-col justify-end p-3 md:p-4 space-y-3 w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-brand-primary-orange/50 scrollbar-track-transparent"> 
      <div className="bg-card/70 p-2.5 rounded-lg self-end max-w-[85%] shadow-md border border-brand-primary-orange/30 opacity-0"> <p ref={userPromptRef} className="text-sm md:text-base text-text-body min-h-[1.2em]">&nbsp;</p> </div> 
      <div className="bg-brand-deep-purple/50 p-2.5 rounded-lg self-start max-w-[85%] shadow-md border border-brand-deep-purple/50 opacity-0"> <p ref={leeReplyRef} className="text-sm md:text-base text-text-subheading min-h-[1.2em]">&nbsp;</p> </div> 
      {showLoadingInChat && ( <div className="self-start flex items-center space-x-2 p-2"> <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-brand-primary-orange"></div> <p className="text-sm text-text-muted-strong">Lee is generating creatives...</p> </div> )} 
      {showAdImages && ( <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-full self-start max-w-[85%]"> {adImageSources.map((src, index) => ( <div key={src} ref={el => { adImageRefs.current[index] = el; }} className="relative aspect-square bg-card/50 rounded-md overflow-hidden shadow-lg opacity-0" > <NextImage src={src} alt={`Ad Creative ${index + 1}`} layout="fill" objectFit="cover" /> </div> ))} </div> )} 
      {showInstagramPrompt && ( <div className="bg-brand-deep-purple/50 p-2.5 rounded-lg self-start max-w-[85%] shadow-md border border-brand-deep-purple/50 opacity-0"> <p ref={instagramPromptRef} className="text-sm md:text-base text-text-subheading min-h-[1.2em]">&nbsp;</p> </div> )} 
      {showPublishButton && ( <div ref={publishButtonContainerRef} className="self-end max-w-[85%] mt-2 opacity-0">  <button onClick={startAnimationSequence} className="bg-transparent hover:bg-brand-primary-orange/10 text-brand-primary-orange font-semibold py-2 px-4 border border-brand-primary-orange rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm md:text-base" > Publish to Instagram </button> </div> )} 
    </div> 
  );

  return (
    <section ref={sectionContainerRef} className="relative min-h-screen w-screen flex items-center justify-center bg-transparent text-text-headline p-4 md:p-8 lg:p-12 overflow-hidden">
      <div className="container mx-auto h-full flex items-center relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch w-full h-full"> 
          <div ref={animatedDashboardContainerRef} className="flex justify-center items-center bg-black/50 backdrop-blur-lg p-2 md:p-3 rounded-xl shadow-2xl h-[600px] md:h-[650px] w-full overflow-hidden border border-brand-deep-purple/40">
            <div className="flex h-full w-full space-x-1.5 md:space-x-2">
              <DashboardSidebar />
              <div className="flex-grow flex flex-col h-full overflow-hidden relative">
                {currentView === 'initialStatic' && renderInitialStaticContent()}
                {currentView === 'chatActive' && renderChatActiveContent()}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center md:text-left h-full py-8 md:py-0"> 
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight">
              Automate Ad Creatives <span className="text-brand-primary-orange">with Lee</span>
            </h2>
            <p className="text-lg md:text-xl text-text-body max-w-xl mb-6 md:mb-8">
              Discover how Lee, your AI assistant, can revolutionize your ad creative process. 
              Generate compelling ad copy, design stunning visuals, and launch campaigns faster than ever before.
            </p>
            <ul className="space-y-3 mb-8 md:mb-10 text-left max-w-md mx-auto md:mx-0">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <benefit.icon className="h-6 w-6 text-brand-primary-orange mr-3 mt-1 flex-shrink-0" />
                  <span className="text-text-body/90 text-base md:text-lg">{benefit.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-brand-primary-orange hover:bg-brand-primary-orange/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-base md:text-lg flex items-center justify-center group">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent hover:bg-text-muted/10 text-text-body font-semibold py-3 px-6 rounded-lg border border-text-muted/50 shadow-sm transition-colors duration-150 ease-in-out text-base md:text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdCreativeSection;
