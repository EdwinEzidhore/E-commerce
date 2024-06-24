import React, { useEffect, useState } from 'react'
import axios from 'axios';
import states from '../../../States';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {addAddress,set_active_address,setAddresses,removeAddress} from '../../../Redux/Address/AddressSlice'
const Address = () => {

  const [address, setAddress] = useState({
    name:'',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternate_phone: '',
    address_type:''
   
    
  });
  const [userAddress, setUserAddress] = useState([]);
  const [checked, setChecked] = useState('');
  const [toggleForm,setToggleForm]=useState(false)
  const dispatch = useDispatch()

  const activeAddress = useSelector((state) => state.address.activeAddress);
  

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setAddress((prev) => {
      return {
        ...prev, [name]: value
      }
    });
   
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleForm(false)
    address.address_type = checked;
 

    axios.patch('http://localhost:3333/api/v2/set-address', address, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setUserAddress(res.data.Address)
          dispatch(addAddress(res.data.Address));
          console.log('log',res.data.Address);
          setAddress({
            name:'',
            phone: '',
            pincode: '',
            locality: '',
            address: '',
            city: '',
            state: '',
            landmark: '',
            alternate_phone: '',
            address_type: ''
          });
          setChecked('');
          getAddress();
          
        }
      
      })
      .catch(err => {
        console.log(err);
      });
    
  };

  

  const toggleChange = (event) => {
    const { id } = event.target;
    setChecked(id);
  };


  useEffect(() => {
    getAddress();
    
  },[])
  

    const getAddress = () => {
      axios.get('http://localhost:3333/api/v2/get-address', { withCredentials: true })
        .then((res) => {
        
          setUserAddress(res.data.Address);
          console.log(res.data);
        dispatch(setAddresses(res.data.Address));
        
     
      })
      .catch(err => console.log(err));
    }

 


  const deleteAddress = (address) => {
    const id = address._id;
    // console.log(id);

   
    axios.delete(`http://localhost:3333/api/v2/remove-address/?id=${id}`)
      .then((res) => {
        setUserAddress(res.data.Address);
        dispatch(removeAddress(id));
        getAddress();
        
      })
      .catch((err) => console.log(err));
  };

  const setActiveaddress = (address) => {
    dispatch(set_active_address(address))
  };
 

  return (
    <div className='p-6 '>
      <div className='mb-4'><span className='text-xl font-semibold'>Manage Addresses</span></div>
<hr />
      <div><button onClick={() => {
        setToggleForm(!toggleForm)
      }} className='h-8 bg-sky-300 px-2 rounded-md my-4 text-slate-600 tracking-wider'>{toggleForm===false?'Add New Address':'Cancel'}</button></div>
      <div className={toggleForm===true?'mt-5 p-5 border w-fit pr-52 bg-[#E3FEF7]':'mt-5 p-5 border w-fit pr-52 bg-[#E3FEF7] hidden'}>
        <form action="" onSubmit={handleSubmit}>
          <div className='flex justify-between space-x-4 gap-4'>

          <input type="text" name='name' value={address.name} className='p-2 outline outline-1 outline-slate-300 spinner ' maxLength='20'  placeholder='Name' onChange={handleChange} />
         
            <input type="text" name='phone' value={address.phone} className='p-2 outline outline-1 outline-slate-300 spinner ' maxLength='10'  placeholder='10-digit mobile number' onChange={handleChange} />
          </div>

          <div className='flex justify-between my-5'>
            <input type="text" name='pincode' value={address.pincode} className='p-2 outline outline-1 outline-slate-300  ' placeholder='pincode' onChange={handleChange}/>
            <input type="text" name='locality' value={address.locality} className='p-2 outline outline-1 outline-slate-300  ' placeholder='Locality' onChange={handleChange}/>

          </div>
          <div className='mb-5'>
            <input type="text" name='address' value={address.address} className='p-2 outline outline-1 outline-slate-300  w-full h-24 ' onChange={handleChange}/>
          </div>

          <div className='flex justify-between my-5 gap-4 space-x-4'>

            <select name="state" value={address.state} id="" placeholder='Select state' className='p-2 outline outline-1 outline-slate-300  w-full  ' onChange={handleChange}>
            <option  value="">select State</option>
              {
                    states.map((state) => {
                     return  <option key={state.id} value={state.name}>{ state.name}</option>
                    })
              }
            </select>
            
            <input type="text" name='city' value={address.city} className='p-2 outline outline-1 outline-slate-300  ' placeholder='city/district/town' onChange={handleChange} />
            
          </div>

          <div className='mb-5 flex gap-4 space-x-4'>
            <input type="text" name='landmark' value={address.landmark} className='p-2 outline outline-1 outline-slate-300  ' placeholder='Landmark(optional)' onChange={handleChange}/>
            <input type="text" name='alternate_phone' value={address.alternate_phone}  className='p-2 outline outline-1 outline-slate-300  ' placeholder='Alternate Phone(optional)' onChange={handleChange}/>
          </div>
          <div>
            <span className='text-sm text-slate-500 '>Address Type</span>
            <div className='my-4 flex space-x-4'>
              <div className='flex gap-2'>
              <input type="radio" id='Work' value='Work' name='address_type' checked={checked==='Work'} onChange={toggleChange}/>
              <label htmlFor="Work">Work</label>
              </div>
              <div className='flex gap-2'>
                <input type="radio" id='Home' value='Home' name='address_type' checked={checked==='Home'}    onChange={toggleChange} />
              <label htmlFor="Home">Home</label>
              </div>
            
            </div>
          </div>
          <div className='h-fit bg-[#135D66] w-24 text-white flex justify-center  font-semibold my-4'>
            <button className='w-full p-2'>Save</button>
            
          </div>
        </form>      
      </div>


        {
          userAddress && activeAddress && userAddress.map((user,index) => (
            <div className={activeAddress._id===user._id?'border mt-5 p-5 max-w-full pr-40 relative bg-gray-200 shadow-xl':'border mt-5 p-5 max-w-full pr-40 relative'} key={index}>
            <div className='absolute right-5 flex items-center space-x-2 gap-2'>
                <button className='outline outline-1 px-1 text-sky-700 tracking-wide'  onClick={() => setActiveaddress(user)}>
                  {
                    activeAddress._id===user._id?'Active ':'Set as Active'
                  }
                </button>
              <button className='text-2xl' onClick={()=>deleteAddress(user)}><MdOutlineDeleteOutline /></button>
            </div>

              <span className='h-fit bg-slate-100 p-1 text-slate-500 text-sm '>{ user.addressType}</span>
              <div className='flex gap-3 space-x-4 font-semibold my-3'>
                <span>{user.Name }</span>
                <span>{user.phoneNumber }</span>
               
              </div>

              <div>{user.main_address}</div>
              <div> {user.state} - <span className='font-semibold'>{ user.zipcode}</span></div>
              <div>
                
                <span><span className='text-sm tracking-wide text-gray-400 mr-2 font-semibold'>Landmark :</span>{user.landmark}</span>
              </div>
          </div>
          ))
        

      }
      {
        userAddress.length ==0 && < div className='flex justify-center items-center text-lg tracking-wider text-slate-600'>No saved Address!</div>
      }

     
    </div>
  )
}

export default Address