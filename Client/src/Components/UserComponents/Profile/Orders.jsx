import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import Loading from '../Loading/Loading';
import { IoChevronBack } from "react-icons/io5";


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setToggleModal] = useState(false);
    const [modalItem, setModalItem] = useState()
    const [returnForm, setReturnForm] = useState({
        reason: '',
        inReturn: ''
    });
    const [selectedStatus, setSelectedStatus] = useState('');

    
 

    const ReturnFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(value);
        setReturnForm((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    };

    const toggleModal = (product) => {
        setToggleModal(!modal);
        setModalItem(product);
    }

    useEffect(() => {
        getOrders();
    },[])

    const getOrders = () => {
        axios.get('http://localhost:3333/api/v2/getOrders', { withCredentials: true })
            .then(res => {
                setOrders(res.data.orders);
                setAllOrders(res.data.orders);
                setLoading(false);
                console.log(res.data.orders);
            })
            .catch(err => console.log(err));
    };

    const handleOrderCancel = async (item) => {
        const orderID = item.order_ID;
        await axios.patch(`http://localhost:3333/api/v2/cancel_order/?orderID=${orderID}`)
            .then(res => {
                if (res.status === 200) {
                    getOrders();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleReturn = async (e, item) => {
        e.preventDefault();
        const orderID = modalItem.order_ID;
        console.log(orderID);
        await axios.patch(`http://localhost:3333/api/v2/return_order/?orderID=${orderID}`, { returnForm })
            .then((res) => {
                if (res.status === 200) {
                    setReturnForm({
                        reason: '',
                        inReturn: ''
                    });
                    setToggleModal(false);
                    getOrders()
                }
            })
            .catch((err) => {
                console.log(err);
            });

    };

    const handleStatusChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedStatus(value);
        } else {
            setSelectedStatus('');
        }
    };

    const ApplyFilters = () => {
        let updatedList = [...allOrders];

        if (selectedStatus.length > 0) {
            updatedList = updatedList.filter((order) => {
                return order.orderStatus === selectedStatus;
            });
            console.log(updatedList);
        }

        setOrders(updatedList)
    };

    useEffect(() => {
        ApplyFilters()
    }, [selectedStatus]);

    if (loading) {
        return <div className='grid place-content-center '><Loading/></div>
    };

  return (
      <div className='p-5 '>
          <div className='filter border flex p-5 mb-4'>
              <div className='mr-5 font-semibold uppercase border-slate-400 border-r-2 pr-4'>
                  FilterBy
              </div>
              <div className='flex space-x-5 gap-2 text-slate-800'>
              <div>
                  <input type="checkbox" id='way' value='Shipped' onChange={(e)=>handleStatusChange(e)}/>
                  <label className='ml-1' htmlFor="way">On the way</label>
              </div>
              <div>
                  <input type="checkbox" id='delivered' value='Delivered' onChange={(e)=>handleStatusChange(e)}/>
                  <label className='ml-1' htmlFor="delivered">Delivered</label>
              </div>
              <div>
                  <input type="checkbox" id='cancelled' value='Cancelled' onChange={(e)=>handleStatusChange(e)}/>
                  <label className='ml-1' htmlFor="cancelled">Cancelled</label>
              </div>
              <div>
                  <input type="checkbox" id='returned' value='Returned' onChange={(e)=>handleStatusChange(e)}/>
                  <label className='ml-1' htmlFor="returned">Returned</label>
              </div>
              </div>

          </div>
          {
              orders.length > 0 ? orders.map((item,index) => (
          
                  item.orderStatus!==''?
                <div className='card border p-5 flex justify-between space-x-4 shadow-lg mb-2 relative' key={index} >
                <div className='h-32  flex  items-center justify-center' >
                    <img className='h-full w-28 object-contain' src={`http://localhost:3333/${item.image_url}`} alt="" />
                </div>
                <div className='w-30'>
                          <div><span className='uppercase text-sm font-semibold text-slate-500'>{item.name}</span></div>
                          <div className='max-w-40 font-semibold font-sans leading-5'>{item.description }</div>
                          <div className='flex items-center' >
                            <div><span className='text-xs text-slate-700 font-semibold'>color: <span className='uppercase text-xs'>{item.color}</span></span></div>  
                          
                          </div>
                </div>
                <div>
                        <span className='font-semibold text-emerald-600'>₹{ item.price}</span>
                </div>
                      <div className='w-40'>
                    <div className='font-semibold uppercase text-sm tracking-wide text-slate-800'>{item.orderStatus==='Order Placed' && 'Shipped'? 'Deliver to:':'Delivered to:'}</div>
                          <div className='text-sm font-sans font-semibold text-slate-600'>{item.address.main_address }</div>
                      </div>
                      {
                          item.orderStatus === 'Delivered' ||item.orderStatus === 'Returned' ?
                              <div className='w-48'>
                                  
                                  <div className='text-sm font-semibold tracking-wide flex'>
                                  <box-icon name='check-circle' type='solid' color='#0ac107' ></box-icon>
                                      Delivered on May 23</div>
                                  <div className='text-sm font-semibold text-slate-600 mt-2'>
                                      Your item has beed delivered</div>
                                  <div className='flex items-center  space-x-2 mt-2'>
                                      <box-icon name='star' type='solid' color='#f4ed03' ></box-icon>
                                      <div className='text-sm font-semibold tracking-wide text-slate-800'>Rate & Review Product</div>
                                      </div>
                                  
                              </div>
                                  :
                                  <div className='w-fit'>
 
                                      {
                                          item.orderStatus !== 'Cancelled' ? <>
                                                   <div className='flex'>
                                  <box-icon name='radio-circle-marked' color='#06a016' ></box-icon><span className='text-slate-700'>Item yet to be delivered</span></div>
                                  <div className='flex mt-5'>
                                 <box-icon  name='map' type='solid' color='#2788e7' ></box-icon>
                                      <span className='text-sm font-semibold text-gray-700'>Track your Order</span> </div>
                                          </>:''
                                      }
                             
                                
                              </div>
                      }
                      <div className='flex items-center '>
                       
                          {
                                  item.orderStatus === 'Delivered'||item.orderStatus === 'Returned' ?
                                      <>
                                          <div className='h-auto'>
                                              {
                                                  item.orderStatus === 'Returned' ? <div className='text-slate-600'>< span className=''>The item is scheduled for Return</span></div> :
                                                  <button className='bg-red-200 px-5 py-3 rounded-md text-xs font-semibold uppercase' onClick={() => toggleModal(item)}>Return</button>
                                              }
                                             
                                             </div>
                                          {
                                              modal &&
                                              <div className='modal fixed top-0 left-0 right-0 bottom-0 z-10'>
                                              <div className="overlay w-full h-full backdrop-blur-sm"></div>
                                                <div className='modal-content absolute top-1/2 left-1/2 h-fit w-96 -translate-x-1/2 -translate-y-1/2  bg-slate-100 rounded-md overflow-hidden '>
                                                          <div className='bg-[#40A2E3] h-auto py-2 px-2 text-white font-semibold flex items-center justify-between'>
                                                              <div>Request Return</div>
                                                              <div> <button className='modal-close text-2xl' onClick={()=>setToggleModal(false)}><IoChevronBack /></button></div>
                                                          </div>
                                                          <div className='p-5 '>
                                                          <form action="">
                                                        <div className='flex items-center justify-between'>
                                                            <div>
                                                                <div><h1 className='uppercase text-sm font-semibold text-slate-500'>{modalItem.name}</h1></div>
                                                                <div><h4 className='font-semibold text-sm text-slate-800'>{modalItem.description}</h4></div>
                                                                <div className='font-semibold text-emerald-600'>₹{ modalItem.price}</div>
                                                            </div>
                                                            <div className='h-12'>
                                                                <img className='h-full' src={`http://localhost:3333/${modalItem.image_url}`} alt="" />      
                                                                      </div>
                                                                      
                    
                                                                  </div>
                                                                  <hr  className='mt-5 border border-3 border-gray-300'/>
                                                                  <div className='mt-5'>
                                                                      <label className='block text-sm text-slate-600 font-semibold' htmlFor="option">Reason for return</label>
                                                                      <input onChange={(e)=>ReturnFormChange(e)} className='block w-full mt-2 px-3 pb-5 pt-1 focus:outline-sky-300 bg-gray-300' type="text" name="reason" id="" htmlFor='option'  value={returnForm.reason}/>

                                                                      <label className='block text-slate-600 font-semibold text-sm mt-3' htmlFor="option2">What do you want in return</label>
                                                                      <select onChange={(e)=>ReturnFormChange(e)} className='block w-full focus:outline-sky-300 mt-2 bg-gray-300 py-2 ' name='inReturn' value={returnForm.inReturn}>
                                                                          <option value=''></option>
                                                                          <option value="Refund"> Refund</option>
                                                                          <option value="Replace">Replace Item</option>

                                                                      </select>
                                                                  </div>
                                                                  <div className=''>
                                                                  <button className='w-full h-auto bg-[#40A2E3] py-3 text-white font-semibold uppercase text-sm mt-5' onClick={(e)=>handleReturn(e)}>Submit Request</button>
                                                                  </div>
                                                                
                                                          </form>
                                                          </div>

                                                         
                                                      </div>
                                                   
                                          </div>
                                        }


                                      </>
                              
                                      :
                                     
                                      <div className='h-auto'>
                                          {
                                              item.orderStatus === 'Cancelled' ? <div className='h-auto p-1 bg-red-600 text-white font-semibold rounded-md text-sm cursor-default'>Cancelled!</div>
                                                  :
                                              <button onClick={() => handleOrderCancel(item)} className='bg-red-200 px-5 py-3 rounded-md text-xs font-semibold uppercase'>Cancel Order</button>
                                          }
                                          </div>
                                    
                          }
                     
                          
                          
                        
                      </div>

                  </div> :''
                  
                  
                  
              )) :
                  
                  <div className='flex justify-center items-center mt-12 flex-col'>
                      <div className='h-48 '><img className='h-full' src="src/images/8401.jpg" alt="" /></div>
                      <div><h1 className=''>No results Found!</h1></div>
                      <div className='mt-5 text-xl font font-semibold tracking-wider text-slate-600'>Don't Wait, Order Now!</div>
                  </div>
                      
          }
      

    </div>
  )
}

export default Orders