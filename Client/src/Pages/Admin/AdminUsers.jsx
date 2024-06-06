import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader';
import axios from 'axios';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [toggledetails,setToggledetails]=useState(false)


    useEffect(() => {
        axios.get('http://localhost:3333/users')
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(err))
    });

    const viewDetails = (id) => {
      setToggledetails(!toggledetails)
        
    }

  return (
      <section>
          
          <AdminHeader />
          <div className='flex flex-col  mt-2 ml-64  p-2 w-fit '>
              
          <div className='grid grid-cols-5 gap-3 
            break-all relative'>
        
            
            <div className='No uppercase font-medium '><span>No</span></div>
            <div className="Id uppercase font-medium "><span>ID</span></div>
            <div className="Action uppercase font-medium "><span>Name</span></div>
            <div className="Edit uppercase font-medium "><span>Email</span></div>
            <div className="Edit uppercase font-medium "><span>Action</span></div>
                  
                  {
                      users.map((user,index) => (
                          <Fragment key={index}>
                              <div className='No  '><span>{index+1 }</span></div>
                              <div className="Id  "><span>{ user._id}</span></div>
                              <div className="Name  "><span>{user.name }</span></div>
                              <div className="email  "><span>{ user.email}</span></div>
                              <div className="Action  flex space-x-2 gap-2 h-8">
                                  <button className='bg-red-400 h-full px-2 rounded-md'>Block</button>
                                  <button className='bg-sky-300 h-full px-2 rounded-md' onClick={()=>viewDetails()}>View Details</button>
                              </div>
                             
                            
                          </Fragment>

                      ))        
            }
          <div className={toggledetails === true ? 'h-96 w-1/2 outline backdrop-blur-sm absolute left-1/2 -translate-x-2/4 top-12' : 'hidden'}>
            
            
                      
                </div>
         
              

          </div> 
          </div>
   </section>
  )
}

export default AdminUsers