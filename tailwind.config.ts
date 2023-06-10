import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        subtle: "#a5a5a5",
        emphasis: "#f3f4f6",
        black: "#000000",
        white: "#ffffff",
        background: "#101010",
        border: "#444",
      },
    },
  },
  plugins: [],
} satisfies Config;
