import React, { useContext } from 'react'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Hooks/useAuth';

export const MyOrders = () => {

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const { data: orders = [] } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    }
  })

  console.log(orders)

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Title</th>
            <th>date</th>
            <th>OrderStatus</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order, index) =>
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{order?.bookName}</td>
                <td>{order?.isCanceled ? "" : <span>{new Date(order?.createdAt).toLocaleDateString()}</span>}</td>
                <td>{order?.isCanceled ? "" : <span>{order.orderStatus}</span>}</td>
                <td>{order?.isCanceled ? "" : <span>{order.paymentStatus}</span>}</td>
                <td>{order?.isCanceled ? <span>Order Canceled</span> :<div>{
                  order?.orderStatus === "pending" ? <p><button className='btn btn-sm'>cancel</button>{
                    order?.paymentStatus === "unpaid" ? <button className='btn btn-sm'>pay</button> : ''
                  }</p> : ''
                }</div>}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
