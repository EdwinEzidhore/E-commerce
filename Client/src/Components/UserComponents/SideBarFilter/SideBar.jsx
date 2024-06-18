import React from 'react'

const SideBar = ({ brands, colors }) => {
    
   
  return (
    <div className='grid col-span-2 border p-5 h-fit shadow-md'>
    <form action="">
        <div className='uppercase font-semibold mb-4 text-slate-800'>Filter by price</div>
        <hr/>
    <div className='my-4 text-slate-700 space-x-2'>
        <input type="radio" id='low' name='price' value='LTh' />
        <label htmlFor="low">Low to High</label>
    </div>
    <div className='mb-5 text-slate-700 space-x-2'>
        <input type="radio" id='high' name='price'/>
        <label htmlFor="high">High to Low</label>
    </div>
    <div className='text-slate-700'>
        <div className='uppercase font-semibold my-4 text-slate-800'>Brand</div>
            <hr />
            {
                brands.length > 0 &&brands.map((brand,index) => (
                  <div className='my-3 space-x-2 ' key={index}>
                  <input type="radio" id={brand} name='brand' value={brand} onChange={(e)=>handleChange(e)}/>
                      <label htmlFor={brand}>{ brand}</label>
                  </div>
                ))
            }

        </div>
        
        <div className='text-slate-700 mt-5'>
            <div className='uppercase font-semibold mb-4 text-slate-800'>Color</div>
            <hr />
            {
                colors.length > 0 && colors.map((color, index) => (
                  <div  className='mb-3 space-x-2' key={index}>
                  <input type="radio" id={color} name='color' value={color} onChange={(e)=>handleChange(e)} />
                        <label htmlFor={color}>{color }</label>
              </div >
                ))
            }

        </div>
        <div className='flex justify-between my-5'>
            <div className='h-auto border bg-emerald-500  rounded-md text-white font-semibold'>
                <button className='p-1 px-2'>Apply filters</button>
            </div>
            <div className='h-auto border bg-emerald-500 text-white font-semibold rounded-md
            '>
                <button className='p-1 px-2'>Clear</button>
            </div>
            
        </div>
    </form>

</div>
  )
}

export default SideBar