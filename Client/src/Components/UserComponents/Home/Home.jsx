import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../../Redux/SingleProduct/SingleProductSlice';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import '../../../css/banner.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [networkErr, setNetworkErr] = useState(false);

    
    
    useEffect(() => {
        
        axios.get('http://localhost:3333/api/v2/featured',{withCredentials:true})
            .then((res) => {
                
                setProducts(res.data.Products);
                console.log(res.data.Products);
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
     
        <div className=' Hero '>

             
 



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

            <div className='featured-cards container mb-16 '>
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
                
                
            </div>

            <Footer/>
      </div>
  )
}

export default Home