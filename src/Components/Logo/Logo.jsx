import React from 'react'
import bookLogo from '../../assets/booklogo.png'
import { Link } from 'react-router'
export const Logo = () => {
  return (
    <Link to={'/'}>
    <div className='flex flex-col items-center justify-center p-1 border bg-white rounded-2xl'>
        <img src={bookLogo} className='w-10 h-10 rounded-full' />
        <h3 className='text-xl font-bold'>BookCourier</h3>
    </div>
    </Link>
  )
}
