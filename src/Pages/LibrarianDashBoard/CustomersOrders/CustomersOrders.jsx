import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { Loading } from '../../Loading/Loading';
import { isCancel } from 'axios';
import Swal from 'sweetalert2';

export const CustomersOrders = () => {

    const axiosSecure = useAxiosSecure()

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders`);
            return res.data;
        }
    })

    const orderStatusChange = (order) =>{
        
    }

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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>BookName</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{order?.bookName}</td>
                                    <td>{order?.isCanceled ? "Canceled" : <select defaultValue="Pick a color" name='publication_status' className="select">
                                        <option disabled={true}>publication</option>
                                        <option>Pending</option>
                                        <option>Shifted</option>
                                        <option>Delivered</option>
                                    </select>}</td>
                                    <td>{order?.isCanceled ? <span>Canceled</span> : <div> <button onClick={()=>handleCancelOrder(order)} className='btn btn-sm'>Cancel</button></div>}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
