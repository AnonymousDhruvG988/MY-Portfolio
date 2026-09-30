/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          void: "#050608",
          base: "#080A0D",
          surface: "#0D1117",
          elevated: "#151B23",
          border: "#1E2633",
          borderBright: "#2D3748",
        },
        text: {
          primary: "#F2F2EA",
          secondary: "#9AA3AD",
          muted: "#5C6572",
        },
        accent: {
          mint: "#7CFFB2",
          cyan: "#62D9FF",
          amber: "#FFB347",
          crimson: "#FF5370",
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 6s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      }
    },
  },
  plugins: [],
}
