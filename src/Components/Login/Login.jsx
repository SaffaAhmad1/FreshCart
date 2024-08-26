import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'


export default function Login() {
  let {setuserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [ApiError , setApiError] = useState("")
  const [isLoading , setisLoading] = useState(false)

  function handleLogin(values){
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((res)=>{
      setisLoading(false)
      console.log(res);
      if(res.data.message == "success"){
        localStorage.setItem("userToken" , res.data.token)
        setuserLogin(res.data.token)
        navigate("/")
      }
    })
    .catch((res)=>{
      setisLoading(false)
      // console.log(res.response.data.message);
      setApiError(res.response.data.message)
    })

  }

  let myValidation = Yup.object().shape({ 
    email:Yup.string().email("invalid email").required("email is required"),
    password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10 char").required("Password is required"), 
  })


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin
  })


  return (
    <>
    {ApiError ? <div className=' w-1/2 mx-auto my-4 py-2 bg-red-500 text-white rounded-lg '>{ApiError}</div> : null}
      <div className='my-8'>
        <h2 className='font-bold text-2xl text-emerald-600 mb-3'>Login Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto text-left">
          <div className="relative z-0 w-full mb-5 group">
            <input type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="email" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
            {formik.errors.email && formik.touched.email ? (
              <span className=' text-red-500'>{formik.errors.email}</span>
            ): null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="password" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
            {formik.errors.password && formik.touched.password ? (
              <span className=' text-red-500'>{formik.errors.password}</span>
            ): null}
          </div>

          <div className=' flex gap-3 justify-between items-center'>
          <div>
          <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
          <Link to={"/register"}><span className='ml-3 text-blue-500 underline'> Register Now</span>
          </Link>
          </div>
          <div >
          <Link className=" hover:text-green-600 underline" to={"/forgetpassword"}>
              Forget Password?
            </Link>
          </div>
            
          </div>
        </form>
      </div>
    </>
  )
}