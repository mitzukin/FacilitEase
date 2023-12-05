/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
     
      colors: {
        "primary": "#1E1E1E",
        "secondary": "#FDFFFC",
        "shade":"#6C757D",
        "light":"#F3F3F3",
        "bg":"#FBFBFB"
      },
    },
  },
  plugins: [],
};
