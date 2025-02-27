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
        mainBg: "#0F1111",

        secondaryBg: "#1A1D1D",
        lightGray: "#2c2e2e",
        primaryPurple: "#9185FF",
        captionColor: "#B6B6B6",
        ctaColor: "#CDFFA1"
      },
    },
  },
  plugins: [],
} satisfies Config;
