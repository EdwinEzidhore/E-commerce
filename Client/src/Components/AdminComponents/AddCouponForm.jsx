import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import { toast } from 'react-toastify';
import axios from 'axios';

const AddCouponForm = () => {

  const [coupon, setCoupon] = useState({
    code: '',
    couponType: '',
    description: '',
    discount: '',
    minimumOrder: '',
    expiryDate: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => {
      return {
        ...prev, [name]: value
      }
    });

    
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3333/addCoupon',coupon)
    .then((res) => {
      if (res.data.success == true) {
        toast.success("Coupon Added Successfully");
        setCoupon({
          code: '',
          couponType: '',
          description: '',
          discount: '',
          minimumOrder: '',
          expiryDate: '',
          status: '',

        });
       
       
      }
      console.log(res);
    })
    .catch(err => console.log(err))
    
  };

  return (
      <section>
          <AdminHeader />
          <div className='ml-64 h-screen'>
        <div className=' flex items-center flex-col h-full'>
          <div className='my-5 text-lg font-semibold'>Add Coupon</div>
          <div className='bg-slate-200 w-96 p-4'>
          <form action="">
              <div className='space-x-2'>
              <label className='text-sm font-semibold text-slate-800' htmlFor="code">Code :</label>
              <input className='focus:outline-none px-2 py-2 uppercase text-sm' type="text" id='code' name='code' value={coupon.code} onChange={handleChange}/>
            </div>
            <div className='mt-4'>
              <div className='text-sm font-semibold text-slate-800'><label htmlFor="type">Coupon Type :</label></div>
              <div className='mt-1'><input className='w-full px-2 py-2 focus:outline-none text-sm' type="text" name='couponType' value={coupon.couponType} onChange={handleChange}/></div>
            </div>
            <div className='mt-4'>
              <div className='font-semibold text-slate-800 text-sm'><label htmlFor="description">Description :</label></div>
              <div className='mt-1 '><textarea className='w-full h-32 pt-2 px-3 focus:outline-none text-sm' name="description" id="desc" value={coupon.description} onChange={handleChange}></textarea></div>
            </div>
            <div className='mt-4 space-x-2'>
              <label className='text-sm font-semibold text-slate-800' htmlFor="discount">Discount :</label>
              <input className='px-3 py-2 focus:outline-none' type="number" name='discount' value={coupon.discount} onChange={handleChange}/>
            </div>
            <div className='mt-4 space-x-2'>
              <label className='text-sm font-semibold text-slate-800' htmlFor="min">Minimum Order :</label>
              <input type="number" className='px-3 py-2 focus:outline-none' name='minimumOrder' value={coupon.minimumOrder} onChange={handleChange}/>
            </div>
            <div className='mt-4 space-x-2'>
              <label className='text-sm font-semibold text-slate-800' htmlFor="date">Expiry Date</label>
              <input type="date" name='expiryDate' value={coupon.expiryDate} onChange={handleChange}/>
            </div>
            <div className='mt-4 space-x-2'>
              <label className='text-sm font-semibold text-slate-800' htmlFor="status">Status :</label>
              <select className='px-4 py-2 focus:outline-none text-sm' name="status" id="status" value={coupon.status} onChange={handleChange}>
                <option value=""></option>
                <option value="Active">Active</option>
                <option value="InActive">Inactive</option>

              </select>
            </div>
            <div className='mt-4 w-full h-auto'><button className='w-full bg-[#007cb9] py-2 text-white font-semibold' onClick={handlesubmit}>Add Coupon</button ></div>
          </form>

          </div>
         
              </div>
          </div>
    </section>
  )
}

export default AddCouponForm