/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   
  ],
  theme: {
    extend: {
      screens: {
        "sm": '380px',
        'md': '768px',
        'lg': '976px',
        'xl': '1440px',
        '2xl':'1630px'
        
      },
      fontFamily: {
        'frank-lukh': '"Frank Ruhl Libre", serif',
        'poppins': '"Poppins", sans-serif',
      'robo':'"Roboto", sans-serif;'
      },
      container: {
        center:true
      }
    },
  },
  plugins: [

  ],
}

