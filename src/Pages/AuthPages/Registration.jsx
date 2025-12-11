import React from 'react'
import { useAuth } from '../../Hooks/useAuth'
import { GoogleLogIn } from './SocialLogIn/GoogleLogIn';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import axios from 'axios';
import { Logo } from '../../Components/Logo/Logo';

export const Registration = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const { createUserByEmailPassWord, updateProfileInfo } = useAuth();

  const handleRegistration = (data) => {
    const profilePhoto = data.photo[0]
    createUserByEmailPassWord(data.email, data.password)
      .then(() => {
        const uploadedData = new FormData()
        uploadedData.append('image', profilePhoto)

        const image_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGbb_HOSTING_KEY}`

        axios.post(image_url, uploadedData)
          .then(res => {
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url
            }

            updateProfileInfo(userProfile)
            .then(()=>console.log('user profile updated successfully!'))
            .catch(error=>console.log(error))
          })

      })
      .catch(error=>console.log(error))
  }

  return (
    <div>
      <div>
        <Logo></Logo>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-full max-w-md md:min-w-lg shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className='text-center my-4 text-2xl font-bold md:text-xl'>Please Register.........</h1>
              <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input type="text" {...register("name", { required: true })} className="input" placeholder="name" />
                  {
                    errors.name?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter name.</p>
                  }
                  <label className="label">Email</label>
                  <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                  {
                    errors.email?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter email.</p>
                  }
                  <label className='label'>Your Photo</label>
                  <input type="file" {...register("photo", { required: true })} className="file-input" />
                  {
                    errors.photo?.type === 'required' && <p className='text-center text-sm py-1 text-red-500'>You must enter photo.</p>
                  }
                  <label className="label">Password</label>
                  <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\/?]).{6,}$/ })} className="input" placeholder="Password" />

                  {
                    errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                  }

                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
              </form>
              <p className='text-center font-bold text-2xl my-2'>OR</p>
              <GoogleLogIn></GoogleLogIn>
              <p>Already have an account? please <Link to={'/auth/login'} className='text-blue-500 cursor-pointer'>LogIn</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
