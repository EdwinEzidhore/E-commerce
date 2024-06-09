import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import Loading from '../Loading/Loading';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders();
    },[])

    const getOrders = () => {
        axios.get('http://localhost:3333/api/v2/getOrders', { withCredentials: true })
            .then(res => {
                setOrders(res.data.orders);
                setLoading(false);
                // console.log(res.data.orders);
            })
            .catch(err => console.log(err));
    };

    if (loading) {
        return <div className='grid place-content-center'><Loading/></div>
    };

  return (
      <div className='p-5'>
          <div className='border '>
              
          </div>
          {
              orders.length > 0 ? orders.map((item) => (
          
                <div className='card border p-5 flex justify-between space-x-4 shadow-lg mb-2' >
                <div className='h-28 w-32 flex items-center justify-center' >
                    <img className='h-full w-28 object-cover' src={`http://localhost:3333/${item.image_url[0]}`} alt="" />
                </div>
                <div className='w-30'>
                          <div><span>{item.name}</span></div>
                          <div>{item.description }</div>
                    <div><span>color: blue</span></div>
                </div>
                <div>
                        <span>₹{ item.price}</span>
                </div>
                      <div className='w-40'>
                    <div>{item.orderStatus==='Order Placed' || 'Shipped'? 'Deliver to':'Delivered to'}</div>
                          <div>{item.address.main_address }</div>
                      </div>
                      {
                          item.orderStatus === 'Delivered' ?
                              <div className='w-fit'>
                                  <div>Delivered on May 23</div>
                                  <div>Your item has beed delivered</div>
                                  <div className='flex items-center space-x-2'>
                                      <div><FaStar /></div>
                                      <div>Rate & Review Product</div>
                                      </div>
                                  
                              </div>
                                  :
                                  <div className='w-fit'>
 
                                  <div>Item yet to be delivered</div>
                                  <div>Track your Order</div>
                                
                              </div>
                      }
                      <div className='flex items-center'>
                       
                          <div className='h-auto'><button className='bg-red-200 p-1 rounded-md'>
                              {
                                  item.status==='Delivered' ? 'Return' :'Cancel Order'
                              }
                          </button></div>
                          
                          
                        
                      </div>

                  </div> 
                  
                  
                  
              )) :
                  
                  <div className='flex justify-center items-center mt-12 flex-col'>
                      <div className='h-48 '><img className='h-full' src="src/images/8401.jpg" alt="" /></div>
                      <div className='mt-5 text-xl font font-semibold tracking-wider text-slate-600'>Don't Wait, Order Now!</div>
                  </div>
                      
          }
      

    </div>
  )
}

export default Orders