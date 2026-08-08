/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#33060D", // Logo Deep Royal Maroon
          50: "#5A121F",
          100: "#4A0E17",
          200: "#3B0811",
          300: "#33060D",
          400: "#240409"
        },
        maroon: {
          DEFAULT: "#4A0E17",
          dark: "#250409",
          deep: "#33060D",
          rich: "#3B0811",
          glow: "rgba(74, 14, 23, 0.6)"
        },
        gold: {
          light: "#F3E5AB",
          DEFAULT: "#D4AF37",
          medium: "#C5A059",
          dark: "#A38136",
          deep: "#785E22",
          glow: "rgba(212, 175, 55, 0.35)"
        },
        champagne: "#F5F2EB"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #A38136 100%)',
        'gold-radial': 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(51,6,13,0) 70%)',
        'maroon-glass': 'linear-gradient(135deg, rgba(74,14,23,0.85) 0%, rgba(37,4,9,0.92) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
