import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: '#5C2018',
        cream: 'rgb(250, 248, 245)',
        paper: '#ffffff',
        gold: 'hsl(42, 85%, 55%)',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Lora', 'serif'],
      },
      backgroundImage: {
        'paper-bg': 'hsl(40, 39%, 91%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
