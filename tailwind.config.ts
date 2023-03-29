import type { Config } from "tailwindcss";

const primary = {
  "50": "#fff1f4",
  "100": "#ffe3e8",
  "200": "#ffcbd8",
  "300": "#ffa1b8",
  "400": "#ff6d94",
  "500": "#fa3972",
  "600": "#e91f64",
  "700": "#c40c4f",
  "800": "#a40d49",
  "900": "#8c0f45",
};

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary,
      },
      typography: {
        primary: {
          css: {
            "--tw-prose-links": primary[600],
            "--tw-prose-invert-links": primary[500],
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
} satisfies Config;
