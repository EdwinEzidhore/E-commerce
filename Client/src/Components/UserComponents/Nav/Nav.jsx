import React, {useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';


const Nav = () => {
      const navigate = useNavigate();
      const cart = useSelector(state => state.cart.cart);
      const [isloggedin, setIsloggedin] = useState(false);
      const [user, setUser] = useState();
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        
            axios.get('http://localhost:3333/api/v2/isLoggedIn',{withCredentials:true})
                .then((res) => {
                    setIsloggedin(res.data.userStatus);
                      setUser(res.data.isUser);
                     
                })
                  .catch((err) => {
                        console.log(err)
                       
                  })
        },[]);

     

      return (
        
      
          <nav className=' mx-auto flex  items-center py-4 md:justify-evenly font-poppins'>
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
              <div className='md:flex space-x-6 items-center'>
              

                        <div className='relative py-3 px-2'>
                              {
                                    cart.length !== 0 ? <button onClick={()=>navigate('/cart')}><div className='   absolute right-0 top-0 text-white  rounded-full w-6   bg-[#e07097] text-center'><span className=' text-xs   font-bold  rounded-full'>{ cart.length}</span></div></button> :''
                              }
                          
                          <button><a href="/cart"><box-icon type='solid' name='shopping-bags'></box-icon></a></button>
                        </div>
                        <div>
                              {
                                    isloggedin ?
                                          <div className='flex space-x-6'>
                                                <button><box-icon name='heart'></box-icon></button>
                                                <button><box-icon name='bell' type='solid' ></box-icon></button>
                                          </div> : ''
                                          
                              }
                        </div>

                        <div>
                        <button className='' onClick={()=>navigate('/profile')}>
                              {
                                    isloggedin ? <img className='h-8 border rounded-full' src={`http://localhost:3333/${user.avatar.url}`} alt="" />:<box-icon type='solid' name='user-circle'></box-icon>
                              }
                                    

                        </button>
                        </div>


              </div>
                  <div className='flex space-x-1 gap-1'>
                        {
                              isloggedin==true?'': <button className='h-auto bg-orange-400 py-1 px-2 rounded text-white' onClick={()=>navigate('/Login')}>Login</button>
                        }
                   
                   
              </div>
         
          </nav>
    
  )
}

export default Nav