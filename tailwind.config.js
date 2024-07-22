/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        login: "#292F33",
        loginPopup: "#CCD6DD",
        loginButton: "#55ACEE",
      },
      width: {
        138: "34.5rem",
        161: "40.25rem",
        192: "48rem",
      },
      textColor: {
        projectGrey: "#66757F",
        projectBlue: "#55ACEE",
      },
    },
  },
  plugins: [],
};
