import React, { useState,useEffect } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Footer from '../../Components/UserComponents/Footer/Footer'
import UserInformation from '../../Components/UserComponents/Profile/UserInformation';
import Address from '../../Components/UserComponents/Profile/Address';
import axios from 'axios';
import Orders from '../../Components/UserComponents/Profile/Orders';
import { Link, useNavigate } from 'react-router-dom';
import Wishlist from '../../Pages/User/Wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../Redux/Auth/Auth';
import { logout } from '../../Redux/Address/AddressSlice';
import { cartlogout } from '../../Redux/Cart/CartSlice';
import { FaUserCircle } from "react-icons/fa";
import ScrollToTop from '../../Components/UserComponents/ScrollToTop';
import { base_url } from '../../Config';
import Coupons from '../../Components/UserComponents/Profile/Coupons';

const ProfilePage = () => {
    const [active, setActive] = useState('profile');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isUser = useSelector((state) => state.auth.auth.user);

    useEffect(() => {
        axios.get(`${base_url}/api/v2/getUserInfo`, { withCredentials: true })
            .then(res => {
                
                setUser(res.data.user_details);
                
                
                
            })
            .catch(err => console.log(err)) 
    }, []);

    const handleLogOut = () => {
        axios.get(`${base_url}/api/v2/logout`,{withCredentials:true})
            .then((res) => {
               
                if (res.status === 200 && res.data.success === true) {
                    dispatch(logOutUser());
                    dispatch(logout());
                    dispatch(cartlogout());
                }
            })
            .catch((err) => {
            console.log(err);
        })
    }

    return (
           
        <section>
            <ScrollToTop dependency={isUser}/>
            <div className='sm:hidden  md:block sm:bg-white lg:sticky top-0   lg:bg-transparent lg:backdrop-blur-xl z-10'><Nav /></div>
          
          <div className=' mx-auto  lg:container   bg-slate-100 p-1'>
                <div className='grid  md:grid-cols-12 h-screen'>
                   
                    <div className='sm:hidden md:block md:col-span-3 xl:col-span-2 '>
                        {
                            isUser  && (
                                <div className="sm:hidden  user md:flex items-center p-3 mb-4 shadow-lg bg-white">
                                    { isUser.avatar? <div><img className='max-h-10 rounded-full' src={user && `${base_url}/${user.avatar.url}`} alt="" /></div>:<FaUserCircle  className='text-xl'/> }
                                  <span className='ml-2 cursor-default font-poppins tracking-wide'>{user.name }</span>
                            </div>
                            ) 
                    }    


                        <div className=' shadow-lg bg-white p-2  h-full'>
                        <div className='flex my-4 '>
                            
                                
                                <button className='flex' onClick={()=>setActive('orders')}><box-icon name='package' type='solid' color='#135D66'></box-icon><span className='ml-2  uppercase text-slate-500 font-semibold flex items-center'>My Orders</span></button>
                                
                               
                                
                            </div>
                            <hr />
                      <div className=''>
                                <div className='flex uppercase text-slate-500 font-semibold my-4'>
                                <box-icon name='user' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2 cursor-default'>Account Setting</span>
                                </div>
                          <div className='ml-7 font-poppins'>
                             
                              <ul className='mb-6'>
                             <li className='my-3'><button onClick={()=>{setActive('profile')}} className={active==='profile'? 'text-sky-500':''}>Profile Information</button></li>
                              <li className='my-3'><button onClick={()=>setActive('Address')} className={active==='Address'?'text-sky-500':''}>Manage Address</button></li>
                                        
                              
                          </ul>
                          </div>
                          
                            </div>
                            <hr />
                            <div className=''>
                                <div className='flex text-slate-500 font-semibold uppercase my-4'>
                                <box-icon name='folder' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2 cursor-default'>My Stuff</span>
                                </div>
                          <div className='ml-7'>
                              
                              <ul className='mb-6 font-poppins'>
                                        <li className='my-3'><Link onClick={()=>{setActive('coupon')}} className={active==='coupon'? 'text-sky-500':''} >My Coupons</Link></li>
                                        <li className='my-3'><Link  to={'/wishlist'}>My Wishlist</Link></li>

                               
                                  
                              
                          </ul>
                                </div>
                                <hr />
                          
                            </div >  

                      {/* <div className=''>
                                <div className='flex uppercase text-slate-500 font-semibold my-4'>
                                <box-icon name='wallet-alt' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2 cursor-default'>Payments</span>
                                </div>
                          <div className='ml-7'>
                             
                              <ul className='mb-6'>
                              <li className='my-3'><a href="/maintenance">Gift Cards</a></li>
                              <li className='my-3'><a href="/maintenance">Saved UPI</a></li>
                              <li className='my-3'><a href="/maintenance">Saved Cards</a></li>
                              
                          </ul>
                          </div>
                          
                            </div> */}
                            {/* <hr />
                      <div className=''>
                                <div className='flex text-slate-500 font-semibold uppercase my-4'>
                                <box-icon name='folder' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2 cursor-default'>My Stuff</span>
                                </div>
                          <div className='ml-7'>
                              
                              <ul className='mb-6'>
                                <li className='my-3'><a href="/maintenance">My Coupons</a></li>
                                <li className='my-3'><a href="/maintenance">My Reviews and Rating</a></li>
                                <li className='my-3'><a href="/maintenance">All Notification</a></li>
                               
                                  
                              
                          </ul>
                                </div>
                                <hr />
                          
                            </div >  */}
                            {
                                isUser ? (
                                    <div className=' p-4 text-slate-500'>
                           
                                    <button className='flex items-center ml-2 font-poppins' onClick={handleLogOut}> <box-icon name='power-off' color='#135D66' ></box-icon>LogOut</button>
                                </div>
                                ) : (
                                        ''
                                )
                            }
                         

                        </div>
                      
                  </div>

                  <div className=' sm:block md:ml-2 lg:ml-3 grid md:col-span-9 xl:col-span-10 bg-white shadow-lg '>
                        {active === 'profile' && <UserInformation />}
                        {active === 'Address' && <Address />}
                        {active === 'orders' && <Orders />}
                        {active==='coupon' && <Coupons/>}
                        


                  </div>

              </div>
            </div>
            
            
          <div className='sm:hidden md:block'><Footer/></div>
      </section>
     
     
  )
}

export default ProfilePage