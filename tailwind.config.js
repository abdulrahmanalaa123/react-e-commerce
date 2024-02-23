/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,scss,sass}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      "3xl": "38px",
      "2xl": "36px",
      xl: "32px",
      lg: "24px",
    },
    extend: {
      colors: {
        primary: {
          100: "#ECFFE0",
          200: "#9FE870",
          300: "#387709",
        },
        text: {
          100: "#D9D9D9",
          200: "#585858",
          300: "#232323",
        },
      },
    },
  },
  plugins: [],
};
