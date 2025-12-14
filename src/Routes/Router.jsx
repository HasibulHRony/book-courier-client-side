import React from 'react'
import { createBrowserRouter } from 'react-router';
import App from '../App';
import { MainLayouts } from '../LayOuts/MainLayouts';
import { HomePage } from '../Pages/Home/HomePage/HomePage';
import { AllBooks } from '../Pages/AllBooks/AllBooks';
import { RequestDelivery } from '../Pages/UserLogInPages/RequestDelivery/RequestDelivery';
import { AuthLayouts } from '../LayOuts/AuthLayouts';
import { DashBoardLayouts } from '../LayOuts/DashBoardLayouts';
import { LogIn } from '../Pages/AuthPages/LogIn';
import { MyOrders } from '../Pages/UserDashboards/MyOrders/MyOrders';
import { DashboardHome } from '../Pages/UserDashboards/DashboardHome/DashboardHome';
import { Registration } from '../Pages/AuthPages/Registration';
import { Profile } from '../Pages/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import { AddBooks } from '../Pages/AddBooks/AddBooks';
import { MyAddedBooks } from '../Pages/LibrarianDashBoard/MyAddedBooks/MyAddedBooks';
import { BookDetails } from '../Pages/BookDetails/BookDetails';
import { PaymentSuccess } from '../Pages/Payment/PaymentSuccess';
import { PaymentCancelled } from '../Pages/Payment/PaymentCancelled';
import { EditBook } from '../Pages/LibrarianDashBoard/MyAddedBooks/EditBook';
import { CustomersOrders } from '../Pages/LibrarianDashBoard/CustomersOrders/CustomersOrders';
import { AllUsers } from '../Pages/AllUsers/AllUsers';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayouts,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: 'all-books',
                element: <AllBooks></AllBooks>
            },
            {
                path: 'request-delivery',
                element: <RequestDelivery></RequestDelivery>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'book-details/:_id',
                element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>
            }

        ]
    },
    {
        path: '/auth',
        Component: AuthLayouts,
        children: [
            {
                path: 'login',
                element: <LogIn></LogIn>
            },
            {
                path: 'register',
                element: <Registration></Registration>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashBoardLayouts></DashBoardLayouts></PrivateRoute>,
        children: [
            {
                path: "",
                element: <DashboardHome />
            },
            {
                path: 'my-orders',
                element: <MyOrders></MyOrders>
            },
            {
                path: 'add-books',
                element: <AddBooks></AddBooks>
            },
            {
                path: 'my-added-books',
                element: <MyAddedBooks></MyAddedBooks>
            },
            {
                path: 'my-profile',
                element: <Profile></Profile>
            },
            {
                path: "payment-success",
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: "payment-cancelled",
                element: <PaymentCancelled></PaymentCancelled>
            },
            {
                path: 'edit-book/:id',
                element: <EditBook></EditBook>
            },
            {
                path: 'customers-orders',
                element: <CustomersOrders></CustomersOrders>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            }
        ]
    }
]);
