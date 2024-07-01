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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Components/UserComponents/Loading/Loading';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import '../../css/loadingbutton.css'
import { decrement, setCartLength } from '../../Redux/Cart/CartSlice';
import Coupon from '../../Components/UserComponents/Modal/Coupon';

const CartPage = () => {

    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState({products:[]});
    const [loginerr, setLoginErr] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [networkErr, setNetworkErr] = useState(false);
    const [isflipped, setIsflipped] = useState(false);
    const [paymentMethod, setPaymetMethod] = useState('');
    const [availability, setAvailability] = useState(true);
    const [btnLoading, setBtnloading] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);


    const activeAddress = useSelector((state) => state.address.activeAddress);



    useEffect(() => {
        getCartItems();

    }, [selectedCoupon]);
    
    const getCartItems = () => {
        axios.get(`http://localhost:3333/api/v2/getCartItems`, { withCredentials: true })
            .then((res) => {
                console.log(res.data.message);
                if (res.status === 200) {
                    setLoading(false);
                    setCartItems(res.data.cart);
                    setTotalAmount(res.data.total);
                    setDiscount(res.data.discount);
                    setCoupons(res.data.coupons);
                }

               
            })
            .catch(err => {
                const { success, message } = err.response.data;
                const { status } = err.response;
                
                if (success === false && status === 401) {
                    setLoading(false);
                    setLoginErr(true)
                }
                if (success === false && status === 500) {
                    setLoading(false);
                    setNetworkErr(true);
                } 
            });
        }


    const removeItem = (item) => {
        
        
        const user_id = cartItems.userId;
        const item_id = item.productID._id;
       
        axios.delete(`http://localhost:3333/api/v2/?user_id=${user_id}&item_id=${item_id}`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(decrement());
                    setCartItems(res.data.cart);
                    getCartItems();
                }
               
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
                }

            })
            .catch(err => console.log(err))
      
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (paymentMethod) {
            if (paymentMethod === 'online') {
                axios.post('http://localhost:3333/api/v2/cart/checkout', {selectedCoupon},{ withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                        const { data, cart, amount, coupon } = res.data;
                       
                        handlePaymentVerify(data, cart, amount, coupon);
                       
                    })
                    .catch((err) => console.log(err))
            } else if (paymentMethod === 'home') {
                setBtnloading(true)
                axios.post('http://localhost:3333/api/v2/cart/checkout/cod', {activeAddress,selectedCoupon},{withCredentials:true})
                    .then(res => {
                        if (res.status === 200) {
                            navigate('/payment-sucess');
                            setBtnloading(false);
                            dispatch(setCartLength(0));
                        }
                    })
                    .catch(err => console.log(err));
               
            }
            
            
        } else {
            toast.error('Please select a payment method');
        }
    };

    const handlePaymentVerify = async (data,cart,total,coupon) => {
        const options = {
            key: 'rzp_test_IRcArw33YZDUfI',
            amount: data.amount,
            currency: data.currency,
            name: "Edwin",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                  const res = await axios.post('http://localhost:3333/api/v2/verify', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    cart,
                    cart_Total:total,
                    activeAddress,
                    coupon:coupon,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                    const verifyData = res.data;
   
                  if (verifyData.message) {
                    navigate('/payment-sucess');
                      dispatch(setCartLength(0));
                   
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const handlePlaceorderBtn = () => {
        const check_availability = cartItems.products.findIndex((item) => {
            return item.productID.status === 'Unavailable'
        })

        if (check_availability === -1) {
            setIsflipped(!isflipped);
        } else {
            setAvailability(false)
        }
       
    };

    const closeModal = (Coupon,CouponDiscount) => {
        setModalOpen(false);
        setCouponDiscount(CouponDiscount); 
        setSelectedCoupon(Coupon);  
    };

  return (
      <section>
          <div className='sticky top-0 backdrop-blur-xl z-10'><Nav /></div>
          {
              loading && networkErr===false? <div className='h-96 flex items-center justify-center'><Loading /></div> :
              <div className={networkErr===true?'flex flex-col items-center justify-center h-96':'hidden'}>
              <img className='h-20 object-contain' src="/src/images/delete.png" alt="" />
              <span className='text-slate-500 cursor-default'>Check your Network connection</span>
          </div>
          }
          {
              cartItems.products.length >0?
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
                                      
                                     
                                    
                                      <div className='text-sm border   rounded-md  bg-[#1c7293] text-white'><button className='p-1 px-2' onClick={()=>navigate('/Address')}>{activeAddress!=null ?'Change Address':'Add new address'}</button></div>
                                  </div>

                      </div>

                      <div className=' p-1'>
                          {
                              cartItems.products.map((item,index) => (
                                <div className={availability===false && item.productID.status==='Unavailable'?'card flex border p-3 gap-3 mb-1 h-fit relative bg-gray-300 shadow-md   ' :'card flex border p-3 gap-3 mb-1 h-fit relative bg-white shadow-md'} key={index}>
                                <div className='   object-cover flex gap-1'>
  
                                    <div className={availability===false && item.productID.status==='Unavailable'?'grayscale h-f w-32 flex justify-center item-center':' h-f w-32 flex justify-center item-center '}>
                                    <img className='h-full object-cover' src={`http://localhost:3333/${item.productID.productImage[0]}`} alt="" />
                                    </div>
                                    
                                </div>
                                    <div className='w-full'>
                                          <h1 className='text-sm font-semibold'>{item.productID.brand }</h1>
                                      <h4 className='mt-1 w-80'>{item.productID.description }</h4>
                                    <h5 className='text-sm text-slate-500 '>sold by ethinic fashion</h5>
                                    
                                    <div className='flex items-center  space-x-5 mt-3 gap-5 mb-2 '>
                                              <button className='h-auto bg-gray-200  px-2'>size: <span className='font-semibold text-sm me'>{ item.productID.Details.size}</span></button>
                                        <div className='flex items-center gap-3'>
                                                  
                                                      <button className=' p-1.5 flex  outline rounded-full outline-1 outline-slate-500' disabled={selectedCoupon?true:false}  onClick={(e)=>{
                                                            incrementorDecrement('minus',item)
                                                      }
                                                     
                                                      }><FiMinus/></button>
                                                  
                                            <input type="number"
                                                className='bg-slate-200 spinner w-8 text-sm text-center   outline outline-1 outline-slate-500' readOnly value={item.quantity}/>
                                                  
                                                      <button className='flex outline rounded-full outline-1 outline-slate-500 p-1.5' onClick={() => incrementorDecrement('plus', item)}><HiOutlinePlusSm /></button></div>
                                      
                                    </div>
  
                                    <div className='flex gap-2 space-x-1 items-center p-2'>
                                              <h1 className='font-semibold'>₹{  item.productID.sellingPrice}</h1>
                                        <h4 className='text-sm line-through text-slate-500'>₹{  item.productID.originalPrice}</h4>
                                        <h1 className='text-[#25858e]'>70% off</h1>
                                    </div>
  
                                          <div className='flex items-center text-xs justify-between'>
                                              <div className='flex items-center'>
                                              <CgArrowTopRightO />
                                              <p>14 days return available</p>
                                              </div>
                                       
                                              <div><p className={availability===false?'tracking-wide text-red-500 font-semibold scale-105':'tracking-wide text-red-500 font-semibold '}>{item.productID.status==='Unavailable'?'Currently Unavailable!':''}</p></div>
                                          </div>
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
                                              {
                                                  
                                              }
                                      <span className='text-sm font-semibold'>Apply Coupons</span>
                                  </div>
                                  <button className='outline outline-2 outline-[#1c7293]  text-[#1c7293] py-1 px-4 text-sm uppercase hover:bg-[#1c7293] hover:outline-white hover:text-white duration-300' onClick={()=>setModalOpen(!modalOpen)}>Apply</button>
                              </div>
                                      <div className='pl-7 mt-2 text-sm'><p>Getupto ₹200 off on first order</p></div>
                                      {
                                          modalOpen && <Coupon closeModal={closeModal} coupons={coupons} cartTotal={ totalAmount} activeCoupon={selectedCoupon}/>
                                      }
                          </div>

                          <div className="box-2 ">
                              
                              <div className='h-20 my-4 shadow-md'><img className='h-full w-full object-cover' src="/src/images/happy-valentine-s-day-sale-banner-or-promotion-on-blue-background-online-shopping-store-with-mobile-credit-cards-and-shop-elements-illustration-free-vector.jpg" alt="" /></div>
                          </div>

                                  <div className="box-3 border p-4 bg-[#f0f3ff] shadow-lg sticky top-20 h-80">
                                      <div className={isflipped?'hidden':'front h-full'}>
                                      <div className='mb'>
                              <p><span className='uppercase text-sm font-semibold text-slate-800 '>Price details</span><span>({cartItems.products.length} item)</span></p>
                              </div>
                              
                              <div className=' h-fit'>
                                 
                                  <div className='flex justify-between text-sm mb-3  text-[black]'>
                                      <span>Total MRP</span>
                                              <span>₹{ totalAmount}</span>
                                     </div>
                                     <div className='flex justify-between mb-3 text-sm'>
                                      <span>Discount on MRP</span>
                                              <span className='text-[#37c137]'>-₹{ discount}</span>
                                  </div>
                                  <div className='flex justify-between mb-3 text-sm '>
                                                  <span>Coupon Discount</span>
                                                  {
                                                      couponDiscount > 0 ? <span>₹{ couponDiscount}</span> :<button className='text-red-600'>Apply coupon</button>
                                                  }
                                      
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
                                      <span className='uppercase text-sm'>Total Amount</span>
                                              <span>₹{ totalAmount-couponDiscount}</span>
                                  </div>

                                  <div className='flex justify-center h-auto bg-[#1c7293]  '>
                                                  <button className='py-3 uppercase text-white font-semibold text-sm w-full h-full' onClick={() => {
                                                      
                                                      handlePlaceorderBtn();
                                      }}>place order</button>
                                  </div>
                              </div>

                                      </div>
                                      <div className={isflipped?"back h-full  bg-white":'hidden'}>
                                          <div className='flex space-x-3 items-center '>
                                              <button className='text-3xl text-gray-600' onClick={()=>setIsflipped(false)}><IoArrowBackCircleOutline /></button>
                                              <span className='font-semibold text-slate-700'>Payement Method</span>
                                          </div>

                                          <div className='flex flex-col items-center  mt-5 '>
                                             
                                              <div className='my-4 tracking-wide flex items-center space-x-2'>
                                                  <input className='h-4 w-4' type="radio" id='home' name='payment' value="Cash on Delivery" onChange={(e) => {
                                                      setPaymetMethod(e.target.id)
                                                  }}/>
                                                  <label htmlFor="home" className='text-sm font-semibold text-slate-700 font-sans'>Cash on Delivery</label>
                                                  <div>
                                                      <img className='h-9' src="/src/images/cash-on-delivery.png" alt="" />
                                                  </div>
                                              </div>
                                                
                                              <div className=' tracking-wide flex items-center space-x-2'>
                                                  <input className='w-4 h-4' type="radio" id='online' name='payment' value="Online Payment" onChange={(e) => {
                                                      setPaymetMethod(e.target.id);
                                                  }} />
                                                
                                                  <label htmlFor="online" className='font-semibold text-sm font-sans text-slate-700'>Online Payment</label> 
                                                  <div>
                                                      <img className='h-9' src="/src/images/online-payment.png" alt="online" />
                                                 </div>
                                              </div>
                                              
                                              
                                          </div>

                                          <div className='flex justify-center  bg-[#1c7293] mt-10 '>
                                              <button className={btnLoading!==true    ?'py-3 uppercase text-white font-semibold text-sm w-full  h-full ':'hidden'} onClick={(e) => {
                                                  handleCheckout(e)
                                              }}>Proceed</button>
                                              
                                              <div className={btnLoading?"dot-spinner my-2":'hidden'}>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                                <div className="dot-spinner__dot "></div>
                                              </div>
                                              
                                          </div>

                                          
                                      </div>

                          </div>
                      </div>
                  </div>
                </div>

                  </div>
                  
                  :

                  
                  <div className={loading===false && !networkErr? 'flex justify-center items-center h-fit flex-col relative top-10':'hidden'}>
                  <div className='h-72'><img className='h-full' src="/src/images/undraw_undraw_undraw_undraw_undraw_undraw_shopping_bags_2ude_-1-_mnw3_-2-_q7y0_muk6_-2-_l1mh_(2)_m4xj.png" alt="" /></div>
                  <div className='text-2xl font-bold'>Hey, it feels so light!</div>
                  {
                      loginerr === true ? <p className='font-semibold text-md mt-4 text-slate-600'>Please login to add product <button className='h-auto p-1 bg-red-200 rounded-md text-red-500 uppercase ml-3' onClick={()=>navigate('/login')}>Login</button></p> :
                          <p className='font-semibold text-md mt-4 text-slate-600'>There is nothing in your cart. Let's add some items</p>
                      
                  }
                  {
                      loginerr!==true &&  <button className='h-auto py-1 px-4 outline uppercase font-thin mt-5 outline-red-700 text-red-700 outline-2' onClick={()=>navigate('/wishlist')}>Add items from wishlist</button>
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