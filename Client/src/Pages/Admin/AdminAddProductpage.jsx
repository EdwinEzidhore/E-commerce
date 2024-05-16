import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import axios from 'axios';
import swal from 'sweetalert';


const AdminAddProductpage = () => {

  const [products, setProducts] = useState([]);



  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
    
  const navigate = useNavigate();

  useEffect(() => {
   
     axios.get('http://localhost:3333/products')
      .then((res) => {
        setProducts(res.data.products)
       
      })
    .catch((err)=>console.log(err))
   
    
  },[]);
  
 
  const handleListAction = async (product) => {
   
      const item_id = product._id;
      await axios.patch(`http://localhost:3333/item/?item_id=${item_id}`)
        .then((res) => {
          setProducts((prev) => {
            const updatedindex = prev.findIndex(item => item._id === product._id);
            if (updatedindex !== -1) {
              const updatedProducts = [...prev];
              updatedProducts[updatedindex] = res.data.updatedProduct;
              return updatedProducts;
            }
            return prev;
          });
          
        })
        
        .catch(err => console.log(err))
     
    };
  
  

  const handleDelete = (product) => {
    swal({
      title: "Are you sure!",
      text: `Do you want to delete Product: ${product.brand},${product.name}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const item_id = product._id;
        axios.delete(`http://localhost:3333/item/?item_id=${item_id}`)
          .then(res => {
          
             setProducts(res.data.RestProducts);

              swal(`Product Successfully Deleted`, {
                icon: "success",
              });
            
          })
        .catch(err=>console.log(err))
        

      }
    });
  };


  return (
    <section>

      <AdminHeader/>
      <div className='flex flex-col  mt-2 ml-64  p-1 h-screen '>
          
          
          <div className='py-5 px-4 flex items-center justify-evenly bg-slate-50 '>
          <div className='font-black'><span>Total  products: <span className='text-green-600'>{ products.length}</span></span></div>
            <button className='h-auto bg-red-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-red-700 ' onClick={()=>navigate('/addproduct')}>Add  New Product</button>
          
            <Menu as="div" className=" relative   ">
          <div>
            <Menu.Button className="flex  justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Filter
              {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Brand
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                        Category
                        <ul>
                          <li><input type="checkbox" id='Men'/>
                            <label htmlFor="Men" >Men</label>
                          </li>
                          <li><input type="checkbox" id='Women'/>
                            <label htmlFor='Women' >Women</label>
                          </li>
                          <li><input type="checkbox" id='Kids'/>
                            <label htmlFor="Kids" >Kids</label>
                          </li>
                        </ul>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Item
                    </a>
                  )}
                </Menu.Item>
               
              </div>
            </Menu.Items>
          </Transition>
          </Menu>
          
          </div>
          
          <hr />
          
          <div className='grid grid-cols-12 gap-3 
            break-all'>
        
            
            <div className='No uppercase font-medium '><span>No</span></div>
            <div className="Id uppercase font-medium "><span>ID</span></div>
            <div className="Image uppercase font-medium  "><span>Image</span></div>
            <div className='Name uppercase font-medium '><span>Name</span></div>
            <div className="Brand uppercase font-medium "><span>Brand</span></div>
            <div className="category uppercase font-medium "><span>Category</span></div>
            <div className="Selling-price uppercase font-medium mb-4"><span>Price</span></div>
            <div className="Stock uppercase font-medium "><span>Stock</span></div>
            <div className="status uppercase font-medium "><span>Status</span></div>
            <div className="Action uppercase font-medium "><span>Action</span></div>
          <div className="Edit uppercase font-medium "><span>Edit</span></div>
          <div className="Edit uppercase font-medium "><span>Delete</span></div>

          
            
          
          {
            products.map((product,index) => (

              <React.Fragment key={product._id}>
                
                <div className='No' >{ index+1}</div>
                <div className="" ><span className='' >{ product._id}</span></div>
                <div className="Image " >
                  <img src={`http://localhost:3333/${product.productImage[0]}`} className='max-h-10 object-contain' /></div>
                <div className='Name' >{ product.name}</div>
                <div className="Brand" >{product.brand }</div>
                <div className="category" >{product.category }</div>
                <div className="Selling-price" >{ product.sellingPrice}</div>
                <div className="Stock" >{product.stock }</div>
                <div className={product.status=='Unavailable'?'text-red-500':''} >{product.status}</div>
               
                <div className="Action" ><button className='h-auto px-2 py-1 bg-red-600 text-white rounded-md min-w-16 ' onClick={() => handleListAction(product)}>
                  {
                    product.status=='Available'? <span>List</span>: <span>UnList</span>
                  }</button></div>
                <div className="Edit" ><button className='h-auto px-2 py-1 bg-green-500 text-white rounded-md'>Edit</button></div>
              <div className=" uppercase font-medium "><button onClick={()=>handleDelete(product)}><box-icon name='trash-alt' type='solid' className></box-icon></button></div>
                
              </React.Fragment>
             
            ))
          }
           
          
           

          

          </div>  
          
          
        </div>
    </section>
   
  )
}

export default AdminAddProductpage