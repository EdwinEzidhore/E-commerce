import React from 'react'
import { BrowserRouter, Route, Routes, ScrollRestoration, useLocation  } from 'react-router-dom'
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
import ScrollToTop from './Components/UserComponents/ScrollToTop';
import {Provider} from 'react-redux'
import { store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import PaymentPage from './Pages/User/PaymentPage';
import PaymentSucesspage from './Pages/User/PaymentSucesspage';
import Womens from './Pages/User/Womens';
import Address from './Components/UserComponents/Profile/Address';
import AdminOrders from './Pages/Admin/AdminOrders';
import Men from './Pages/User/Men';
import CategoryPage from './Pages/User/CategoryPage';
function App() {

  
  let persistor = persistStore(store);
  return (
    <div>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
        
          {/*User routes */}
         
          <Route path='/' element={<HomePage/>}></Route>
              <Route path='/login' element={<Loginpage />}></Route>
              <Route path='/signup' element={<Signuppage />}></Route>
              <Route path='/activation/:activation_token' element={<ActivationPage />}></Route>
              <Route path='/profile' element={<ProfilePage />}></Route>
              <Route path='/p' element={<ProductSinglePage />}></Route>
              <Route path='/cart' element={<CartPage />}></Route>
              <Route path='/payment' element={<PaymentPage />}></Route>
              <Route path='/payment-sucess' element={<PaymentSucesspage />}></Route>
              <Route path='/women' element={<Womens />}></Route>
              <Route path='/Address' element={<Address />}></Route>
              <Route path='/men' element={<Men />}></Route>

              <Route path='/cat' element={<CategoryPage />}></Route>


              







              
          
        
          {/*Admin Routess */}
                <Route path='/Admin' element={<AdminLoginPage/> } />   
                <Route path='/Admin-Home' element={<AdminHomepage />} />
                <Route path='/Admin-product' element={ <AdminAddProductpage/>} />
                <Route path="/addproduct" element={< AddProductForm />} />
              <Route path="/Admin-users" element={<AdminUsers />} />
              <Route path="/Admin-orders" element={<AdminOrders/>} />
              
          
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
          </PersistGate>
          </Provider>
    </div>
  )
}

export default App
