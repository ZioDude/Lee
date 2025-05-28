/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enables dark mode based on a class
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // If you ever add an app directory
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Adding your custom brand colors from globals.css
        'brand-primary-orange': 'hsl(var(--brand-primary-orange))',
        'brand-deep-purple': 'hsl(var(--brand-deep-purple))',
        'brand-sunset-orange': 'hsl(var(--brand-sunset-orange))',
        'brand-warm-pink': 'hsl(var(--brand-warm-pink))',
        'text-headline': 'hsl(var(--text-headline))',
        'text-subheading': 'hsl(var(--text-subheading))',
        'text-body': 'hsl(var(--text-body))',
        'text-muted-strong': 'hsl(var(--text-muted-strong))',
        'dashboard-panel-bg': 'hsl(var(--dashboard-panel-bg))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(45deg, hsl(var(--brand-primary-orange)), hsl(var(--brand-deep-purple)))',
        'popular-badge-gradient': 'linear-gradient(to right, hsl(var(--brand-primary-orange)), hsl(var(--brand-warm-pink)))',
      },
      boxShadow: {
        'orange-purple-glow': '0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2), 0 0 80px rgba(139, 92, 246, 0.1)',
        'mixed-glow': '0 0 15px rgba(255, 107, 53, 0.6), 0 0 30px rgba(255, 64, 129, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
