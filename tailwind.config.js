/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        workspace: {
          sidebar: "var(--color-workspace-sidebar)",
          editor: "var(--color-workspace-editor)",
          border: "var(--color-workspace-border)",
          borderLight: "var(--color-workspace-borderLight)",
          accent: "rgb(var(--color-workspace-accent) / <alpha-value>)",
          accentDark: "rgb(var(--color-workspace-accentDark) / <alpha-value>)",
          textActive: "var(--color-workspace-textActive)",
          textMuted: "var(--color-workspace-textMuted)",
          textSecondary: "var(--color-workspace-textSecondary)",
          chipBg: "var(--color-workspace-chipBg)",
          chipHover: "var(--color-workspace-chipHover)",
          pillBg: "var(--color-workspace-pillBg)",
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Archivo', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        slideUp: 'slideUp 0.25s ease-out forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
