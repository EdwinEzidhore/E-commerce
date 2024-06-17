import React from 'react'
import Nav from '../../Components/UserComponents/Nav/Nav'
import Home from '../../Components/UserComponents/Home/Home'


const HomePage = () => {
  return (
      <div >
       <div className='sticky top-0 backdrop-blur-xl z-10 '><Nav /></div>
      <Home/>
   
      </div>
         
    
  )
}

export default HomePage