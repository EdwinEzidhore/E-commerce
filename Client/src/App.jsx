import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { Loginpage, Signuppage } from './Routes';
import { ActivationPage } from './Routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                <Route path='/login' element={<Loginpage />}></Route>
                <Route path='/signup' element={<Signuppage />}></Route>
                <Route path='/activation/:activation_token' element={<ActivationPage/>}></Route>
              </Routes>
              <ToastContainer
              position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition: Bounce
              />
          </BrowserRouter>
         
    </div>
  )
}

export default App
