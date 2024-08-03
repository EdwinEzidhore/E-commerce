import React, { useEffect, useState } from 'react'
import '../../../index.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OTPPage from './OTP';
import { useDispatch, useSelector } from 'react-redux';
import { setRecoveryMail } from '../../../Redux/Auth/Auth';
import ButtonLoading from '../Loading/ButtonLoading';
import { base_url } from '../../../Config';

function ForgotPassword() {

  
    const [recoveryMail, setRecoverymail] = useState('');
    const [ShowOtpInput, setShowOtpInput] = useState(false);
    const [OTP, setOTP] = useState();

    const [btnLoading, setBtnLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    // const user = useSelector((state) => state.auth.auth.username);
   

    // useEffect(() => {
    //     if (recoveryMail === user) {
    //         generateOTP();
    //         setBtnLoading(false)
    //         setShowOtpInput(true);
    //     }
    // }, [user]);

    const checkEmail = (e) => {
        e.preventDefault();
        setBtnLoading(true)
        axios.get(`${base_url}/api/v2/getUser/?email=${recoveryMail}`)
            .then((res) => {
                if (res.status === 200 & res.data.success === true) {
                   
                    // dispatch(setRecoveryMail(recoveryMail));
                    generateOTP(recoveryMail);
                    setBtnLoading(false)
                    setShowOtpInput(true);
                }
                
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data.msg);
                    setBtnLoading(false);
                }
            })
    };

    const generateOTP = (email) => {
        const loadingToastId = toast.loading('Sending OTP...');

        axios.get(`${base_url}/api/v2/generate-otp/?email=${email}`)
            .then((res) => {
               
                if (res.status === 201) {
                    setOTP(res.data.code);
                    toast.success('OTP sent successfully', {
                        id: loadingToastId,
                    });
                
                }
            })
            .catch((err) => {
            console.log(err);
        })
    }

  return (
      <div className='min-h-screen bg-[#0d1b2a] flex flex-col justify-center  sm:px-6 lg:px-8'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
                        <div className=' h-fit lg:mb-0 mb-2 fixed top-2 left-0 right-0'>  
                  <div className='text-center tracking-wider text-white'>
                        <span className='text-3xl font-serif font-semibold'>E</span>
                        <span className='font-semibold text-3xl font-frank-lukh'>ZIRE</span>
                  </div>
                  <div className='text-xs text-center'>
                        <span className='md:tracking-widest text-gray-500  font-sans '>FASHION STORE</span>
                  </div>
              </div>

          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
              
              {
                  !ShowOtpInput ? (
                      <>
                        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Recover Password</h2>
                </div>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'><h4 className='my-6 text-center text-sm  text-slate-500'>Enter your account E-mail ID</h4></div>
                    <div className='card  py-8 px-4 shadow-[] shadow-lg sm:rounded-lg md:px-10  '>
                    <form action="" className='space-y-5' >
                        <div>
                            
                            <label htmlFor="email" className='block text-sm text-slate-500  mb-2'>E-mail</label>
                            <div className='mt-1'>
                            <input className='appearence-none  block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold' type="email" id='email'
                                name='email' value={recoveryMail} required placeholder='Enter your E-mail address' onChange={(e)=>setRecoverymail(e.target.value)}/>
                        </div>
                        </div>
  
  
                        <div>
                            { btnLoading? <div className='  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 '><ButtonLoading/></div>:<button type='submit' className='group  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700' onClick={(e)=>checkEmail(e)}>Submit</button> }
                        </div>      
                    </form>
                        </div> 
                      </>

                  ) : (
                          <OTPPage generateOTP={ generateOTP} />
                  )
              }
               
          </div>

    </div>
  )
}


export default ForgotPassword;