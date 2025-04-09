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
			colors: {
				gelb: {
					DEFAULT: "#ffc900", // Original primary color
					dark: "#ebba00", // Darker primary color
					light: "#ffda4e", // Lighter primary color
				},
				gruen: {
					DEFAULT: "#79b530", // Original primary color
					dark: "#649628", // Darker primary color
					light: "#8dcc40", // Lighter primary color
				},
				rot: {
					DEFAULT: "#ff0000", // Original primary color
					dark: "#d80000", // Darker primary color
					light: "#ff4e4e", // Lighter primary color
				},
				grau: {
					DEFAULT: "#666666", // Original primary color
					dark: "#525252", // Darker primary color
					light: "#ededed", // Lighter primary color
				},
			},
			fontFamily: {
        sk: ['"Source Sans 3"', '"Roboto"', '"sans-serif"'],
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
