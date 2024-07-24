import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import axios from 'axios';
import swal from 'sweetalert';
import { base_url } from '../../Config';
import Pagination from '../../Components/Pagination'
import EditProductForm from '../../Components/AdminComponents/EditProductForm'


const AdminAddProductpage = () => {

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [CurntPage, setCurntPage] = useState(1);
  const [editproduct, setEditproduct] = useState(null);


    
  const navigate = useNavigate();

  useEffect(() => {
   
     axios.get(`${base_url}/products/?page=${CurntPage}`)
       .then((res) => {
         const { count, products } = res.data;
        setTotalProducts(count)
        setProducts(products)
       
      })
    .catch((err)=>console.log(err))
   
    
  },[CurntPage]);
  
 
  const handleListAction = async (product) => {
   
      const item_id = product._id;
      await axios.patch(`${base_url}/item/?item_id=${item_id}`)
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
        axios.delete(`${base_url}/item/?item_id=${item_id}`)
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

  const handleEdit = (product) => {
    setEditproduct(product);
   
  }

  return (
    <section>

      <AdminHeader />
      {
        editproduct === null
          ? (
          <div className='flex flex-col  mt-2 ml-64  p-1 h-full '>
          
          
          <div className='py-5 px-4 flex items-center justify-evenly bg-slate-50 '>
          <div className='font-black'><span>Total  products: <span className='text-green-600'>{ totalProducts}</span></span></div>
            <button className='h-auto bg-red-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-red-700 ' onClick={()=>navigate('/addproduct')}>Add  New Product</button>
          
          
          
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
                  <img src={`${base_url}/${product.productImage[0]}`} className='max-h-10 object-contain' /></div>
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
                <div className="Edit" ><button className='h-auto px-2 py-1 bg-green-500 text-white rounded-md' onClick={()=>handleEdit(product)}>Edit</button></div>
              <div className=" uppercase font-medium "><button onClick={()=>handleDelete(product)}><box-icon name='trash-alt' type='solid' className></box-icon></button></div>
                
              </React.Fragment>
             
            ))

          }
          
          
           

          

          </div>  
          <Pagination totalItems={totalProducts} ItemsPerPage={5} CurntPage={CurntPage} setCurntPage={setCurntPage}/>
          
      </div>
        ) : (
            <EditProductForm product={editproduct}/>
        )
      }
      
     
    </section>
   
  )
}

export default AdminAddProductpage