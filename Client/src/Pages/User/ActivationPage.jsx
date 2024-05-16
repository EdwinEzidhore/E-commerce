import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ActivationPage = () => {

  const { activation_token } = useParams();
  const [error, setError] = useState(false);



  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios.post(`http://localhost:3333/api/v2/activation`, {
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
         <p>Your Account has created successfully</p> 
       
      ): (
        <p>Your token is expired</p>
      )}
    </div>
  )
}

export default ActivationPage