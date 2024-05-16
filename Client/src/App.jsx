import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { Loginpage, Signuppage } from './Routes';
import { ActivationPage } from './Routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/User/HomePage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminHomepage from './Pages/Admin/AdminHomepage';
import AddProductForm from './Components/AdminComponents/AddProductForm';
import AdminAddProductpage from './Pages/Admin/AdminAddProductpage';
import AdminUsers from './Pages/Admin/AdminUsers';
import ProfilePage from './Pages/User/ProfilePage';
import ProductSinglePage from './Pages/User/ProductSinglePage';
import CartPage from './Pages/User/CartPage';


function App() {
  return (
      <div>
          <BrowserRouter>
        <Routes>
          
          {/*User routes */}
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/login' element={<Loginpage />}></Route>
                <Route path='/signup' element={<Signuppage />}></Route>
                <Route path='/activation/:activation_token' element={<ActivationPage />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/p' element={<ProductSinglePage />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>

          
          

          
          

          {/*Admin Routess */}
                <Route path='/Admin' element={<AdminLoginPage/> } />   
                <Route path='/Admin-Home' element={<AdminHomepage />} />
                <Route path='/Admin-product' element={ <AdminAddProductpage/>} />
                <Route path="/addproduct" element={< AddProductForm />} />
                <Route path="/Admin-users" element={<AdminUsers/>} />
          
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
