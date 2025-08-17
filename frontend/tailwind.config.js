/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official UIUC Colors
        'uiuc-blue': '#13294B',        // Primary UIUC Blue
        'uiuc-orange': '#E84A27',      // Official UIUC Orange
        'uiuc-navy': '#13294B',        // Keep for compatibility
        'uiuc-navy-light': '#1e3a5f',  // Keep for compatibility
        'uiuc-navy-dark': '#0d1f35',   // Darker navy for hover states
        'uiuc-orange-light': '#ff5f05', // Keep for compatibility
        
        // Storm Gray shades
        'storm-gray': '#707372',
        'storm-gray-light': '#9C9A9D',
        'storm-gray-lighter': '#C8C6C7',
        
        // Base colors
        'uiuc-gray': '#f8f9fa',
        'uiuc-gray-dark': '#6c757d',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'uiuc': '0 4px 6px -1px rgba(19, 41, 75, 0.1), 0 2px 4px -1px rgba(19, 41, 75, 0.06)',
        'uiuc-lg': '0 10px 15px -3px rgba(19, 41, 75, 0.1), 0 4px 6px -2px rgba(19, 41, 75, 0.05)',
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'uiuc-gradient': 'linear-gradient(135deg, #13294B 0%, #1e3a5f 100%)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
