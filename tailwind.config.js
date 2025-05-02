/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B9673C",
        'primary-light': "#C08A6D",
        dark: "#2C2E35",
        light: "#F5E8E2",
        'light-gray': "#2D2E36",
      },
      fontFamily: {
        lato: ["Lato", "serif"],
      },
      backgroundImage: {
        "spicy": "url('../assets/images/icons/spicy.webp')",
        "vegetarian": "url('../assets/images/icons/vegetarian.webp')",
        "wave": "url('../assets/bg-wave-min.svg')",
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
