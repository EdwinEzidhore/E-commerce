import React from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'


const AdminHomepage = () => {
  return (
      <section>
          
      <AdminHeader />

      <div className='mt-2 ml-64  p-1 h-screen bg-red-200'>
        <div>
          <h1>Dashboard</h1>

          <div className='flex item-center space-x-2 gap-3 p-5'>
            <div className=' bg-red-500  flex items-center gap-4 space-x-1'>
              <div className='icon'><box-icon name='dollar-circle' type='solid' ></box-icon></div>
              <div>
                <h1>Revenue</h1>
                <h1><span><box-icon name='rupee' ></box-icon>2230505750</span></h1>
                <p>somethinggggg</p>
              </div>
            </div>

            <div className=' bg-red-500  flex items-center gap-4 space-x-1'>
              <div className='icon'><box-icon name='dollar-circle' type='solid' ></box-icon></div>
              <div>
                <h1>Revenue</h1>
                <h1><span><box-icon name='rupee' ></box-icon>2230505750</span></h1>
                <p>somethinggggg</p>
              </div>
            </div>

            <div className=' bg-red-500  flex items-center gap-4 space-x-1'>
              <div className='icon'><box-icon name='dollar-circle' type='solid' ></box-icon></div>
              <div>
                <h1>Revenue</h1>
                <h1><span><box-icon name='rupee' ></box-icon>2230505750</span></h1>
                <p>somethinggggg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default AdminHomepage