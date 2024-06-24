/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
     
   
  ],
  variants: {
    extend: {
      display: ['group-hover'],
      aspectRatio: {
        '3/2':'3 / 2',
      }
    }
  },
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
      },
     
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
   
  ],
}

