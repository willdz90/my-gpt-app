/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      // Agrega dentro de theme.extend:

      colors: {
        bg: {
          base: '#0D0D10',
          surface: '#1A1A23',
          light: '#FFFFFF',
          lightSurface: '#F9FAFB'
        },
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          lightPrimary: '#111827',
          lightSecondary: '#6B7280'
        },
        border: {
          base: '#2C2C36',
          light: '#E5E7EB'
        },
        accent: {
          primary: '#6366F1',
          secondary: '#14B8A6',
          lightPrimary: '#4F46E5',
          lightSecondary: '#0D9488'
        },
        graph: {
          line: '#FBBF24',
          lightLine: '#D97706'
        },
        success: { DEFAULT: '#22C55E' },
        warning: { DEFAULT: '#F97316' },
        error: { DEFAULT: '#EF4444' }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif']
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        opacity: 'opacity',
        transform: 'transform'
      }

    }
  },
  plugins: []
}
