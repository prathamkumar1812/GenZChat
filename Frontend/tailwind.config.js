/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#f4f4f4',
        'primary-600': '#2f4f4f',
        'secondary-500': '#ffffff',
        'secondary-600': '#364c4c',
        'red': '#FF5A5A',
        'dark-1': '#000000',
        'dark-2': '#09090A',
        'dark-3': '#101012',
        'dark-4': '#1F1F22',
        'light-1': '#FFFFFF',
        'light-2': '#EFEFEF',
        'light-3': '#7878A3',
        'light-4': '#5C5C7B',
        'primary-text': '#333333',
        'secondary-text': '#00a5a5',
      },
    },
  },
  plugins: [],
}

