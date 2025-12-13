import React from 'react'
import { GoSidebarCollapse } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { NavLink, Outlet } from 'react-router'

export const DashBoardLayouts = () => {
    const links = <>
        <li><NavLink to={"/"}><IoMdArrowRoundBack />Go Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard Home</NavLink></li>
        <li><NavLink to="/dashboard/my-orders">My Orders</NavLink></li>
        <li><NavLink to="/dashboard/add-books">Add Books</NavLink></li>
        <li><NavLink to="/dashboard/my-added-books">My added Books</NavLink></li>
        <li><NavLink to="/dashboard/my-profile">My Profile</NavLink></li>
        <li><NavLink to="/dashboard/customers-orders">Customers Orders</NavLink></li>
    </>
    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            <div className="flex items-center justify-between lg:hidden">
                <label htmlFor="dashboard-drawer" className="btn-sm p-2 bg-gray-500">
                    <GoSidebarCollapse />
                </label>
            </div>

            <div className="drawer-content p-4">
                {/* Child pages load here */}
                <Outlet />
            </div>

            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 p-4 w-80 min-h-full">
                    {
                        links
                    }
                </ul>
            </div>
        </div>
    )
}
