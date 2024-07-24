import React, { useEffect, useRef, useState } from 'react'
import '../../../index.css'
import toast, { Toaster } from 'react-hot-toast';
import { isNaN } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ButtonLoading from '../Loading/ButtonLoading';
import { base_url } from '../../../Config';


function OTPPage({generateOTP}) {

    
    const [OTP, setOTP] = useState(['', '', '', '']);
    const [combinedOTP, setCombinedOTP] = useState('');

    const [btnLoading, setBtnLoading] = useState(false);

    const inputref = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputref.current[0]) {
            inputref.current[0].focus()
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        
        const newOtp = [...OTP]
        newOtp[index] = value.substring(value.length - 1);
        setOTP(newOtp)
      
        const combinedOtp = newOtp.join('');
        setCombinedOTP(combinedOtp);
        if (value && index < OTP.length - 1 && inputref.current[index+1]) {
            inputref.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputref.current[index].setSelectionRange(1, 1)
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newOtp = [...OTP];
            newOtp[index] = '';
            setOTP(newOtp);
            if (index > 0) {
                inputref.current[index - 1].focus();
            }
        }
    };

    const verifyOtp = () => {
        setBtnLoading(true);
        axios.get(`${base_url}/api/v2/verify-otp/?OTP=${combinedOTP}`)
            .then((res) => {
               
                if (res.status === 201 && res.data.success === true) {
                    navigate('/reset-password');
                    setBtnLoading(false)
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 400) {
                    toast.error(err.response.data.msg);
                    
                }
                setBtnLoading(false);
            });
    }

  return (
      <div className=' flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
 
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-[white]'>Recover Password</h2>
          </div>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'><h4 className='mt-6 text-center text-sm  text-slate-500'>Enter the  OTP sent to your e-mail</h4></div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
              
            
                      
                      <div className='card shadow-[] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10  '>
        <form action="" method="post">
          <div className="flex flex-col space-y-12">
                          <div className="flex flex-row items-center justify-between gap-3 mx-auto w-full max-w-xs">
                              {
                                  OTP.map((otp, index) => (
                                    <div className="w-16 h-16 " key={index}>
                                          <input key={index} ref={(input) => (
                                              inputref.current[index] = input
                                          )}
                                              className="text-white bg-[#0d1b2a] w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl   text-xl font-semibold   focus:ring-1 focus:ring-white shadow-[black] shadow-inner "
                                              value={otp}
                                              type="text"
                                              id=""
                                             
                                              onChange={(e) => handleChange(index, e)}
                                              onClick={() => handleClick(index)}
                                              onKeyDown={(e)=>handleKeyDown(index,e)}
                                          />
                                  </div>
                                  ))
                              }

            </div>

            <div className="flex flex-col space-y-5">
                              <div>
                                  {btnLoading? <div className='flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm'><ButtonLoading/></div>:<button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={(e) => {
                                      e.preventDefault()
                                      verifyOtp()
                                  }
                                  }>
                  Verify Account
                </button> }
                                  
              </div>

              
            </div>
          </div>
                  </form>
                  <div className="mt-2 flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <button className="flex flex-row items-center text-blue-600" onClick={generateOTP}>Resend</button>
              </div>
                  </div>
              
             

             
          </div>

    </div>
  )
}


export default OTPPage;