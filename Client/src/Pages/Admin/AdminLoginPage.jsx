import axios from 'axios';
import React, { useContext, useState } from 'react'
// import { toast  } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../Config';
import { Toaster ,toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setstatus } from '../../Redux/Auth/AdminAuth';


const AdminLoginPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [AdminInfo, setAdminInfo] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setAdminInfo((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    };

    const HandleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(`${base_url}/Admin`, AdminInfo,)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setstatus(true));
                    
                    setAdminInfo({
                        email: '',
                        password: '',
                    });
                    navigate('/Admin-Home');
                    toast.success(res.data.message);
                }    
            })
            .catch(err => { 
                if (err.response.status === 404) {
                    toast.error('Invalid credentials');
                } else {
                    toast.error('Error')
                }
            })
    };

    return (
        <div>
          
            <div className='h-screen bg-[#0d1b2a] flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <Toaster/>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>Login</h2>
    </div>

    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-[] shadow-md'>
        <div className='py-8 px-4 shadow-sm:rounded-lg sm:px-10'>
            <form action="" className='space-y-5' onSubmit={HandleSubmit}>
                <div>
                    
                    <label htmlFor="email" className='block text-sm font-medium text-slate-500'>Email address</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#dfd6d6] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' type="email"
                        name='email' autoComplete='email' required placeholder='email' value={AdminInfo.email} onChange={handleChange}/>
                </div>
                </div>
                <div>
                    
                    <label htmlFor="password" className='block text-sm font-medium text-slate-500'>Password</label>
                    <div className='mt-1'>
                    <input className='appearence-none bg-[#dfd6d6] block w-full px-3 py-2 border-[#ae1b1b] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' type="password"
                        name='password' autoComplete='current-password' required placeholder='password' value={AdminInfo.password} onChange={handleChange}/>
                        
                        
                </div>
                </div>
              
                <div>
                    <button type='submit' className='group  w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>Submit</button>
                </div>
                
                
            </form>
        </div>
    </div>

</div>
      </div>

  )
}

export default AdminLoginPage