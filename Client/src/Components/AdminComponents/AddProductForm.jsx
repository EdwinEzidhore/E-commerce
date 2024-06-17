import React, { useState } from 'react'
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductForm = () => {

  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    originalPrice: '',
    sellingPrice: '',
    category: '',
    status: '',
    stock: '',
    fabric: '',
    color: '',
    size: '',
  
    
  });
  const [productImage, setproductImage] = useState([])
  const [error, setError] = useState({
    name: '',
    description: '',
    brand: '',
    og_price: '',
    s_price: '',
    stock: '',
 
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      return {
        ...prev, [name]: value
      }
    });

    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.name.trim() == '') {
      setError((prev) => {
        return {
        ...prev,name:'Must provide a name!'
      }
      })
      
    };
    if (product.description.trim() == '') {
      setError((prev) => {
        return {
        ...prev,description:'Must provide a Description!'
      }
      })
    };
    if (product.brand.trim() == '') {
      setError((prev) => {
        return {
        ...prev,brand:'Must provide a Brand!'
      }
      })
    };
    if (isNaN(product.originalPrice)|| Number(product.originalPrice)<=0) {
      setError((prev) => {
        return {
          ...prev, og_price: ' Price Must be a Positive Number!'
        }
      });
    };
    if (product.sellingPrice==''|| Number(product.sellingPrice)>=Number(product.originalPrice)) {
      setError((prev) => {
        return {
          ...prev, s_price: ' SellingPrice Must be a Less than OriginalPrice!'
        }
      });
    };
    if (isNaN(product.stock)|| Number(product.stock)<=0) {
      setError((prev) => {
        return {
          ...prev, stock: ' Stock Must be a Positive Number!'
        }
      });
    };
   
   

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
  };

    const formData = new FormData();
  
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('brand', product.brand);
  formData.append('originalPrice', product.originalPrice);
  formData.append('sellingPrice', product.sellingPrice);
  formData.append('category', product.category);
  formData.append('status', product.status);
    formData.append('stock', product.stock);
    formData.append('fabric', product.fabric);
    formData.append('color', product.color);
    formData.append('size', product.size);


  

    productImage.forEach((image) => {
      formData.append('file', image.file);
    });

 
    axios.post('http://localhost:3333/addProduct',formData,config)
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Product Added Successfully");
          setProduct({
            name: '',
            description: '',
            brand: '',
            originalPrice: '',
            sellingPrice: '',
            category: '',
            status: '',
            stock: '',
            fabric: '',
            color: '',
            size:'',
          });
         
         
        }
      })
      .catch(err => console.log(err))
    
   
  };

  const productImageupload = (e) => {

    const file = Array.from(e.target.files);
    const fileObjects = file.map((file, index) => ({ file, index }));
    setproductImage(fileObjects);
   
  
  };
  

  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData('draggedIndex', index);
  };

  const handleDrop = (index) => (e) => {
    const draggedIndex = e.dataTransfer.getData('draggedIndex');
    if (draggedIndex === null || draggedIndex === undefined) return;

    const newImages = [...productImage];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    setproductImage(newImages);
  };

  const renderImageList = () => (
    <ul>
      {productImage.map((image, index) => (
        <li
          key={index}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop(index)}
          className="file-item"
        >
         
          {image.file.name}
        </li>
      ))}
    </ul>
  );

  return (
    <section>
      <AdminHeader/>

      <div className='mt-2 ml-64  flex items-center justify-center p-4 '>
        <form action="" className='bg-blue-300 p-5 flex flex-col  rounded-md'>
          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' value={product.name} name='name' required className={error.name?'py-1 px-3 outline outline-2 outline-red-600 rounded-md ':'py-1 px-3 outline-none rounded-md'} onChange={handleChange} />
            {
              error.name ? <span className='text-red-600 text-sm  flex justify-end col-span-2'>{ error.name}</span>:null
            }
          </div>
      
          
          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="Description">Description</label>
            <input type="text" id='Description' value={product.description} required name='description' className={error.name?'py-1 px-3 outline outline-2 outline-red-600 rounded-md ':'py-1 px-3 outline-none rounded-md'} onChange={handleChange} />
            {
              error.description ? <span className='text-red-600 text-sm  flex justify-end col-span-2'>{ error.description}</span>:null
            }
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="brand">Brand</label>
            <input type="text" id='brand' value={product.brand} required name='brand' className={error.name?'py-1 px-3 outline outline-2 outline-red-600 rounded-md ':'py-1 px-3 outline-none rounded-md'} onChange={handleChange} />
            {
              error.brand ? <span className='text-red-600 text-sm  flex justify-end col-span-2'>{ error.brand}</span>:null
            }
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="fabric">Fabric</label>
            <input type="text" id='fabric' value={product.fabric} required name='fabric' className='py-1 px-3 outline-none rounded-md ' onChange={handleChange} />
           
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="color">color</label>
            <input type="text" id='color' value={product.color} required name='color' className='py-1 px-3 outline-none rounded-md ' onChange={handleChange} />
           
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="size">Size</label>
            <select name="size" id="size" value={product.size} required className='py-1 px-3 rounded-md outline-none' onChange={handleChange}>
              <option value=""></option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="file">Image</label>
            <input type="file" id='file' multiple  name='file' accept='.jpg,.png,.jpeg,.webp,.avif' onChange={productImageupload}/>
          </div>
{renderImageList()}
          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="og-price">Original Price</label>
            <input type="number" id='og-price' value={product.originalPrice} required name='originalPrice' className={error.name?'py-1 px-3 outline outline-2 outline-red-600 rounded-md ':'py-1 px-3 outline-none rounded-md'} onChange={handleChange} />
            {
              error.og_price ? <span className='text-red-600 text-sm  flex justify-end col-span-2'>{ error.og_price}</span>:null
            }
          </div>
         
          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="sel-price">Selling Price</label>
            <input type="number" id='sel-price' value={product.sellingPrice} required name='sellingPrice' className={error.name?'py-1 px-3 outline outline-2 outline-red-600 rounded-md ':'py-1 px-3 outline-none rounded-md'} onChange={handleChange} />
            {
              error.s_price ? <span className='text-red-600 text-sm  flex justify-end col-span-2'>{ error.s_price}</span>:null
            }
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="brand">Category</label>
            <select name="category" id="category" value={product.category} required className='py-1 px-3 rounded-md outline-none' onChange={handleChange}>
              <option value=""></option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>



          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={product.status} required className='py-1 px-3 rounded-md outline-none' onChange={handleChange}>
            <option value=""></option>
              <option value="Available">Available</option>
              <option value="OutOfstock">Out Of stock</option>
           </select>
          </div>

          <div className='grid grid-cols-2 space-x-2 my-4'>
            <label htmlFor="stock">Stock</label>
            <input type="number" required id='stock' value={product.stock} name='stock' className={error.name?'py-1 px-3 outline outline-2 outline-red-600 rounded-md ':'py-1 px-3 outline-none rounded-md'}  onChange={handleChange} />
            {
              error.stock ? <span className='text-red-600 text-sm  flex justify-end col-span-2'>{ error.stock}</span>:null
            }
          </div>

          
      
        

          <div className='mt-5 flex justify-center'>
            <button onClick={handleSubmit} className='bg-sky-600 text-white font-medium rounded-md p-2' >Submit</button>
          </div>
        </form>
      </div>

    </section>
  )
}

export default AddProductForm