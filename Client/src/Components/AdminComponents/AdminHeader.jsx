import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setstatus } from '../../Redux/Auth/AdminAuth';
import { TbLogout2 } from "react-icons/tb";


const AdminHeader = () => {
    
  
    const dispatch=useDispatch()

    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate('/');
        dispatch(setstatus(false));
    }

  return (
      <div className='overflow'>
         
          <section className='h-full bg-slate-100 w-64 fixed left-0 top-0 px-4 py-3' >
          <div className=' h-fit p-5'>  
                  <div className='text-center tracking-wider'><span className='text-3xl font-serif font-semibold'>E</span><span className='font-semibold text-3xl font-frank-lukh'>ZIRE</span></div>
                  <div className='text-xs text-center'><span className='tracking-widest text-gray-500 font-extralight font-sans'>FASHION STORE</span></div>
              </div>
              <hr />
              <ul className='mt-4 p-2'>
                  <li className='group  '><a href="/Admin-Home" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white'><box-icon name='home-alt-2' ></box-icon><span>Home</span></a></li>

                  <li className='group  '><a href="/Admin-product" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white'><box-icon type='solid' name='package'></box-icon><span>Products</span></a></li>

                 
                  <li className='group  '><a href="/Admin-users" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white'><box-icon name='user-circle' type='solid' ></box-icon><span>Users</span></a></li>

                  <li className='group  '><a href="/Admin-orders" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white '><box-icon name='cart-alt' type='solid' ></box-icon><span>Orders</span></a></li>

                  <li className='group  '><a href="/Admin-coupon" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white '><box-icon type='solid' name='coupon'></box-icon><span>Coupons</span></a></li>


                  
              </ul>
          </section>

        
          <main className='w-[calc(100%-256px)] ml-64   bg-slate'>
              <div className='py-3 px-6 bg-slate-100 flex items-center shadow-md justify-between'>
                  <div className='flex items-center '>
                  
                      {/* <div  className=''><box-icon name='menu'></box-icon></div> */}
                   

                  </div>
                 
                
                  {/* <div className='flex space-x-3 gap-4'>
                      <input type="search" placeholder='search' className=' bg-gray-300 rounded-md py-1 px-4 ' />   
                  </div> */}
                 
                  <div>
                      <button className='font-semibold outline outline-1 p-1 rounded-md flex items-center' onClick={handleLogOut}><TbLogout2/>logout</button>
                  </div>

              </div>
              
             
              
          </main>
          
     </div>
  )
}

export default AdminHeader