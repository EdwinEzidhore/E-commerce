import React, {  useEffect, useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Footer from '../../Components/UserComponents/Footer/Footer'
import { HiOutlineStar } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TfiWallet } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCartLength } from '../../Redux/Cart/CartSlice'
import { add } from '../../Redux/SingleProduct/SingleProductSlice';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../Components/UserComponents/ScrollToTop'
import { base_url } from '../../Config';


const ProductSinglePage = () => {

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [Index, setIndex] = useState(0);
    const [loading, setLoading] = useState();
    const [similarProducts, setSimilarProducts] = useState([]);
    
    const SingleProduct = useSelector(state => state.singleProduct);

  

    useEffect(() => {
        getSimilarProducts();  
    },[])

    const getSimilarProducts = () => {
       
        axios.post(`${base_url}/api/v2/similar`, { SingleProduct })
            .then(res => {
               
                setSimilarProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const setWishList = () => {
        const item_id = SingleProduct._id;
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

    }
    

    const cart = () => {
        setLoading(true)
        const user_id = SingleProduct._id;
        axios.get(`${base_url}/api/v2/cart/?id=${user_id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                    setLoading(false)
                }
                else {
                   dispatch(setCartLength(res.data.length));
                    toast.success('Added to Bag')
                    setLoading(false);
                }
            })
            .catch(err => console.log(err))
    };

    const getSingleProduct = (product) => {
        dispatch(add(product));
        navigate('/p');
      
    };

    

    return (
     
        <section >
            <ScrollToTop/>
          
              <Nav />
       

          <div className=' bg-red-30 bg-slate-100 font-poppins'>
              
          
                  
                <div className='md:flex justify-evenly w-full'>
                    
                    <div className='sm:flex  sm:flex-nowrap sm:space-x-2  sm:overflow-x-scroll md:hidden'>
                        {
                            SingleProduct.productImage.map((img, index) => (
                                <div className='flex-shrink-0 h-96  ' key={index}>
                                    <img className='max-h-full  object-contain' src={`${base_url}/${img}`} />
                                </div>
                            ))
                        }
                    </div>

                    <div className='w-full sm:flex fixed bottom-0 md:hidden'>
                        <div className='w-1/2'>
                            <button className='py-3 w-full h-full bg-white text-[#1c7293] font-semibold flex items-center justify-center text-lg' onClick={() => cart()}><HiOutlineShoppingCart /><span className='tracking-wide ml-2 text-sm'>Add to Bag</span></button>
                        </div>
                        <div className='w-1/2'>
                            <button className='py-3 w-full h-full bg-[#1c7293] text-white font-thin flex items-center justify-center' onClick={() => setWishList()}>
                            <svg className='' width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#f4eeff"/>
                                </svg>
                                <span className='tracking-wide ml-2'>Save to Wishlist</span></button>
                        </div>
                    </div>
                  
                    <div className='hidden md:flex md:justify-end  lg:justify-between   md:flex-col-reverse lg:flex-row'>
                    <div className='xl:w-1/12 '>
                                  <div className=' lg:px-1 pb-5 flex   lg:w-fit sm:flex-row sm:overflow-x-scroll lg:flex-col'>
                                      {
                                          SingleProduct.productImage.map((img,index) => (
                                            <div className={index===Index?'w-20 h-20 mt-5 border-[#1c7293] border-2 p-1 ml-5':'w-20 h-20 mt-5 ml-5'} onClick={()=>setIndex(index)} key={index}>
                                            <img className='h-full w-full object-cover' src={`${base_url}/${img}`} alt="" />
                                        </div>
                                        ))  
                                      }
                                 </div>
                              </div>
                             
                                  <div className='flex items-center lg:w-4/5 justify-center p-4 '>
                                      <img className='max-h-full w-full  object-contain' src={`${base_url}/${SingleProduct.productImage[Index]}`} alt="img" />
                                  </div>
                             
                    </div>
                              <div className='md:w- lg:w-1/2  p-4'>
                                  <div className='flex flex-col items-center justify-center font-sans'>
                                      <div className='uppercase text-xs font-semibold text-slate-400'>{SingleProduct.category }</div>
                                      <div className='font-semibold text-slate-600 mt-1'>{SingleProduct.brand}</div>
                                      <div className='font-semibold tracking-wide text-lg mt-2 text-center'>{SingleProduct.description}</div>
                                      <div className='flex my-2'>
                                        <div className='flex items-center space-x-1 h-fit bg-[#1c7293] text-white px-1 rounded-full '>
                                            <span>3.8</span>
                                            <div className='icon  flex'><HiOutlineStar /></div>
                                        </div>
                                        <span className='ml-3 text-slate-500'>21 ratings and 0 reviews</span>
                                      </div>
                                      <div className='text-2xl font-semibold'>₹{SingleProduct.sellingPrice}</div>
                                      <div className='mt-1 space-x-2'>
                                          <span className='text-sm text-slate-800'>MRP :</span>
                                          <span className='line-through text-slate-500'>₹{SingleProduct.originalPrice}</span>
                                          <span className='font-light text-slate-900'>(20% OFF)</span>
                                      </div> 
                                      
                                      <div className='hidden md:flex space-x-4 gap-3 mt-5'>
                                            <div className=' h-auto text-[#1c7293] outline outline-2 outline-[#1c7293]  flex items-center gap-3 justify-center my-2 font-semibold rounded-lg w-32'>
                                              <button className={loading !== true ? 'flex items-center justify-center w-full p-2' : 'hidden '} onClick={() => cart()}><HiOutlineShoppingCart /><span className='ml-2'>Add to Bag</span></button>
                                              <div className={loading?"dot-spinner":'hidden'}>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                              </div>

                                            </div>
                                            <div className=' h-auto  bg-[#1c7293] text-white  flex  my-2 items-center gap-3 font-thin rounded-lg '>
                                    <button className='flex items-center justify-center p-2 w-full' onClick={() => setWishList()}>
                                    <svg className='' width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#f4eeff"/>
                                    </svg>
                                        <span className='ml-2 tracking-wide'>Save to Wishlist</span>
                                    </button>
                                            </div>

                                      </div>

                                  </div>

                                    <div className='my-5'>
                                        <div className='flex gap-3'>
                                            <div className='flex items-center'>
                                                <box-icon name='map' type='solid' color='#3b757f' ></box-icon>
                                                <span className='text-slate-600 text-sm'>Deliver to</span>
                                            </div>
                                            <div>
                                                <button><span className='text-sky-700 text-sm'>View details</span></button>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <div className='flex items-center gap-3 mb-6 border p-2 mr-5'>
                                        <div>
                                          <img className='h-8' src="/Images/fast-delivery.png" alt="" />
                                        </div>
                                            <div>
                                                <div className='flex space-x-5 mb-1'>
                                                        <span className='italic font-sans font-semibold'>Express</span>
                                                        <span className='text-[green]'>free </span>
                                                        <span className='line-through'>₹40</span>
                                                </div>
                                                <div className='mb-1 flex space-x-3'>
                                                    <span>Delivery in</span>
                                                    <span>2 days,Tuesday</span>    
                                                </div>
                                                <div>
                                                    <span>if ordered within 03m 22s</span>
                                                </div>
                                            </div>
                                    </div>
                                  
                                    <div className='mt-5 '>
                                        <h1 className='font-sans font-semibold mb-3 uppercase text-sm tracking-wide text-slate-800'>Available offers</h1>
                                        <div className='flex mt-2'>
                                            <box-icon name='purchase-tag' type='solid' color='#118a7e'></box-icon>
                                            <p><span  className='font-sans font-semibold '>Bank Offer </span><span className='text-sm text-slate-700'>Get ₹25 instant discount on first  UPI txns on order of ₹250 and aboveT&C</span></p>
                                        </div>
                                        <div className='flex mt-2'>
                                            <box-icon name='purchase-tag' type='solid' color='#118a7e'></box-icon>
                                            <p><span className='font-sans font-semibold'>Bank Offer</span><span className='text-sm text-slate-700'>5% Cashback on  Axis Bank CardT&C</span></p>
                                        </div>
                                        <div className='flex mt-2'>
                                            <box-icon name='purchase-tag' type='solid' color='#118a7e'></box-icon>
                                            <p><span className='font-sans font-semibold'>Bank Offer</span><span className='text-sm text-slate-700'>7% off up to ₹3500 on HDFC Bank Debit Card EMI Txns, Tenure: 6months and above, Min Txn Value: ₹7500T&C</span> </p>
                                        </div>
                                        <div className='flex mt-2'>
                                            <box-icon name='purchase-tag' type='solid' color='#118a7e'></box-icon>
                                            <p><span className='font-sans font-semibold'>Special Price</span> <span className='text-sm text-slate-700'>Get extra 45% off (price inclusive of cashback/coupon)T&C</span></p>
                                        </div>
                                  </div>
                                  
                               

                                 
                              </div>

                          </div>
                          <div className='xl:container' >
                                <h1 className=' font-semibold mb-7 text-center mt-5 '>product Details</h1>
                                      <hr />
                                      {
                                                                         
                        <div className='grid  gap-3 sm:place-items-center   sm:grid-cols-2 lg:place-items-stretch lg:grid-rows-2 lg:grid-cols-1 mt-5 pl-5 mb-8' >
                            <div className='lg:grid  lg:grid-cols-10 '>
                            <div className='mb-3 font-semibold text-slate-800'>Type</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Fit</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Fabric</div>
                                      <div className='mb-3 font-semibold text-slate-800'>colour</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Ideal for</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Size</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Suitable for</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Reversible</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Fabric care</div>
                                      <div className='mb-3 font-semibold text-slate-800'>Net Quantity</div>
                            </div>

                            <div className='lg:grid lg:grid-cols-10 '>
                            <div className='lg:text-sm text-slate-700 tracking-wide'>{SingleProduct.name}</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>Regular</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>{SingleProduct.Details.fabric}</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>{SingleProduct.Details.colour }</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>{SingleProduct.category}</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>{SingleProduct.Details.size}</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>Western wear</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>No</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>Machine wash</div>
                                      <div className='mb-3 lg:text-sm text-slate-700 tracking-wide'>1</div>
                            </div>    

                                    </div>
                                             
                                          }
                              
                            </div>

                          
              {/* map end */}

              <div className='md:container md:h-48  mt-5 border bg-white shadow-lg'>
                  
                  <img className='h-full w-full object-contain md:object-cover border shadow-lg' src="/Images/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" alt="" />
                
              </div>

              {
                  //Product carosesl starting
              }

              <div className='lg:container carosel-main mt-5 border pt-8  shadow-xl bg-white '>
                  <div className='pl-8  font-semibold  tracking-wider text-slate-600 text-xl font-frank-lukh'><span>Similar Products</span></div>
                    <div className='carsel-slidr pt-3 lg:pt-0 md:p-8  flex overflow-scroll md:gap-5'>
                        {
                            similarProducts.map((item,index) => (
                                <div className='carosel-card bg-white w-48  md:max-w-64  flex-none p-2' key={index}>
                          
                                <div className='h md:h-64'><img src={`${base_url}/${item.productImage[0]}`} alt="img" className='  max-h-full object-contain mx-auto'/></div>
                                <div>
                                        <div className='text-center'><span className='text-slate-500 p-1 text-sm font-semibold font-sans uppercase'>{ item.brand}</span></div>
                                        <div className=' h-auto p-1 text-center leading-5 font-sans font-semibold text-slate-800 text-md px-2 line-clamp-2'><a href="/p" onClick={()=>getSingleProduct(item)}>{ item.description}</a></div>
                                    <div className='flex items-center space-x-4  p-1 justify-center'>
                                        <div className=''>
                                          
                                                <span className='font-semibold text-lg'>₹{ item.sellingPrice}</span>
                                        </div>
                                       
                                        <div >
                                        
                                                <span className='line-through text-slate-500 flex'>₹{ item.originalPrice}</span>
                                        </div>
                                        
                                      
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                      
                    



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