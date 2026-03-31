/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "surface": "#f8f9fa",
        "surface-tint": "#c00000",
        "on-surface": "#191c1d",
        "on-surface-variant": "#44474e",
        "primary": "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#410000",
        "on-primary-container": "#ff291a",
        "secondary": "#495f84",
        "on-secondary": "#ffffff",
        "secondary-container": "#bcd2fe",
        "on-secondary-container": "#445a7f",
        "outline": "#74777f",
        "outline-variant": "#c4c6cf",
        "inverse-surface": "#2e3132",
        "inverse-on-surface": "#f0f1f2",
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
    },
  },
  plugins: [],
}
