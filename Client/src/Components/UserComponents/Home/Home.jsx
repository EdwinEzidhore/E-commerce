import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../../Redux/SingleProduct/SingleProductSlice';
import { toast } from 'react-toastify';
import '../../../css/banner.css';
import { Carousel } from "flowbite-react";
import { base_url } from '../../../Config';


const Home = () => {

    const [newArrivals, setNewArrivals] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [networkErr, setNetworkErr] = useState(false);



    useEffect(() => {
        getFeatured();
    }, []);


    const getFeatured = () => {
        axios.get(`${base_url}/api/v2/featured`, {withCredentials :true})
        .then((res) => {
            // console.log("res is",res);
            setNewArrivals(res.data.products);
            setBrands(res.data.Brands);
            setLoading(false);    
        })
        .catch((err) => {
            console.log('this is catch error', err);
            setNetworkErr(true);
            
        })
    }
        

    

    const getSingleProduct = (product) => {
        dispatch(add(product));
        navigate('/p');
      
    }
  
    const cart = (product) => {
        let pro_id = product._id;
        
        axios.get(`${base_url}/api/v2/cart/?id=${product._id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                }
                else {
                   
                    toast.success('Added to Bag')

                }
            })
            .catch(err => console.log(err))
    };

    const setWishList = (product) => {
        const item_id = product._id;
        axios.post(`${base_url}/api/v2/wishlist/?id=${item_id}`, {},{withCredentials:true})
            .then((res) => {
                if (res.status === 200 && res.data.success===true) {
                    navigate('/wishlist');
                    toast.success('Added to Wishlist')
                }
                if (res.data.success === false) {
                    toast.error('Item already on Wishlist')
                }
                
            })
            .catch((err) => {
            console.log(err);
        })

    };


    return (
     
        <div className=' Hero h-screen '>

        <div className="h-56 md:h-96 xl:h-3/4  2xl:h-3/4 md:container ">
            <Carousel>
                            <div className='w-full h-full flex '>
                                {/* <div className=' max-h-full w-2/5 bg-red-300'>heading</div> */}
                                <div className=' w-full max-h-full'><img className='h-full w-full object-cover object-center rounded-xl ' src="/Images/Simple Modern Photo Collage Autumn Fashion Sale Banner.png" alt="..." /></div>
                            </div>

                            <div className='w-full h-full flex '>
                                {/* <div className=' max-h-full w-2/5 bg-red-300'>heading</div> */}
                                <div className=' w-full max-h-full'><img className='h-full w-full object-cover object-center rounded-xl' src="/Images/Simple Modern Photo Collage Autumn Fashion Sale Banner (1).png" alt="..." /></div>
                            </div>

                            <div className='w-full h-full flex '>
                                {/* <div className=' max-h-full w-2/5 bg-red-300'>heading</div> */}
                                <div className=' max-h-full w-full'><img className='h-full w-full object-cover object-center rounded-xl' src="/Images/Gray Minimalist Fashion Big Sale Banner (1).png" alt="..." /></div>
                            </div>
                

            </Carousel>
            </div>
 
            <div className='sm:grid sm:grid-cols-2 sm:place-items-center md:flex flex-wrap justify-evenly my-10 p-5 '>
                <div className='flex items-center space-x-2 md:space-x-4 mb-6 md:mb-0'>
                    <div className='h-10 md:h-12 ' ><img className='h-full ' src="/Images/save-money.png" alt="" /></div>
                    <div >
                        <h1 className='font-bold tracking-wide font-sans text-gray-800 text-sm md:text-base'>Free Delivery</h1>
                        <h4 className='text-xs md:text-sm tracking-wide text-gray-500 '>For all purchases </h4>
                    </div>
                </div>

                <div className='flex items-center space-x-2 md:space-x-4 mb-6 md:mb-0'>
                    <div className='h-10 md:h-12'><img className='h-full' src="/Images/delivery-status.png" alt="" /></div>
                    <div>
                        <h1 className='font-bold tracking-wide font-sans text-gray-800 text-sm md:text-base'>30 Days Return </h1>
                        <h4 className='text-xs md:text-sm tracking-wide text-gray-500 '>after deivery </h4>
                    </div>
                </div>

                <div className='flex items-center space-x-2 md:space-x-4 mb-6 md:mb-0'>
                    <div className='h-10 md:h-12'><img className='h-full' src="/Images/secure-payment (1).png" alt="" /></div>
                    <div>
                        <h1 className='font-bold tracking-wide font-sans text-gray-800 text-sm md:text-base'>Secure Payment</h1>
                        <h4 className='text-xs md:text-sm tracking-wide text-gray-500 '>100% secure payment </h4>
                    </div>
                </div>

                <div className='flex items-center space-x-2 md:space-x-4 mb-6 md:mb-0'>
                    <div className='h-10 md:h-12'><img className='h-full' src="/Images/customer-support.png" alt="" /></div>
                    <div>
                        <h1 className='font-bold tracking-wide font-sans text-gray-800 text-sm md:text-base'>24/7 Support</h1>
                        <h4 className='text-xs md:text-sm tracking-wide text-gray-500 '>Dedicated support </h4>
                    </div>
                </div>
            </div>

            <div className='New-arivals '>
                <div className='text-center uppercase '>
                    <h1 className='text-xl font-serif font-semibold text-gray-600 tracking-wider'>New Arrivals</h1>
                    <hr  className='border container border-gray-300 my-5'/>
                </div>
                <div className='card-wrapper  container grid grid-rows-1 md:grid-cols-3 sm:grid-cols-1 gap-2 w-fit mb-5'>
                    {
                        newArrivals?.length > 0 ? newArrivals.map((product) => (
                            <div className='card h-fit relative  p-4 w-fit  sm:w-auto rounded-lg flex-none   shadow-lg bg-slate-50' key={product._id} >
                            <img className=' h-12 z-10 absolute left-0 top-0 drop-shadow-md' src="/Images/new (1).png" alt="products" />
                              
                              <div className='relative group h-56   flex items-center justify-center md:hover:scale-105 transition duration-500 '>
                                  <div className='absolute hidden group-hover:flex rounded-full   bg-red-100 hover:bg-red-200 heart '>
                                 
                                      <button className='hidden lg:block group/button
                                          rounded-full p-1 backdrop-blur 
                                          font-semibold
                                          relative before:content-[attr(data-tip)] before:absolute before:px-3 before:py-2 before:left-1/2 before:top-0 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full  before:bg-red-500 before:text-white before:rounded-md before:opacity-0
                                   before:transition-all before:text-xs
    
                                      after:absolute after:left-1/2 after:top-0 after:h-0 after:w- after:-translate-x-1/2 after:border-8 after:border-red-500 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:opacity-0 
                                   after:transition-all  hover:before:opacity-100 hover:after:opacity-100 
    
    
                                      text-xl  ' data-tip='Add to wishlist' onClick={()=>setWishList(product)}>
                                          <svg className='heart-svg fill-red-400 group-hover/button:fill-red-600 ' width="25px" height="25px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" />
                                        </svg>
             
                                    </button>
                                  </div> 
                                    <img className='h-full w-48 object-contain rounded-lg' src={`${base_url}/${product.productImage[0]}`}  alt="img" onClick={()=>getSingleProduct(product)}/>
                              
                          </div>
                                    <div className='text-center text-sm mt-2 tracking-wide text-red-600 font-poppins'>{ true==='Unavailable'?'Currently Unavailable':''}</div>
                              <div className='w-56 p-1 content bg-white'>
                                    <div className='text-xs text-slate-400 uppercase font-semibold mb-1 text-center'>{ product.category}</div>
                                    <div className='md:text-sm sm:text-xs uppercase font-semibold text-slate-600 text-center'>{product.brand }</div>
                                    <div className='font-semibold md:text-lg sm:text-sm text-[#1e1616] line-clamp-1 md:leading-5 mb-1 h-5  text-center'><a href='/p' className='hover:text-gray-700 ' onClick={()=>getSingleProduct(product)}>{product.description }</a></div> 
                              <div className=' space-x-2 items-center justify-between'>
                                  <div className='space-x-3 flex items-center justify-center mt-3'>
                                            <span className='font-semibold  text-lg text-emerald-700'>₹{ product.sellingPrice}</span>
                                            <span className='line-through text-md text-slate-400'>₹{ product.originalPrice}</span>   
                                  </div>
    
                              </div>
                          </div>
                        </div>
                        )) : (
                                <div>
                                    <h2>No featured products</h2>
                                </div>
                        )
                    }

                    

                </div>
                
            </div>

            <div className="wrapper container  p-5 h-32 flex flex-wrap  items-center border md:shadow-lg">
                <div className='item item1 '><img className='h-16 md:h-28  object-center object-contain' src="/Images/brands/adidas.svg" alt="" /></div>
                <div className='item item2 '><img className='h-16 md:h-28  object-center object-contain'  src="/Images/brands/armani (1).svg" alt="" /></div>
                <div className='item item3 '><img className='h-16 md:h-28  object-center object-contain'  src="/Images/brands/armani.svg" alt="" /></div>
                <div className='item item4 '><img className='h-16 md:h-28  object-center object-contain'  src="/Images/brands/avirex.svg" alt="" /></div>
                <div className='item item5 '><img className='h-16 md:h-28  object-center object-contain'  src="/Images/brands/boss.svg" alt="" /></div>
                <div className='item item6 '><img className='h-16 md:h-28  object-center object-contain'  src="/Images/brands/calvin.svg" alt="" /></div>
                <div className='item item7 hidden md:flex' ><img className='h-8 md:h-12  object-center object-contain' src="/src/images/brands/chanel.svg" alt="" /></div>
                <div className='item item8 hidden md:flex' ><img className='h-8 md:h-12  object-center object-contain' src="/src/images/brands/gucci.svg" alt="" /></div>

            </div>

          
            <div className='side-carosel  sm:mx-5  '>
                <div className=' sm:container md:p-5 tracking-widest text-xl text-slate-600 text-center font-semibold mt-12 mb-5'><span className='font-serif'>GRAB THE BEST BRAND FOR YOU</span></div>
              
                <div className='md:container  side-carosel-items flex  space-x-4 overflow-x-scroll overflow-y-hidden scrollbar-hide mb-5 md:p-5 sm:py-3 '>
                    
                    {
                        brands?.length > 0 ? brands.map((item,index) => (
                      
                        <div className=' h-44 md:h-60 bg-red-300 shadow-lg md:w-60 sm:w-40 flex-none rounded-tl-lg rounded-br-lg grid row-span-3 overflow-hidden relative scrollbar-hide' key={index}>
                        <img className='h-full object-contain hover:scale-105 duration-300' src={`${base_url}/${item.productImage[0]}`} alt="" />
                            <div className='absolute bottom-0 h-auto  w-full bg-gray-300 font-semibold font-serif text-[#100f0f] tracking-wide p-2 uppercase text-center '><span className='md:text-lg sm:text-xs'>{item.brand }</span></div>
                      
                     
                    </div>
                  )) : ''
                } 
                    
    
                </div>
            

            </div>

            <div className='ad-banner md:container  w-full flex justify-center md:my-12  sm:my-0'>
                <img className='max-h-full md:w-1/2 sm:w-full' src="/Images/Black White Bold Fashion Product Promotion Landscape Banner.png" alt="" />
            </div>


            <Footer/>
      </div>
  )
}

export default Home