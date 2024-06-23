import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../../Redux/SingleProduct/SingleProductSlice';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import '../../../css/banner.css';
import { Carousel } from "flowbite-react";


const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [networkErr, setNetworkErr] = useState(false);

    
    
    useEffect(() => {
        
        axios.get('http://localhost:3333/api/v2/featured',{withCredentials:true})
            .then((res) => {
                
                setNewArrivals(res.data.products);
                setBrands(res.data.Brands)
                console.log(res.data);
                setLoading(false);
                
            })
            .catch((err) => {
                console.log('this is catch error', err);
                setNetworkErr(true);
                
            })
    },[]);

    const getSingleProduct = (product) => {
        dispatch(add(product));
        navigate('/p');
      
    }
  
    const cart = (product) => {
        let pro_id = product._id;
        
        axios.get(`http://localhost:3333/api/v2/cart/?id=${product._id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                }
                else {
                   
                    toast.success('Added to Bag')
                    let populated = res.data.populated.products;
                    const filtered = populated.find((prod) => prod.productID._id == pro_id);
                    const productDetails = {
                        productID: filtered.productID._id,
                        quantity: filtered.quantity,
                        price: filtered.productID.sellingPrice,
                        OG_price: filtered.productID.originalPrice,
                    }
                   
                    


                 
                }
            })
            .catch(err => console.log(err))
    };


   

    return (
     
        <div className=' Hero h-screen '>

        <div className="h-56 sm:h-64 xl:h-3/4  2xl:h-96 container  ">
            <Carousel>
                            <div className='w-full h-full flex '>
                                {/* <div className=' max-h-full w-2/5 bg-red-300'>heading</div> */}
                                <div className=' w-full max-h-full'><img className='h-full w-full object-cover object-center rounded-xl' src="src/images/Simple Modern Photo Collage Autumn Fashion Sale Banner.png" alt="..." /></div>
                            </div>

                            <div className='w-full h-full flex '>
                                {/* <div className=' max-h-full w-2/5 bg-red-300'>heading</div> */}
                                <div className=' w-full max-h-full'><img className='h-full w-full object-cover object-center rounded-xl' src="src/images/Simple Modern Photo Collage Autumn Fashion Sale Banner (1).png" alt="..." /></div>
                            </div>

                            <div className='w-full h-full flex '>
                                {/* <div className=' max-h-full w-2/5 bg-red-300'>heading</div> */}
                                <div className=' max-h-full w-full'><img className='h-full w-full object-cover object-center rounded-xl' src="src/images/Gray Minimalist Fashion Big Sale Banner (1).png" alt="..." /></div>
                            </div>
                

            </Carousel>
            </div>
 
            <div className='flex container justify-evenly my-10 p-5'>
                <div className='flex space-x-2'>
                    <div className='h-12'><img className='h-full ' src="src/images/save-money.png" alt="" /></div>
                    <div >
                        <h1 className='font-bold tracking-wide font-sans text-gray-800'>Free Delivery</h1>
                        <h4 className='text-sm tracking-wide text-gray-500 '>For all purchases </h4>
                    </div>
                </div>

                <div className='flex space-x-2'>
                    <div className='h-12'><img className='h-full' src="/src/images/delivery-status.png" alt="" /></div>
                    <div>
                        <h1 className='font-bold tracking-wide font-sans text-gray-800'>30 Days Return </h1>
                        <h4 className='text-sm tracking-wide text-gray-500 '>after deivery </h4>
                    </div>
                </div>

                <div className='flex space-x-2'>
                    <div className='h-12'><img className='h-full' src="/src/images/secure-payment (1).png" alt="" /></div>
                    <div>
                        <h1 className='font-bold tracking-wide font-sans text-gray-800'>Secure Payment</h1>
                        <h4 className='text-sm tracking-wide text-gray-500 '>100% secure payment </h4>
                    </div>
                </div>

                <div className='flex space-x-2'>
                    <div className='h-12'><img className='h-full' src="/src/images/customer-support.png" alt="" /></div>
                    <div>
                        <h1 className='font-bold tracking-wide font-sans text-gray-800'>24/7 Support</h1>
                        <h4 className='text-sm tracking-wide text-gray-500 '>Dedicated support </h4>
                    </div>
                </div>
            </div>

            <div className='New-arivals'>
                <div className='text-center uppercase '>
                    <h1 className='text-xl font-serif font-semibold text-gray-600 tracking-wider'>New Arrivals</h1>
                    <hr  className='border container border-gray-300 my-5'/>
                </div>
                <div className='card-wrapper  container grid grid-rows-1 grid-cols-3 gap-2 w-fit mb-5'>
                    {
                        newArrivals.length > 0 ? newArrivals.map((product) => (
                            <div className='card h-fit relative  p-4 w-fit rounded-lg flex-none   shadow-lg bg-slate-50' key={product._id} onClick={()=>getSingleProduct(product)}>
                            <img className='h-12 z-10 absolute left-0 top-0 drop-shadow-md' src="/src/images/new (1).png" alt="products" />
                              
                              <div className='relative group h-56   flex items-center justify-center hover:scale-105 transition duration-500 '>
                                  <div className='absolute hidden group-hover:flex rounded-full   bg-red-100 hover:bg-red-200 heart '>
                                 
                                      <button className=' group/button
                                          rounded-full p-1 backdrop-blur 
                                          font-semibold
                                          relative before:content-[attr(data-tip)] before:absolute before:px-3 before:py-2 before:left-1/2 before:top-0 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full  before:bg-red-500 before:text-white before:rounded-md before:opacity-0
                                   before:transition-all before:text-xs
    
                                      after:absolute after:left-1/2 after:top-0 after:h-0 after:w- after:-translate-x-1/2 after:border-8 after:border-red-500 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:opacity-0 
                                   after:transition-all  hover:before:opacity-100 hover:after:opacity-100 
    
    
                                      text-xl  ' data-tip='Add to wishlist'>
                                          <svg className='heart-svg fill-red-400 group-hover/button:fill-red-600 ' width="25px" height="25px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" />
                                        </svg>
             
                                    </button>
                                  </div> 
                                    <img className='h-full w-48 object-contain rounded-lg' src={`http://localhost:3333/${product.productImage[0]}`}  alt="" />
                              
                          </div>
                                    <div className='text-center text-sm mt-2 tracking-wide text-red-600 font-poppins'>{ true==='Unavailable'?'Currently Unavailable':''}</div>
                              <div className='w-56 p-1 content bg-white'>
                                        <div className='text-xs text-slate-400 uppercase font-semibold mb-1 text-center'>Men</div>
                                        <div className='text-sm uppercase font-semibold text-slate-600 text-center'>jack & jonhs</div>
                                        <div className='font-semibold text-lg text-[#1e1616] leading-5 mb-1 h-12 text-center'>Men Black Polo Collar T-shirt</div> 
                              <div className=' space-x-2 items-center justify-between'>
                                  <div className='space-x-3 flex items-center justify-center'>
                                       <span className='font-semibold text-lg text-emerald-700'>₹2400</span>
                                           <span className='line-through text-slate-400'>₹3999</span>   
                                  </div>
    
                              </div>
                          </div>
                        </div>
                        )):''
                    }

                    

                </div>
                
            </div>

            <div className="wrapper container p-5 h-32 flex items-center border shadow-lg">
                <div className='item item1 '><img className='h-28  object-center object-contain' src="/src/images/brands/adidas.svg" alt="" /></div>
                <div className='item item2 '><img className='h-28  object-center object-contain'  src="/src/images/brands/armani (1).svg" alt="" /></div>
                <div className='item item3 '><img className='h-28  object-center object-contain'  src="/src/images/brands/armani.svg" alt="" /></div>
                <div className='item item4 '><img className='h-28  object-center object-contain'  src="/src/images/brands/avirex.svg" alt="" /></div>
                <div className='item item5 '><img className='h-28  object-center object-contain'  src="/src/images/brands/boss.svg" alt="" /></div>
                <div className='item item6 '><img className='h-28  object-center object-contain'  src="/src/images/brands/calvin.svg" alt="" /></div>
                <div className='item item7 ' ><img className='h-12  object-center object-contain' src="/src/images/brands/chanel.svg" alt="" /></div>
                <div className='item item8 ' ><img className='h-12  object-center object-contain' src="/src/images/brands/gucci.svg" alt="" /></div>

            </div>

          
            <div className='side-carosel container  '>
                <div className='p-5 tracking-widest text-xl text-slate-600 text-center font-semibold mt-12 mb-5'><span className='font-serif'>GRAB THE BEST BRAND FOR YOU</span></div>
              
                <div className='side-carosel-items flex  space-x-4 overflow-scroll scrollbar-hide mb-5 p-5'>
                    
                    {
                        brands.length > 0 ? brands.map((item,index) => (
                      
                        <div className='h-60 bg-red-300 shadow-lg w-60 flex-none rounded-lg grid row-span-3 overflow-hidden relative' key={index}>
                        <img className='h-full object-contain hover:scale-105 duration-300' src={`http://localhost:3333/${item.productImage[0]}`} alt="" />
                            <div className='absolute bottom-0 h-auto  w-full bg-gray-300 font-semibold font-serif text-[#100f0f] tracking-wide p-2 uppercase text-center '><span >{item.brand }</span></div>
                      
                     
                    </div>
                  )) : ''
                } 
                    
    
                </div>
            

            </div>

            <div className='ad-banner container  w-full flex justify-center my-12'>
                <img className='max-h-full w-1/2' src="/src/images/Black White Bold Fashion Product Promotion Landscape Banner.png" alt="" />
            </div>



            {/* <div className='featured-cards container mb-16 '>
                <div className='p-5 tracking-wider text-xl'><span>Featured Products</span></div>

                <div className='flex flex-wrap justify-center   gap-10'>
                    {
                        loading===false ?products.map((product, index) => (
                            <div className='cards bg-gray-50 w-fit h-fit shadow-lg rounded-md overflow-hidden flex flex-col p-1 outline outline-gray-300 hover:scale-105 ease-out duration-200'  key={index}>
                                <div className='h-60 flex justify-center' onClick={() => getSingleProduct(product)}>
                                <img className='  object-cover h-full' src={`http://localhost:3333/${product.productImage[0]}`} alt="" />
                                </div>
                            
                            
                            <div className='p-5 '>
                                    <div className='w-52'><h2 onClick={() => getSingleProduct(product)} className='cursor-default'>{ product.description}</h2></div>
                                    <div className='cursor-default'><span onClick={() => getSingleProduct(product)}>Rs.{ product.sellingPrice}</span>
                                    
                                        <div className='flex items-center gap-2'><span className='line-through'>{product.originalPrice }</span>
                                    <span>save upto 20%</span></div>
                                </div>
                                <div className='h-auto bg-red-400 w-fit p-2 mt-5 rounded-lg hover:bg-[#c1121f]'>
                                    <button className='text-white font- uppercase' onClick={()=>cart(product)}>Add to Cart</button>
                                </div>
                               
                            </div>
                            
                            </div>
                        )) :
                            networkErr === true ?
                                <div className='flex flex-col'>
                                    <img className='h-20 object-contain' src="/src/images/delete.png" alt="" />
                                    <span className='text-slate-500 cursor-default'>Check your Network connection</span>
                                </div>
                                
                                 :
                                <Loading />
                    }
               

                  
                  
                   
                  
                  
                    
                

                </div>
                
                
            </div> */}
            


            <Footer/>
      </div>
  )
}

export default Home