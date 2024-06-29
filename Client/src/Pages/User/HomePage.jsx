import React from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Home from '../../Components/UserComponents/Home/Home'


const HomePage = () => {
  return (
      <div className=''>
       <div className='sticky top-0 bg-white z-20 '><Nav /></div>
      <Home/>
   
      </div>
         
    
  )
}

export default HomePage