/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem'
			}
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif']
		}
	},
	daisyui: {
		themes: [
			{
				vangu: {
					primary: '#fff',
					secondary: '#00cafc',
					accent: '#A1A1AA',
					neutral: '#221d27',
					'base-100': '#121212',
					info: '#00c3f4',
					success: '#00f48e',
					warning: '#f46c00',
					error: '#de444c'
				}
			},
			'dark'
		]
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')]
};
