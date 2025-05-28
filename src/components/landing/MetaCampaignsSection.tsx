import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
// import { FlickeringGrid } from "@/components/magicui/flickering-grid"; // Removed FlickeringGrid import
import { Megaphone, Layers, MousePointer, Users, CreditCard, CheckCircle, LayoutDashboard, Facebook, Instagram } from 'lucide-react'; // Added Facebook and Instagram

const MetaCampaignsSection = () => {
  // Mock data for campaigns
  const campaigns = [
    { name: 'Summer Sale Lead Gen', status: 'Published', icon: <CheckCircle className="h-4 w-4 text-green-400" />, active: true },
    { name: 'New Collection Awareness', status: 'Draft', icon: null, active: false },
    { name: 'Website Traffic Q2', status: 'Ended', icon: null, active: false },
  ];

  const DashboardSidebar = () => (
    <div className="w-14 md:w-16 flex-shrink-0 bg-card/10 rounded-lg p-2 flex flex-col items-center space-y-2 md:space-y-3">
      <div className="h-6 w-6 md:h-7 md:w-7 bg-brand-deep-purple/40 rounded-full flex items-center justify-center text-brand-deep-purple">
        <LayoutDashboard className="h-3 w-3 md:h-3.5 md:w-3.5" />
      </div>
      {[
        { Icon: Megaphone, active: true, label: "Campaigns" },
        { Icon: Layers, active: false, label: "Ad Sets" },
        { Icon: MousePointer, active: false, label: "Ads" },
        { Icon: Users, active: false, label: "Audiences" },
        { Icon: CreditCard, active: false, label: "Billing" },
      ].map(({ Icon, active, label }, i) => (
        <div 
          key={`meta-sb-icon-${i}`} 
          title={label}
          className={`h-5 w-5 md:h-6 md:w-6 rounded-md flex items-center justify-center cursor-pointer
            ${active ? 'bg-brand-primary-orange/30 text-brand-primary-orange' : 'bg-card/30 text-text-muted-strong/70 hover:bg-brand-sunset-orange/20 hover:text-brand-sunset-orange'}`}
        >
          <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
        </div>
      ))}
    </div>
  );

  return (
    <section 
      className="relative h-full w-full flex items-center justify-center text-text-headline p-4 md:p-8 overflow-hidden" // Adjusted h-screen and w-screen to h-full w-full to fit parent
    >
      {/* <FlickeringGrid 
        className="absolute inset-0 z-0" 
        color="rgba(255,107,53,1)" // Using the orange color from previous SVG
        squareSize={3} 
        gridGap={8} 
        flickerChance={0.1} 
        maxOpacity={0.2} // Increased maxOpacity for visibility
      /> */} {/* FlickeringGrid removed */}
      <div className="container mx-auto h-full flex items-center relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
          {/* Left Column: Text Content (Now on the left) */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              <AuroraText colors={["#FF6B35", "#8B5CF6", "#FF8F65", "#FF4081"]}>Connect & Conquer:</AuroraText>
              <span className="block text-text-subheading text-2xl sm:text-3xl md:text-4xl mt-1">Meta Campaigns with Lee</span>
            </h2>
            <TextAnimate
              as="p"
              className="text-base md:text-lg text-text-body max-w-xl mb-8"
              animation="fadeIn"
              by="word"
              delay={0.1}
              duration={0.8}
            >
              {'Lee doesn\'t just create stunning ads; he takes them live! Connect your Facebook account, and Lee will seamlessly upload your new creatives to the Meta Ads platform. Tell Lee your goals, and watch as he publishes powerful lead generation campaigns, all through simple commands.'}
            </TextAnimate>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                asChild 
                size="lg" 
                className="font-semibold px-8 py-3 w-full sm:w-auto 
                           bg-transparent border-2 border-brand-deep-purple hover:bg-brand-deep-purple/10
                           shadow-lg hover:shadow-xl hover:shadow-brand-deep-purple/20 
                           transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/connect-facebook" className="block"> 
                  <AnimatedGradientText colorFrom="#FF6B35" colorTo="#8B5CF6" className="text-base md:text-lg">
                    Connect Your Facebook
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
                <Link href="/lee-demo">See Lee in Action</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Meta Ads Mockup (Now on the right) */}
          <div className="flex justify-center items-center bg-dashboard-panel-bg/80 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl aspect-[16/10] max-h-[75vh] overflow-hidden border border-brand-primary-orange/30">
            <div className="flex h-full w-full space-x-2 md:space-x-3">
              <DashboardSidebar />
              <div className="flex-grow flex flex-col h-full overflow-hidden p-2 bg-card/20 rounded-lg">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-lg font-semibold text-text-subheading">Campaigns</h3>
                  <div className="flex items-center space-x-2">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <Instagram className="h-5 w-5 text-pink-500" />
                  </div>
                </div>
                <div className="space-y-2 overflow-y-auto flex-grow pr-1">
                  {campaigns.map((campaign, index) => (
                    <div 
                      key={index} 
                      className={`p-2.5 rounded-md flex items-center justify-between text-xs md:text-sm shadow-md transition-all
                        ${campaign.active ? 'bg-brand-primary-orange/10 border border-brand-primary-orange/50' : 'bg-card/40 hover:bg-card/60'}`}
                    >
                      <span className={campaign.active ? "text-brand-primary-orange font-medium" : "text-text-body"}>{campaign.name}</span>
                      <div className="flex items-center space-x-1.5">
                        {campaign.icon}
                        <span className={`text-xs ${campaign.active ? 'text-green-300' : 'text-text-muted-strong'}`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {campaigns.find(c => c.active && c.status === 'Published') && (
                  <div className="mt-3 p-2 bg-green-500/20 rounded-md border border-green-500/50 shadow-lg text-center">
                    <p className="text-sm text-green-300 font-semibold flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                      Campaign Published Successfully!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetaCampaignsSection;
