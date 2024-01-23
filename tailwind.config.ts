import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'google-blue-600': '#1A73E8',
        'google-blue-700': '#1967D2',
        'firebase-yellow': '#FFCA28',
        'firebase-amber': '#FFA000',

        'firebase-orange': '#F57C00',
        'firebase-navy': '#1B3A57',
        'firebase-coral': '#FF8A65',
        'firebase-grey': '#E5EAF0',
      },
    },
  },
  plugins: [],
};
export default config;
