import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#06001a",
        neonBlue: "#00BFFF",    
        neonPink: "#FF10F0",     
        neonGreen: "#39FF14",  
        neonOrange: "#FF6700",  
        neonPurple: "#9D00FF", 
        neonHotPinkRed: "#ff1f6b",
        cardBg: "#131313",

        secondaryBg: "#1A1D1D",
        lightGray: "#2c2e2e",
        primaryPurple: "#9185FF",
        captionColor: "#B6B6B6",
      },
    },
  },
  plugins: [],
} satisfies Config;
