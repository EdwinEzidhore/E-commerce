import React, { useState,useEffect } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Footer from '../../Components/UserComponents/Footer/Footer'
import UserInformation from '../../Components/UserComponents/Profile/UserInformation';
import Address from '../../Components/UserComponents/Profile/Address';
import axios from 'axios';
import Orders from '../../Components/UserComponents/Profile/Orders';

const ProfilePage = () => {
    const [active, setActive] = useState('profile');
    const [user, setUser] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3333/api/v2/getUserInfo`, { withCredentials: true })
            .then(res => {
                
                setUser(res.data.user_details);
                
                
                
            })
            .catch(err => console.log(err)) 
    }, []);


    return (
           
        <section>
            <div className='sticky top-0 backdrop-blur-xl z-10'><Nav /></div>
          
          <div className='mx-auto container   bg-slate-100 p-1'>
                <div className='grid grid-cols-12 '>
                   
                  <div className='grid col-span-2 h-fit'> 
                      <div className="user flex items-center p-3 mb-4 shadow-lg bg-white">
                          <div><img className='max-h-10 rounded-full' src={user && `http://localhost:3333/${user.avatar.url}`} alt="" /></div>
                            <span className='ml-2'>{user.name }</span>
                      </div>

                        <div className=' shadow-lg bg-white p-2'>
                        <div className='flex my-4 '>
                            
                                
                                <button className='flex' onClick={()=>setActive('orders')}><box-icon name='package' type='solid' color='#135D66'></box-icon><span className='ml-2  uppercase text-slate-500 font-semibold flex items-center'>My Orders</span></button>
                                
                               
                                
                            </div>
                            <hr />
                      <div className=''>
                                <div className='flex uppercase text-slate-500 font-semibold my-4'>
                                <box-icon name='user' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2'>Account Setting</span>
                                </div>
                          <div className='ml-7 '>
                             
                              <ul className='mb-6'>
                             <li className='my-3'><button onClick={()=>{setActive('profile')}} className={active==='profile'? 'text-sky-500':''}>Profile Information</button></li>
                              <li className='my-3'><button onClick={()=>setActive('Address')} className={active==='Address'?'text-sky-500':''}>Manage Address</button></li>
                              <li className='my-3'><a href="/maintenance">PAN Information</a></li>
                              
                          </ul>
                          </div>
                          
                            </div>
                            <hr />
                      <div className=''>
                                <div className='flex uppercase text-slate-500 font-semibold my-4'>
                                <box-icon name='wallet-alt' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2'><a href="/maintenance">Payments</a></span>
                                </div>
                          <div className='ml-7'>
                             
                              <ul className='mb-6'>
                              <li className='my-3'><a href="/maintenance">Gift Cards</a></li>
                              <li className='my-3'><a href="/maintenance">Saved UPI</a></li>
                              <li className='my-3'><a href="/maintenance">Saved Cards</a></li>
                              
                          </ul>
                          </div>
                          
                            </div>
                            <hr />
                      <div className=''>
                                <div className='flex text-slate-500 font-semibold uppercase my-4'>
                                <box-icon name='folder' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2'><a href="/maintenace">My Stuff</a></span>
                                </div>
                          <div className='ml-7'>
                              
                              <ul className='mb-6'>
                                <li className='my-3'><a href="/maintenance">My Coupons</a></li>
                                <li className='my-3'><a href="/maintenance">My Reviews and Rating</a></li>
                                <li className='my-3'><a href="/maintenance">All Notification</a></li>
                                <li className='my-3'><a href="/maintenance">My Whishlist</a></li>
                                  
                              
                          </ul>
                                </div>
                                <hr />
                          
                      </div > 
                            <div className='p-4 text-slate-500 flex'>
                            <box-icon name='power-off' color='#135D66' ></box-icon>
                          <button className='ml-2'>LogOut</button>
                      </div>

                        </div>
                      
                  </div>

                  <div className='ml-4 grid col-span-10 bg-white shadow-lg '>
                        {active === 'profile' && <UserInformation />}
                        {active === 'Address' && <Address />}
                        {active==='orders' && <Orders/>}


                  </div>

              </div>
          </div>
          <Footer/>
      </section>
     
     
  )
}

export default ProfilePage