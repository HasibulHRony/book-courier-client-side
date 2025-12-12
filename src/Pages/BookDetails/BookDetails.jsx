import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure'
import { Loading } from '../Loading/Loading'
import Swal from 'sweetalert2'
import { useAuth } from '../../Hooks/useAuth'
import { isCancel } from 'axios'

export const BookDetails = () => {
    const orderModelRef = useRef(null)
    const navigate = useNavigate()
    const { _id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()


    const { data = [], isLoading } = useQuery({
        queryKey: ['book', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${_id}`);
            return res.data;
        }
    })

    if (isLoading) return <Loading></Loading>

    const {
        bookName,
        authorName,
        bookPrice,
        bookDescription,
        bookPhoto,
        publicationStatus,
        librarianEmail,
        createdAt,
    } = data;



    const handleOrderModal = () => {
        orderModelRef.current.showModal()
    }


    const handleBookOrder = (e) => {
        e.preventDefault()
        const orderInfo = {
            customerName: user?.displayName,
            customerEmail: user?.email,
            phoneNumber: e.target.phoneNumber.value,
            address: e.target.address.value,
            bookId: _id,
            bookName: bookName,
            bookPrice: bookPrice,
            orderStatus: "pending",
            paymentStatus: "unpaid",
        }

        console.log(orderInfo)
        axiosSecure.post('/orders', orderInfo)
            .then(data => {
                if (data.data.insertedId) {
                    navigate('/dashboard/my-orders')
                    orderModelRef.current.close()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your order has been received.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error=>console.log(error))

    }


    return (
        <div>
            <div className="max-w-sm mx-auto mt-8 bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition">
                <img
                    src={bookPhoto}
                    alt={bookName}
                    className="w-full h-56 object-cover"
                />

                <div className="p-5 space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800">{bookName}</h2>

                    <p className="text-sm text-gray-600">{bookDescription}</p>

                    <div className="text-sm text-gray-700 space-y-1">
                        <p>
                            <span className="font-semibold">Author:</span> {authorName}
                        </p>
                        <p>
                            <span className="font-semibold">Librarian Email:</span>{" "}
                            {librarianEmail}
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span> {publicationStatus}
                        </p>
                        <p>
                            <span className="font-semibold">Posted At:</span>{" "}
                            {new Date(createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <button onClick={handleOrderModal} className="w-full mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Order Now
                    </button>
                </div>
            </div>


            <dialog ref={orderModelRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action">

                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <form onSubmit={handleBookOrder} method="dialog">
                                    <fieldset className="fieldset">
                                        <label className="label">Email</label>
                                        <input defaultValue={user?.email} name='customerEmail' readOnly type="email" className="input" />
                                        <label className="label">Name</label>
                                        <input type="text" name='customerName' className="input" readOnly defaultValue={user?.displayName} />
                                        <label className="label">address</label>
                                        <input type="text" name='address' className="input" placeholder='Enter Address' />
                                        <label className="label">Phone Number</label>
                                        <input type="text" name='phoneNumber' className="input" placeholder='phone number' />

                                        <button className="btn btn-neutral mt-4">Place Order</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
