import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#163028',
          hover: '#204a3c',
          deep: '#0d1f19',
        },
        accent: {
          DEFAULT: '#c9a227',
          hover: '#b08d1f',
          soft: '#e4c46a',
        },
        background: '#f8f6f1',
      },
      fontFamily: {
        display: ['"Noto Serif KR"', 'Georgia', 'serif'],
        en: ['Inter', '"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
