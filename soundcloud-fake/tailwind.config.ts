import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'btnTextWhite': '#E9E9E9',
        'headerBlack': '#2B2B2B',
          'btnOrange': '#FF6B00',
          'linkBLue': '#0094FF',
          'warningRed': '#FF4040',
          'textGrey':'#979797',
      }
    },
  },
  plugins: [],
};

export default config;
