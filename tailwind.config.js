/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/img/background.png')",
      },
      colors: {
        brown: {
          100: "#F3EEEA",
          200: "#FAE8DA",
          300: "#C5A5A3",
          400: "#FCE9E0",
          500: "#AA7D7A",
          600: "#A87C79",
          700: "#A97D7A",
          800: "#9A8473",
          900: "#7B6C66",
          1000: "#4D4643",
        },
      },
    },
  },
  plugins: [],
};
