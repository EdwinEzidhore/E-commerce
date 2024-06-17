import React from 'react'

const Pagination = ({ totalItems, ItemsPerPage, CurntPage, setCurntPage }) => {
    
    const changePage = (page) => {
        setCurntPage(page);
    };
    
  return (
      <div className='flex items-center justify-center space-x-2 w-full mt-12'>
          {
              [...new Array(Math.ceil(totalItems / ItemsPerPage))].map((rec, index) => (
                <div className={index+1 ===CurntPage?`h-auto outline bg-blue-500 text-white`:`h-auto outline`} key={index}>
                      <button onClick={()=> changePage(index+1)} className='px-2'>{ index +1}</button>
            </div>
              ))
          }

    </div>
  )
}

export default Pagination
