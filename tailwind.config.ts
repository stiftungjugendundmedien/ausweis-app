import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
        screen: { raw: "screen" },
      },
    },
  },

  daisyui: {
    themes: [
      {
        sktheme: {
          "primary": "#ffc800",
          "primary-content": "#160f00",
          "secondary": "#79b530",
          "secondary-content": "#010a00",
          "accent": "#00aef9",
          "accent-content": "#000b15",
          "neutral": "#11252d",
          "neutral-content": "#cacfd1",
          "base-100": "#ffffff",
          "base-200": "#dedede",
          "base-300": "#bebebe",
          "base-content": "#161616",
          "info": "#7fd9ff",
          "info-content": "#061116",
          "success": "#00d651",
          "success-content": "#001002",
          "warning": "#f68f00",
          "warning-content": "#150700",
          "error": "#ff7279",
          "error-content": "#160405",
        },
      },
    ],
  },

  plugins: [
    daisyui,
    typography,
  ],
} satisfies Config;
