import React from 'react'
import { NavBar } from '../Components/NavBar/NavBar'
import { Outlet } from 'react-router'
import { Footer } from '../Components/Footer/Footer'

export const MainLayouts = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className=' max-w-7xl mx-auto min-h-[calc(100vh-200px)]'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}
