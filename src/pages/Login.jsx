import React from 'react'
import "../scss/login.scss"
import {useForm} from "react-hook-form"
import {authApi} from "../callApi/authApi"
import globalStore from '../Redux/globalStore'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'



const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const state = useLocation().state
  const navigate = useNavigate();
  const onSubmit =async (data) => {
    try{
    const res= await authApi.login(data)
    
    res.isAdmin && globalStore.dispatch({type: "LOG_IN", payload: res})
    navigate( state?.from ? state.from : "/admin")

    }catch(err){
      console.log(err)
      throw err
    }
    
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
          <input type="submit" value="LOG IN"/>
        </form>
      </div>
    </div>
  )
}

export default Login