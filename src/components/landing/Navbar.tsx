import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Shadcn UI Button
import { Layers } from 'lucide-react'; // Added for logo icon

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-text-headline hover:opacity-80 transition-all duration-300 ease-in-out group">
              <Layers className="h-7 w-7 text-brand-primary-orange group-hover:rotate-[15deg] transition-transform duration-300 ease-in-out" /> 
              <span className="group-hover:text-brand-sunset-orange transition-colors duration-300">Adverlead</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium text-text-body hover:text-brand-sunset-orange transition-all duration-200 ease-in-out hover:translate-y-[-2px]">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium text-text-body hover:text-brand-sunset-orange transition-all duration-200 ease-in-out hover:translate-y-[-2px]">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-text-body hover:text-brand-sunset-orange transition-all duration-200 ease-in-out hover:translate-y-[-2px]">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium text-text-body hover:text-brand-sunset-orange transition-all duration-200 ease-in-out hover:translate-y-[-2px]">
              Contact
            </Link>
            <Link href="/changelog" className="text-sm font-medium text-text-body hover:text-brand-sunset-orange transition-all duration-200 ease-in-out hover:translate-y-[-2px]">
              Changelog
            </Link>
          </div>
          <div className="flex items-center">
            <Button 
              asChild 
              size="sm" 
              className="font-semibold bg-cta-gradient text-white hover:opacity-90 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
            >
              <Link href="/get-started">GET STARTED</Link>
            </Button>
            {/* Mobile menu button can be added here if needed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
