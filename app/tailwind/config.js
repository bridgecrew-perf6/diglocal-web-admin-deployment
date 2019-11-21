/*global module*/

/*
* Dig ADMIN
*/
module.exports = {
  theme: {
    extend: {
      screens: {
        mobile: { max: '767px' },
        desktop: { min: '768px' },
      },
      colors: {
        'brand-primary': {
          'light': '#97c9Ca', // brand color
          'default': '#017375', // brand color
          'darker': '#006666' // TBD? Need to confirm hover on buttons
        },
        'brand-primary-accent': '#8aae3f',
        'brand-secondary': '#f0f3f4',
        'brand-secondary-accent': '#932445',
        'brand-error': '#e02020',
        'brand-gray-light': '#f0f3f4',
        'brand-gray': '#c8d1d3',
        'black': '#1b1c20',
        'white': '#ffffff',
        'gray': {
          100: '#f7fafc', // default
          200: '#f0f3f4', // brand-gray-light
          300: '#e2e8f0', // default
          400: '#c8d1d3', // brand-gray
          500: '#a0aec0', // default
          600: '#767676', // brand
          700: '#4a5568', // default
          800: '#2d3748', // default
          900: '#1a202c', // default
        },
      },
      fontFamily: {
        'poppins': ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' ],
      },
      inset: {
        '16': '4rem'
      },
      width: {
        'container': '1280px',
        'container-1/4': '320px',
        'container-1/5': '256px',
        'container-3/4': '960px',
        'container-4/5': '1024px',
      },
      maxWidth: {
        'container': '1280px',
        'container-1/4': '320px',
        'container-1/5': '256px',
        'container-3/4': '960px',
        'container-4/5': '1024px',
      },
      minHeight: {
        '48': '12rem',
      },
      maxHeight: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
      },
      spacing: {
        '26': '6.5rem'
      },
      zIndex: {
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100
      }
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover' ],
  },
  plugins: []
}
