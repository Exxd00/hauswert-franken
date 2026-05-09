import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		'xs': '375px',
  		'sm': '640px',
  		'md': '768px',
  		'lg': '1024px',
  		'xl': '1280px',
  		'2xl': '1536px',
  		'3xl': '1920px',
  		'4xl': '2560px',
  	},
  	extend: {
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
  		fontSize: {
  			'2xs': ['0.625rem', { lineHeight: '0.875rem' }],
  			'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.2vw, 1rem)',
  			'fluid-base': 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)',
  			'fluid-lg': 'clamp(1.125rem, 1rem + 0.4vw, 1.25rem)',
  			'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)',
  			'fluid-2xl': 'clamp(1.5rem, 1.2rem + 0.8vw, 2rem)',
  			'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1vw, 2.5rem)',
  			'fluid-4xl': 'clamp(2.25rem, 1.8rem + 1.5vw, 3.5rem)',
  			'fluid-5xl': 'clamp(3rem, 2.2rem + 2vw, 4.5rem)',
  			'fluid-6xl': 'clamp(3.75rem, 2.8rem + 2.5vw, 6rem)',
  		},
  		spacing: {
  			'18': '4.5rem',
  			'22': '5.5rem',
  			'30': '7.5rem',
  			'screen-safe': 'env(safe-area-inset-bottom)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				xs: '1rem',
  				sm: '1.5rem',
  				md: '2rem',
  				lg: '2.5rem',
  				xl: '3rem',
  				'2xl': '4rem',
  				'3xl': '6rem',
  				'4xl': '8rem',
  			},
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem',
  			'screen-3xl': '1920px',
  			'screen-4xl': '2560px',
  		},
  		minHeight: {
  			'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
  			'touch': '44px',
  		},
  		minWidth: {
  			'touch': '44px',
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
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
