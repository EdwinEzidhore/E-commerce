import React, { useEffect } from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { base_url } from '../../../Config'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Coupons = () => {

    const user = useSelector((state) => state.auth.auth.user);

    const [coupons, setcoupons] = useState([]);
    const [networkErr, setnetworkErr] = useState(false)

    useEffect(() => {
        const getCoupons = () => {
            axios.post(`${base_url}/api/v2/coupons`,{user})
                .then((res) => {
                    setcoupons(res.data.coupons);
                })
                .catch((err) => {
                    setnetworkErr(true)
                })
        }
        // getCoupons();
    }, []);
    
  return (
      <main>
          <div className='sm:block md:hidden sm:py-0'><Nav /></div>
          <div className='h-screen sm:p-3 p-5 flex flex-col'>
              {
                  !networkErr ? (
                    coupons && coupons.length > 0 ? (
                        coupons.map((coupon,index)=>(
                          <div className='card md:w-96 px-4 py-2 rounded-md border  border-neutral-300 bg-neutral-50  text-sm md:hover:-translate-y-1 transform transition duration-200 md:hover:shadow-md mb-4' key={index}>
                          <div className='flex md:gap-12 justify-between mb-4 cursor-default '>
                                    <h1 className=' font-semibold ' >{coupon.code }</h1>
                                    <h2 className='text-slate-500 font-semibold text-sm'>Valid till: {dayjs(coupon.expiryDate).format("MMM DD, YYYY") }</h2>
                          </div>
                                <div className='font-semibold cursor-default'>save ₹{ coupon.amount}</div>
                                <div className='text-slate-500 cursor-default text-sm'>{coupon.description }</div>
                          </div>
                        ))
  
                    ) : (
                            <div className='flex items-center justify-center flex-col text-center'>
                                <img className='sm:h-48 md:h-72' src="/dist/Images/3778871.jpg" alt="Empty coupon" />
                                <h1 className='font-semibold text-md mt-4 text-slate-600'>No Active coupons present!</h1>
                            </div>
                    )
                  ) : (
                    <div className={'flex flex-col items-center justify-center h-96'}>
                    <img className='sm:h-16 md:h-20 object-contain' src="/Images/delete.png" alt="network error" />
                    <span className='text-slate-500 cursor-default'>Check your Network connection</span>
                </div>
                  )
              }
                  {

              }
              

          </div>
          <div className='sm:block md:hidden'><Footer/></div>
    </main>
  )
}

export default Coupons



