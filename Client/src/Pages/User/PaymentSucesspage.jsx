import React from 'react'
import {useNavigate} from 'react-router-dom';

const PaymentSucesspage = () => {
  const navigate = useNavigate();
  
  return (
    <div>PaymentSucesspage
      <button onClick={()=>navigate('/')} className='h-auto p-2 bg-red-700 text-white'>button</button>
    </div>
  )
}

export default PaymentSucesspage