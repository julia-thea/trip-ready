import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A5F',
        royal: '#2563EB',
        sky: '#DBEAFE',
        slate: '#334155',
        steel: '#64748B',
        ivory: '#FAFBFC',
        silver: '#E2E8F0',
        gold: '#D97706'
      },
      fontFamily: {},
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};

export default config;
