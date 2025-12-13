import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { Loading } from '../../Loading/Loading';
import { isCancel } from 'axios';
import Swal from 'sweetalert2';

export const CustomersOrders = () => {


    const [statusValues, setStatusValues] = useState({});
    const axiosSecure = useAxiosSecure()

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders`);
            return res.data;
        }
    })

    const handleStatusChange = (orderId, value) => {
        setStatusValues((prev) => ({
            ...prev,
            [orderId]: value,
        }));
    };


    const handleUpdateStatus = async (orderId) => {
        const status = statusValues[orderId];

        if (!status) {
            return Swal.fire("Please select a status first");
        }

        const res = await axiosSecure.patch(`/orders/${orderId}`, {
            orderStatus: status,
        });

        if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Order status updated", "success");
            refetch();
        }
    };

    const handleCancelOrder = (order) => {

        const cancelInfo = {
            isCanceled: true
        }

        axiosSecure.patch(`/orders/${order._id}`, cancelInfo)
            .then(res => {
                refetch()
                console.log(res.data)
                Swal.fire("Order Cancelled!", "", "success")
            })
            .catch(error => console.log(error))
    }


    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(orders)

    return (
        <div>
            <h1 className='my-5 md:my-8 text-center text-2xl font-bold'>All Orders Of Customers</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>BookName</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{order?.bookName}</td>
                                    <td>{order?.isCanceled ? "Canceled" : <select
                                        className="select select-bordered select-sm"
                                        value={
                                            statusValues[order._id] || order.publicationStatus
                                        }
                                        onChange={(e) =>
                                            handleStatusChange(order._id, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shifted">Shifted</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>}</td>
                                    <td>{order?.paymentStatus !== "unpaid" ? <span>wait until pay.</span> : <div> <button
                                        onClick={() => handleUpdateStatus(order._id)}
                                        className="btn btn-sm ml-2"
                                    >
                                        Update
                                    </button></div>}</td>
                                    <td>{order?.isCanceled ? <span>Canceled</span> :<button onClick={() => handleCancelOrder(order)} className='btn btn-sm'>Cancel</button>}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
