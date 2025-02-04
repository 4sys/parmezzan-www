/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#b06a40",
      },
      fontFamily: {
        lato: ["Lato", "serif"],
      },
      backgroundImage: {
        "landing-1-xl": "linear-gradient(0deg,rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('../assets/images/xl/landing-1.webp')",
        "landing-1-lg": "linear-gradient(0deg,rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('../assets/images/lg/landing-1.webp')",
        "landing-1-sm": "linear-gradient(0deg,rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('../assets/images/sm/landing-1.webp')",
        "landing-2-xl": "url('../assets/images/xl/landing-2.webp')",
        "landing-2-lg": "url('../assets/images/lg/landing-2.webp')",
        "landing-2-sm": "url('../assets/images/sm/landing-2.webp')",
        "landing-3-xl": "url('../assets/images/xl/landing-3.webp')",
        "landing-3-lg": "url('../assets/images/lg/landing-3.webp')",
        "landing-3-sm": "url('../assets/images/sm/landing-3.webp')",
        "landing-4-xl": "url('../assets/images/xl/landing-4.webp')",
        "landing-4-lg": "url('../assets/images/lg/landing-4.webp')",
        "landing-4-sm": "url('../assets/images/sm/landing-4.webp')",
        "landing-5-xl": "url('../assets/images/xl/landing-5.webp')",
        "landing-5-lg": "url('../assets/images/lg/landing-5.webp')",
        "landing-5-sm": "url('../assets/images/sm/landing-5.webp')",
        "landing-6-xl": "url('../assets/images/xl/landing-6.webp')",
        "landing-6-lg": "url('../assets/images/lg/landing-6.webp')",
        "landing-6-sm": "url('../assets/images/sm/landing-6.webp')",
        "landing-7-xl": "url('../assets/images/xl/landing-7.webp')",
        "landing-7-lg": "url('../assets/images/lg/landing-7.webp')",
        "landing-7-sm": "url('../assets/images/sm/landing-7.webp')",
      },
    },
  },
  plugins: [],
};
