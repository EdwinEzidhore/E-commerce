import React, { useState } from 'react'
import styles from '../../Styles/Styles';
import { Link, Navigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
    const [userinfo, setUserinfo] = useState({
        name: '',
        email: '',
        password:''
    })
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();


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
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        const formData = new FormData();
        formData.append('name', userinfo.name);
        formData.append('email', userinfo.email);
        formData.append('password', userinfo.password);
        formData.append('file',avatar)   
        
        axios.post('http://localhost:3333/api/v2/create-user', formData,config)
            .then(res => { 
                if (res.data.success == true) {
                    navigate("/login");
                    toast.success(res.data.message);
                }
                
                setUserinfo({
                    name: '',
                    email: '',
                    password: '',
                });
                setAvatar(null)
            })
            .catch(err => { 
                toast.error(err.response.data.message);
            });


    };
    
  return (
    <div className='min-h-screen bg-[#786c6c] flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>SignUp</h2>
    </div>

    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10'>
                  <form encType='multipart/form-data' action="/uploads" method='post' className='space-y-5' onSubmit={handleOnSubmit} >
                <div>
                    
                    <label htmlFor="text" className='block text-sm font-medium text-gray-700'>First and last name</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#dfd6d6] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' type="text"
                        name='name' autoComplete='name' required placeholder=' Full Name' value={userinfo.name} onChange={handleChange} />
                </div>
                      </div>
                      
                <div>
                    
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email address</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#dfd6d6] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' type="email"
                        name='email' autoComplete='email' required placeholder='email' value={userinfo.email} onChange={handleChange} />
                        
                </div>
                      </div>
                      
                <div>
                    
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Set password</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#dfd6d6] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' type="password"
                        name='password' autoComplete='current-password' required placeholder='password' value={userinfo.password} onChange={handleChange} />
                        
                </div>
                </div>
               
                      <div>
                          <label htmlFor="file" className='block text-sm font-medium text-gray-700 '></label >
                              <div className='mt-2 flex items-center'>
                                  <span className='inline-block  ml-4 overflow-hidden borderh-9 rounded-full w-9'>
                                      {avatar ? (
                                          <img className='w-9  border-2 rounded-full  border-[#00fd00]' alt='avatar' src={ URL.createObjectURL(avatar)} />) : (
                                          
                                        <RxAvatar className='m-auto h-8 w-5 '/>
                                      )}
                                  </span>
                                  <label htmlFor="fileupload" className={avatar?'ml-2 flex items-center justify-center px-4 py-2 border border-[#42f342e4] rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50':'ml-2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 '}>
                                      <span>Upload profile image</span>
                                      <input type="file" name='file' id='fileupload' accept='.jpg,.png,.jpeg' onChange={imageupload} className='sr-only'/>
                                      </label>
                              </div>
                          
                      </div>
                      
                <div>
                          <button type='submit' className=' group  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700' >Submit</button>
                </div>
                <div className={`${styles.normalFlex} w-full`}>
                    <h4>Already a customer?</h4>
                    <Link to="/login" className='text-blue-600 hover:text-blue-900'>Login In</Link>
                </div>
                
            </form>
        </div>
    </div>

</div>
  )
}

export default Signup