/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
  			'accordion-up': 'accordion-up 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
  		},
  		// Motion tokens. DEFAULT replaces Tailwind's stock curve for every
  		// `transition-*` class on the site, so hovers decelerate naturally
  		// instead of moving at a mechanical constant-ish rate.
  		transitionTimingFunction: {
  			DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
  			'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
  			'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
  			'in-out-smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
  			spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  		},
  		// `transition-lift`: hover-lift cards and buttons. Lists the exact
  		// properties that change instead of `transition-all`, which also
  		// animates layout properties and makes the browser re-layout.
  		transitionProperty: {
  			lift: 'transform, translate, scale, box-shadow, border-color, background-color, color'
  		},
  		transitionDuration: {
  			DEFAULT: '300ms',
  			400: '400ms',
  			600: '600ms',
  			800: '800ms'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};