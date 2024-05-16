import React from 'react'

const Address = () => {
  return (
    <div className='p-6 '>
      <div><span className='text-xl font-semibold'>Manage Addresses</span></div>
      <div className='mt-5 p-5 border w-fit pr-52 bg-[#E3FEF7]'>
        <form action="">
          <div className='flex justify-between space-x-4 gap-4'>
            <input type="text" className='p-2 outline outline-1 outline-slate-300 ' placeholder='Name' />
            <input type="number" className='p-2 outline outline-1 outline-slate-300  ' placeholder='10-digit mobile number'/>
          </div>

          <div className='flex justify-between my-5'>
            <input type="text" className='p-2 outline outline-1 outline-slate-300  ' placeholder='pincode'/>
            <input type="text" className='p-2 outline outline-1 outline-slate-300  ' placeholder='Locality'/>

          </div>
          <div className='mb-5'>
            <input type="text" className='p-2 outline outline-1 outline-slate-300  w-full h-24 '/>
          </div>

          <div className='flex justify-between my-5 gap-4 space-x-4'>
            <input type="text" className='p-2 outline outline-1 outline-slate-300  ' placeholder='city/district/town' />
          
            <select name="city" id="" placeholder='Select state' className='p-2 outline outline-1 outline-slate-300  w-full  '>
            <option value="">select State</option>
              <option value="Available">Available</option>
              <option value="OutOfstock">Out Of stock</option>
          </select>
          </div>

          <div className='mb-5 flex gap-4 space-x-4'>
            <input type="text" className='p-2 outline outline-1 outline-slate-300  ' placeholder='Landmark(optional)'/>
            <input type="text" className='p-2 outline outline-1 outline-slate-300  ' placeholder='Alternate Phone(optional)'/>
          </div>
          <div>
            <span className='text-sm text-slate-500 '>Address Type</span>
            <div className='my-4 flex space-x-4'>
              <div className='flex gap-2'>
              <input type="checkbox" id='work'/>
              <label htmlFor="work">Work</label>
              </div>
              <div className='flex gap-2'>
              <input type="checkbox" id='home'/>
              <label htmlFor="home">Home</label>
              </div>
            
            </div>
          </div>
          <div className='h-fit bg-[#135D66] w-24 text-white flex justify-center p-2 font-semibold my-4'>
            <button>Save</button>
            
          </div>
        </form>      
      </div>

      <div className='border mt-5 p-5 w-fit pr-40'>
        <span className='h-fit bg-slate-100 p-1 text-slate-500 text-sm '>Home</span>
        <div className='flex gap-3 space-x-4 font-semibold my-3'>
          <span>Edwin</span>
          <span>8129124699</span>
         
        </div>
        <div>
        <span>253, Ac canal road kalavoor, Alappuzha, Kerala - <span className='font-semibold'>688538</span></span>
        </div>
      </div>
    </div>
  )
}

export default Address