import React, { useState } from 'react'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BookCard } from '../../Components/BookCard/BookCard';

export const AllBooks = () => {


  const [searchText, setSearchText] = useState('')
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ['books', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?searchText=${searchText}`);
      return res.data;
    }
  })

  return (
    <div>
      <h1 className='text-center text-2xl md:text-3xl font-bold my-4'>AllBooks: {data.length}</h1>
      <div className='my-2'>
        <p className='font-bold my-1'>search books: {searchText}</p>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search users" />

        </label>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto mb-4'>
        {
          data.map((book, index) => <BookCard book={book} key={index}></BookCard>)
        }
      </div>

    </div>
  )
}
