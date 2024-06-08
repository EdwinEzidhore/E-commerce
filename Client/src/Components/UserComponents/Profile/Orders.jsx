import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    },[])

    const getOrders = () => {
        axios.get('http://localhost:3333/api/v2/getOrders')
            .then(res => {
                // setOrders(res.data.orders)
                console.log(res.data.orders);
            })
            .catch(err => console.log(err));
    }
  return (
      <div>
          {
              orders.length > 0 ? orders.map((item) => {
                  item.products.map((pro) => {
                      
                    <div className='card border p-5 flex justify-between space-x-4 shadow-lg'>
                    <div className='h-28 w-32 flex items-center justify-center' >
                        <img className='h-full w-28 object-cover' src="src/images/fashion Ecommerce.jpg" alt="" />
                    </div>
                    <div>
                            <div><span>{ pro.productId.name}</span></div>
                        <div><span>color: blue</span></div>
                    </div>
                    <div>
                        <span>₹495</span>
                    </div>
                    <div>
                        <div>Deliver to</div>
                        <div>Thayil house kalavoor</div>
                    </div>
                    <div>
                        <div>Item yet to be delivered</div>
                        <div>Track your Order</div>
                      
                    </div>
              </div>
                  })

              }) : ''


          }
      

    </div>
  )
}

export default Orders