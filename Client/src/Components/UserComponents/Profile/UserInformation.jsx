import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import {toast, Toaster } from 'react-hot-toast';
import UpdateMail from '../Modal/UpdateMail';
import ButtonLoading from '../Loading/ButtonLoading';
import { base_url } from '../../../Config';
import { useSelector } from 'react-redux';


const UserInformation = () => {

    const [user, setUser] = useState();
    const [per_button, setper_Button] = useState(false);
    const [email_btn, setEmail_btn] = useState(false);
    const [mobile_btn, setMobile_btn] = useState(false);
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userBtnloading, setuserBtnloading] = useState(false);
    const [emailBtnloading, setemailBtnloading] = useState(false);


    const isUser = useSelector((state) => state.auth.auth.user);
    const [modalOpen, setModalOpen] = useState(false)
    
    useEffect(() => {
        getUserInfo()
    },[])


    const getUserInfo = () => {
        axios.get(`${base_url}/api/v2/getUserInfo`, { withCredentials: true })
        .then(res => {
        
            setUser(res.data.user_details)
            setName(res.data.user_details.name);
            setEmail(res.data.user_details.email)
            
        })
        .catch(err => console.log(err))
    }
 
    const validateInput = () => {
    
        if (!Name || Name.length < 3) {
            toast.error("Username must be at least 3 characters long.");
            return false;
        }
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        return true;

    };

    const edituser = (e) => {
        e.preventDefault();
        setuserBtnloading(true)
        setemailBtnloading(true)

        if (!validateInput()) {
            setuserBtnloading(false);
            setemailBtnloading(false)
            return;
        } 

        const { name } = e.target;


        let url = `${name}=`
        if (name === 'name') {
            url = `${name}=${Name}`
        }
        if (name === 'email') {
            url=`${name}=${email}`
        }
       
        axios.post(`${base_url}/api/v2/edit/?${url}`, {},{withCredentials:true})
            .then((res) => {
                if (res.status === 201 && res.data.success === true) {
                    getUserInfo();
                    setper_Button(false);
                    setuserBtnloading(false);
                    setemailBtnloading(false)
                }
                if (res.status === 200) {
                    setModalOpen(true);
                    setemailBtnloading(false);
                    setuserBtnloading(false);
                }
                
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 400) {
                    toast.error(err.response.data.msg)
                }
            })
    };
    
    const closeModal = () => {
        setEmail_btn(false);
        setModalOpen(false);
        setemailBtnloading(false);
    }


    const verifyOTP = (code) => {
        if (code) {
                axios.get(`${base_url}/api/v2/verify-otp/?OTP=${code}`)
                    .then((res) => {
                       
                        if (res.status === 201 && res.data.success === true) {    
                            updateEmail();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                            toast.error(err.response.data.msg)
                        }
                    });
            }    
    };

    const updateEmail = () => {
        axios.post(`${base_url}/api/v2/update-email`,  {email} , { withCredentials: true })
            .then((res) => {
                if (res.status === 201 && res.data.success === true) {
                    toast.success('Email address updated..');
                    setModalOpen(false);
                    getUserInfo();
                    setEmail_btn(false);
            }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error('unexpected error!');
                }
        })
    }
    return (
        <div>
            <Toaster reverseOrder={false } />
           <div className='sm:block md:hidden sm:py-0'><Nav/></div>
           <div className='sm:px-4 md:p-4 sm:py-2 '>
           <form action="">
                          <div className='mb-5'>
                            <div className='sm:pb-2 md:py-4 my-2'>
                      <span className='md:text-xl font-medium'>Personal Information</span>
                      {
                                isUser && (
                                    per_button === false  ? <button className='ml-7 text-sky-500' onClick={(e) => {
                                        e.preventDefault();
                                        setper_Button(!per_button);
                                        setName('')
          
                                    }}><span className='sm:text-sm md:text-base'>Edit</span></button> : <button className='ml-7 text-sky-500' onClick={(e) => {
                                        e.preventDefault();
                                            setper_Button(false);
                                            setName(user.name);
                                            
                                     }}><span>cancel</span></button>
                        )  
                      }
                      
                            </div>
                            <div className='flex gap-2'>
                            <input className='p-2 outline outline-1 outline-slate-300 mx-2 text-slate-600 font-poppins tracking-wide' id='name' type="text" disabled={per_button === false} value={Name} onChange={(e) => {
                                setName(e.target.value);
                      }}/>

                      {
                                per_button === true ? <div className='md:ml-7 h-auto bg-[#1c7293] font-semibold rounded-md text-white flex  w-20 items-center justify-center'>{userBtnloading?<ButtonLoading/>: <button className='p-2 w-full' id='name' name='name'  onClick={(e)=>edituser(e)}>Save</button>}</div>:''
                      }
                           
                            </div>
                          </div>
                         
                          {/* <div className='my-7'>
                              <span className='py-2 sm:text-sm text-base'>Your Gender</span>
                              <div className='flex space-x-3 gap-4 my-5'>
                                  <div className='flex gap-2'>
                                  <input id='male' type="Checkbox" className=''/>
                                  <label htmlFor="male " className='sm:text-sm md:text-base'>Male</label>
                                  </div>
                                  <div className='flex gap-2'>
                                  <input id='female' type="Checkbox" />
                                  <label htmlFor="female" className='sm:text-sm md:text-base'>Female</label>
                                  </div>
                                  
                              </div>
                          </div> */}

                          <div className='mb-7'>
                              <div className='flex py-4 items-center my-2'>
                      <div><span className='md:text-xl font-medium'>Email Address</span></div>
                      {
                                isUser && (
                                    email_btn === false  ? <button className='ml-7 text-sky-500' onClick={(e) => {
                                        e.preventDefault();
                                        setEmail_btn(!per_button);
                                        setEmail('');
                                    }}><span className=' sm:text-sm md:text-base'>Edit</span></button> : <button className='ml-7 text-sky-500' onClick={(e) => {
                                        e.preventDefault();
                                            setEmail_btn(false);
                                            setEmail(user.email)
                                     }}><span>cancel</span></button>
                        )  
                      }

                              </div>
                              <div>
                                  <div className='flex'>
                                <div><input type="email" className='p-2 outline outline-1 outline-slate-300 mx-2 md:w-72 text-slate-600' disabled={!email_btn} value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                          }}/></div>
                          {
                                    email_btn === true ? <div className='md:ml-7 h-auto bg-[#1c7293] font-semibold rounded-md text-white flex  w-20 items-center justify-center'>{ emailBtnloading?<ButtonLoading/>:<button className='p-2 w-full' name='email' onClick={(e)=>edituser(e)}>Save</button>}</div>:''
                      }

                                {modalOpen && <UpdateMail closeModal={closeModal} verifyOTP={verifyOTP} />}
                                  </div>                               
                              </div>
                          </div>

                          {/* <div className='mb-5'>
                              <div className='flex items-center py-4 my-2'>
                      <div><span className='md:text-xl font-medium'>Mobile Number</span></div>
                      {
                          mobile_btn === false ? <button className='ml-7 text-sky-500' onClick={(e) => {
                              e.preventDefault();
                              setMobile_btn(!per_button);
                          }}><span className='sm:text-sm md:text-base'>Edit</span></button> : <button className='ml-7 text-sky-500' onClick={(e) => {
                              e.preventDefault();
                              setMobile_btn(false);
                           }}><span>cancel</span></button>
                      }

                              </div>
                              <div>
                                  <div className='flex items-center '>
                                  <div><input type="text" className='p-2 outline outline-1 outline-slate-300 mx-2 ' /></div>
                                  {
                          mobile_btn===true? <div className='ml-7 h-auto bg-[#135D66] text-white flex p-2 w-20 justify-center'><button>Save</button></div>:''
                      }
                                  </div>                               
                              </div>
                          </div> */}

                      </form>

                      <div>
                          <div className='font-semibold mb-6'>FAQ's</div>
                          <h4 className='font-semibold sm:my-1 md:my-2 md:text-base sm:text-sm'>What happens when I update my email address (or mobile number)?</h4>
                          <p className='md:mt-4 text-slate-700 md:text-base sm:text-xs'>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                          <h4 className='font-semibold sm:my-2 md:my-3 md:text-base sm:text-sm'>When will my  account be updated with the new email address (or mobile number)?</h4>
                          <p className='md:mt-4 text-slate-700 md:text-base sm:text-xs'>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                          <h4 className='font-semibold my-3 md:text-base sm:text-sm'>What happens to my existing  account when I update my email address (or mobile number)?</h4>
                          <p className='md:mt-4 text-slate-700 md:text-base sm:text-xs'>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                          <h4 className='font-semibold my-3 md:text-base sm:text-sm'>Does my Seller account get affected when I update my email address?</h4>
                          <p className='md:mt-4 text-slate-700 md:text-base sm:text-xs'>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>

                          
                      </div>
            </div> 
            <div className='sm:block md:hidden'><Footer/></div>
      </div>
      
  )
}

export default UserInformation