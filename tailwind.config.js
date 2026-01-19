/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* Surface with opacity */
        input: 'var(--color-input)', /* Subtle cream */
        ring: 'var(--color-ring)', /* Warm Colombian orange */
        background: 'var(--color-background)', /* Warm off-white */
        foreground: 'var(--color-foreground)', /* Rich near-black */
        primary: {
          DEFAULT: 'var(--color-primary)', /* Deep forest green */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* Balanced sage green */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* Warm Colombian orange */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* Clear crimson */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* Subtle cream */
          foreground: 'var(--color-muted-foreground)', /* Balanced gray */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* Subtle cream */
          foreground: 'var(--color-card-foreground)', /* On-surface text */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* Subtle cream */
          foreground: 'var(--color-popover-foreground)', /* On-surface text */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* Vibrant forest green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* Bold orange */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* Clear crimson */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        'text-primary': 'var(--color-text-primary)', /* Rich near-black */
        'text-secondary': 'var(--color-text-secondary)', /* Balanced gray */
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'warm-sm': '0 2px 4px rgba(139, 69, 19, 0.08)',
        'warm': '0 4px 8px rgba(139, 69, 19, 0.12)',
        'warm-md': '0 8px 16px rgba(139, 69, 19, 0.15)',
        'warm-lg': '0 12px 24px rgba(139, 69, 19, 0.18)',
        'warm-xl': '0 20px 40px -8px rgba(139, 69, 19, 0.2)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        'bottom-nav': '100',
        'floating-cart': '150',
        'sidebar': '200',
        'notifications': '300',
        'notifications-dropdown': '350',
      },
    },
  },
  plugins: [],
}