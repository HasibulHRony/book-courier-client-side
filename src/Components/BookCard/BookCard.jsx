import React from 'react'
import { Link } from 'react-router';

export const BookCard = ({ book }) => {
    const {
        bookName,
        authorName,
        bookDescription,
        bookPhoto,
        publicationStatus,
        librarianEmail,
        createdAt,
        _id

    } = book;
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition">
            <img
                src={bookPhoto}
                alt={bookName}
                className="w-full h-56 object-cover"
            />

            <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">{bookName}</h2>

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

                <Link to={`/book-details/${_id}`}><button className="w-full mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Book Details
                </button></Link>
            </div>
        </div>
    )
}
