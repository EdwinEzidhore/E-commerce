import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { base_url } from '../../Config';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const AdminHomepage = () => {

  const [users, setUsers] = useState(null);
  const [product, setProducts] = useState(null)
  
  useEffect(() => {
    getDetails()
  }, []);

  const getDetails = () => {
    axios.get(`${base_url}/dashboard`)
      .then((res) => {
      
        if (res.status === 200) {
          setProducts(res.data.products);
          setUsers(res.data.users)
        }
      })
      .catch((err) => {
      console.log(err);
    })
  }

  return (
      <section>
      <Toaster/>
      <AdminHeader />
      
      <div className='mt-2 ml-64  p-1 h-screen bg-slate-50'>
        <div>
          <h1>Dashboard</h1>

          <div className='flex item-center space-x-2 gap-3 p-5'>
            <div className=' border p-4 shadow-sm flex items-center gap-2 space-x-1'>
              <div className='icon text-3xl text-[#4e83bc]'><RiMoneyDollarCircleFill /></div>
              <div className=''>
                <h1 className='text-sm font-semibold text-blue-400'>Revenue</h1>
                <div className='font-semibold mt-1'><span>₹3400</span></div>
                <div className='flex justify-between space-x-5 text-sm'>
                  <span className='text-slate-500'>Total profit</span>
                  <span className='text-green-500'>4.35%</span>
                </div>
              </div>
            </div>

            <div className=' border p-4 shadow-sm flex items-center gap-2 space-x-1'>
              <div className='icon text-3xl text-[#4e83bc]'><GiShoppingBag /></div>
              <div className=''>
                <h1 className='text-sm font-semibold text-blue-400 '>Total Product</h1>
                <div className='font-semibold mt-1'><span>{product && product }</span></div>
                <div className='flex justify-between space-x-5 text-sm'>
                  <span className='text-slate-500'>Total product</span>
                  <span className='text-green-500'>2.55%</span>
                </div>
              </div>
            </div>

            <div className=' border p-4 shadow-sm flex items-center gap-2 space-x-1'>
              <div className='icon text-3xl text-[#4e83bc]'><FaUsers /></div>
              <div className=''>
                <h1 className='text-sm font-semibold text-blue-400'>Total Users</h1>
                <div className='font-semibold mt-1'><span>{ users && users}</span></div>
                <div className='flex justify-between space-x-5 text-sm'>
                  <span className='text-slate-500'>Total users</span>
                  <span className='text-green-500'>0.65%</span>
                </div>
              </div>
            </div>

           

            
          </div>

          <div>

            

          </div>

          
        </div>
      </div>
      
    </section>
  )
}

export default AdminHomepage