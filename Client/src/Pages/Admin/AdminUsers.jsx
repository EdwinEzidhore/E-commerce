import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader';
import axios from 'axios';
import { base_url } from '../../Config';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    


  useEffect(() => {
    getUsers();
  }, []);

  

  const getUsers = () => {
    axios.get(`${base_url}/users`)
      .then(res => {
      
        setUsers(res.data.users)
      })
      .catch(err => console.log(err))
  };

    

  const toggleUserBlock = (user) => {
    const user_id = user._id;
    axios.patch(`${base_url}/user_status/?user_id=${user_id}`)
      .then((res) => {
        getUsers();
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
      <section>
          
          <AdminHeader />
          <div className='flex flex-col  mt-2 ml-64  p-2 w-fit '>
              
          <div className='grid grid-cols-6 gap-3 
            break-all relative text-center'>
        
            
            <div className='No uppercase font-medium '><span>No</span></div>
            <div className="Id uppercase font-medium "><span>ID</span></div>
            <div className="Action uppercase font-medium "><span>Name</span></div>
            <div className="Edit uppercase font-medium "><span>Email</span></div>
            <div className="Edit uppercase font-medium "><span>status</span></div>
            <div className="Edit uppercase font-medium text-center"><span>Action</span></div>
                  
                  {
                      users.map((user,index) => (
                          <Fragment key={index}>
                              <div className='No  '><span>{index+1 }</span></div>
                              <div className="Id  "><span>{ user._id}</span></div>
                              <div className="Name  "><span>{user.name }</span></div>
                              <div className="email  "><span>{user.email}</span></div>
                              <div className="email  "><span className={user.status?'font-semibold uppercase tracking-wide text-sky-500':'text-red-500 tracking-wide uppercase font-semibold'}>{ user.status?'Active':'Blocked'}</span></div>
                          
                              <div className="Action  flex space-x-2 gap-2 h-8 place-content-center ">
                            <button className='bg-red-400 h-full px-2 rounded-md ' onClick={(e) => {
                              toggleUserBlock(user)
                            }}>{ user.status?'Block':'UnBlock'}</button>
                                
                              </div>
                             
                            
                          </Fragment>

                      ))        
            }

         
              

          </div> 
          </div>
   </section>
  )
}

export default AdminUsers