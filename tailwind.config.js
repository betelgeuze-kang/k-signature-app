/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            // Colors from the original code
            'bg-main': '#0A0714',
            'bg-secondary': '#18122B',
            'border-main': '#2E2045',
            'accent-purple': '#C4B5FD',
            'accent-pink': '#EC4899',
            'accent-teal': '#2DD4BF',
            'text-main': '#FAFAFA',
        },
        animation: {
            'fadeIn': 'fadeIn 0.3s ease-in-out forwards',
            'heartBounce': 'heartBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
        keyframes: {
            fadeIn: {
                'from': { opacity: '0' },
                'to': { opacity: '1' },
            },
            heartBounce: {
                '0%': { transform: 'scale(1)' },
                '40%': { transform: 'scale(1.4)' },
                '70%': { transform: 'scale(0.9)' },
                '100%': { transform: 'scale(1)' },
            }
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Or whatever font was default/implied, using system fallback for now
      }
    },
    plugins: [],
  }
