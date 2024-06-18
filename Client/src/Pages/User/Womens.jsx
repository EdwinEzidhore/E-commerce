import React, { useEffect, useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav';
import Footer from '../../Components/UserComponents/Footer/Footer';
import '../../css/style.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addcart, add_cart_price } from '../../Redux/SingleProduct/CartSlice';
import { toast } from 'react-toastify';
import Pagination from '../../Components/Pagination';
import ScrollToTop from '../../Components/UserComponents/ScrollToTop'; 
import SideBar from '../../Components/UserComponents/SideBarFilter/SideBar';
import ProductCard from '../../Components/UserComponents/ProductCard/ProductCard';


const Womens = () => {

    const [product, setProduct] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColor] = useState([]);
    const dispatch = useDispatch();
    const [totalItems, setTotalItems] = useState(0);
    const [curntPage, setCurntPage] = useState(1);

    useEffect(() => {
        getAllItem();
   
    }, [curntPage]);

 

    const getAllItem = () => {
        axios.get(`http://localhost:3333/api/v2/women/?category=Women&page=${curntPage}`)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data.item);
                setTotalItems(res.data.count)
                setBrands(res.data.Brands);
                setColor(res.data.Colors);
             


            })
            .catch((err) => {
                console.log(err);
            })
    };

    const cart = (product) => {
        let pro_id = product._id;
        
        axios.get(`http://localhost:3333/api/v2/cart/?id=${product._id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                }
                else {
                   
                    toast.success('Added to Bag')
                    dispatch(addcart(product));
                    let populated = res.data.populated.products;
                    const filtered = populated.find((prod) => prod.productID._id == pro_id);
                    const productDetails = {
                        productID: filtered.productID._id,
                        quantity: filtered.quantity,
                        price: filtered.productID.sellingPrice,
                        OG_price: filtered.productID.originalPrice,
                    }
                    dispatch(add_cart_price(productDetails))
                    


                 
                }
            })
            .catch(err => console.log(err))
    };


    const handleChange = (e) => {
  
     

    };  

  return (
      <section>
          <ScrollToTop dependency={ product} />
          <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav /></div>
          <div className='container '>
              <div className='grid grid-cols-12'>
                  <SideBar brands={brands} colors={colors} />
               

                  <div className=' col-span-10 border items-start flex flex-col ml-3 p-5 h-auto shadow-lg'>
                      
                        <div className='mb-5'><button onClick={()=>getAllItem()} className='h-fit w-fit p-1 bg-gray-200 px-2 rounded-md'>All</button></div>
                        <ProductCard product={product} cart={cart} />
                        <Pagination totalItems={totalItems} ItemsPerPage={8} CurntPage={curntPage} setCurntPage={setCurntPage} />
                  </div>
              </div>
          </div>
        
          <div className='mt-5'><Footer/></div>
</section>
  )
}

export default Womens