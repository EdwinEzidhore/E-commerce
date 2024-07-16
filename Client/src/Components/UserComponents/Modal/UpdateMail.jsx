import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const UpdateMail = ({ closeModal, verifyOTP }) => {
    
    const [code, setcode] = useState('');

    const handlechange = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            return 
        }
        setcode(e.target.value)
       
    }

    const handleVerify = (e) => {
        e.preventDefault();
        if (code.length !== 4) {
            toast.error('Enter valid OTP!')
        }
        verifyOTP(code);
    };

    

  return (
      <div className='modal-wrapper fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-10 '>
          <Toaster reverseOrder={ false} />
          <div className="p-4 modal-container  w-96 bg-[#0d1b2a]  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
              <div>
                  
                      <label className='text-slate-400 text-sm font-poppins tracking-wide ' htmlFor="otp">Enter OTP sent to your e-mail</label>
                      <input autoComplete='off' className='w-full mt-2 py-2 focus:outline-none pl-5 tracking-widest' value={code}   type="text" maxLength={4} onChange={(e)=>handlechange(e)}/>
                
                  <div className='flex justify-evenly mt-5'>
                      <div ><button className='px-5 py-3 bg-blue-700 text-white font-semibold text-sm rounded-md' onClick={closeModal}>Cancel</button></div>
                      <div ><button className='px-5 py-3 bg-blue-700 text-white font-semibold text-sm rounded-md' onClick={(e)=>handleVerify(e)}>verify</button></div>

                  </div>
              </div>
          </div>
    </div>
  )
}

export default UpdateMail