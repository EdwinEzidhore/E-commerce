import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { base_url } from '../../Config';

const AdminCoupon = () => {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        getCoupon();
    }, []);

    const getCoupon = () => {
        axios.get(`${base_url}/getCoupon`)
            .then((res) => {
                console.log(res.data.coupon);
                setCoupons(res.data.coupon);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const blockCoupon = (coupon) => {
        const coupon_id = coupon._id;
      
        axios.patch(`${base_url}/block-coupon/?id=${coupon_id}`)
            .then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    getCoupon();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteCoupon = (coupon) => {
        const coupon_id = coupon._id;
        axios.delete(`${base_url}/delete-coupon/?id=${coupon_id}`)
            .then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    getCoupon();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
  return (
      <section>
          <AdminHeader />
          <div className='ml-64 p-5 h-screen'>
              <button className='h-auto px-4 py-1 bg-[#007cb9] text-white font-semibold rounded-md' onClick={()=>navigate('/addCoupon')}>Add New Coupon</button>
              <div className='grid grid-cols-7 mt-6 gap-3 break-all '>
                  <div className='uppercase font-semibold text-center text-sm'>Code</div>
                  <div className='uppercase font-semibold text-center text-sm'>Description</div>
                  <div className='uppercase font-semibold text-center text-sm'>Discount</div>
                  <div className='uppercase font-semibold text-center text-sm'>Minm Order</div>
                  <div className='uppercase font-semibold text-center text-sm'>Expry Date</div>
                  <div className='uppercase font-semibold text-center text-sm'>Status</div>
                  <div className='uppercase font-semibold text-center text-sm'>Action</div>


                  {
                      coupons.length > 0 ? coupons.map((coupon,index) => (
                        <Fragment key={index}>
                              <div className='text-center'>{ coupon.code}</div>
                              <div className='text-center'>{coupon.couponType }</div>
                              <div className='text-center'>₹{ coupon.amount}</div>
                              <div className='text-center'>₹{ coupon.minimumPurchase}</div>
                              <div className='text-center'>{ coupon.expiryDate}</div>
                              <div className='text-center font-semibold text-[#256961] uppercase text-sm'>{coupon.status }</div>
                              <div className=' text-center flex items-center justify-center space-x-4 gap-3'>
                                  <button className='uppercase text-sm outline outline-2 px-3 py-1 text-[#c82121] outline-[#c82121] hover:text-white hover:bg-[#d92626] font-semibold duration-300 rounded-md' onClick={() => blockCoupon(coupon)}>{coupon.status === 'Active' ? 'Block' : 'unblock'}</button>
                                  <button className='h-auto p-1 text-red-600 outline outline-2 rounded-full' onClick={()=>deleteCoupon(coupon)}><MdDelete /></button>
                              </div>
                              
                        </Fragment>
                      ))

                          :''
                  }

              </div>
          </div>
    </section>
  )
}

export default AdminCoupon