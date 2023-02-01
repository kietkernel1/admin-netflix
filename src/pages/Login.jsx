import React from 'react'
import "../scss/login.scss"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom'
import  { fetchLogin }  from '../loginProcess/fetchLogin'
import { useSelector } from 'react-redux'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const state = useLocation().state
  const navigate = useNavigate();
  const { error, user } = useSelector(state => state.loginReducer)
  console.log(error)
  const onSubmit = async (data) => {
    await fetchLogin(data)
    navigate( "/admin")
  };
  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1>Netflix Admin</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Enter your username" {...register("username", { required: true })}/>
          {errors.username  && <span className='login-form-warning'>Username don't be blank</span>}
          <input type="password" {...register("password", { required: true })}/>
          {errors.password  && <span className='login-form-warning'>Password don't be blank</span>}
          <p color='red'>{error}</p>
          <input type="submit" value="LOG IN"/>
        </form>
      </div>
    </div>
  )
}

export default Login