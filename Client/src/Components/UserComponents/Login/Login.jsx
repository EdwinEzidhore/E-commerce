import React, { useState } from 'react'
import styles from '../../../Styles/Styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Redux/Auth/Auth';
import ButtonLoading from '../Loading/ButtonLoading';
import { base_url } from '../../../Config';


function Login() {
    const [logininfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [btnLoading, setBtnLoading] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setLoginInfo((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true)
        await axios.post(`${base_url}/api/v2/login`, logininfo, { withCredentials: true })
            .then((res) => {
                if (res.data.success == true) {
                   
                    dispatch(setUser(res.data.user));
                    toast.success('Login Success');
                    navigate('/');
                    setLoginInfo({
                        email: '',
                        password: '',
                    });
                    setBtnLoading(false)
                }
            })
            .catch(err => {
               console.log(err);
                toast.error(err.response.data.message);
                setBtnLoading(false)
            });
        
    };
    
  return (
      <div className='min-h-screen bg-[#0d1b2a] flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <Toaster reverseOrder={ false} />
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
              <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Login</h2>
          </div>

          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
              <div className=' py-8 px-4 shadow-[] shadow-lg sm:rounded-lg sm:px-10  '>
                  <form action="" className='space-y-5' onSubmit={handleSubmit}>
                      <div>
                          
                          <label htmlFor="email" className='block text-sm font-medium text-slate-500 font-sans'>Email address</label>
                          <div className='mt-1'>
                          <input className='appearence-none  block w-full px-3 py-2 border-[#ae1b1b] rounded-md  placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold font-sans tracking-wide ' type="email"
                              name='email' autoComplete='email' required placeholder='email' value={logininfo.email} onChange={handleChange}/>
                      </div>
                      </div>
                      <div>
                          
                          <label  htmlFor="password" className='block text-sm font-medium text-slate-500 font-sans'>Password</label>
                          <div className='mt-1'>
                          <input autoComplete='off' className='appearence-none  block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold font-sans tracking-wide' type="password"
                              name='password'  required placeholder='password' value={logininfo.password} onChange={handleChange}/>
                              
                              
                      </div>
                      </div>
                      <div className={`${styles.normalFlex} justify-end`}>
                          {/* <div className={`${styles.normalFlex}`}>
                              <input type="checkbox" name='remember-me ' id='remeber-me' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                              <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>RememberMe</label>
                          </div> */}

                          <div className='text-sm'>
                              <a href="/forgot-password" className='font-medium hover:text-blue-500 text-white'>forgot password</a>
                          </div>

                      </div>
                      <div>
                          <button type='submit' className='group  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>{btnLoading?<ButtonLoading/>:'Submit' }</button>
                      </div>
                      <div className={`${styles.normalFlex} w-full`}>
                          <h4 className='text-slate-400'>Don't have an account?</h4>
                          <Link to="/signup" className='text-blue-600 hover:text-sky-400'>Sign up</Link>
                         
                      </div>
                      
                  </form>
              </div>
          </div>

    </div>
  )
}


export default Login