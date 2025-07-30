import toast, { Toaster } from "react-hot-toast"
import {  useState } from "react";
import { base_url } from "../../Config";
import axios from 'axios';
import { json } from "react-router-dom";


const EditProductForm = ({ product }) => {



  const [productImage, setproductImage] = useState([...product.productImage]);
  const [newImages, setNewImages] = useState([]);
  const [imageindex, setImageindex] = useState(0);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    brand: product.brand,
    originalPrice: product.originalPrice,
    sellingPrice: product.sellingPrice,
    category: product.category,
    status: product.status,
    stock: product.stock,
    fabric: product.Details.fabric,
    colour: product.Details.colour,
    size: product.Details.size,
  });

  const [originalProduct, setOriginalProduct] = useState({
    name: product.name,
    description: product.description,
    brand: product.brand,
    originalPrice: product.originalPrice,
    sellingPrice: product.sellingPrice,
    category: product.category,
    status: product.status,
    stock: product.stock,
    fabric: product.Details.fabric,
    colour: product.Details.colour,
    size: product.Details.size,
  });

  const [onError,setonError]=useState(``)


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
          className="file-item text-gray-700"
          onClick={()=>setImageindex(index)}
        >
          <div className={imageindex===index?"flex items-center mt-2 outline w-fit p-1 bg-slate-100":"flex items-center mt-2"}>
          <span className="font-semibold text-black">{ index+1}-</span>
          <span className="line-clamp-1 w-56">{image}</span>
          <div>
            <button className="bg-red-600 text-white font-semibold rounded-md px-2" onClick={(e)=>deleteImage(e,image)}>delete</button>
          </div>
          </div>
          
        </li>
      ))}
    </ul>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const changedFields={}  ;
    for (let key in editedProduct) {
      if (editedProduct[key] !== originalProduct[key]) {
        changedFields[key]=editedProduct[key]
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    
    const formData = new FormData();

    formData.append('changedFields',JSON.stringify(changedFields));
    formData.append('productImage',JSON.stringify(productImage))

    newImages.length > 0 && newImages.forEach((img) => {
      formData.append('file', img.file)
      // console.log(img.file);
    });

    let url=`editproduct/?id=${product._id}`
    axios.post(`${base_url}/${url}`,formData,config)
      .then((res) => {
        if (res.status === 200) {
       toast.success('Updated successfully!')
     }
      })
      .catch((err) => {
       
        if (err) {
          toast.error(err.response.data.message)
        }
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => {
      return {
        ...prev, [name]: value
      }
    });

    
  };

  const productImageupload = (e) => {

    const file = Array.from(e.target.files);
    const fileNames = file.map(file => file.name);
    setproductImage(prev => [...prev, ...fileNames]);
    const fileObjects = file.map((file, index) => ({ file, index }));
    setNewImages(fileObjects);


  };

 
  const deleteImage = (e,image) => {
    e.preventDefault();

    axios.delete(`${base_url}/image/?url=${image}&id=${product._id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Image deleted!')
        }
      })
      .catch((err) => {
        
        if (err) {
          toast.error(err.response.data.message)
        }
    })
  }
 
  return (
    <section>
    <Toaster reverseOrder={ false} />
  

    
      <div className="ml-64 flex items-center w-full h-full">

        {/* <h1 className="text-center mt-5 font-semibold">Edit product Details</h1> */}
      <div className='mt-2   flex items-center justify-center p-4 w-1/2'>
      
      <form action="" className='bg-slate-300 p-5 flex flex-col  rounded-md '>
        <div className='grid  grid-cols-2 space-x-2 my-4'>
          <label htmlFor="name">Name:</label>
          <input type="text" id='name'name='name' value={editedProduct.name} required className={'py-1 px-3 outline-none rounded-md'}  onChange={handleChange}/>
          
        </div>
    
        
        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="Description">Description</label>
          <input type="text" id='Description' value={editedProduct.description}  required name='description' className={'py-1 px-3 outline-none rounded-md'} onChange={handleChange}/>
          
        </div>

        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="brand">Brand</label>
          <input type="text" id='brand' value={editedProduct.brand}  required name='brand' className={'py-1 px-3 outline-none rounded-md'}  onChange={handleChange}/>
          
        </div>

        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="fabric">Fabric</label>
          <input type="text" id='fabric' value={editedProduct.fabric}  required name='fabric' className='py-1 px-3 outline-none rounded-md ' onChange={handleChange} />
         
        </div>

        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="color">color</label>
          <input type="text" id='colour' value={editedProduct.colour} required name='colour' className='py-1 px-3 outline-none rounded-md '  onChange={handleChange}/>
         
        </div>

        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="size">Size</label>
          <select name="size" id="size" defaultValue={editedProduct.size}   required className='py-1 px-3 rounded-md outline-none' onChange={handleChange}>
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
          <input type="number" id='og-price' value={editedProduct.originalPrice}  required name='originalPrice' className={'py-1 px-3 outline-none rounded-md'} onChange={handleChange} />
          
        </div>
       
        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="sel-price">Selling Price</label>
          <input type="number" id='sel-price' value={editedProduct.sellingPrice}  required name='sellingPrice' className={'py-1 px-3 outline-none rounded-md'} onChange={handleChange}/>
          
        </div>

        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="brand">Category</label>
          <select name="category" id="category" defaultValue={editedProduct.category}  required className='py-1 px-3 rounded-md outline-none' onChange={handleChange}>
            <option value=""></option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>



        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" defaultValue={editedProduct.status }  required className='py-1 px-3 rounded-md outline-none' onChange={handleChange}>
          <option value=""></option>
            <option value="Available">Available</option>
            <option value="OutOfstock">Out Of stock</option>
         </select>
        </div>

        <div className='grid grid-cols-2 space-x-2 my-4'>
          <label htmlFor="stock">Stock</label>
          <input type="number" required id='stock' value={editedProduct.stock}  name='stock' className={'py-1 px-3 outline-none rounded-md'}  onChange={handleChange}/>
          
        </div>

        <div className='mt-5 flex justify-center'>
          <button  className='bg-sky-600 text-white font-medium rounded-md p-2' onClick={(e)=>handleSubmit(e)}>Submit</button>
        </div>
          </form>
          
        </div>
        <div className="h-full">
        <div className="h-80 flex justify-center items-center" >
        <img
          className="max-h-full"
          src={`${base_url}/${productImage[imageindex]}`}
          alt="img"
  
  />
      </div>
        </div>
       
      </div>
      


      
  </section>
 )
}

export default EditProductForm