import React from 'react'
import { useNavigate } from 'react-router-dom';
import SuccessLogo from '../../SuccessLogo.json';
import Lottie from 'react-lottie';
import '../../css/style.css'

const PaymentSucesspage = () => {
  const navigate = useNavigate();

  const defaultOptions = {
   
    loop:false,
    autoplay:true,
    animationData: SuccessLogo,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  return (
    <div className='h-screen flex items-center justify-center text-center'>
      <div>
      <Lottie options={defaultOptions}
        height={200}
        width={200}
        />
        <span className='text-xl font-extrabold tracking tracking-wider text-blue-500 font-poppins'>Order Placed</span>
        <br />

        <div className='mt-5'>
          <button onClick={()=>navigate('/')} className='button2'>Continue Shopping</button>
        </div>
        
      </div>
      
    </div>
  )
}

export default PaymentSucesspage