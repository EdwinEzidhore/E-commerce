import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader';
import axios from 'axios';

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3333/users')
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(err))
    });

  return (
      <section>
          
          <AdminHeader />
          <div className='flex flex-col  mt-2 ml-64  p-1'>
              
          <div className='grid grid-cols-5 gap-3 
            break-all'>
        
            
            <div className='No uppercase font-medium '><span>No</span></div>
            <div className="Id uppercase font-medium "><span>ID</span></div>
            <div className="Action uppercase font-medium "><span>Name</span></div>
            <div className="Edit uppercase font-medium "><span>Email</span></div>
            <div className="Edit uppercase font-medium "><span>Action</span></div>
                  
                  {
                      users.map((user,index) => (
                          <>
                              <div className='No  '><span>{index+1 }</span></div>
                              <div className="Id  "><span>{ user._id}</span></div>
                              <div className="Name  "><span>{user.name }</span></div>
                              <div className="email  "><span>{ user.email}</span></div>
                              <div className="Action  ">
                                  <button className='bg-red-400 h-auto'>Block</button>
            </div>
                              
                          </>
                      ))
                  
            }
          
         
              

          </div> 
          </div>
   </section>
  )
}

export default AdminUsers