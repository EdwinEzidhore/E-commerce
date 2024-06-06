import React, { useEffect, useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Footer from '../../Components/UserComponents/Footer/Footer'
import { HiOutlineStar } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TfiWallet } from "react-icons/tfi";
import { useSelector } from 'react-redux';


const ProductSinglePage = () => {

    const [Index, setIndex] = useState(0);
    const SingleProduct = useSelector(state => state.singleProduct);
    


  return (
      <section >
          <div className='  backdrop-blur-xl'>
              <Nav />
          </div>

          <div className='container bg-red-30 bg-slate-100 font-poppins'>
              
          {
                      SingleProduct.map((product,index) => (
                        <div className='grid grid-cols-12 ' key={index}>
                  
                
                  
                        {/* side Imagebar starting */}
                        
                        <div className='side_image_bar grid col-span-4 p-1 border shadow-xl h-fit bg-white sticky top-0' >
                            <div className='max-h-96'>
                                {/* <div className='absolute right-3 top-2 border flex p-2 rounded-full'><box-icon name='heart' ></box-icon></div> */}
                                <img src={`http://localhost:3333/${product.productImage[Index]}`} className='h-full w-full object-cover'/></div>
      
                                  <div className='flex mt-5 gap-3 overflow-scroll'>
                                      {
                                          product.productImage.map((img,index) => (
                                            <div className={index===Index?' p-1 flex-none border-blue-500 border-2':'border p-1 flex-none' }onClick={()=>setIndex(index)} key={index}>
                                            <img src={`http://localhost:3333/${img}`} alt="" className='h-16   object-cover w-20' />
                                            </div>
                                          ))
                                          
                                      }
                         
                            </div>
      
                            <div className='mt-5'>
                                <div className='w-full h-auto bg-[#115e59] text-white p-2 flex justify-center my-2 items-center gap-3 font-semibold rounded-lg'>
                                    <TfiWallet />
                                    <button>Buy Now</button></div>
                                <div className='w-full h-auto bg-[#0f766e] text-white p-2 flex items-center gap-3 justify-center my-2 font-semibold rounded-lg'>
                                    <HiOutlineShoppingCart />
                                    <button>Add to Cart</button></div>
                            </div>
      
                        </div>
                        {
                            //side ImageBar end
                        }
                        
                        <div className=' col-span-8 ml-3 bg-white border shadow-lg pl-3'>
                                  <div className='mt-4'><span className='text-[#9a9494] font-semibold'>{ product.brand}</span></div>
                            
                                  <div className='text-xl py-2'><span>{ product.description}</span></div>
                            <div className=' text-[#2fae2f]'><span>Special price</span></div>
                            <div className='flex items-center space-x-5 pt-2'>
                                
                                <div className='flex text-2xl font-bold '>
                                   
                                          <span>₹{product.sellingPrice }</span>
                                </div>
                                      <span className='line-through text-slate-400'>₹{product.originalPrice }</span>
                                <span className='text-[#2fae2f] font-robo'>45% off</span>
                            </div>
                            <div className='flex my-2'>
                                <div className='flex items-center space-x-1 h-fit bg-[#3b757f] text-white px-1 rounded-full '>
                                    <span>3.8</span>
                                    <div className='icon  flex'><HiOutlineStar /></div>
                                </div>
                                <span className='ml-3 text-slate-500'>21 ratings and 0 reviews</span>
                            </div>
                            <div className='mt-5'>
                                <h1 className='font-sans font-semibold mb-3'>Available offers</h1>
                                <div className='flex mt-2'>
                                    <box-icon name='purchase-tag' type='solid' color='#2fae2f'></box-icon>
                                    <p><span  className='font-sans font-semibold'>Bank Offer </span><span>Get ₹25 instant discount on first  UPI txns on order of ₹250 and aboveT&C</span></p>
                                </div>
                                <div className='flex mt-2'>
                                    <box-icon name='purchase-tag' type='solid' color='#2fae2f'></box-icon>
                                    <p><span className='font-sans font-semibold'>Bank Offer</span> 5% Cashback on  Axis Bank CardT&C</p>
                                </div>
                                <div className='flex mt-2'>
                                    <box-icon name='purchase-tag' type='solid' color='#2fae2f'></box-icon>
                                    <p><span className='font-sans font-semibold'>Bank Offer</span> 7% off up to ₹3500 on HDFC Bank Debit Card EMI Txns, Tenure: 6months and above, Min Txn Value: ₹7500T&C</p>
                                </div>
                                <div className='flex mt-2'>
                                    <box-icon name='purchase-tag' type='solid' color='#2fae2f'></box-icon>
                                    <p><span className='font-sans font-semibold'>Special Price</span> Get extra 45% off (price inclusive of cashback/coupon)T&C</p>
                                </div>
                            </div>
               
                            <div className='my-5'>
                                <div className='flex gap-3'>
                                    <div className='flex'>
                                    <box-icon name='map' type='solid' color='#3b757f' ></box-icon>
                                    <span className='text-slate-600'>Deliver to</span>
                                    </div>
                                    
                                    <div>
                                        <button><span className='text-sky-700'>View details</span></button>
                                    </div>
                                    
                                </div>
                                
                            </div>
      
                            <div className='flex items-center gap-3 mb-6 border p-2 mr-5'>
                                <div><img className='h-8' src="/src/images/fast-delivery.png" alt="" /></div>
                                <div>
                                    <div className='flex space-x-5 mb-1'>
                                    <span className='italic font-sans font-semibold'>Express</span>
                                        <span className='text-[green]'>free </span>
                                        <span className='line-through'>₹40</span>.
                                   
                                    </div>
                                    
                                    <div className='mb-1 flex space-x-3'>
                                      <span>Deliveryin</span>
                                        <span>2 days,Tuesday</span>    
                                    </div>
                                    <div>
                                        <span>if ordered within 03m 22s</span>
                                    </div>
                                </div>
                            </div>
      
                            <div >
                                <h1 className='text-xl font-semibold mb-7'>product Details</h1>
                                      <hr />
                                      {
                                              product.Details.map((pro,index) => (
                                                <div className='grid grid-cols-6 gap-6 mt-5 pl-5 mb-8' key={index}>
                                    
                                       
                                                <div className='col col-start-1 text-slate-500'>
                                                    Type
                                                </div>
                                                <div className='col col-start-2'>
                                                    {product.name}
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Fit
                                                </div>
                                                <div className='col col-start-2'>
                                                    Regular
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Fabric
                                                </div>
                                                <div className='col col-start-2'>
                                                    {pro.fabric}
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Pack of
                                                </div>
                                                <div className='col col-start-2'>
                                                    1
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Ideal for
                                                </div>
                                                <div className='col col-start-2'>
                                                    {product.category}
                                                </div>
                                                <div className='col col-start-1 text-slate-500'>
                                                    Size
                                                </div>
                                                <div className='col col-start-2'>
                                                    M
                                                </div>
                                                <div className='col col-start-1 text-slate-500'>
                                                    Suitable for
                                                </div>
                                                <div className='col col-start-2'>
                                                    Wetsern Wear
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Reversible
                                                </div>
                                                <div className='col col-start-2'>
                                                    No
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Fabric Care
                                                </div>
                                                <div className='col col-start-2'>
                                                    Regular Machine wash
                                                </div>
                  
                                                <div className='col col-start-1 text-slate-500'>
                                                    Net quantity
                                                </div>
                                                <div className='col col-start-2'>
                                              1
                                                </div>
                  
                  
                                           </div>
                                              ))
                                          }
                              
                            </div>
      
                      
      
      
                        </div>
                    </div>
                          
                      ))
                  }
             
              {/* map end */}

              <div className='h-48  mt-5 border bg-white shadow-lg'>
                  
                  <img className='h-full w-full object-cover border shadow-lg' src="/src/images/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" alt="" />
                
              </div>

              {
                  //Product carosesl starting
              }

              <div className='carosel-main mt-5 border pt-8  shadow-xl bg-white'>
                  <div className='pl-5 text-2xl font-semibold'><span>Similar Products</span></div>
                  <div className='carsel-slidr p-8  flex overflow-scroll gap-3'>
                      
                      <div className='carosel-card bg-white max-w-64  flex-none'>
                          
                          <div className='h-80'><img src="/src/images/61-dd2bOloL._SL1500_.jpg" alt="" className=' w-full h-full object-cover mx-auto'/></div>
                          <div>
                              <div><span className='text-slate-500 p-1'>Brand</span></div>
                              <div className='p-1 '><span>Men Solid Polo Neck Pure Cotton White T-Shirt</span></div>
                              <div className='flex items-center space-x-4 mt-2 p-1'>
                                  <div className='flex items-center '>
                                    <div className='w-5 flex '><box-icon name='rupee'></box-icon></div>
                                  <span className='font-semibold text-lg'>1233</span>
                                  </div>
                                 
                                  <div >
                                  
                                      <span className='line-through text-gray-400 flex'>1999</span>
                                  </div>
                                  
                                  <span className='text-[#1f7825]'>80% off</span>
                              </div>
                          </div>
                      </div>

                      <div className='carosel-card bg-white max-w-64  flex-none'>
                          
                          <div className='h-80'><img src="/src/images/61-dd2bOloL._SL1500_.jpg" alt="" className=' w-full h-full object-cover mx-auto'/></div>
                          <div>
                              <div><span className='text-slate-500 p-1'>Brand</span></div>
                              <div className='p-1 '><span>Men Solid Polo Neck Pure Cotton White T-Shirt</span></div>
                              <div className='flex items-center space-x-4 mt-2 p-1'>
                                  <div className='flex items-center '>
                                    <div className='w-5 flex '><box-icon name='rupee'></box-icon></div>
                                  <span className='font-semibold text-lg'>1233</span>
                                  </div>
                                 
                                  <div >
                                  
                                      <span className='line-through text-gray-400 flex'>1999</span>
                                  </div>
                                  
                                  <span className='text-[#1f7825]'>80% off</span>
                              </div>
                          </div>
                      </div>

                      <div className='carosel-card bg-white max-w-64  flex-none'>
                          
                          <div className='h-80'><img src="/src/images/61-dd2bOloL._SL1500_.jpg" alt="" className=' w-full h-full object-cover mx-auto'/></div>
                          <div>
                              <div><span className='text-slate-500 p-1'>Brand</span></div>
                              <div className='p-1 '><span>Men Solid Polo Neck Pure Cotton White T-Shirt</span></div>
                              <div className='flex items-center space-x-4 mt-2 p-1'>
                                  <div className='flex items-center '>
                                    <div className='w-5 flex '><box-icon name='rupee'></box-icon></div>
                                  <span className='font-semibold text-lg'>1233</span>
                                  </div>
                                 
                                  <div >
                                  
                                      <span className='line-through text-gray-400 flex'>1999</span>
                                  </div>
                                  
                                  <span className='text-[#1f7825]'>80% off</span>
                              </div>
                          </div>
                      </div>

                      <div className='carosel-card bg-white max-w-64  flex-none'>
                          
                          <div className='h-80'><img src="/src/images/61-dd2bOloL._SL1500_.jpg" alt="" className=' w-full h-full object-cover mx-auto'/></div>
                          <div>
                              <div><span className='text-slate-500 p-1'>Brand</span></div>
                              <div className='p-1 '><span>Men Solid Polo Neck Pure Cotton White T-Shirt</span></div>
                              <div className='flex items-center space-x-4 mt-2 p-1'>
                                  <div className='flex items-center '>
                                    <div className='w-5 flex '><box-icon name='rupee'></box-icon></div>
                                  <span className='font-semibold text-lg'>1233</span>
                                  </div>
                                 
                                  <div >
                                  
                                      <span className='line-through text-gray-400 flex'>1999</span>
                                  </div>
                                  
                                  <span className='text-[#1f7825]'>80% off</span>
                              </div>
                          </div>
                      </div>

                      <div className='carosel-card bg-white max-w-64  flex-none'>
                          
                          <div className='h-80'><img src="/src/images/61-dd2bOloL._SL1500_.jpg" alt="" className=' w-full h-full object-cover mx-auto'/></div>
                          <div>
                              <div><span className='text-slate-500 p-1'>Brand</span></div>
                              <div className='p-1 '><span>Men Solid Polo Neck Pure Cotton White T-Shirt</span></div>
                              <div className='flex items-center space-x-4 mt-2 p-1'>
                                  <div className='flex items-center '>
                                    <div className='w-5 flex '><box-icon name='rupee'></box-icon></div>
                                  <span className='font-semibold text-lg'>1233</span>
                                  </div>
                                 
                                  <div >
                                  
                                      <span className='line-through text-gray-400 flex'>1999</span>
                                  </div>
                                  
                                  <span className='text-[#1f7825]'>80% off</span>
                              </div>
                          </div>
                      </div>

                      <div className='carosel-card bg-white max-w-64  flex-none'>
                          
                          <div className='h-80'><img src="/src/images/61-dd2bOloL._SL1500_.jpg" alt="" className=' w-full h-full object-cover mx-auto'/></div>
                          <div>
                              <div><span className='text-slate-500 p-1'>Brand</span></div>
                              <div className='p-1 '><span>Men Solid Polo Neck Pure Cotton White T-Shirt</span></div>
                              <div className='flex items-center space-x-4 mt-2 p-1'>
                                  <div className='flex items-center '>
                                    <div className='w-5 flex '><box-icon name='rupee'></box-icon></div>
                                  <span className='font-semibold text-lg'>1233</span>
                                  </div>
                                 
                                  <div >
                                  
                                      <span className='line-through text-gray-400 flex'>1999</span>
                                  </div>
                                  
                                  <span className='text-[#1f7825]'>80% off</span>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
              {
                  //product carosel end
              }
              
          </div>
          <div className='mt-5'><Footer/></div>
    </section>
  )
}

export default ProductSinglePage