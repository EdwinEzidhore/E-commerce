import React from 'react'

const Footer = () => {
  return (
      <div className='bg-slate-50'>
          <section className='container'>
                <footer className=' grid grid-cols-4 p-6 gap-5 font-poppins'>
                    <div className='col-lg-4'>
                      <div className='flex'>
                      <span className='text-2xl font-extrabold text-[#02c39a]'>S</span><span className='text-xl font-bold text-[#00a896]'>hopify</span>
                      <img className='h-6' src="/src/images/icons8-shopping-cart-48.png" alt="" />
                      </div>
                        <div className='my-2'><span className='text-slate-600 uppercase'>Contact</span></div>
                        <div><span className='font font-semibold '>Address</span>:<span className='text-slate-700'> Mentorow Technologies,Kochi</span></div>
                        <div><span className='font-semibold'>Phone</span>:<span className='text-slate-700'> +91 022 2343 23</span></div>
                        <div className='my-4'><span className='uppercase font-semibold '>follow us on</span></div>
                        <div className='flex space-x-2 gap-1'>
                            <box-icon type='logo' name='facebook'></box-icon>
                            <box-icon name='twitter' type='logo' ></box-icon>
                            <box-icon name='instagram-alt' type='logo' ></box-icon>
                            <box-icon name='linkedin' type='logo' ></box-icon>
                            <box-icon name='youtube' type='logo' ></box-icon>
                        </div>
                    </div>

                    <div>
                        <div className='my-2'><span className='uppercase text-slate-600 '>About</span></div>
                        <div className='mt-2'><span>About Us</span></div>
                        <div className='mt-3'><span>Delivery Information</span></div>
                        <div className='mt-3'><span>Privacy Policy</span></div>
                        <div className='mt-3'><span>Terms and Condition</span></div>
                        <div className='mt-3'><span>contact Us</span></div>
                        <div className='mt-3'><span>Support Centre</span></div>
                    </div>
                    <div>
                        <div className='uppercase text-slate-600 my-2'><span>Customer policies</span></div>
                        <div className='mt-3'><span>FAQ</span></div>
                        <div className='mt-3'><span>T&C</span></div>
                        <div className='mt-3'><span>Terms of Use</span></div>
                        <div className='mt-3'><span>Track orders</span></div>
                        <div className='mt-3'><span>Shipping</span></div>
                       
                    </div>

                    <div>
                        <div className='uppercase text-slate-600 my-2'><span>Experience shopify app on mobile</span></div>
                        <div><img className='h-16' src="/src/images/google-play-badge.png" alt="" /></div>
                        <div><img className='h-12 ml-2' src="/src/images/download-on-app-store-png-android-iphone-394.png" alt="" /></div>
                    </div>
                </footer>
            </section>
    </div>
  )
}

export default Footer