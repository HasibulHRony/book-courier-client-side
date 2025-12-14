import React from 'react'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BookCard } from '../../Components/BookCard/BookCard';

export const LatestBooks = () => {

    const axiosSecure = useAxiosSecure()

    const { data: books = [] } = useQuery({
        queryKey: ['books', 6],
        queryFn: async () => {
            const res = await axiosSecure.get('/books?limit=6');
            return res.data;
        }
    });

    return (
        <div>
            <h2 className='text-center mt-4 font-bold text-2xl'>Latest Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto my-4">
                {
                    books.map((book, index) => <BookCard key={index} book={book}></BookCard>)
                }
            </div>
        </div>
    )
}
