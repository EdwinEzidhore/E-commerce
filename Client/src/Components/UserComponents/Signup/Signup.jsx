import React, { useState } from 'react'
import styles from '../../../Styles/Styles';
import { Link, Navigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast,Toaster } from 'react-hot-toast';
import ButtonLoading from '../Loading/ButtonLoading';
import {base_url} from '../../../Config'

function Signup() {
    const [userinfo, setUserinfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [btnLoading, setBtnloading] = useState(false);

    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const validateInput = () => {
        const { name, email, password } = userinfo;
        
        if (!name || name.length < 3) {
            toast.error("Username must be at least 3 characters long.");
            return false;
        }
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (!password || password.length < 5) {
            toast.error("Password must be at least 5 characters long.");
            return false;
        }
        
        return true;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserinfo((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    };

    const imageupload = (e) => {
        const file = e.target.files[0];
        setAvatar(file)
        
 

    };

    
    const handleOnSubmit = (e) => {
        

        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        const formData = new FormData();
        formData.append('name', userinfo.name);
        formData.append('email', userinfo.email);
        formData.append('password', userinfo.password);
        if (avatar) {
           
            formData.append('file',avatar)   
        }
     
        const loadingToastId = toast.loading('Sending activation mail...');
        
        setBtnloading(true);

        axios.post(`${base_url}/api/v2/create-user`, formData,config)
            .then(res => {
                
                if (res.data.success == true) {
                    navigate("/login");
                    toast.success('success', {
                        id: loadingToastId,
                    });
                    setBtnloading(false)
                }
                
                setUserinfo({
                    name: '',
                    email: '',
                    password: '',
                });
                setAvatar(null)
            })
            .catch(err => { 

                if (err.response.status === 400) {
                    toast.error(err.response.data.message, {
                        id: loadingToastId,
                    });
                    setBtnloading(false)
                }
                if (err.response.status === 500) {
                    toast.error('Something went wrong!', {
                        id: loadingToastId,
                    });
                    setBtnloading(false)
                }                     
            });


    };
    
  return (
      <div className='min-h-screen bg-[#0d1b2a] flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <Toaster reverseOrder={ false} />
                        <div className=' h-fit lg:mb-0 mb-2'>  
                  <div className='text-center tracking-wider text-white'>
                        <span className='text-3xl font-serif font-semibold'>E</span>
                        <span className='font-semibold text-3xl font-frank-lukh'>ZIRE</span>
                  </div>
                  <div className='text-xs text-center'>
                        <span className='md:tracking-widest text-gray-500 font-sans '>FASHION STORE</span>
                  </div>
              </div>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>SignUp</h2>
    </div>

    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className=' shadow-[] py-8 px-4 shadow-lg  rounded-lg sm:px-10'>
                  <form encType='multipart/form-data' action="/uploads" method='post' className='space-y-5' onSubmit={handleOnSubmit} >
                <div>
                    
                    <label htmlFor="text" className='block text-sm font-medium text-slate-500 font-sans'>First and last name</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold' type="text"
                        name='name' autoComplete='name' required placeholder=' Full Name' value={userinfo.name} onChange={handleChange} />
                </div>
                      </div>
                      
                <div>
                    
                    <label htmlFor="email" className='block text-sm font-medium text-slate-500 font-sans'>Email address</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold' type="email"
                        name='email' autoComplete='email' required placeholder='email' value={userinfo.email} onChange={handleChange} />
                        
                </div>
                      </div>
                      
                <div>
                    
                    <label htmlFor="password" className='block text-sm font-medium text-slate-500 font-sans'>Set password</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm font-semibold' type="password"
                        name='password' autoComplete='current-password' required placeholder='password' value={userinfo.password} onChange={handleChange} />
                        
                </div>
                </div>
               
                      <div>
                          <label htmlFor="file" className='block text-sm font-medium text-gray-700 '></label >
                              <div className='mt-2 flex items-center'>
                                  <span className='inline-block  ml-4 overflow-hidden borderh-9 rounded-full w-9'>
                                      {avatar ? (
                                          <img className='w-9  border-2 rounded-full  border-[#00fd00]' alt='avatar' src={ URL.createObjectURL(avatar)} />) : (
                                          
                                        <RxAvatar className='m-auto h-8 w-5 text-white'/>
                                      )}
                                  </span>
                                  <label htmlFor="fileupload" className={avatar?'ml-2 flex items-center justify-center px-4 py-2 border border-[#42f342e4] rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50':'ml-2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 '}>
                                      <span>Upload profile image</span>
                                      <input type="file" name='file' id='fileupload' accept='.jpg,.png,.jpeg' onChange={imageupload} className='sr-only'/>
                                      </label>
                              </div>
                          
                      </div>
                      
                <div>
                        {btnLoading? <div className=' w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'><ButtonLoading/></div>: <button type='submit' className=' group  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700' >Submit</button> } 
                </div>
                <div className={`${styles.normalFlex} w-full`}>
                    <h4 className='text-slate-400'>Already a customer?</h4>
                    <Link to="/login" className='text-blue-600 hover:text-sky-400'>Login In</Link>
                </div>
                
            </form>
        </div>
    </div>

</div>
  )
}

export default Signup