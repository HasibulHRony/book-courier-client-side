import React from 'react'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const AllUsers = () => {

    const axiosSecure = useAxiosSecure()


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    const handleMakeLibrarian = (eachUser) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be promoted to Librarian",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Librarian"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${eachUser._id}`, { role: 'librarian' });

                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        "Success!",
                        "User has been added as Librarian",
                        "success"
                    );
                    refetch();
                }
            }
        });
    }
    const handleMakeUser = (eachUser) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be promoted to user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make user"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${eachUser._id}`, { role: 'user' });

                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        "Success!",
                        "User has been added as normal user",
                        "success"
                    );
                    refetch();
                }
            }
        });
    }
    const handleMakeAdmin = (eachUser) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be promoted to admin",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${eachUser._id}`, { role: 'admin' });

                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        "Success!",
                        "User has been added as normal admin",
                        "success"
                    );
                    refetch();
                }
            }
        });
    }


    return (

        <div>
            <h1 className='text-2xl text-center font-bold my-4'>All Users Have Registered</h1>
            <div>Total Users: {users.length}</div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Changing Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((eachUser, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{eachUser?.displayName}</td>
                                <td>{eachUser?.email}</td>
                                <td>{eachUser?.role}</td>
                                <td>
                                    {eachUser.role === "user" && <div><button onClick={() => handleMakeLibrarian(eachUser)} className='btn btn-sm mr-2'>Make Librarian</button><button onClick={() => handleMakeAdmin(eachUser)} className='btn btn-sm'>Make as Admin</button></div>}
                                    {eachUser.role === "librarian" && <div><button className='btn btn-sm mr-2' onClick={() => handleMakeUser(eachUser)}>Make as user</button><button onClick={() => handleMakeAdmin(eachUser)} className='btn btn-sm'>Make as Admin</button></div>}
                                    {eachUser.role === "admin" && <span>Added as admin</span>}

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    )
}
