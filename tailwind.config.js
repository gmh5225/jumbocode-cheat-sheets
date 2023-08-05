import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Helvetica Neue", "Helvetica", "sans-serif"],
        headings: ["var(--font-tasa-orbiter)"],
      },
      colors: {
        gray: colors.stone,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
