/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2fbf8",
          100: "#d2f4e8",
          200: "#a5e7d3",
          300: "#6fd5b8",
          400: "#38bb9a",
          500: "#1e997d",
          600: "#177b66",
          700: "#146353",
          800: "#135045",
          900: "#133f37"
        },
        ink: "#0f172a"
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.22)"
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
