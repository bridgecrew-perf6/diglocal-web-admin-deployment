/*global module*/

/*
* Dig ADMIN
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#017375',
        'brand-primary-light': '#97c9Ca',
        'brand-primary-accent': '#8aae3f',
        'brand-secondary': '#f0f3f4',
        'brand-secondary-accent': '#7e1534',
        'brand-gray-light': '#f0f3f4',
        'brand-gray': '#c8d1d3',
        'black': '#1b1c20',
        'white': '#ffffff',
      },
      fontFamily: {
        'exo-2': 'exo-2',
        'work-sans': 'work-sans'
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
