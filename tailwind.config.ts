import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        maxContent: "1270px",
      },
      colors: {
        primary: "#5550DC",
        secondary: "#000000",
        bgPrimary: "#EEF0F3",
        grayLight: "#B0B0B9",
        input: "#5E758E60",
        title: "#5E758E",
        bgDark: "#2e3343",
        bgDarkSecondary: "#252A37",
        textDark: "#eff0f3",
        bgDarkInput: "#6C7280",
      },
      gridTemplateColumns: {
        37: "3fr 7fr",
        2575: "25fr 75fr",
        5545: "55fr 45fr",
        4555: "45fr 55fr",
      },
      boxShadow: {
        mobileButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
