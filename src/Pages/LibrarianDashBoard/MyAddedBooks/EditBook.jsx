import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure'
import { Loading } from '../../Loading/Loading'
import Swal from 'sweetalert2'

export const EditBook = () => {
  const axiosSecure = useAxiosSecure()
  const { id } = useParams()
  console.log(id)

  const { data: book, isLoading, refetch } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    }
  })

  if(isLoading){
    return <Loading></Loading>
  }
  console.log(book)

  const {
    bookName,
    authorName,
    bookPrice,
    bookDescription,
    bookPhoto,
    publicationStatus,
    librarianEmail,
    createdAt,
  } = book;



  const handleEditBookInfo=(e)=>{
    e.preventDefault()
    const editedInfo = {
      bookName: e.target.book_name.value,
      authorName: e.target.author_name.value,
      bookPrice: e.target.book_price.value,
      bookDescription: e.target.book_description.value,
      bookPhoto: bookPhoto,
      publicationStatus: e.target.publication_status.value,
      librarianEmail: e.target.librarian_email.value,
      createdAt: createdAt
    }
    console.log(editedInfo)

    axiosSecure.patch(`/books/${id}`, editedInfo)
    .then(data=>{
      refetch()
      Swal.fire("Updated Successfully", "", "success")
      console.log(data)

    })
    .catch(error=>console.log(error))

  }


  return (
    <div>
      <div className="max-w-sm my-8 mx-auto bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition">
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
            <p>{bookPrice}</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 mx-auto mb-8 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleEditBookInfo} method="dialog">
            <fieldset className="fieldset">
              <label className="label">Book Name:</label>
              <input name='book_name' placeholder='book name' type="text" className="input" />
              <label className="label">Librarian Email</label>
              <input name='librarian_email' placeholder='librarian email' type="email" className="input" />
              <label className="label">author Name</label>
              <input type="text" name='author_name' className="input" placeholder='author name' />
              <label className="label">price</label>
              <input type="text" name='book_price' className="input" placeholder='Enter price' />
              <label className="label">Book Description</label>
              <input type="text" name='book_description' className="input" placeholder='description' />
              <label className="label">Book publication status</label>
              <select defaultValue="Pick a color" name='publication_status' className="select">
                <option disabled={true}>publication</option>
                <option>Published</option>
                <option>Unpublished</option>
              </select>
              <button className="btn btn-neutral mt-4">Submit edited Info</button>
            </fieldset>
          </form>
        </div>
      </div>

    </div>
  )
}
