import React, {useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCartLength } from '../../../Redux/Cart/CartSlice';



const Nav = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const [isloggedin, setIsloggedin] = useState(false);
      const [user, setUser] = useState();
      const [loading, setLoading] = useState(true);
      
      const cartLength = useSelector(state => state.cart.length);

      useEffect(() => {
        
            axios.get('http://localhost:3333/api/v2/isLoggedIn',{withCredentials:true})
                  .then((res) => {
                     
                        setIsloggedin(res.data.userStatus);
                        setUser(res.data.isUser);
                        dispatch(setCartLength(res.data.CartLength));
                     
                })
                  .catch((err) => {
                        console.log(err)
                       
                  })
        },[]);

     

      return (
        
      
          <nav className=' mx-auto flex  items-center py-4 md:justify-evenly font-poppins '>
              <div className=' h-fit'>  
                  <div className='text-center tracking-wider'><span className='text-3xl font-serif font-semibold'>E</span><span className='font-semibold text-3xl font-frank-lukh'>ZIRE</span></div>
                  <div className='text-xs '><span className='tracking-widest text-gray-500 font-extralight font-sans'>FASHION STORE</span></div>
              </div>
              <div className='flex bg-[#03071e] px-12 rounded-full py-2'>
                  <div className='md:flex md:space-x-7 gap-4 items-center  tracking-wide'>
                        <input className='bg-[#ffffff]  px-4 w-80 rounded-full py-1 outline-none text-md' type="search" placeholder='Search' name="" id="" /> 
                        <div className='flex gap-4 space-x-6 ease-out text-[white] uppercase tracking-wider font-light'>
                              <a className='hover:scale-110   text-sm ' href="/">Home</a>
                            
                              <a className='hover:scale-110  text-sm ' href="/men">Men</a>
                              <a className='hover:scale-110  text-sm ' href="/women">Women</a>
                        </div>
                  </div>
              <div className='md:flex ml-12 space-x-6 md:items-center'>
                  <div className='relative px-4 py-2'>
                        {
                                    cartLength >0 && <button onClick={() => navigate('/cart')}><div className='   absolute right-0 top-0 text-white  rounded-full w-6    text-center '><span className=' text-xs bg-red-500 py-1 px-2  font-bold  rounded-full'>{ cartLength}</span></div></button> 
                        }
                                    <button>

                                          <a href="/cart"><box-icon name='shopping-bags' type='solid' color='#ffffff' ></box-icon></a>
                                    </button>
                  </div>
                  <div>
                        {
                              isloggedin ?
                                    <div className='flex space-x-6'>
                                                      <button><a href="/wishlist"><box-icon name='heart' type='solid' color='#f86666' ></box-icon></a></button>

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