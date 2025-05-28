import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Layers } from 'lucide-react'; // Added Layers for logo placeholder

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-text-body hover:text-brand-sunset-orange transition-colors duration-200">
    {children}
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/30 text-text-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand/Logo */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Layers className="h-8 w-8 text-brand-primary-orange group-hover:text-brand-sunset-orange transition-colors" />
              <span className="text-2xl font-bold text-text-headline group-hover:text-brand-primary-orange transition-colors">
                Adverlead
              </span>
            </Link>
            <p className="text-sm text-text-muted-strong">
              Comprehensive lead generation platform combining CRM, AI ad creatives, and an intelligent chatbot assistant.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:justify-self-center">
            <h3 className="text-md font-semibold text-text-subheading mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/#features">Features</FooterLink></li> {/* Assuming features section has an ID */}
              <li><FooterLink href="/#pricing">Pricing</FooterLink></li>   {/* Assuming pricing section has an ID */}
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="md:justify-self-center">
            <h3 className="text-md font-semibold text-text-subheading mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><FooterLink href="/blog">Blog</FooterLink></li>
              <li><FooterLink href="/help">Help Center</FooterLink></li>
              <li><FooterLink href="/case-studies">Case Studies</FooterLink></li>
            </ul>
          </div>
          
          {/* Column 4: Legal & Social (or just social if legal is below) */}
          <div className="md:justify-self-end">
            <h3 className="text-md font-semibold text-text-subheading mb-4">Legal</h3>
            <ul className="space-y-2.5 mb-6">
              <li><FooterLink href="/privacy-policy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms-of-service">Terms of Service</FooterLink></li>
            </ul>
            <h3 className="text-md font-semibold text-text-subheading mb-3">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-text-muted-strong hover:text-brand-primary-orange transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-text-muted-strong hover:text-brand-primary-orange transition-colors"><Linkedin size={20} /></Link>
              <Link href="#" aria-label="Facebook" className="text-text-muted-strong hover:text-brand-primary-orange transition-colors"><Facebook size={20} /></Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-text-muted-strong">
            &copy; {currentYear} Adverlead Inc. All rights reserved.
          </p>
          {/* Can add more links here if needed, or keep it clean */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
