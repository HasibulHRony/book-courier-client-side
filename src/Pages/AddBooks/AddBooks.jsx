import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure'
import { useAuth } from '../../Hooks/useAuth'

export const AddBooks = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const handleAddBooks = (data) => {
        const bookPhoto = data.BookPhoto[0]
        const uploadedBook = new FormData()
        uploadedBook.append("image", bookPhoto)

        const image_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGbb_HOSTING_KEY}`

        axios.post(image_url, uploadedBook)
            .then(res => {
                const bookInfo = {
                    bookName: data.BookName,
                    bookDescription: data.description,
                    bookPhoto: res.data.data.url,
                    bookPrice: data.price,
                    authorName: data.AuthorName,
                    publicationStatus: data.publicationStatus,
                    librarianEmail: user.email,
                }

                Swal.fire({
                    title: "Are you sure to add this book?",
                    text: "this will be added on your webpage!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, add it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axiosSecure.post('/books', bookInfo)
                            .then(res => {
                                if (res.data.insertedId) {

                                    console.log("book saved", res.data)
                                    Swal.fire({
                                        title: "Added!",
                                        text: "Your book has been Added.",
                                        icon: "success"
                                    });
                                }
                            }
                
                            )
                            .catch(error=>console.log(error))


                    }
                });

                console.log(bookInfo)
            })
            .catch(error => console.log(error))


    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 w-full max-w-md md:min-w-lg shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className='text-center my-4 text-2xl font-bold md:text-xl'>Add Books Here.........</h1>
                            <form onSubmit={handleSubmit((handleAddBooks))}>
                                <fieldset className="fieldset">
                                    <label className="label">Book Name</label>
                                    <input type="text" {...register("BookName", { required: true })} className="input" placeholder="BookName" />
                                    {
                                        errors.name?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter Book Name.</p>
                                    }

                                    <label className='label'>Book Photo</label>
                                    <input type="file" {...register("BookPhoto", { required: true })} className="file-input" />
                                    {
                                        errors.photo?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter Book photo.</p>
                                    }


                                    <label className="label">Book Author Name</label>
                                    <input type="text" {...register("AuthorName", { required: true })} className="input" placeholder="AuthorName" />
                                    {
                                        errors.name?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter Author Name.</p>
                                    }
                                    <label className="label">Book publication status</label>
                                    <select defaultValue="Pick a color" {...register('publicationStatus', { required: true })} className="select">
                                        <option disabled={true}>publication</option>
                                        <option>Published</option>
                                        <option>Unpublished</option>
                                    </select>

                                    <label className="label">Book Price</label>
                                    <input type="text" {...register("price", { required: true })} className="input" placeholder="Book Price" />
                                    {
                                        errors.email?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter price.</p>
                                    }


                                    <label className="label">Book description</label>
                                    <input type="text" {...register("description", { required: true })} className="input" placeholder="Book description" />
                                    {
                                        errors.email?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter description.</p>
                                    }

                                    <button className="btn btn-neutral mt-4">Submit</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
