/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    aspectRatio: { square: "1 / 1", wide: "16 / 9", extra: "4 / 1" },
    fontFamily: {
      sans: [`'Poppins'`, `sans-serif`],
      ubuntu: [`'Poppins'`, `sans-serif`],
      inconsolata: [`'Poppins'`, `sans-serif`],
      poppins: [`'Poppins'`, `sans-serif`],
    },
    extend: {},
    colors: {
      primary: "#d6be85",
      white: "#ffffff",
      black: "#000000",
      grey: "#e5e7eb",
      dark: "#374151",
    },
  },
  plugins: [],
};
