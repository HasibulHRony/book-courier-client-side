import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Hooks/useAuth';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { EditBook } from './EditBook';

export const MyAddedBooks = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: books = [], refetch } = useQuery({
    queryKey: ['books', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user?.email}`);
      return res.data;
    }
  })

  console.log(books)

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Photo</th>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {
            books.map((book, index) => <tr key={index}>
              <th>
                <label>
                  <span>{index+1}</span>
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={book.bookPhoto} />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {book.bookName}
              </td>
              <td>
                <Link to={`/dashboard/edit-book/${book._id}`}><button className='btn btn-sm'>Edit Book</button></Link>
              </td>
            </tr>)
          }

        </tbody>
      </table>
    </div>
  )
}
