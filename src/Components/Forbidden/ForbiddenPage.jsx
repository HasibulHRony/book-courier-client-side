import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router'

export const ForbiddenPage = () => {
  return (
    <div className='flex items-center justify-center min-h-10/12'>
      <div>
        <h1 className='text-center text-3xl my-4 font-bold'>You are forbidden to Access this page</h1>
        <div>
          <Link to={'/'}><button className='btn mr-2'><IoMdArrowRoundBack />Back To Home</button></Link>
          <Link to={'/dashboard'}><button className='btn mr-2'><IoMdArrowRoundBack />Back To dashboard</button></Link>
        </div>
      </div>

    </div>
  )
}
