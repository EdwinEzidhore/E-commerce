import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import {base_url} from '../../Config'

const ActivationPage = () => {

  const { activation_token } = useParams();
  const [error, setError] = useState(false);



  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios.post(`${base_url}/api/v2/activation`, {
          activation_token,
        }).then((response) => console.log(response))
          .catch(err => {
            console.log(err)
            setError(true);
          });
      };
      sendRequest();
    }
    
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',
    }}>
      
      {!error ? (
         <h1 className='font-semibold tracking-wide'>Your Account has been created successfully</h1> 
      
       
      ): (
        <p>Your token has expired</p>
      )}
    </div>
  )
}

export default ActivationPage