import React from 'react'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BookCard } from '../../Components/BookCard/BookCard';

export const AllBooks = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books`);
      return res.data;
    }
  })

  return (
    <div>
      <h1 className='text-center text-2xl md:text-3xl font-bold my-4'>AllBooks: {data.length}</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto mb-4'>
        {
          data.map((book,index)=><BookCard book={book} key={index}></BookCard>)
        }
      </div>

    </div>
  )
}
