/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Match all React component files
    "./public/index.html",       // Include the root HTML file
  ],
  theme: {
    extend: {}, // Add custom theme extensions here
  },
  plugins: [], // Add Tailwind plugins here if needed (e.g., typography, forms, etc.)
};
