export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 25px 80px rgba(15, 23, 42, 0.18)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shake: 'shake 0.45s ease-in-out',
      },
    },
  },
  plugins: [],
};
