import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";import { toast } from 'react-toastify';
;

const Coupon = ({ closeModal, coupons,cartTotal ,activeCoupon}) => {

    const [selectedCoupon, setSelectedCoupon] = useState(activeCoupon);
    const [savings, setSavings] = useState(0);
    
    useEffect(() => {
        if (selectedCoupon) {
            setSavings(selectedCoupon.amount);
            
        } else {
          setSavings(0);
        }
      }, [selectedCoupon]);

    const handleSelectCoupon = (coupon, e) => {
        const { checked } = e.target;
        
        if (checked) {
            
            if (cartTotal > coupon.minimumPurchase) {  
                setSelectedCoupon(coupon);
            } else {
                
               toast.error(`Order should be above ₹${coupon.minimumPurchase}`)
            }
           
        } else {
            setSelectedCoupon(null)
            
        }
    };


    const ApplyCoupon = () => {
    //    console.log('coupon',savings);
        closeModal(selectedCoupon, savings);
    };

   
   
  return (
      <div className='modal-wrapper fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-10'>
          <div className='modal-container w-96 bg-[#eeeeee]  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex items-center justify-between p-2 bg-white'>
                  <div className='text-sm font-semibold uppercase font-sans'>Apply Coupon</div>
                  <div className='text-xl'><button onClick={()=>closeModal(null,0)}><RxCross2 /></button></div>
              </div>
              <hr />
              <div className='h-64 overflow-y-scroll px-5'>
                  {
                      coupons.length > 0 ? coupons.map((coupon,index) => (
                        <div className='mt-5 p-2 flex justify-between' key={index}  >
                        <div className='mr-3'><input type="checkbox" name='coupon'  className='h-4 w-4 ' onChange={(e)=>handleSelectCoupon(coupon,e)} checked={!!selectedCoupon && selectedCoupon._id==coupon._id} /></div>
                        <div  >
                                  <div className='text-sm  outline-1 outline-dashed outline-slate-500 w-fit p-2 text-slate-500'>{coupon.code }</div>
                                  <div className='text-sm font-semibold font-sans mt-3'>Save ₹{ coupon.amount}</div>
                                  <div className='text-sm font-sans text-slate-600 '>{ coupon.description}</div>
                                  <div className='text-sm text-slate-600'>Expires on:{ coupon.expiryDate}</div>
                        </div>
                    </div>
                      )) :''
                  }


              </div>
              <div className='flex w-full mt-5 p-2 bg-white'>
                  <div className='w-1/2'>
                      <div className='text-sm text-slate-700 tracking-wide'>Maximum savings:</div>
                      <div className='text-sm font-semibold mt-1'>₹{savings }</div>
                  </div>
                  <div className='w-1/2 bg-[#1c7293] text-center'>
                      <button className='h-full w-full text-sm font-semibold text-white font-sans ' onClick={()=>ApplyCoupon()}>Apply Coupon</button>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Coupon