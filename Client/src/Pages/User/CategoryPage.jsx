import React, { useCallback, useEffect, useState } from 'react'
import SideBar from '../../Components/UserComponents/SideBarFilter/SideBar'
import ProductCard from '../../Components/UserComponents/ProductCard/ProductCard'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/UserComponents/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import ScrollToTop from '../../Components/UserComponents/ScrollToTop'
import { useDispatch } from 'react-redux';
import { setCartLength } from '../../Redux/Cart/CartSlice';
import { add } from '../../Redux/SingleProduct/SingleProductSlice';
import { useNavigate } from 'react-router-dom';
import { LuListFilter } from "react-icons/lu";
import { HiSortDescending } from "react-icons/hi";
import { base_url } from '../../Config';

const CategoryPage = ({ category }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);
    const [originalProduct, setOriginalProduct] = useState([]);

    const [brands, setBrands] = useState([]);
    const [colors, setColor] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [curntPage, setCurntPage] = useState(1);

    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSort, setSelectedSort] = useState(null);

    const [toggleFilter, setToggleFilter] = useState(false);

    useEffect(() => {
        getAllItem();
    }, [curntPage]);

    const getAllItem = async () => {
        let url = `category=${category}&page=${curntPage}`

        await axios.get(`${base_url}/api/v2/category/?${url}`)
            .then((res) => {
               
                setOriginalProduct(res.data.item)
                setProduct(res.data.item);
                setTotalItems(res.data.count)
                setBrands(res.data.Brands);
                setColor(res.data.Colors);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const handlebrandChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedBrand([...selectedBrand, value])
        } else {
            setSelectedBrand(selectedBrand.filter(brand => brand !== value));
        }
       
    }
    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        console.log(value);
        if (checked) {
            setSelectedColor([...selectedColor, value])
        } else {
            setSelectedColor(selectedColor.filter(color => color !== value));
        }
    
    }

    const handleSortChange = (e) => {
        const order = e.target.value;
        if (order === 'LTH') {
            setSelectedSort('LTH');
        } else if (order === 'HTL') {
            setSelectedSort('HTL');
        }
    };

    const handleClearBtn = () => {
        setSelectedBrand([]);
        setSelectedColor([]);
        setSelectedSort(null);
        
    }

    const applyFilter =() => {
        let updatedList = [...originalProduct];

       
        if (selectedBrand.length > 0) {
            updatedList = updatedList.filter((item) => {
                return selectedBrand.includes(item.brand)
            })
        }
        if (selectedColor.length > 0) {
            updatedList = updatedList.filter((item) => {
                return selectedColor.includes(item.Details.colour)
            
            })
        }
        if (selectedSort) {
            if (selectedSort === 'LTH') {
                updatedList = updatedList.sort((a, b) => { return a.sellingPrice - b.sellingPrice })
            } else if (selectedSort === 'HTL') {
                updatedList = updatedList.sort((a, b) => { return b.sellingPrice - a.sellingPrice })
            }
            
        }

        setProduct(updatedList)
       
    };

    useEffect(() => {
        applyFilter();
    }, [selectedBrand,selectedColor,selectedSort]);


    const cart = (product) => {  
        axios.get(`${base_url}/api/v2/cart/?id=${product._id}`, { withCredentials: true })
            .then(res => {
                if (res.data.success == false) {
                    toast.error(res.data.msg);
                }
                else {
                    dispatch(setCartLength(res.data.length));
                    toast.success('Added to Bag')

                }
            })
            .catch(err => console.log(err))
    };

    const getSingleProduct = (product) => {
        dispatch(add(product));
        navigate('/p');
      
    };

    const setWishList = (product) => {
        const item_id = product._id;
        axios.post(`${base_url}/api/v2/wishlist/?id=${item_id}`, {}, { withCredentials: true })
            .then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    navigate('/wishlist');
                    toast.success('Added to Wishlist')
                }
                if (res.data.success === false) {
                    toast.error('Item already on Wishlist')
                }
                
            })
            .catch((err) => {
                console.log(err);
            })

    };



  return (
      <div className=''>
          <ScrollToTop dependency={product}/>
        <Nav  />
          <div className='xl:container '>
              <div className='w-full  flex  items-center lg:hidden'>
                  {/* <div className='w-1/2 flex items-center  justify-center font-semibold border'><button className='flex items-center justify-center w-full p-3'>Sort<HiSortDescending /></button></div> */}
                  <div className='w-full flex items-center justify-center font-semibold border'><button className='flex items-center justify-center w-full p-3 focus:outline-none' onClick={()=>setToggleFilter(prev=>!prev)}>Filter<LuListFilter /></button></div>
                  <div>
                      
                  </div>
              </div>
              <div className='grid grid-cols-12 '>

                  <SideBar brands={brands} colors={colors} handlebrandChange={handlebrandChange} handleColorChange={handleColorChange} handleSortChange={handleSortChange} handleClearBtn={handleClearBtn} toggleFilter={toggleFilter}  />

            <div className='grid  lg:mx-0 sm:col-span-12 lg:col-span-10 border   xl:ml-3 lg:p-5 lg:overflow-y-auto h-full scroll-smooth scrollbar-default'>
                      <ProductCard product={product} AddtoCart={cart} singleProduct={getSingleProduct} setWishList={ setWishList} toggleFilter={toggleFilter} />
                {/* <Pagination totalItems={totalItems} ItemsPerPage={8} CurntPage={curntPage} setCurntPage={setCurntPage} /> */}
            </div>
        </div>
          </div>
          <Footer/>
          
      </div>
  )
}

export default CategoryPage