import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminLoginProtected = () => {

const isAdminLoggedIn=useSelector(state=>state.admin.isAdminLoggedIn)


  return isAdminLoggedIn?<Outlet/>:<Navigate to={'/'}></Navigate>
}

export default AdminLoginProtected