/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 1000s linear infinite",
        bot: "bot 3s ease-in-out infinite alternate",
        slide: "slide 8s ease-in-out infinite alternate",
      },
      keyframes: {
        rotate: {
          "0%": { transform: " rotate(0deg)" },
          "100%": { transform: "rotate(60deg)" },
        },
        bot: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: " scale(1.1) rotate(-5deg)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
