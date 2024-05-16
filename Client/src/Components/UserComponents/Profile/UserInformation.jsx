import React from 'react'

const UserInformation = () => {
  return (
      <div className='p-4'>
           <form action="">
                          <div className='mb-5'>
                            <div className='py-4 my-2'>
                                <span className='text-xl font-medium'>Personal Information</span>
                                <button className='ml-7 text-sky-500'><span>Edit</span></button>
                            </div>
                            <div className='flex gap-2'>
                                <input className='p-2 outline outline-1 outline-slate-300 mx-2 ' type="text" />
                            <input className='p-2 outline outline-1 outline-slate-300 mx-2 ' type="text" />
                            <div className='ml-7 h-auto bg-[#135D66] text-white flex p-2 w-20 justify-center'><button>Save</button></div>
                            </div>
                          </div>
                         
                          <div className='my-7'>
                              <span className='py-2 m'>Your Gender</span>
                              <div className='flex space-x-3 gap-4 my-5'>
                                  <div className='flex gap-2'>
                                  <input id='male' type="Checkbox" className=''/>
                                  <label htmlFor="male">Male</label>
                                  </div>
                                  <div className='flex gap-2'>
                                  <input id='female' type="Checkbox" />
                                  <label htmlFor="female">Female</label>
                                  </div>
                                  
                              </div>
                          </div>

                          <div className='mb-7'>
                              <div className='flex py-4 items-center my-2'>
                                <div><span className='text-xl font-medium'>Email Address</span></div>
                                <div className='ml-7 text-sky-500'><button>Edit</button></div> 
                              </div>
                              <div>
                                  <div className='flex'>
                                  <div><input type="email" className='p-2 outline outline-1 outline-slate-300 mx-2 w-60' /></div>
                                  <div className='ml-7 h-auto bg-[#135D66] text-white flex p-2 w-20 justify-center'><button>Save</button></div>
                                  </div>                               
                              </div>
                          </div>

                          <div className='mb-5'>
                              <div className='flex items-center py-4 my-2'>
                                <div><span className='text-xl font-medium'>Mobile Number</span></div>
                                <div className='ml-7 text-sky-500'><button>Edit</button></div> 
                              </div>
                              <div>
                                  <div className='flex items-center '>
                                  <div><input type="text" className='p-2 outline outline-1 outline-slate-300 mx-2 ' /></div>
                                  <div className='ml-7 h-auto bg-[#135D66] text-white flex p-2 w-20 justify-center'><button>Save</button></div>
                                  </div>                               
                              </div>
                          </div>

                      </form>

                      <div>
                          <div className='font-semibold mb-6'>FAQ's</div>
                          <h4 className='font-semibold my-2'>What happens when I update my email address (or mobile number)?</h4>
                          <p className='mt-4 text-slate-700'>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                          <h4 className='font-semibold my-3'>When will my  account be updated with the new email address (or mobile number)?</h4>
                          <p className='mt-4 text-slate-700'>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                          <h4 className='font-semibold my-3'>What happens to my existing  account when I update my email address (or mobile number)?</h4>
                          <p className='mt-4 text-slate-700'>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                          <h4 className='font-semibold my-3'>Does my Seller account get affected when I update my email address?</h4>
                          <p className='mt-4 text-slate-700'>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>

                          <button>Deactivate Account</button>
                      </div>
    </div>
  )
}

export default UserInformation