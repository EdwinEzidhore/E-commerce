import React from 'react'

const Pagination = ({ totalItems, ItemsPerPage, CurntPage, setCurntPage }) => {
    
    const changePage = (page) => {
        setCurntPage(page);
    };
    
  return (
      <div className='flex items-center justify-center space-x-2  mt-5 mb-5 '>
          {/* {
              [...new Array(Math.ceil(totalItems / ItemsPerPage))].map((rec, index) => (
                <div className={index+1 ===CurntPage?` h-auto outline outline-blue-600 bg-blue-500 text-white font-semibold `:` h-auto outline outline-1 outline-slate-400 bg-gray-300 text-gray-600`} key={index}>
                      <button onClick={()=> changePage(index+1)} className='px-3'>{ index +1}</button>
            </div>
              ))
          } */}

      <button className='h-auto bg-[#495057] py-1 px-2 rounded-md text-white' disabled={CurntPage === 1 ? true : false} onClick={() => changePage(CurntPage - 1)}>Previous</button>
      <div className='  border border-slate-300  bg-slate-200  font-semibold px-2'>{CurntPage }</div>
      <button className='bg-[#495057]  text-white px-4 py-1 rounded-md' disabled={CurntPage===Math.ceil(totalItems/ItemsPerPage)?true:false} onClick={()=>changePage(CurntPage+1)}>Next</button>
    </div>
  )
}

export default Pagination
