import React, { useEffect, useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav';
import Footer from '../../Components/UserComponents/Footer/Footer';
import '../../css/style.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addcart, add_cart_price } from '../../Redux/SingleProduct/CartSlice';
import { toast } from 'react-toastify';
import Pagination from '../../Components/Pagination';


const Womens = () => {

    const [product, setProduct] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColor] = useState([]);
    const dispatch = useDispatch();
    const [totalItems, setTotalItems] = useState(0);
    const [curntPage, setCurntPage] = useState(1);

    useEffect(() => {
        getAllItem();
   
    }, [curntPage]);

 

    const getAllItem = () => {
        axios.get(`http://localhost:3333/api/v2/women/?category=Women&page=${curntPage}`)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data.item);
                setTotalItems(res.data.count)
                setBrands(res.data.Brands);
                setColor(res.data.Colors);
             


            })
            .catch((err) => {
                console.log(err);
            })
    };

    const cart = (product) => {
        let pro_id = product._id;
        
        axios.get(`http://localhost:3333/api/v2/cart/?id=${product._id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                }
                else {
                   
                    toast.success('Added to Bag')
                    dispatch(addcart(product));
                    let populated = res.data.populated.products;
                    const filtered = populated.find((prod) => prod.productID._id == pro_id);
                    const productDetails = {
                        productID: filtered.productID._id,
                        quantity: filtered.quantity,
                        price: filtered.productID.sellingPrice,
                        OG_price: filtered.productID.originalPrice,
                    }
                    dispatch(add_cart_price(productDetails))
                    


                 
                }
            })
            .catch(err => console.log(err))
    };


    const handleChange = (e) => {
  
     

    };  

  return (
      <section>
          <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav /></div>
          <div className='container '>
              <div className='grid grid-cols-12'>
                  <div className='grid col-span-2 border p-5 h-fit shadow-md'>
                      <form action="">
                          <div className='uppercase font-semibold mb-4 text-slate-800'>Filter by price</div>
                          <hr/>
                      <div className='my-4 text-slate-700 space-x-2'>
                          <input type="radio" id='low' name='price' value='LTh' />
                          <label htmlFor="low">Low to High</label>
                      </div>
                      <div className='mb-5 text-slate-700 space-x-2'>
                          <input type="radio" id='high' name='price'/>
                          <label htmlFor="high">High to Low</label>
                      </div>
                      <div className='text-slate-700'>
                          <div className='uppercase font-semibold my-4 text-slate-800'>Brand</div>
                              <hr />
                              {
                                  brands.length > 0 &&brands.map((brand,index) => (
                                    <div className='my-3 space-x-2 ' key={index}>
                                    <input type="radio" id={brand} name='brand' value={brand} onChange={(e)=>handleChange(e)}/>
                                        <label htmlFor={brand}>{ brand}</label>
                                    </div>
                                  ))
                              }

                          </div>
                          
                          <div className='text-slate-700 mt-5'>
                              <div className='uppercase font-semibold mb-4 text-slate-800'>Color</div>
                              <hr />
                              {
                                  colors.length > 0 && colors.map((color, index) => (
                                    <div  className='mb-3 space-x-2' key={index}>
                                    <input type="radio" id={color} name='color' value={color} onChange={(e)=>handleChange(e)} />
                                          <label htmlFor={color}>{color }</label>
                                </div >
                                  ))
                              }

                          </div>
                          <div className='flex justify-between my-5'>
                              <div className='h-auto border bg-emerald-500  rounded-md text-white font-semibold'>
                                  <button className='p-1 px-2'>Apply filters</button>
                              </div>
                              <div className='h-auto border bg-emerald-500 text-white font-semibold rounded-md
                              '>
                                  <button className='p-1 px-2'>Clear</button>
                              </div>
                              
                          </div>
                      </form>

                  </div>

                  <div className=' col-span-10 border items-start flex flex-col ml-3 p-5 h-auto shadow-lg'>
                      
                        <div className='mb-5'><button onClick={()=>getAllItem()} className='h-fit w-fit p-1 bg-gray-200 px-2 rounded-md'>All</button></div>
                     
                      <div className='flex flex-wrap  gap-5  '>
                          {
                              product.length > 0 ? product.map((item,index) => (
                                <div  className='card h-fit  p-4 w-fit rounded-lg flex-none ' key={index}>
                          
                                <div className='relative group h-56   flex items-center justify-center hover:scale-110 transition duration-500'>
                                    <div className='absolute hidden group-hover:flex rounded-full   bg-red-100 hover:bg-red-200 heart '>
                                   
                                        <button className='
                                        
                                            group/button
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
                                      <img className='h-full w-48 object-contain ' src={`http://localhost:3333/${item.productImage[0]}`} alt="" />
                                
                            </div>
                                      <div className='text-center text-sm mt-2 tracking-wide text-red-600 font-poppins'>{ item.status==='Unavailable'?'Currently Unavailable':''}</div>
                                <div className='w-56 p-1 content bg-white'>
                                          <div className='text-xs text-slate-400 uppercase font-semibold mb-1 text-center'>{ item.category}</div>
                                          <div className='text-sm uppercase font-semibold text-slate-600 text-center'>{ item.brand}</div>
                                          <div className='font-semibold text-lg text-[#1e1616] leading-5 mb-2 h-12 text-center'>{item.description }</div> 
                                <div className='flex space-x-2 items-center justify-between'>
                                    <div className='space-x-3'>
                                                  <span className='font-semibold text-lg text-emerald-700'>₹{ item.sellingPrice}</span>
                                                  <span className='line-through text-slate-400'>₹{item.originalPrice }</span>
                                    </div>
                                  
                                        <div className='outline rounded-full mt-2 bg-gray-200 outline-stone-200 hover:bg-[#b5b5ff]'>
                                            <button onClick={()=>cart(item)} className='rounded-full  p-1 
                                            relative before:content-[attr(data-tip)] before:absolute before:px-3 before:py-2 before:left-1/2 before:top-0 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full  before:bg-[#5555ca] before:text-white before:rounded-md before:opacity-0
                                     before:transition-all before:text-xs
  
                                        after:absolute after:left-1/2 after:top-0 after:h-0 after:w- after:-translate-x-1/2 after:border-8 after:border-[#5555ca] after:border-l-transparent after:border-b-transparent after:border-r-transparent after:opacity-0
                                     after:transition-all hover:before:opacity-100 hover:after:opacity-100 
  
  
                                        text-xl  ' data-tip='Add to Bag'>
                                            <svg className='' width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2.23737 2.28845C1.84442 2.15746 1.41968 2.36983 1.28869 2.76279C1.15771 3.15575 1.37008 3.58049 1.76303 3.71147L2.02794 3.79978C2.70435 4.02524 3.15155 4.17551 3.481 4.32877C3.79296 4.47389 3.92784 4.59069 4.01426 4.71059C4.10068 4.83049 4.16883 4.99538 4.20785 5.33722C4.24907 5.69823 4.2502 6.17 4.2502 6.883L4.2502 9.55484C4.25018 10.9224 4.25017 12.0247 4.36673 12.8917C4.48774 13.7918 4.74664 14.5497 5.34855 15.1516C5.95047 15.7535 6.70834 16.0124 7.60845 16.1334C8.47542 16.25 9.57773 16.25 10.9453 16.25H18.0002C18.4144 16.25 18.7502 15.9142 18.7502 15.5C18.7502 15.0857 18.4144 14.75 18.0002 14.75H11.0002C9.56479 14.75 8.56367 14.7484 7.80832 14.6468C7.07455 14.5482 6.68598 14.3677 6.40921 14.091C6.17403 13.8558 6.00839 13.5398 5.9034 13H16.0222C16.9817 13 17.4614 13 17.8371 12.7522C18.2128 12.5045 18.4017 12.0636 18.7797 11.1817L19.2082 10.1817C20.0177 8.2929 20.4225 7.34849 19.9779 6.67422C19.5333 5.99996 18.5058 5.99996 16.4508 5.99996H5.74526C5.73936 5.69227 5.72644 5.41467 5.69817 5.16708C5.64282 4.68226 5.52222 4.2374 5.23112 3.83352C4.94002 3.42965 4.55613 3.17456 4.1137 2.96873C3.69746 2.7751 3.16814 2.59868 2.54176 2.38991L2.23737 2.28845Z" fill="#1C274C"/>
                                      <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="#1C274C"/>
                                      <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" fill="#1C274C"/>
                                            </svg>
                                            </button>
                                       
  
                                    </div>
                                </div>
                            </div>
                        </div>
                              )) :
                                  ''
                          }

                    



                      </div>
                      <Pagination totalItems={totalItems} ItemsPerPage={8} CurntPage={curntPage} setCurntPage={setCurntPage} />
                  </div>
              </div>
          </div>
        
          <div className='mt-5'><Footer/></div>
</section>
  )
}

export default Womens