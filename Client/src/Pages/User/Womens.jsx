import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Womens = () => {

    const [product, setproduct] = useState([]);

    useEffect(() => {
        const getproducts = async() => {
           

            const options = {
              method: 'GET',
              url: 'https://apidojo-forever21-v1.p.rapidapi.com/categories/v2/list',
              headers: {
                'X-RapidAPI-Key': 'b2486d0cb2msh5dc0da06ce08a19p1de8f2jsnf50e3b9356e9',
                'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
              }
            };
            
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getproducts();
          
    },[])

  return (
      <div>Womens
          {
              product.map((item) => {
                  return <img className='h-28' src={`${item.DefaultProductImage}`} alt="" />
              })
          }
    </div>
  )
}

export default Womens