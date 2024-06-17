import React from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav';
import { BiSolidShoppingBags } from "react-icons/bi";
import Footer from '../../Components/UserComponents/Footer/Footer';
import { GoHeart } from "react-icons/go";

const Men = () => {
  return (
    <section>
    <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav /></div>
    <div className='container '>
        <div className='grid grid-cols-12'>
            <div className='grid col-span-2 border p-5 h-fit'>
                <form action="">
                    <div className='uppercase font-semibold mb-4'>Filter by price</div>
                    <hr/>
                <div className='my-4'>
                    <input type="radio" id='low' name='price'/>
                    <label htmlFor="low">Low to High</label>
                </div>
                <div className='mb-5'>
                    <input type="radio" id='high' name='price'/>
                    <label htmlFor="high">High to Low</label>
                </div>
                <div className=''>
                    <div className='uppercase font-semibold my-4'>Brand</div>
                    <hr />
                    <div className='mb-3 mt-2 space-x-2 flex'>
                        <input type="checkbox" id='1' name='brand' />
                        <label htmlFor="1">puma</label>
                        </div>
                        <div className='mb-3 space-x-2'>
                        <input type="checkbox" id='2' name='brand' />
                        <label htmlFor="2">nike</label>
                        </div>
                        <div className='mb-3 space-x-2'>
                        <input type="checkbox" id='3' name='brand' />
                        <label htmlFor="3">adidas</label>
                        </div>
                        <div className='mb-3 space-x-2'>
                        <input type="checkbox" id='4' name='brand' />
                        <label htmlFor="4">england</label>
                        </div>
                        <div className='mb-3 space-x-2'>
                        <input type="checkbox" id='5' name='brand' />
                        <label htmlFor="5">popy</label>
                        </div>
                        <div className='mb-3 space-x-2'>
                        <input type="checkbox" id='6' name='brand' />
                        <label htmlFor="6">Allen solly</label>
                        </div>
                        
                    </div>
                    
                    <div>
                        <div className='uppercase font-semibold mb-4'>Color</div>
                        <hr/>
                        <div  className='mb-3 space-x-2'>
                            <input type="checkbox" id='1' />
                            <label htmlFor="1">Red</label>
                        </div >
                        <div className='mb-3 space-x-2'>
                            <input type="checkbox" id='2' />
                            <label htmlFor="2">white</label>
                        </div>
                        <div  className='mb-3 space-x-2'>
                            <input type="checkbox" id='3' />
                            <label htmlFor="3">Blue</label>
                        </div>
                    </div>
                    <div className='flex justify-between my-5'>
                        <div className='h-auto border bg-emerald-500'>
                            <button className='p-1'>Apply filters</button>
                        </div>
                        <div className='h-auto border bg-emerald-500
                        '>
                            <button className='p-1'>Clear</button>
                        </div>
                        
                    </div>
                </form>

            </div>

            <div className='grid col-span-10 border  ml-3 p-5 '>
                <div className='flex flex-wrap  gap-5 '>
                <div className='card outline outline-1 p-4 w-fit rounded-lg flex-none'>
                    <div className='  h-60    flex items-center justify-center'> 
                        <img className='h-full w-48 object-contain' src="src/images/61-dd2bOloL._SL1500_.jpg" alt="" />
                        
                    </div>
                    <div className='text-center'>Currently unavailable</div>
                    <div className='w-56 p-1'>
                        <div>BRAND</div>
                        <div>Women Regular Fit Gold Viscose Rayon Trousers</div> 
                        <div className='flex space-x-2 items-center justify-between'>
                            <div className='space-x-3'>
                                <span>₹1400</span>
                                <span className='line-through'>₹2000</span>
                            </div>
                          
                            <div><BiSolidShoppingBags /></div>
                        </div>
                    </div>
                </div>
                    <div className='card outline outline-1 p-4 w-fit rounded-lg flex-none relative'>
                        <div className='absolute text-xl'><GoHeart /></div>
                    <div className='  h-60    flex items-center justify-center'> 
                        <img className='h-full w-48 object-contain' src="src/images/61-dd2bOloL._SL1500_.jpg" alt="" />
                        
                    </div>
                    <div className='text-center'>Currently unavailable</div>
                    <div className='w-56'>
                        <div>BRAND</div>
                        <div>Women Regular Fit Gold Viscose Rayon Trousers</div> 
                        <div className='flex space-x-2 items-center justify-between'>
                            <div className='space-x-3'>
                                <span>₹1400</span>
                                <span className='line-through'>₹2000</span>
                            </div>
                          
                            <div><BiSolidShoppingBags /></div>
                        </div>
                    </div>
                    </div>
                <div className='card outline outline-1 p-4 w-fit rounded-lg flex-none'>
                    <div className='  h-60    flex items-center justify-center'> 
                        <img className='h-full w-48 object-contain' src="src/images/61-dd2bOloL._SL1500_.jpg" alt="" />
                        
                    </div>
                    <div className='text-center'>Currently unavailable</div>
                    <div className='w-56'>
                        <div>BRAND</div>
                        <div>Women Regular Fit Gold Viscose Rayon Trousers</div> 
                        <div className='flex space-x-2 items-center justify-between'>
                            <div className='space-x-3'>
                                <span>₹1400</span>
                                <span className='line-through'>₹2000</span>
                            </div>
                          
                            <div><BiSolidShoppingBags /></div>
                        </div>
                    </div>
                    </div>
                <div className='card outline outline-1 p-4 w-fit rounded-lg flex-none'>
                    <div className='  h-60    flex items-center justify-center'> 
                        <img className='h-full w-48 object-contain' src="src/images/61-dd2bOloL._SL1500_.jpg" alt="" />
                        
                    </div>
                    <div className='text-center'>Currently unavailable</div>
                    <div className='w-56'>
                        <div>BRAND</div>
                        <div>Women Regular Fit Gold Viscose Rayon Trousers</div> 
                        <div className='flex space-x-2 items-center justify-between'>
                            <div className='space-x-3'>
                                <span>₹1400</span>
                                <span className='line-through'>₹2000</span>
                            </div>
                          
                            <div><BiSolidShoppingBags /></div>
                        </div>
                    </div>
                    </div>
                <div className='card outline outline-1 p-4 w-fit rounded-lg flex-none'>
                    <div className='  h-60    flex items-center justify-center'> 
                        <img className='h-full w-48 object-contain' src="src/images/61-dd2bOloL._SL1500_.jpg" alt="" />
                        
                    </div>
                    <div className='text-center'>Currently unavailable</div>
                    <div className='w-56'>
                        <div>BRAND</div>
                        <div>Women Regular Fit Gold Viscose Rayon Trousers</div> 
                        <div className='flex space-x-2 items-center justify-between'>
                            <div className='space-x-3'>
                                <span>₹1400</span>
                                <span className='line-through'>₹2000</span>
                            </div>
                          
                            <div><BiSolidShoppingBags /></div>
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

export default Men