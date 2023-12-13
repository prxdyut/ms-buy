/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    aspectRatio: { square: "1 / 1", wide: "16 / 9", extra: "4 / 1" },
    fontFamily: {
      sans: [`var(--ano-custom-font)`],
      ubuntu: [`var(--ano-custom-font)`],
      inconsolata: [`var(--ano-custom-font)`],
      poppins: [`var(--ano-custom-font)`],
    },
    extend: {},
    colors: {
      primary: "#eb4e5e",
      white: "#ffffff",
      black: "#000000",
      grey: "#e5e7eb",
      dark: "#374151",
    },
  },
  plugins: [],
};
