module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
          colors: {
              transparent: 'transparent',
              current: 'currentColor',
              white: { DEFAULT: '#FFFFFF' },
              black: { DEFAULT: '#111111' },
              red: { DEFAULT: '#FF6E44' },
              yellow: { DEFAULT: '#FFD600' },
              green: { DEFAULT: '#4AD862', dark:'#2c3e50' },
              gray: { DEFAULT: '#f4f4f4', light: '#D3D3D3', dark: '#777777' },
          }
      },
      boxShadow: {
          card: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          active: '0px 0px 8px rgba(0, 133, 255, 0.3)'
      },
      borderColor: {
          'primary': '#D3D3D3',
          'secondary': 'rgba(0, 133, 255, 0.3)',
  
      },
      placeholderColor: {
          'primary': '#D3D3D3',
          'secondary': '#555456',
          'danger': '#FF0000',
      },
      fontSize: {
          'xs': '9px',
          'sm': '11px',
          'md': '12px',
          'lg': '18px',
          'xl': '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
          '6xl': '4rem',
          '7xl': '5rem',
      },
      screens: {
          'tablet': '640px',
          // => @media (min-width: 640px) { ... }

          'laptop': '1024px',
          // => @media (min-width: 1024px) { ... }

          'desktop': '1280px',
          // => @media (min-width: 1280px) { ... }
      },
  },
  variants: {
      borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      // extend: {
      //     borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      // },
      gridColumn: ['responsive', 'hover'],
      gridColumnStart: ['responsive', 'hover'],
      gridColumnEnd: ['responsive', 'hover'],
  },
  plugins: [],
}
