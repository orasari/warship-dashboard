/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom color palette for World of Warships theme
      colors: {
        'wows': {
          'dark': '#0f172a',      // Main dark background
          'blue': '#1e40af',       // Primary blue
          'slate': '#1e293b',      // Card background
          'accent': '#3b82f6',     // Accent blue
        },
        'ship-status': {
          'premium': '#9333ea',    // Purple for premium ships
          'special': '#06b6d4',    // Cyan for special ships
          'tier': '#ca8a04',       // Yellow/gold for tier badges
        }
      },
      
      // Custom shadows for ship cards
      boxShadow: {
        'ship-card': '0 10px 25px -5px rgba(59, 130, 246, 0.2)',
        'ship-hover': '0 20px 25px -5px rgba(59, 130, 246, 0.3)',
      },
      
      // Animation keyframes
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        }
      },
      
      // Custom animations
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      }
    },
  },
  plugins: [],
}