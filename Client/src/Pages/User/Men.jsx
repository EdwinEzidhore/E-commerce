import React, { useEffect, useState } from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav';
import { BiSolidShoppingBags } from "react-icons/bi";
import Footer from '../../Components/UserComponents/Footer/Footer';
import { GoHeart } from "react-icons/go";
import axios from 'axios';
import SideBar from '../../Components/UserComponents/SideBarFilter/SideBar';
import ProductCard from '../../Components/UserComponents/ProductCard/ProductCard';
import Pagination from '../../Components/Pagination';
import ScrollToTop from '../../Components/UserComponents/ScrollToTop';

const Men = () => {

    const [product, setProduct] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColor] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [curntPage, setCurntPage] = useState(1);

    useEffect(() => {
        getAllItem();
    }, [curntPage]);

    const getAllItem=async() => {
        await axios.get(`http://localhost:3333/api/v2/men/?category=Men&page=${curntPage}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data.item);
                setTotalItems(res.data.count)
                setBrands(res.data.Brands);
                setColor(res.data.Colors);
            })
            .catch((err) => {
            console.log(err)
        })
    }

  return (
      <section>
        <ScrollToTop dependency={ product} />
        <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav /></div>
        <div className='container '>
            <div className='grid grid-cols-12'>
            <SideBar brands={brands} colors={colors} />

            <div className='grid col-span-10 border  ml-3 p-5 '>
            <ProductCard product={product} />
            <Pagination totalItems={totalItems} ItemsPerPage={8} CurntPage={curntPage} setCurntPage={setCurntPage} />
            </div>
        </div>
    </div>
    <Footer/>
</section>
  )
}

export default Men