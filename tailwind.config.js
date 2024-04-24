const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: "#BED733", // Agrega tu color personalizado
        },
      },
      boxShadow: {
        selected: "0 2px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};