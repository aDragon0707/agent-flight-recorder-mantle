import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171918",
        paper: "#f7f7f3",
        line: "#d8ddd4",
        signal: "#2f6f5e",
        warn: "#9d5a1b",
        danger: "#9f3d3d"
      }
    }
  },
  plugins: []
};

export default config;

