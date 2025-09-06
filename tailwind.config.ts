import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					dark: 'hsl(var(--secondary-dark))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					vibrant: 'hsl(var(--accent-vibrant))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				quest: {
					progress: 'hsl(var(--quest-progress))',
					bg: 'hsl(var(--quest-bg))',
					border: 'hsl(var(--quest-border))'
				},
				badge: {
					gold: 'hsl(var(--badge-gold))',
					silver: 'hsl(var(--badge-silver))',
					bronze: 'hsl(var(--badge-bronze))'
				},
				path: {
					glow: 'hsl(var(--path-glow))',
					primary: 'hsl(var(--path-primary))',
					secondary: 'hsl(var(--path-secondary))'
				},
				'badge-enhanced': {
					legendary: 'hsl(var(--badge-legendary))',
					'legendary-glow': 'hsl(var(--badge-legendary-glow))',
					'legendary-shadow': 'hsl(var(--badge-legendary-shadow))',
					epic: 'hsl(var(--badge-epic))',
					'epic-glow': 'hsl(var(--badge-epic-glow))',
					'epic-shadow': 'hsl(var(--badge-epic-shadow))',
					rare: 'hsl(var(--badge-rare))',
					'rare-glow': 'hsl(var(--badge-rare-glow))',
					'rare-shadow': 'hsl(var(--badge-rare-shadow))',
					common: 'hsl(var(--badge-common))',
					'common-glow': 'hsl(var(--badge-common-glow))',
					'common-shadow': 'hsl(var(--badge-common-shadow))'
				}
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'gradient-eco': 'var(--gradient-eco)',
				'gradient-earth': 'var(--gradient-earth)',
				'gradient-growth': 'var(--gradient-growth)',
				'gradient-legendary': 'var(--gradient-legendary)',
				'gradient-epic': 'var(--gradient-epic)',
				'gradient-rare': 'var(--gradient-rare)',
				'gradient-common': 'var(--gradient-common)',
				'gradient-conic': 'conic-gradient(from 0deg, transparent, currentColor, transparent)'
			},
			boxShadow: {
				'natural': 'var(--shadow-natural)',
				'card': 'var(--shadow-card)'
			},
			transitionTimingFunction: {
				'natural': 'var(--transition-natural)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'scale-in': {
					"0%": {
						transform: "scale(0.95)",
						opacity: "0"
					},
					"100%": {
						transform: "scale(1)",
						opacity: "1"
					}
				},
				'float': {
					"0%, 100%": {
						transform: "translateY(0px)"
					},
					"50%": {
						transform: "translateY(-10px)"
					}
				},
				'glow-pulse': {
					"0%, 100%": {
						opacity: "0.5"
					},
					"50%": {
						opacity: "1"
					}
				},
				'walk': {
					"0%": {
						transform: "translateX(0) scaleX(1)"
					},
					"50%": {
						transform: "translateX(50px) scaleX(1)"
					},
					"100%": {
						transform: "translateX(100px) scaleX(-1)"
					}
				},
				'path-draw': {
					"0%": {
						strokeDasharray: "0 1000"
					},
					"100%": {
						strokeDasharray: "1000 0"
					}
				},
				'legendary-pulse': {
					"0%, 100%": {
						transform: "scale(1)",
						filter: "drop-shadow(0 0 25px hsl(var(--badge-legendary-glow) / 0.8)) drop-shadow(0 0 50px hsl(var(--badge-legendary) / 0.4))"
					},
					"33%": {
						transform: "scale(1.08)",
						filter: "drop-shadow(0 0 35px hsl(var(--badge-legendary-glow) / 1)) drop-shadow(0 0 70px hsl(var(--badge-legendary) / 0.6))"
					},
					"66%": {
						transform: "scale(1.05)",
						filter: "drop-shadow(0 0 45px hsl(var(--badge-legendary-glow) / 0.9)) drop-shadow(0 0 80px hsl(var(--badge-legendary) / 0.5))"
					}
				},
				'epic-pulse': {
					"0%, 100%": {
						transform: "scale(1)",
						filter: "drop-shadow(0 0 20px hsl(var(--badge-epic-glow) / 0.7)) drop-shadow(0 0 40px hsl(var(--badge-epic) / 0.3))"
					},
					"50%": {
						transform: "scale(1.06)",
						filter: "drop-shadow(0 0 30px hsl(var(--badge-epic-glow) / 0.9)) drop-shadow(0 0 60px hsl(var(--badge-epic) / 0.5))"
					}
				},
				'rare-pulse': {
					"0%, 100%": {
						transform: "scale(1)",
						filter: "drop-shadow(0 0 15px hsl(var(--badge-rare-glow) / 0.6)) drop-shadow(0 0 30px hsl(var(--badge-rare) / 0.3))"
					},
					"50%": {
						transform: "scale(1.04)",
						filter: "drop-shadow(0 0 25px hsl(var(--badge-rare-glow) / 0.8)) drop-shadow(0 0 45px hsl(var(--badge-rare) / 0.4))"
					}
				},
				'magical-float': {
					"0%, 100%": {
						transform: "translateY(0px) rotate(0deg)"
					},
					"25%": {
						transform: "translateY(-8px) rotate(1deg)"
					},
					"50%": {
						transform: "translateY(-12px) rotate(0deg)"
					},
					"75%": {
						transform: "translateY(-8px) rotate(-1deg)"
					}
				},
				'aura-spin': {
					"0%": {
						transform: "rotate(0deg)"
					},
					"100%": {
						transform: "rotate(360deg)"
					}
				},
				'shimmer': {
					"0%": {
						backgroundPosition: "-200% 0"
					},
					"100%": {
						backgroundPosition: "200% 0"
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'walk': 'walk 4s ease-in-out infinite',
				'path-draw': 'path-draw 2s ease-in-out infinite',
				'legendary-pulse': 'legendary-pulse 4s ease-in-out infinite',
				'epic-pulse': 'epic-pulse 3s ease-in-out infinite',
				'rare-pulse': 'rare-pulse 2.5s ease-in-out infinite',
				'aura-spin': 'aura-spin 12s linear infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'magical-float': 'magical-float 6s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;