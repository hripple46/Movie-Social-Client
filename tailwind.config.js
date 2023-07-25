/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        "bounce-short": "bounce .3s ease-in-out 2",
      },
    },
  },
  plugins: [],
};
