import React from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import { CgArrowTopRightO } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { FaTag } from "react-icons/fa6";
import Footer from '../../Components/UserComponents/Footer/Footer'
import { FiMinus } from "react-icons/fi";
import '../../css/style.css';
import { HiOutlinePlusSm } from "react-icons/hi";

const CartPage = () => {
  return (
      <section>
          <Nav />
          <div className='container'>
              <div className='grid grid-cols-12 bg-slate-50 font-robo'>
                  <div className='grid col-start-2 col-end-8 p-3'>
                      <div className='flex items-center justify-between p-4 border bg-white shadow-md '>
                          <div><span className='font-semibold text-sm ' >Check delivery time & services</span></div>
                          <div className='border p-1 px-3 rounded-md  bg-[#09555c] text-white'><button>Enter a pincode</button></div>
                      </div>

                      <div className='border mt-2 bg-white shadow-md p-4'>
                          <div className='text-sm font-semibold mb-3'><span>Available Offers</span></div>
                          <div className='text-slate-500 text-sm font-thin mb-4'><p>₹1000 Off On Selected Banks Credit Non EMI, Credit and Debit Card EMI TransactionsT&C</p></div>
                          <div className='border w-fit p-2   text-sm font-semibold bg-[#72969a] text-[#fff9f9] rounded-md'><button>Show more +</button></div>
                      </div>

                      <div className='flex items-center justify-between my-7 px-3'>
                          <div className='flex space-x-2 font-semibold uppercase'>
                              <input type="checkbox" className='accent-[#cb1a1a] w-5'/>
                              <span>2/2 items selected</span>
                          </div>
                          <div>
                              <button>Remove</button>
                              <button>Move to wishlist</button>
                          </div>

                         
                      </div>

                      <div className=' p-1'>
                              <div className='card flex border p-3 gap-3 mb-1 h-fit relative bg-white shadow-md'>
                              <div className='   object-cover flex gap-1'>
                                  <div className=''><input type="checkbox" className='w-5 h-5 accent-[#cb1a1a] '/></div>
                                  <div className=' h-f w-32 flex justify-center item-center'>
                                  <img className='h-full object-cover' src="/src/images/98b6330b140439c3298ed3775148dbf5.jpg" alt="" />
                                  </div>
                                  
                              </div>
                                  <div className=''>
                                    <h1 className='text-sm font-semibold'>U.S.POLO</h1>
                                    <h4 className='mt-1'>Men Solid Polo Neck Pure Cotton White T-Shirt</h4>
                                  <h5 className='text-sm text-slate-500 '>sold by ethinic fashion</h5>
                                  
                                  <div className='flex items-center  space-x-5 mt-3 gap-5 mb-2 '>
                                    <button className='h-auto bg-gray-200  px-2'>size: <span className='font-semibold text-sm me'>M</span></button>
                                      <div className='flex items-center gap-3'>
                                          <div className='flex outline rounded-full outline-1 outline-slate-500 p-1'><button><FiMinus /></button></div>
                                          <input type="number"
                                              className='bg-slate-200 spinner w-10 text-sm text-center  outline outline-1 outline-slate-500' value={1}/>
                                          <div className='flex outline rounded-full outline-1 outline-slate-500 p-1'><button><HiOutlinePlusSm /></button></div>
                                    </div>
                                  </div>

                                  <div className='flex gap-2 space-x-1 items-center p-2'>
                                      <h1 className='font-semibold'>₹1999</h1>
                                      <h4 className='text-sm line-through text-slate-500'>₹2999</h4>
                                      <h1 className='text-[#25858e]'>70% off</h1>
                                  </div>

                                  <div className='flex items-center text-xs'>
                                      <CgArrowTopRightO />
                                      <p>14 days return available</p></div>
                                  </div>
                                  <div className='absolute top-5 text-2xl right-5'><button><RxCross1  /></button></div>
                                  
                          </div>
                          
                          

                      </div>
                  </div>

                  <div className='grid col-start-8 col-end-12  p-3'>
                      <div>
                          <div className='box-1 border bg-white p-3 shadow-md'>
                              <div className='mb-3'><span className='text-slate-600 font-semibold text-sm '>Coupons</span></div>
                              <div className='flex justify-between'>
                                  <div className='flex items-center space-x-3'>
                                      <FaTag />
                                      <span className='text-sm font-semibold'>Apply Coupons</span>
                                  </div>
                                  <button className='outline outline-2 outline-[#09555c] bg-[#eafbfddd] text-[#1e5960] py-1 px-4 text-sm uppercase'>Apply</button>
                              </div>
                              <div className='pl-7 mt-2 text-sm'><p>Getupto ₹200 off on first order</p></div>
                          </div>

                          <div className="box-2 ">
                              
                              <div className='h-20 my-4 shadow-md'><img className='h-full w-full object-cover' src="/src/images/happy-valentine-s-day-sale-banner-or-promotion-on-blue-background-online-shopping-store-with-mobile-credit-cards-and-shop-elements-illustration-free-vector.jpg" alt="" /></div>
                          </div>

                          <div className="box-3 border p-4 bg-[#f8e4e9] shadow-lg">
                              <div className='my-3'>
                              <p><span className='uppercase text-sm font-semibold text-slate-800 '>Price details</span><span>(2 items)</span></p>
                              </div>
                              
                              <div className=' '>
                                 
                                  <div className='flex justify-between mb-3 font-sans font-thin text-[black]'>
                                      <span>Total MRP</span>
                                      <span>₹19999</span>
                                     </div>
                                     <div className='flex justify-between font-sans font-thin mb-3'>
                                      <span>Discount on MRP</span>
                                      <span className='text-[#37c137]'>-₹19999</span>
                                  </div>
                                  <div className='flex justify-between mb-3 text-sm '>
                                      <span>Coupon Discount</span>
                                      <button>Apply coupon</button>
                                     </div>
                                     <div className='flex justify-between'>
                                      <span>Platform fee</span>
                                      <span>FREE</span>
                                  </div>
                                  <div className='flex justify-between'>
                                      <span>Shipping fee </span>
                                      <p><span className='line-through'>₹40</span>FREE</p>
                                  </div>
                                  
                                  <div className='flex justify-between mb-4'>
                                      <span>Toatl Amount</span>
                                    <span>₹29999</span>
                                  </div>

                                  <div className='flex justify-center h-auto bg-[#e42e55] py-3 '>
                                      <button className='uppercase text-white font-semibold text-sm'>place order</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <Footer/>
    </section>
  )
}

export default CartPage