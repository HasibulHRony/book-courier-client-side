import React from 'react'
import { GoogleLogIn } from './SocialLogIn/GoogleLogIn'
import { Link, useLocation, useNavigate } from 'react-router'
import { Logo } from '../../Components/Logo/Logo'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../Hooks/useAuth'

export const LogIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginByPassword } = useAuth()
  const { register, handleSubmit } = useForm();

  const handleLogInByPassword = (data) => {
    loginByPassword(data.email, data.password)
      .then(result => {
        navigate(location?.state || '/')
      })
      .catch(error => {
        console.log(error)
      })
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
              <h1 className='text-center my-4 text-2xl font-bold md:text-xl'>Please login.........</h1>
              <form onSubmit={handleSubmit(handleLogInByPassword)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
              </form>
              <p className='text-center font-bold text-2xl my-2'>OR</p>
              <GoogleLogIn></GoogleLogIn>
              <p>Don't have an account? please <Link to={'/auth/register'} className='text-blue-500 cursor-pointer'>Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
