import type { Config } from 'tailwindcss';

/**
 * BarberLess — Design tokens via CSS variables.
 * As cores não são definidas aqui como valores fixos: o Tailwind lê os
 * tokens declarados em `src/app/globals.css` (`:root` e `.dark`), o que
 * permite trocar/ajustar a paleta em um único lugar e mantém tema
 * claro/escuro consistente em toda a aplicação.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-foreground': 'hsl(var(--surface-foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        bronze: {
          50: 'hsl(var(--bronze-50) / <alpha-value>)',
          100: 'hsl(var(--bronze-100) / <alpha-value>)',
          200: 'hsl(var(--bronze-200) / <alpha-value>)',
          300: 'hsl(var(--bronze-300) / <alpha-value>)',
          400: 'hsl(var(--bronze-400) / <alpha-value>)',
          500: 'hsl(var(--bronze-500) / <alpha-value>)',
          600: 'hsl(var(--bronze-600) / <alpha-value>)',
          700: 'hsl(var(--bronze-700) / <alpha-value>)',
          800: 'hsl(var(--bronze-800) / <alpha-value>)',
          900: 'hsl(var(--bronze-900) / <alpha-value>)',
        },
        ivory: {
          DEFAULT: 'hsl(var(--ivory) / <alpha-value>)',
          muted: 'hsl(var(--ivory-muted) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [],
};

export default config;
