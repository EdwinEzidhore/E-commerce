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
import Maintenance from './Components/UserComponents/Loading/Maintenance';
import Wishlist from './Pages/User/Wishlist';
import AdminCoupon from './Pages/Admin/AdminCoupon';
import AddCouponForm from './Components/AdminComponents/AddCouponForm';
import UserInformation from './Components/UserComponents/Profile/UserInformation';
import Orders from './Components/UserComponents/Profile/Orders';
import SideBar from './Components/UserComponents/SideBarFilter/SideBar';
import ForgotPassword from './Components/UserComponents/Login/ForgotPassword';
import ResetPassword from './Components/UserComponents/Login/ResetPassword';
import OTP from './Components/UserComponents/Login/OTP';
import {Protected,LoginProtectedRoute} from './Protected/Protected';
import EditProductForm from './Components/AdminComponents/EditProductForm';
import AdminHeader from './Components/AdminComponents/AdminHeader';
import AdminLoginProtected from './Protected/AdminLoginProtected';
import Coupons from './Components/UserComponents/Profile/Coupons';

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
         
                  <Route path='/' element={<HomePage />}></Route>
                  <Route element={<LoginProtectedRoute />}>
                    <Route path='/login' element={<Loginpage />}></Route>
                    <Route path='/signup' element={<Signuppage />}></Route>
                  </Route>
                  <Route path='/forgot-password' element={< ForgotPassword />}></Route>
                  <Route element={<Protected />}>
                    <Route path='/reset-password' element={< ResetPassword/>}></Route>
                  </Route>
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
                  <Route path='/wishlist' element={<Wishlist />}></Route>
                  <Route path='/orders' element={<Orders />}></Route>
                  <Route path='/coupon' element={<Coupons />}></Route>
                  <Route path='/user-information' element={<UserInformation />}></Route>
                  <Route path='/maintenance' element={<Maintenance />}></Route>

                  {/*Admin Routess */}
             
                  <Route path='/Admin' element={<AdminLoginPage />} />
                  <Route  element={<AdminHeader />} />
                  <Route element={<AdminLoginProtected />} >
                    <Route path='/Admin-Home' element={<AdminHomepage />} />
                    <Route path='/Admin-product' element={ <AdminAddProductpage/>} />
                    <Route path="/addproduct" element={< AddProductForm />} />
                    <Route path="/Admin-users" element={<AdminUsers />} />
                    <Route path="/Admin-orders" element={<AdminOrders />} />
                    <Route path="/Admin-coupon" element={<AdminCoupon />} />
                    <Route path="/addCoupon" element={<AddCouponForm />} />
                    <Route path="/editproduct" element={<EditProductForm/>} />
                  </Route>

              </Routes>
              <ToastContainer
              position="top-center"
                autoClose={3000}
                hideProgressBar={true}
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
