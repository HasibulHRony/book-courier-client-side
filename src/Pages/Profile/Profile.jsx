import React from 'react'
import { useAuth } from '../../Hooks/useAuth'
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Profile = () => {

    const { user, logOut, updateProfileInfo } = useAuth()
    const { register, handleSubmit, } = useForm();
    

    const handleUpdateInfo = (data) => {
        const updatePhoto = data.photo[0]
        // console.log(data, updatePhoto)

        const updatedData = new FormData()
        updatedData.append('image', updatePhoto)

        const image_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGbb_HOSTING_KEY}`

        axios.post(image_url, updatedData)
            .then(res => {
                const updateProfile = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }

                updateProfileInfo(updateProfile)
                    .then(() => console.log('updated successfully!'))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('successfully logged out!')
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='mx-auto items-center flex-col justify-center w-[480px] min-h-[calc(100vh-202px)] border-2 flex'>
            <div>
                <div>
                    <img src={user?.photoURL} className='h-[280px] w-[280px]' />
                </div>
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
            </div>
            <div>
                <button className='btn' onClick={handleLogOut}>LogOut</button>
            </div>
            <div>
                <form onSubmit={handleSubmit(handleUpdateInfo)}>
                    <fieldset>
                        <label className="label">Name:</label><br></br>
                        <input type="text" {...register("name", { required: true })} className="input" placeholder="name" /><br></br>
                        <label className="label">Profile Picture</label><br></br>
                        <input type="file" {...register("photo", { required: true })} className="file-input" /><br></br>
                        <button className='btn'>update</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
