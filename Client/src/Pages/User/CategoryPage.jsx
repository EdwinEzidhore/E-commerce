import React, { useEffect, useState } from 'react'
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

const CategoryPage = ({category}) => {

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

    useEffect(() => {
        getAllItem();
    }, [curntPage]);

    const getAllItem = async () => {
        let url = `category=${category}&page=${curntPage}`

        await axios.get(`http://localhost:3333/api/v2/category/?${url}`)
            .then((res) => {
                console.log(res.data);
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
            setSelectedBrand([...selectedBrand,value])
        } else {
            setSelectedBrand(selectedBrand.filter(brand => brand !== value));
        }
       
    }
    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        console.log(value);
        if (checked) {
            setSelectedColor([...selectedColor,value])
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

    const applyFilter = () => {
        let updatedList = [...originalProduct];

       
        if (selectedBrand.length > 0) {
            updatedList = updatedList.filter((item) => {
               return selectedBrand.includes(item.brand)
            })
        }
        if (selectedColor.length >0) {
            updatedList = updatedList.filter((item) => {
                return  selectedColor.includes(item.Details.colour)
            
             })
        }
        if (selectedSort) {
            if (selectedSort === 'LTH') {
                updatedList=updatedList.sort((a,b)=>{return a.sellingPrice-b.sellingPrice})
            } else if (selectedSort === 'HTL') {
                updatedList=updatedList.sort((a,b)=>{return b.sellingPrice-a.sellingPrice})
            }
            
        }

        setProduct(updatedList)
       
    };

    useEffect(() => {
        applyFilter();
    }, [selectedBrand, selectedColor, selectedSort]);


    const cart = (product) => {  
        axios.get(`http://localhost:3333/api/v2/cart/?id=${product._id}`, { withCredentials: true })
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
        console.log('from category page',product);
        dispatch(add(product));
        navigate('/p');
      
    }

  return (
      <div>
          <ScrollToTop dependency={product}/>
          <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav length /></div>
          <div className='container '>
            <div className='grid grid-cols-12 '>
                  <SideBar brands={brands} colors={colors} handlebrandChange={handlebrandChange} handleColorChange={handleColorChange} handleSortChange={handleSortChange} handleClearBtn={ handleClearBtn} />

            <div className='grid col-span-10 border  ml-3 p-5 overflow-y-auto h-screen scroll-smooth scrollbar-default'>
                <ProductCard product={product} AddtoCart={cart} singleProduct={getSingleProduct} />
                <Pagination totalItems={totalItems} ItemsPerPage={8} CurntPage={curntPage} setCurntPage={setCurntPage} />
            </div>
        </div>
          </div>
          <Footer/>
          
      </div>
  )
}

export default CategoryPage