import React, { useState } from 'react'
import AdminAddProductpage from '../../Pages/Admin/AdminAddProductpage';


const AdminHeader = () => {
    const [sideBarToggle, setsideBarToggle] = useState(false);

  return (
      <div className='overflow'>
         
          <section className='h-full bg-slate-100 w-64 fixed left-0 top-0 px-4 py-3' >
          <div className='flex p-4 my-2 justify-center '>
                      <span className='text-2xl font-extrabold text-[#02c39a]'>S</span><span className='text-xl font-bold text-[#00a896]'>hopify</span>
                      <img className='h-6' src="/src/images/icons8-shopping-cart-48.png" alt="" />
              </div>
              <hr />
              <ul className='mt-4 p-2'>
                  <li className='group  '><a href="/Admin-Home" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white'><box-icon name='home-alt-2' ></box-icon><span>Home</span></a></li>

                  <li className='group  '><a href="/Admin-product" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white'><box-icon type='solid' name='package'></box-icon><span>Products</span></a></li>

                 
                  <li className='group  '><a href="/Admin-users" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white'><box-icon name='user-circle' type='solid' ></box-icon><span>Users</span></a></li>

                  <li className='group  '><a href="#" className='group-[.active]:bg-gray-600 flex items-center py-2 px-4 text-gray-600 hover:bg-blue-400 hover:text-gray rounded-md my-3 space-x-2 hover:text-white '><box-icon name='cart-alt' type='solid' ></box-icon><span>Orders</span></a></li>

                  
              </ul>
          </section>

        
          <main className='w-[calc(100%-256px)] ml-64   bg-slate'>
              <div className='py-3 px-6 bg-slate-100 flex items-center shadow-md justify-between'>
                  <div className='flex items-center '>
                  
                      <div  className=''><box-icon name='menu'></box-icon></div>
                   

                  </div>
                 
                
                  <div className='flex space-x-3 gap-4'>
                      <input type="search" placeholder='search' className=' bg-gray-300 rounded-md py-1 px-4 ' />   
                  </div>
                 
                  <div>
                      <button>logout</button>
                  </div>

              </div>
              
             
              
          </main>
          
     </div>
  )
}

export default AdminHeader