import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
      const navigate = useNavigate();
  return (
      
          <nav className=' mx-auto flex  items-center py-6 md:justify-evenly font-poppins'>
              <div className='flex'>  
        <span className='text-2xl font-extrabold text-[#02c39a]'>S</span><span className='text-xl font-bold text-[#00a896]'>hopify</span>
        <img className='h-6' src="/src/images/icons8-shopping-cart-48.png" alt="" />
            
              </div>
              <div className='md:flex md:space-x-7 gap-4 items-center uppercase tracking-wide '>
        <input className='bg-[#FFDDD2] py-2 px-1 w-80 rounded-lg outline-none' type="search" placeholder='Search' name="" id="" /> 
        <div className='flex gap-4 space-x-6 ease-out text-slate-500'>
          
                  <a className='hover:scale-110 hover:text-slate-800 ' href="/">Home</a>
                  <a className='hover:scale-110 hover:text-slate-800' href="#">Collections</a>
                  <a className='hover:scale-110 hover:text-slate-800' href="#">Men</a>
                  <a className='hover:scale-110 hover:text-slate-800' href="#">Women</a>
        </div>
              </div>
              <div className='md:flex space-x-6'>
                  <button><a href="/cart"><box-icon type='solid' name='cart-alt'></box-icon></a></button>
                  <button><a href="/profile"><box-icon type='solid' name='user-circle'></box-icon></a></button>
              </div>
              <div className='flex space-x-1 gap-1'>
                    <button className='h-auto bg-orange-400 py-1 px-2 rounded text-white' onClick={()=>navigate('/Login')}>Login</button>
                   
              </div>
         
          </nav>
    
  )
}

export default Nav