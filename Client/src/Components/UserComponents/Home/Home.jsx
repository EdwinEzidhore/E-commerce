import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import axios from 'axios'


const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3333/api/v2/featured')
            .then((res) =>setProducts(res.data))
        .catch((err)=>console.log(err))
    })
    return (
     
        <div className='h-screen Hero'>
            <div className=' md:h-4/6 bg-[#E29578] container   grid grid-cols-2  rounded-lg'>
                
                <div className='relative top-1/4 md:w-fit p-3 px-10 h-fit'>
                    
                        <h1 className='text-5xl font-frank-lukh tracking-widest my-2 text-[#49111c] '>Find The Best Fashion Style For You</h1> 
                  
                    <h1 className='my-4 text-xl'>Min 30% Off</h1>
                    <button className='h-auto bg-[#9e2a2b] p-3 rounded-md text-white my-5 font-semibold hover:bg-[#800e13]  ease-out duration-300 '>SHOP NOW</button>
                    
                </div>

                
                <div className='w-full  flex items-center  space-x-2 justify-center'>

                    
                    <div className='relative'><img className=' h-52 ' src="/src/images/98b6330b140439c3298ed3775148dbf5.jpg" alt="" /></div>
                    <div className='relative '><img className='img h-80' src="../src/images/image.jpg" alt="" /></div>
                   
               </div>
               
            </div>

            <div className='side-carosel container  '>
                <div className='p-5 tracking-widest text-xl text-slate-600'><span>GRAB THE BEST BRAND FOR YOU</span></div>

                <div className='side-carosel-items flex  space-x-4 overflow-scroll scrollbar-hide mb-5'>
                    <div className='h-60 bg-red-300 shadow-lg w-60 flex-none rounded-lg grid row-span-3 overflow-hidden '><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    <div className='h-60 bg-red-300 w-60 flex-none rounded-lg grid row-span-3 overflow-hidden'><img src="/src/images/fashion Ecommerce.jpg" alt="" />
                        <span>Addidas</span>
                        <span>casual wears</span>
                     
                    </div>
                    
                  
                </div>
            </div>

            <div className='ad-banner container h-40 bg-red-900 mb-5'>
                <div className='flex justify-center items-center h-full '><h1 className='text-white'>Hot Summer Sales</h1></div>
            </div>

            <div className='featured-cards container mb-16'>
                <div className='p-5 tracking-wider text-xl'><span>Featured Products</span></div>

                <div className='flex flex-wrap justify-center   gap-10'>
                    {
                        products.map((product, index) => (
                            <div className='cards bg-gray-100 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden flex flex-col p-1 outline outline-gray-300 hover:scale-105 ease-out duration-200'>
                            <img className='w-full h-full object-cover max-h-56' src={`http://localhost:3333/${product.productImage[0]}`} alt="" />
                            
                            <div className='p-5 '>
                                    <h2>{ product.description}</h2>
                                    <div><span>Rs.{ product.sellingPrice}</span>
                                    
                                        <div className='flex items-center gap-2'><span className='line-through'>{product.originalPrice }</span>
                                    <span>save upto 20%</span></div>
                                </div>
                                <div className='h-auto bg-red-400 w-fit p-2 mt-5 rounded-lg hover:bg-[#c1121f]'>
                                    <button className='text-white font- uppercase'>Add to Cart</button>
                                </div>
                               
                            </div>
                            
                            </div>
                        ))
                    }
               

                  
                  
                   
                  
                  
                    
                

                </div>
                
                
            </div>

            <Footer/>
      </div>
  )
}

export default Home