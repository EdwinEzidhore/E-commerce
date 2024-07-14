import React from 'react'
import { useFormik } from 'formik';
import { Toaster} from 'react-hot-toast'
import { resetPasswordValidation } from '../../../Validators/validate';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function ResetPassword() {

    const user = useSelector((state) => state.auth.auth.username);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password:'',
        },
        validate:resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const pass = values.password;
            axios.post(`http://localhost:3333/api/v2/resetpassword`, { user, pass })
                .then((res) => {
                   
                    if (res.status === 201 && res.data.success === true) {
                        navigate('/login')
                    }
                })
                .catch((err) => {
                console.log(err);
            })
        }
})

  return (
      <div className='min-h-screen bg-[#0d1b2a] flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
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
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Reset Password</h2>
          </div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
              <div className=' py-8 px-4 shadow-[] shadow-lg sm:rounded-lg sm:px-10  '>
                  <form action="" className='space-y-5' onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit(e)
                  }
                  }>
                      <div>
                          
                          <label htmlFor="otp" className='block text-sm font-medium text-slate-500'>Enter new password</label>
                          <div className='mt-1'>
                              <input {...formik.getFieldProps('password')} className='appearence-none  block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold' type="text"
                              name='password' autoComplete='password' required placeholder='password' />
                      </div>
                      </div>

                      <div>
                          
                          <label htmlFor="otp" className='block text-sm font-medium text-slate-500'>Confirm password</label>
                          <div className='mt-1'>
                          <input {...formik.getFieldProps('confirm_password')} className='appearence-none  block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold' type="text"
                              name='confirm_password' autoComplete='confirm password'   placeholder='confirm password'/>
                      </div>
                      </div>

                      <div>
                          <button type='submit' className='group  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>Reset Password</button>
                      </div>
                
                      
                  </form>
              </div>
          </div>

    </div>
  )
}


export default ResetPassword;