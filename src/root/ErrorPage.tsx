import React from 'react'

function ErrorPage() {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className=' p-20 bg-gray-200 rounded-xl'>
            <h1 className='text-3xl text-red-600'>An Error Occured </h1>
            <p className='text-gray-400 text-center mt-1'>Unable to fetch page</p>
        </div>
    </div>
  )
}

export default ErrorPage
