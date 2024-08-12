/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#FFFFFF',
        third: "#2F363B"
      },
      width: {
        138: "34.5rem",
        161: "40.25rem",
        192: "48rem",
      },
      height: {
        138: "34.5rem",
        161: "40.25rem",
        192: "48rem",
      minWidth: {
        56: '14rem',
      },
      backgroundColor: {
        login: "#292F33",
        loginPopup: "#CCD6DD",
        loginButton: "#55ACEE",
        projectLightGrey: "#373f45",
      },
      width: {
        138: "34.5rem",
        161: "40.25rem",
        192: "48rem",
      },
      height: {
        138: "34.5rem",
        161: "40.25rem",
        192: "48rem",
      },
      textColor: {
        projectGrey: "#66757F",
        projectBlue: "#0894DB",
        projectHoverBlue: "#244C61",
        projectWhite: "#CCD6DD",
      },
    },
  },
  plugins: [],
  }
}
