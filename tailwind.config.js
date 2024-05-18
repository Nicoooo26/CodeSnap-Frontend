// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ], // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'stone': {
          '50': '#fafaf9',
          '100': '#f5f5f4',
          '200': '#e7e5e4',
          '300': '#d6d3d1',
          '400': '#a8a29e',
          '500': '#78716c',
          '600': '#57534e',
          '700': '#44403c',
          '800': '#292524',
          '900': '#1c1917',
          '950': '#0c0a09',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}