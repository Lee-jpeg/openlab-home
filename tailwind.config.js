/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0057FF',
        'primary-dark': '#0040CC',
        'primary-light': '#3080FF',
        dark: '#111111',
        light: '#f8f9fa',
      },
      backgroundColor: {
        'site-bg': '#000000',
        'card-bg': '#111111',
      },
      transitionProperty: {
        'custom': 'all',
      },
      transitionDuration: {
        'custom': '300ms',
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
} 