import React from 'react'

const SideBar = React.memo(({ brands,
  colors,
  handlebrandChange,
  handleColorChange,
  handleSortChange,
  handleClearBtn,
  toggleFilter,
  ChangeToggle,
}) => {
    
 

  
  return (
    <div className={`${toggleFilter? 'sm:col-span-12 w-full  ':'sm:hidden'} lg:static lg:z-0 lg:grid lg:col-span-2 border pl-5 lg:pt-5 h-fit shadow-md`}>
          <form action="">
          <div className='flex justify-evenly my-5'>
            <div className=' h-auto bg-[#1c7293] text-white font-semibold rounded-md'><button className='py-2 px-3' onClick={() => handleClearBtn()}>Clear Filters</button></div>
            
        </div>
        <div className='uppercase font-semibold mb-4 text-slate-800'>Filter by price</div>
        <hr/>
    <div className='my-4 text-slate-700 space-x-2 flex items-center'>
        <input className='accent-red-500 w-4 h-4 '  type="radio" id='low' name='price' value='LTH' onChange={(e)=>handleSortChange(e)}/>
        <label  className='' htmlFor="low">Low to High</label>
    </div>
    <div className='mb-5 text-slate-700 space-x-2 flex items-center'>
        <input className='accent-red-500 w-4 h-4' type="radio" id='high' name='price' value='HTL' onChange={(e)=>handleSortChange(e)}/>
        <label htmlFor="high">High to Low</label>
    </div>
    <div className='text-slate-700'>
        <div className='uppercase font-semibold my-4 text-slate-800'>Brand</div>
                  <hr />
                  <div className=''>
                  {
                brands.length > 0 &&brands.map((brand,index) => (
                  <div className='my-3 space-x-2 ' key={index}>
                  <input type="checkbox" className='accent-red-500 w-4 h-4'  id={brand} name='brand' value={brand} onChange={(e)=>handlebrandChange(e)}/>
                      <label htmlFor={brand}>{ brand}</label>
                  </div>
                ))
                }
                  </div>


        </div>
        
        <div className='text-slate-700 mt-5'>
            <div className='uppercase font-semibold mb-4 text-slate-800'>Color</div>
            <hr />
            {
                colors.length > 0 && colors.map((color, index) => (
                  <div  className='mb-3 space-x-2' key={index}>
                  <input className='accent-red-500 w-4 h-4' type="checkbox" id={color} name='color' value={color} onChange={(e)=>handleColorChange(e)} />
                        <label htmlFor={color}>{color }</label>
              </div >
                ))
            }

        </div>

    </form>

</div>
  )
})

export default SideBar