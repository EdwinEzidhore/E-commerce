import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import AdminHeader from '../../Components/AdminComponents/AdminHeader';
import axios from 'axios';
import { base_url } from '../../Config';


const AdminOrders = () => {

    const [orders, setOrders] = useState([]);


    useEffect(() => {
        getOrders();
    }, []);

  

    const getOrders = () => {
        axios.get(`${base_url}/order`)
            .then((res) => {
                setOrders(res.data);
               
            })
            .catch((err) => {
            console.log(err);
        })

    };

    const handleOrderstatus = (order, e) => {
        const order_id = order._id;
        const status = e.target.value;
        axios.patch(`${base_url}/order_status/?order_id=${order_id}`, { status })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    
    };

    const handlePaymentStatus = (order, e) => {
        const order_id = order._id;
        const status = e.target.value;
        axios.patch(`${base_url}/payment_status/?order_id=${order_id}`, { status })
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err));
        
    };

   
  return (
      <section>
          <AdminHeader />
          <div className=' mt-2 ml-64  p-2 text-center'>
              <div className='grid grid-cols-6 gap-3 break-all '>
                  <div className='No uppercase font-medium '>No</div>
                  <div className='No uppercase font-medium '>Order ID</div>
                  <div className='No uppercase font-medium '>Name</div>
                  <div className='No uppercase font-medium '>Amount</div>
                  <div className='No uppercase font-medium '>Order status</div>
                  <div className='No uppercase font-medium '>Payment status</div>

                  {
                      orders.map((item,index) => (
                          <Fragment key={index}>
                              <div>{ index +1}</div>
                              <div className='text-start'>{ item._id}</div>
                              <div className=''>{item.userId.name }</div>
                              <div>{item.totalAmount }</div>
                              <div>
                                  
                                  <select
                                      className='outline-none border'
                                      name="order"
                                      id="order" 
                                      onChange={(e) => {
                                  handleOrderstatus(item,e)
                                      }}
                                      defaultValue={item.OrderStatus}
                                      disabled={item.OrderStatus==="Cancelled"||item.OrderStatus==="Returned"?true:false}
                                      
                                  >
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled </option>
                                        <option value="Returned">Returned </option>   
                                    </select>
                                </div>
                                <div>
                                  <select
                                      className='outline-none'
                                      name="payment"
                                      id="payment"
                                      onChange={(e) => {
                                          handlePaymentStatus(item,e)
                                      }}
                                      defaultValue={item.PaymentStatus}
                                      disabled={item.PaymentStatus==='Failed'?true:false}
                                  >
                                        
                                        <option value="Pending">Pending</option>
                                        <option value="Success">Success</option>
                                        <option value="Failed">Failed</option>

                                    </select>
                                </div>
                          </Fragment>
                      ))
                  }



              </div>
              

              
          </div>
    </section>
     
    
  )
}

export default AdminOrders