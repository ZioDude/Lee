import Head from 'next/head';
import React from 'react';

import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import IntegrationsSection from '@/components/landing/IntegrationsSection';
import FeaturesSection from '@/components/landing/FeaturesSection'; // This now shows the 4 cards under Integrations
import SecuritySection from '@/components/landing/SecuritySection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';

export default function LandingPageV2() { // Renamed component for clarity
  return (
    <>
      <Head>
        <title>Adverlead - Comprehensive Lead Generation (V2)</title> {/* Updated title */}
        <meta
          name="description"
          content="Adverlead: CRM, AI Ad Creatives, and Intelligent Chatbot Lee for seamless lead generation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <HeroSection />

        {/* Wrapper for continuous background for Integrations and Features sections */}
        <div 
          className="relative overflow-hidden" // Removed bg-background
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 80% 30%, rgba(255, 107, 53, 0.1) 0%, rgba(255, 64, 129, 0.05) 35%, rgba(0,0,0,0) 70%),
                url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='0.5' fill='rgba(255,107,53,0.03)'/%3E%3Ccircle cx='80' cy='30' r='0.7' fill='rgba(255,64,129,0.02)'/%3E%3Ccircle cx='50' cy='70' r='0.4' fill='rgba(139,92,246,0.03)'/%3E%3Ccircle cx='30' cy='90' r='0.6' fill='rgba(255,107,53,0.04)'/%3E%3C/svg%3E")
              `,
              backgroundRepeat: 'no-repeat, repeat',
              backgroundPosition: 'right top, 0 0',
            }}
          ></div>
          <div className="relative z-10">
            <IntegrationsSection />
            <FeaturesSection /> {/* This section now shows the 4 cards under "Seamless Integrations" */}
          </div>
        </div>
        
        {/* Wrapper for continuous background for Security and Pricing sections */}
        <div 
          className="relative overflow-hidden" // Removed bg-background
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0) 40%),
                radial-gradient(ellipse at 20% 70%, rgba(190, 90, 250, 0.18) 0%, rgba(255, 64, 129, 0.09) 35%, rgba(0,0,0,0) 70%), /* Main glow for Security */
                radial-gradient(ellipse at 70% 95%, rgba(190, 90, 250, 0.15) 0%, rgba(255, 64, 129, 0.07) 40%, rgba(0,0,0,0) 75%), /* Glow for Pricing bottom */
                url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10h20M10 0v20' stroke='rgba(139,92,246,0.03)' stroke-width='0.5'/%3E%3C/svg%3E")
              `,
              backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat',
              backgroundPosition: 'top center, 20% 50%, 70% 90%, 0 0', // Adjusted positions
              backgroundSize: '100% 350px, 180% 180%, 160% 160%, auto', // Adjusted sizes
            }}
          ></div>
          <div className="relative z-10"> {/* Container for sections to sit above the pseudo-element background */}
            <SecuritySection />
            <PricingSection />
          </div>
        </div>
        
        <Footer />
      </main>
    </>
  );
}
