const tailwindColors = require('tailwindcss/colors');

const palette = {
  red: {
    50: '#fde4e5',
    100: '#f9bbbd',
    200: '#f68e92',
    300: '#f26166',
    400: '#ef3f45',
    500: '#ec1d24',
    DEFAULT: '#ec1d24',
    600: '#ea1a20',
    700: '#e7151b',
    800: '#e41116',
    900: '#df0a0d'
  },
  blue: {
    50: '#eae8f3',
    100: '#cac6e2',
    200: '#a7a0cf',
    300: '#847abc',
    400: '#695ead',
    500: '#4f419f',
    DEFAULT: '#4f419f',
    600: '#483b97',
    700: '#3f328d',
    800: '#362a83',
    900: '#261c72'
  },
  green: {
    50: '#e0f7f3',
    100: '#b3ebe1',
    200: '#80ddcd',
    300: '#4dcfb8',
    400: '#26c5a9',
    500: '#00bb9a',
    DEFAULT: '#00bb9a',
    600: '#00b592',
    700: '#00ac88',
    800: '#00a47e',
    900: '#00966c'
  },
  yellow: {
    50: '#fff6e0',
    100: '#ffe9b3',
    200: '#ffda80',
    300: '#ffcb4d',
    400: '#ffbf26',
    500: '#ffb400',
    DEFAULT: '#ffb400',
    600: '#ffad00',
    700: '#ffa400',
    800: '#ff9c00',
    900: '#ff8c00'
  },
  'light-blue': {
    50: '#eeeffe',
    100: '#d5d6fd',
    200: '#babbfb',
    300: '#9e9ff9',
    400: '#898bf8',
    500: '#7476f7',
    DEFAULT: '#7476f7',
    600: '#6c6ef6',
    700: '#6163f5',
    800: '#5759f3',
    900: '#4446f1'
  }
};

module.exports = {
  content: {
    files: ['./projects/**/*.{html,ts}']
  },
  theme: {
    colors: {
      axiomblue: '#003399',
      transparent: 'transparent',
      current: 'currentColor',
      black: tailwindColors.black,
      white: tailwindColors.white,
      gray: tailwindColors.gray,
      red: palette.red,
      blue: palette.blue,
      yellow: palette.yellow,

      // Main colors
      thunder: '#231f20',
      stratos: '#000044',
      'lucky-point': '#191970',
      gigas: palette.blue.DEFAULT,
      'cornflower-blue': palette['light-blue'].DEFAULT,

      // Backgrounds
      selago: '#fff',
      axiom: '#003399',
      lightaxiom: '#0066CC',
      accounterror: '#F95D51',

      primary: palette.blue.DEFAULT,
      success: palette.green.DEFAULT,
      warning: palette.yellow.DEFAULT,
      error: palette.red.DEFAULT
    },
    screens: {
      // breakpoints are mobile first. everything below 768px is considered a phone
      sm: '768px', // tablets in portrait and up
      md: '992px', // tablets in landscape, small desktops and up
      lg: '1200px' // large desktops and up
    },
    fontFamily: {
      sans: ['Fira Sans', 'sans-serif']
    }
  },
  plugins: [],
  important: '#twroot'
};
