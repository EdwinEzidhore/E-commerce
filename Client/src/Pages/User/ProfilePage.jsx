import React, { useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Footer from '../../Components/UserComponents/Footer/Footer'
import UserInformation from '../../Components/UserComponents/Profile/UserInformation';
import Address from '../../Components/UserComponents/Profile/Address';

const ProfilePage = () => {
    const [active, setActive] = useState('profile');
    return (
           
        <section>
            <div className='sticky top-0 backdrop-blur-xl'><Nav /></div>
          
          <div className='mx-auto container   bg-slate-100 p-1'>
                <div className='grid grid-cols-12 '>
                   
                  <div className='grid col-span-2 h-fit'> 
                      <div className="user flex items-center p-3 mb-4 shadow-lg bg-white">
                          <img className='h-10' src="/src/images/man.png" alt="" />
                          <span className='ml-2'>Edwin Ezidhore</span>
                      </div>

                        <div className=' shadow-lg bg-white p-2'>
                        <div className='flex my-4 '>
                            <div><box-icon name='package' type='solid' color='#135D66'></box-icon></div>
                                <div className='ml-2  uppercase text-slate-500 font-semibold'>My Orders</div>
                                
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
                              <li className='my-3'>PAN Information</li>
                              
                          </ul>
                          </div>
                          
                            </div>
                            <hr />
                      <div className=''>
                                <div className='flex uppercase text-slate-500 font-semibold my-4'>
                                <box-icon name='wallet-alt' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2'>Payments</span>
                                </div>
                          <div className='ml-7'>
                             
                              <ul className='mb-6'>
                              <li className='my-3'>Gift Cards</li>
                              <li className='my-3'>Saved UPI</li>
                              <li className='my-3'>Saved Cards</li>
                              
                          </ul>
                          </div>
                          
                            </div>
                            <hr />
                      <div className=''>
                                <div className='flex text-slate-500 font-semibold uppercase my-4'>
                                <box-icon name='folder' type='solid' color='#135D66' ></box-icon>
                                    <span className='ml-2'>My Stuff</span>
                                </div>
                          <div className='ml-7'>
                              
                              <ul className='mb-6'>
                                <li className='my-3'>My Coupons</li>
                                <li className='my-3'>My Reviews and Rating</li>
                                <li className='my-3'>All Notification</li>
                                <li className='my-3'>My Whishlist</li>
                                  
                              
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
                        {active==='Address' && <Address/>}


                  </div>

              </div>
          </div>
          <Footer/>
      </section>
     
     
  )
}

export default ProfilePage