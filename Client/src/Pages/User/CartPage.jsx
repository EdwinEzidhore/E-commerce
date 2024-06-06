import Nav from '../../Components/UserComponents/Nav/Nav'
import { CgArrowTopRightO } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { FaTag } from "react-icons/fa6";
import Footer from '../../Components/UserComponents/Footer/Footer'
import { FiMinus } from "react-icons/fi";
import '../../css/style.css';
import { HiOutlinePlusSm } from "react-icons/hi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { remove_single_cartItem } from '../../Redux/SingleProduct/CartSlice'
import {quantity_changed_price} from '../../Redux/SingleProduct/CartSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CartPage = () => {

    const [cartItems, setCartItems] = useState({products:[]});
    const dispatch = useDispatch();
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [userAddress, setUserAddress] = useState([]);
   

    const cart_Total = useSelector((state => state.cart.totalAmount));
    const discount = useSelector((state => state.cart.discount));
    const activeAddress = useSelector((state) => state.address.activeAddress);



    useEffect(() => {
        getCartItems();
        axios.get('http://localhost:3333/api/v2/get-address', { withCredentials: true })
        .then((res) => {
        setUserAddress(res.data.Address);
        })
      .catch(err => console.log(err));
    }, []);
    
    const getCartItems = () => {
        axios.get(`http://localhost:3333/api/v2/getCartItems`,{withCredentials:true})
            .then((res) => {
               
                setCartItems(res.data.cart);
               
             
            })
            .catch(err => {
                // if (err.response.status === 500) {
                //     setErr(true)
                // }
            } )
        }


    const removeItem = (item) => {
        
        dispatch(remove_single_cartItem(item));
        const user_id = cartItems.userId;
        const item_id = item.productID._id;
       
        axios.delete(`http://localhost:3333/api/v2/?user_id=${user_id}&item_id=${item_id}`, { withCredentials: true })
            .then((res) => {
                setCartItems(res.data.cart);
                getCartItems();
            })
            .catch(err => console.log(err))
    };

    const incrementorDecrement = (ope, product) => {
        const item_id = product.productID._id;
        const qty = product.quantity;
        axios.patch(`http://localhost:3333/api/v2/qty/?user_id=${cartItems.userId}&item_id=${item_id}&qty=${qty}&ope=${ope}`)
            .then(res => {
                if (res.status === 200) {
                    getCartItems();

                    const productDetails = {
                        productId: res.data.quantity_changed_item.productID,
                        new_quantity:res.data.quantity_changed_item.quantity,
                    }
                    dispatch(quantity_changed_price(productDetails))
                }

            })
            .catch(err => console.log(err))
      
    };




  return (
      <section>
          <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav /></div>
          {
             cartItems.products.length >0  ?
                <div className='container'>
              
                <div className='grid grid-cols-12 bg-slate-50 font-robo'>
                  <div className='grid col-start-2 col-end-8 p-3'>
                      <div className=' items-center justify-between p-4 border bg-white shadow-md h-fit'>
                              {activeAddress!=null &&  <div className='text-sm font-semibold mb-3'>Deliver to:</div>}
                                  <div className='flex justify-between items-center'>
                                      
                                      
                                      {
                                          activeAddress!=null?
                                              
                                            <div className='w-18 ml-2 flex items-center'>
                                                <div className='h-3 w-3 border rounded-full outline outline-1 outline-slate-400 bg-[#15b315]'></div>
                                                <div className='flex flex-col ml-2' >
                                                    <div className='text-sm'>{activeAddress.Name }</div>
                                                  <span className='font-medium text-slate-600 text-sm font-poppins tracking-wide' >{activeAddress.main_address}</span>
                                                  <div><span className='text-sm tracking-wide text-gray-400 mr-2 font-semibold'>landmark:</span><span className='text-sm'>{activeAddress.landmark }</span></div>
                                                  <span className=' text-slate-600 text-sm font-poppins tracking-wide'>ph: {activeAddress.phoneNumber }</span>
                                                
                                                </div>
  
                                              </div> :
                                              
                                              <div className='text-slate-500'>No Active Address added</div>
                                    
                                    

                                      }
                                      
                                     
                                    
                                      <div className='text-sm border p-1 px-3 rounded-md  bg-[#09555c] text-white'><button onClick={()=>navigate('/Address')}>{activeAddress!=null ?'Change Address':'Add new address'}</button></div>
                                  </div>

                      </div>

                      {/* <div className='border mt-2 bg-white shadow-md p-4'>
                          <div className='text-sm font-semibold mb-3'><span>Available Offers</span></div>
                          <div className='text-slate-500 text-sm font-thin mb-4'><p>₹1000 Off On Selected Banks Credit Non EMI, Credit and Debit Card EMI TransactionsT&C</p></div>
                          <div className='border w-fit p-2   text-sm font-semibold bg-[#72969a] text-[#fff9f9] rounded-md'><button>Show more +</button></div>
                      </div> */}

                


                      <div className=' p-1'>
                          {
                              cartItems.products.map((item,index) => (
                                <div className='card flex border p-3 gap-3 mb-1 h-fit relative bg-white shadow-md' key={index}>
                                <div className='   object-cover flex gap-1'>
  
                                    <div className=' h-f w-32 flex justify-center item-center'>
                                    <img className='h-full object-cover' src={`http://localhost:3333/${item.productID.productImage[0]}`} alt="" />
                                    </div>
                                    
                                </div>
                                    <div className=''>
                                          <h1 className='text-sm font-semibold'>{item.productID.brand }</h1>
                                      <h4 className='mt-1'>{item.productID.description }</h4>
                                    <h5 className='text-sm text-slate-500 '>sold by ethinic fashion</h5>
                                    
                                    <div className='flex items-center  space-x-5 mt-3 gap-5 mb-2 '>
                                              <button className='h-auto bg-gray-200  px-2'>size: <span className='font-semibold text-sm me'>{ item.productID.Details.size}</span></button>
                                        <div className='flex items-center gap-3'>
                                                  
                                                      <button className=' p-1.5 flex  outline rounded-full outline-1 outline-slate-500'  onClick={(e)=>{
                                                            incrementorDecrement('minus',item)
                                                      }
                                                     
                                                      }><FiMinus/></button>
                                                  
                                            <input type="number"
                                                className='bg-slate-200 spinner w-10 text-sm text-center  outline outline-1 outline-slate-500' readOnly value={item.quantity}/>
                                                  
                                                      <button className='flex outline rounded-full outline-1 outline-slate-500 p-1.5' onClick={() => incrementorDecrement('plus', item)}><HiOutlinePlusSm /></button></div>
                                      
                                    </div>
  
                                    <div className='flex gap-2 space-x-1 items-center p-2'>
                                              <h1 className='font-semibold'>₹{  item.productID.sellingPrice}</h1>
                                        <h4 className='text-sm line-through text-slate-500'>₹{  item.productID.originalPrice}</h4>
                                        <h1 className='text-[#25858e]'>70% off</h1>
                                    </div>
  
                                    <div className='flex items-center text-xs'>
                                        <CgArrowTopRightO />
                                        <p>14 days return available</p></div>
                                    </div>
                                    <div className='absolute top-5 text-2xl right-5'><button onClick={()=>removeItem(item)}><RxCross1  /></button></div>
                                    
                            </div>
                              ))
                          }
                              
                          
                          

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

                          <div className="box-3 border p-4 bg-[#f8e4e9] shadow-lg sticky top-20">
                              <div className='my-3'>
                              <p><span className='uppercase text-sm font-semibold text-slate-800 '>Price details</span><span>({cartItems.products.length} item)</span></p>
                              </div>
                              
                              <div className=''>
                                 
                                  <div className='flex justify-between text-sm mb-3  text-[black]'>
                                      <span>Total MRP</span>
                                              <span>₹{ cart_Total}</span>
                                     </div>
                                     <div className='flex justify-between mb-3 text-sm'>
                                      <span>Discount on MRP</span>
                                              <span className='text-[#37c137]'>-₹{ discount}</span>
                                  </div>
                                  <div className='flex justify-between mb-3 text-sm '>
                                      <span>Coupon Discount</span>
                                      <button className='text-red-600'>Apply coupon</button>
                                     </div>
                                     <div className='flex justify-between mb-3 text-sm'>
                                      <span>Platform fee</span>
                                      <span className='text-[#31b536]'>FREE</span>
                                  </div>
                                  <div className='flex justify-between mb-3 text-sm'>
                                      <span>Shipping fee </span>
                                      <p><span className='line-through'>₹40</span><span className='text-[#31b536] ml-1'>FREE</span> </p>
                                  </div>
                                  <hr className='border-slate-400'></hr>
                                  <div className='flex justify-between my-4 font-semibold'>
                                      <span className='uppercase'>Toatl Amount</span>
                                              <span>₹{ cart_Total}</span>
                                  </div>

                                  <div className='flex justify-center h-auto bg-[#e42e55] py-3 '>
                                              <button className='uppercase text-white font-semibold text-sm w-full h-full' onClick={() => {
                                                  if (activeAddress) {
                                                     navigate('/payment') 
                                                  } else {
                                                      toast.error('Add Delivery address')
                                                  }
                                                
                                      }}>place order</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>

                  </div>
                  
                  :
                  
                  <div className='flex justify-center items-center h-fit flex-col relative top-10'>
                      <div className='h-72'><img className='h-full' src="/src/images/undraw_undraw_undraw_undraw_undraw_undraw_shopping_bags_2ude_-1-_mnw3_-2-_q7y0_muk6_-2-_l1mh_(2)_m4xj.png" alt="" /></div>
                      <div className='text-2xl font-bold'>Hey, it feels so light!</div>
                      {
                          err === true ? <p className='font-semibold text-md mt-4 text-slate-600'>Please login to add product <button className='h-auto p-1 bg-red-200 rounded-md text-red-500 uppercase ml-3'>Login</button></p> :
                              <p className='font-semibold text-md mt-4 text-slate-600'>There is nothing in your cart. Let's add some items</p>
                          
                      }
                      {
                          err!==true &&  <button className='h-auto py-1 px-4 outline uppercase font-thin mt-5 outline-red-700 text-red-700 outline-2'>Add items from wishlist</button>
                      }
                     
                  </div>
            
          }
          

          {
              cartItems.products.length>0 &&  <Footer/>
          }
         
    </section>
  )
}

export default CartPage