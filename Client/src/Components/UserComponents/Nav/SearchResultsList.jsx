import React from 'react'
import { useDispatch } from 'react-redux';
import {add} from '../../../Redux/SingleProduct/SingleProductSlice'
import { useNavigate } from 'react-router-dom';


const SearchResultsList = ({ results }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProduct = (product) => {
        dispatch(add(product));
        navigate('/p');
    }    
  return (
      <div className='p-5 absolute top-10  left-0 right-0 z-50 flex flex-col bg-slate-100 sm:w-full md:w-96   rounded-md shadow-md h-56 overflow-y-scroll '>
        
          {
              results.map((item,index) => (
                  <div className='mb-4 ' key={index}><button className='text-left text-sm' onClick={()=>getProduct(item)}>{item.description}</button></div>
                ))
              
         }
          
    </div>
  )
}

export default SearchResultsList