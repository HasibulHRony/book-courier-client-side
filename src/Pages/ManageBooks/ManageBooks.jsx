import React from 'react'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const ManageBooks = () => {

    const axiosSecure = useAxiosSecure()
    const { data: books = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        }
    })

    const handleBookPublish = (book) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This book will be published",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make published"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/books/${book._id}`, {publicationStatus: "Published"});

                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        "Success!",
                        "book has been published",
                        "success"
                    );
                    refetch();
                }
            }
        });
    }
    const handleBookUnpublish = (book) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This book will be unPublished",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make unPublished"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/books/${book._id}`, {publicationStatus: "Unpublished"});

                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        "Success!",
                        "book has been Unpublished",
                        "success"
                    );
                    refetch();
                }
            }
        });
    }
    const handleBookDelete = (book) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This book will be Deleted with all its orders",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make deleted"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/books/${book._id}`);

                if (res.data.bookDeleted  > 0) {
                    Swal.fire(
                        "Success!",
                        "book has been deleted",
                        "success"
                    );
                    refetch();
                }
            }
        });
    }


    console.log(books)

    return (
        <div>
            <h1>Manage All Books</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{book.bookName}</td>
                                    <td>{book.publicationStatus}</td>
                                    <td>{book.publicationStatus === 'Published' ?
                                        <button onClick={()=>handleBookUnpublish(book)} className='btn btn-sm'>UnPublish</button> : <button onClick={() => handleBookPublish(book)} className='btn btn-sm'>Publish</button>}</td>
                                    <td><button onClick={()=>handleBookDelete(book)} className='btn btn-sm'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
