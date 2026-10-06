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
        ios: {
          bg: "#000000",
          space: "#060709",
          surface: "rgba(22, 25, 34, 0.65)",
          glass: "rgba(255, 255, 255, 0.05)",
          glassHover: "rgba(255, 255, 255, 0.09)",
          glassElevated: "rgba(30, 34, 48, 0.72)",
          border: "rgba(255, 255, 255, 0.10)",
          borderBright: "rgba(255, 255, 255, 0.22)",
          blue: "#0A84FF",
          cyan: "#64D2FF",
          green: "#30D158",
          mint: "#63E6E2",
          orange: "#FF9F0A",
          red: "#FF453A",
          purple: "#BF5AF2",
          indigo: "#5E5CE6",
        },
        bg: {
          void: "#000000",
          base: "#05060A",
          surface: "rgba(18, 21, 30, 0.7)",
          elevated: "rgba(28, 33, 46, 0.8)",
          border: "rgba(255, 255, 255, 0.08)",
          borderBright: "rgba(255, 255, 255, 0.2)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "rgba(235, 235, 245, 0.72)",
          muted: "rgba(235, 235, 245, 0.45)",
        },
        accent: {
          mint: "#63E6E2",
          cyan: "#64D2FF",
          blue: "#0A84FF",
          amber: "#FF9F0A",
          crimson: "#FF453A",
          purple: "#BF5AF2",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'squircle-sm': '16px',
        'squircle': '24px',
        'squircle-lg': '32px',
        'squircle-xl': '40px',
      },
      backdropBlur: {
        'xs': '2px',
        'ios': '32px',
        'ios-heavy': '48px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'aurora': 'aurora 14s ease infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
}
