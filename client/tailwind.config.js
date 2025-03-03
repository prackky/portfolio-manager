/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // Explicitly set to 'class' (default in Tailwind 3.x)
    theme: {
      extend: {
        colors: {
          primary: '#1E3A8A',
          secondary: '#3B82F6',
          accent: '#F59E0B',
        },
      },
    },
    plugins: [],
  }