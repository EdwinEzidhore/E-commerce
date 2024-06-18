import React from 'react'

const Pagination = ({ totalItems, ItemsPerPage, CurntPage, setCurntPage }) => {
    
    const changePage = (page) => {
        setCurntPage(page);
    };
    
  return (
      <div className='flex items-center justify-center space-x-2 w-full mt-12'>
          {
              [...new Array(Math.ceil(totalItems / ItemsPerPage))].map((rec, index) => (
                <div className={index+1 ===CurntPage?`h-auto outline outline-blue-600 bg-blue-500 text-white font-semibold `:` h-auto outline outline-1 outline-slate-400 bg-gray-300 text-gray-600`} key={index}>
                      <button onClick={()=> changePage(index+1)} className='px-3'>{ index +1}</button>
            </div>
              ))
          }

    </div>
  )
}

export default Pagination
