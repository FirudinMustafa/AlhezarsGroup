import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        apple: {
          purple: '#7c3aed',
          'purple-light': '#a78bfa',
          'purple-hover': '#6d28d9',
          gray: {
            1: '#1d1d1f',
            2: '#424245',
            3: '#6e6e73',
            4: '#86868b',
            5: '#aeaeb2',
            6: '#d2d2d7',
          },
          bg: {
            primary: '#fbfbfd',
            secondary: '#f5f5f7',
            elevated: '#ffffff',
          },
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
