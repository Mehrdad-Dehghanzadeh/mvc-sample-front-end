/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/views/*.html', './src/script/*.js', './src/script/**/*.js'],
  safelist: [{ pattern: /text-[^opacity]/ }, { pattern: /overflow-*/ }],

  theme: {
    colors: {
      primary: 'var(--color-primary-1)',
      secondary: 'var(--color-secondary-1)',
      neutral: {
        100: 'var(--color-neutral-100)',
        200: 'var(--color-neutral-200)',
        300: 'var(--color-neutral-300)',
        400: 'var(--color-neutral-400)',
        500: 'var(--color-neutral-500)',
        600: 'var(--color-neutral-600)',
        700: 'var(--color-neutral-700)',
        800: 'var(--color-neutral-800)',
        900: 'var(--color-neutral-900)',
      },
    },

    fontFamily: {
      sans: ['iranyekan', 'sans-serif'],
    },

    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
};
