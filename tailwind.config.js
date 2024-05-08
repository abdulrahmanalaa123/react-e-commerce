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
      md: "20px",
    },
    extend: {
      backgroundImage: {
        "banner-image": "url('/src/assets/images/banner.png')",
      },
      // all animations done here because idk how to combine both tailwind and animations or create custom one off animations
      keyframes: {
        showModal: {
          "0%": { transform: "translateY(-48px)", opacity: 0 },

          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        disappearModal: {
          "0%": { transform: "translateY(0px)", opacity: 1 },
          "100%": { transform: "translateY(-48px)", opacity: 0 },
        },
        rotatingButton: {
          "0%": {
            transform: " translateX(-200px)",
          },
          "100%": {
            transform: "translateX(200px)",
          },
        },
      },
      animation: {
        modalShowAnimation: "showModal 0.2s ease-in",
        modalDisappearAnimation: "disappearModal 0.2s ease-out",
        animateArrow:
          "rotatingButton 2s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.15s",
      },
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
          input: "#666687",
          error: "#EE1818",
        },
        buttons: {
          unhoveredProductButtons: "#00000066",
        },
        backgrounds: {
          modalBg: "#FBFFF9",
          cardsBg: "#EAEAEA4D",
          footerBg: "#ECFFE0",
        },

        bg: "#F6F9F6",

        InputBorder: "#DCDCE4",

        error: "#EE1818",
      },
    },
  },
  plugins: [],
};
