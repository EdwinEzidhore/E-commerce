import axios from 'axios'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const Payment = () => {


  const navigate = useNavigate();

 
  const handlecheckout = () => {
    axios.post('http://localhost:3333/api/v2/cart/checkout', { cart_Total }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        handlePaymentVerify(res.data.data,res.data.cart)
      })
      .catch((err) => console.log(err))
  };

  const handlePaymentVerify = async (data,cart) => {
    const options = {
        key: 'rzp_test_IRcArw33YZDUfI',
        amount: data.amount,
        currency: data.currency,
        name: "Edwin",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response) => {
            console.log("response", response)
            try {
              const res = await axios.post('http://localhost:3333/api/v2/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart,
                cart_Total,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

                const verifyData = res.data;

              if (verifyData.message) {
                navigate('/payment-sucess');
                
                toast.success(verifyData.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#5f63b8"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}
  

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='h-96 w-96 border flex flex-col' >

        <button>Cash on Delivery</button>
        <button onClick={()=>handlecheckout()}>Online payment</button>

          
      </div>


    </div>
  )
}

export default Payment