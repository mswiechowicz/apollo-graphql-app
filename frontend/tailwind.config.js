/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}'
  ],
	theme: {
		extend: {
			colors: {
				'custom-bg': '#1b2240',
				'custom-bg-darker': '#060e2f',
				'primary': {
          50: '#f6f5fd',
					100: '#eeecfb',
          200: '#dfdcf8',
					300: '#c7bff3',
					400: '#aa9bea',
					500: '#8e72e0',
					600: '#815bd5',
					700: '#6c42bf',
          800: '#5a37a0',
          900: '#4b2e84',
          950: '#2f1c59'
				}
			}
		}
	},
	plugins: []
};

