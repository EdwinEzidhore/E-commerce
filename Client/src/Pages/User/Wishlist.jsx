import React, { useEffect, useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Footer from '../../Components/UserComponents/Footer/Footer'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Loading from '../../Components/UserComponents/Loading/Loading';
import { add } from '../../Redux/SingleProduct/SingleProductSlice';
import { setCartLength } from '../../Redux/Cart/CartSlice'
import {  useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import ScrollToTop from '../../Components/UserComponents/ScrollToTop';
import { GiShoppingBag } from "react-icons/gi";


const Wishlist = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [wishlist, setWishList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUserErr, setIsuserErr] = useState(false);


    useEffect(() => {
        getWishlistItems();
    }, []);

    const getWishlistItems = () => {
        axios.get('http://localhost:3333/api/v2/get-wishlist', { withCredentials: true })
            .then((res) => {
                if (res.status === 200 ) {
                    // console.log(res.data.wishlist.products)
                    setWishList(res.data.wishlist.products);
                    setLoading(false);
                }


            })
            .catch(err => {
                const { success, messgae } = err.response.data;
                const { status } = err.response;

                if (success === false && status === 401) {
                    setLoading(false);
                    setIsuserErr(true);
                }
                console.log(err);
            });
    };

    const removeItem = (product) => {
        const item_id = product._id;
        axios.delete(`http://localhost:3333/api/v2/remove-wishlist/?id=${item_id}`,{withCredentials:true})
            .then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    getWishlistItems();
               }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const singleProduct = (product) => {
        dispatch(add(product));
        navigate('/p')
      
    };

    const AddtoCart = (product) => {
        
        const item_id = product._id;
        axios.get(`http://localhost:3333/api/v2/cart/?id=${item_id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                   
                }
                else {
                   dispatch(setCartLength(res.data.length));
                    toast.success('Added to Bag')
                   
                }
            })
            .catch(err => console.log(err))
    };

    



  return (
      <div className=''>
          <ScrollToTop dependency={wishlist}/>
          <Nav />
          <div className='h-screen'>
              
              <div className='text-center font-bold font-frank-lukh sm:text-2xl md:text-3xl md:mt-12'>My WishList</div>
              {
                  !loading ?  <div>
                  {
                    wishlist.length > 0? <div className='card-wrapper h-fit sm:flex sm:flex-col sm:items-center   md:container md:grid md:grid-cols-3  xl:grid-cols-4 gap-2 md:w-fit mb-5 mt-5 '>
                                {
                                  wishlist.length > 0 && wishlist.map((product, index) => (
                                        <div className='shadow-none sm:shadow-md' key={index}>
                                          <div className=' card sm:flex sm:items-center sm:w-96  md:flex-col  h-fit relative  p-4 sm:pb-0 w-full md:w-fit md:rounded-lg flex-none sm:border sm:border-b-0    md:shadow-lg bg-slate-50'  key={index} >
                                            <div className=' hidden md:block absolute right-0 top-5 outline outline-1 rounded-full text-red-500 z-10'><button className='p-2' onClick={()=>removeItem(product)}><MdDelete /></button></div>
                                           <div className='relative group sm:h-32 md:h-56   flex items-center justify-center lg:hover:scale-105 lg:transition lg:duration-500 ' onClick={()=>singleProduct(product)}>
                                                <img className='h-full md:w-48 object-contain rounded-lg' src={`http://localhost:3333/${product.productImage[0]}`}  alt="img"  ></img>
                                           </div>
                                           
                                           <div className=' md:w-56 p-1 content bg-white ml-0 sm:ml-3'>
                                                  <div className='text-xs text-slate-400 uppercase font-semibold mb-1 md:text-center sm:text-start '>{ product.category}</div>
                                                  <div className='sm:text-xs md:text-sm uppercase font-semibold text-slate-600 md:text-center sm:text-start'>{product.brand }</div>
                                                  <div className='font-semibold sm:text- md:text-lg text-[#1e1616] md:leading-5 mb-1  md:h-16 md:text-center sm:text-start md:w-fit sm:w-64 sm:line-clamp-2'><a href='' className='hover:text-gray-700 ' onClick={(e) => singleProduct(product)}>{product.description }</a></div> 
                                                   <div className='flex space-x-2 items-center md:justify-evenly sm:justify-between'>
                                                       <div className='space-x-3 flex items-center   lg:mt-3'>
                                                          <span className='font-semibold text-lg text-emerald-700'>₹{product.sellingPrice }</span>
                                                          <span className='line-through text-slate-400'>₹{product.originalPrice }</span>   
                                                      </div>
                                                      
                                                       <div className='hidden md:block outline rounded-full mt-2 bg-gray-200 outline-stone-200 hover:bg-[#b5b5ff] w-fit'>
                                                           <button onClick={()=>AddtoCart(product)} className='rounded-full  p-1 
                                                           relative before:content-[attr(data-tip)] before:absolute before:px-3 before:py-2 before:left-1/2 before:top-0 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full  before:bg-[#5555ca] before:text-white before:rounded-md before:opacity-0
                                                    before:transition-all before:text-xs
                 
                                                       after:absolute after:left-1/2 after:top-0 after:h-0 after:w- after:-translate-x-1/2 after:border-8 after:border-[#5555ca] after:border-l-transparent after:border-b-transparent after:border-r-transparent after:opacity-0
                                                    after:transition-all hover:before:opacity-100 hover:after:opacity-100 
                 
                 
                                                       text-xl  ' data-tip='Add to Bag'>
                                                           <svg  width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                     <path d="M2.23737 2.28845C1.84442 2.15746 1.41968 2.36983 1.28869 2.76279C1.15771 3.15575 1.37008 3.58049 1.76303 3.71147L2.02794 3.79978C2.70435 4.02524 3.15155 4.17551 3.481 4.32877C3.79296 4.47389 3.92784 4.59069 4.01426 4.71059C4.10068 4.83049 4.16883 4.99538 4.20785 5.33722C4.24907 5.69823 4.2502 6.17 4.2502 6.883L4.2502 9.55484C4.25018 10.9224 4.25017 12.0247 4.36673 12.8917C4.48774 13.7918 4.74664 14.5497 5.34855 15.1516C5.95047 15.7535 6.70834 16.0124 7.60845 16.1334C8.47542 16.25 9.57773 16.25 10.9453 16.25H18.0002C18.4144 16.25 18.7502 15.9142 18.7502 15.5C18.7502 15.0857 18.4144 14.75 18.0002 14.75H11.0002C9.56479 14.75 8.56367 14.7484 7.80832 14.6468C7.07455 14.5482 6.68598 14.3677 6.40921 14.091C6.17403 13.8558 6.00839 13.5398 5.9034 13H16.0222C16.9817 13 17.4614 13 17.8371 12.7522C18.2128 12.5045 18.4017 12.0636 18.7797 11.1817L19.2082 10.1817C20.0177 8.2929 20.4225 7.34849 19.9779 6.67422C19.5333 5.99996 18.5058 5.99996 16.4508 5.99996H5.74526C5.73936 5.69227 5.72644 5.41467 5.69817 5.16708C5.64282 4.68226 5.52222 4.2374 5.23112 3.83352C4.94002 3.42965 4.55613 3.17456 4.1137 2.96873C3.69746 2.7751 3.16814 2.59868 2.54176 2.38991L2.23737 2.28845Z" fill="#1C274C"/>
                                                     <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="#1C274C"/>
                                                     <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" fill="#1C274C"/>
                                                           </svg>
                                                           </button>
                                                      
                 
                                                       </div>
                                                   </div>
                                               </div>
                                          </div>
                                          <div className='sm:flex sm:justify-between md:hidden bg-white'>
                                                  <div className='text-center w-full border text-slate-500 font-semibold'><button className=' py-3 w-full h-full flex items-center justify-center' onClick={()=>removeItem(product)}><MdDelete />Remove</button></div>
                                                  <div className='text-center w-full border text-slate-500 font-semibold'><button className='py-3 w-full h-full flex items-center justify-center' onClick={()=>AddtoCart(product)}><GiShoppingBag />Add to Bag</button></div>
                                              </div> 
                                        </div>
                                        
                                      ))
                                            
                                   }
                                 </div>
                              :
                                <div className='flex items-center justify-center flex-col h-96'>
                                  <div className='h-52'><img className='h-full' src="/src/images/10194.jpg" alt="img" /></div>
                                  {
                                      isUserErr?        <div>
                                      <div className='text-lg font-semibold tracking-wider text-slate-700'>Please Login to add Items</div>
                                      <div className='text-center mt-4'><button className='h-auto px-4 py-1 rounded-md text-[#0e5f76] outline oultine-1 font-semibold uppercase outline-[#0e5f76] hover:text-white hover:outline-white hover:bg-[#0e5f76] duration-300' onClick={()=>navigate('/login')}>Login</button></div>
                                      </div> :
                                          
                                          <div className='text-lg font-semibold tracking-wide text-slate-600'>Your WishList is Empty!</div>
                                  }
                                  
                           
                                </div>           
                  }
              </div>
                  :
                  <div className='h-96 flex items-center justify-center'><Loading/></div>  
              }
<Footer/>
          </div>
          
    </div>
  )
}

export default Wishlist