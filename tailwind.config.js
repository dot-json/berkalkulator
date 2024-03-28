/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: "1rem",
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1200px",
        },
      },
      colors: {
        primary: "#00a7e1",
        "primary-dark": "#0086b4",
      },
    },
  },
  plugins: [],
};
