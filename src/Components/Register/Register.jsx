import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'


export default function Register() {

  let {setuserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [ApiError , setApiError] = useState("")
  const [isLoading , setisLoading] = useState(false)

  function handleRegister(values){
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
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
    name:Yup.string().min(3,"min length is 3").max(10,"max lenght is 10").required("name is required"),
    email:Yup.string().email("invalid email").required("email is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone number").required("phone is required"),
    password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10 char").required("Password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")], "rePassword and password not the same").required("rePassword is required")
  })


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: myValidation,
    onSubmit: handleRegister
  })


  return (
    <>
    {ApiError ? <div className=' w-1/2 mx-auto my-4 py-2 bg-red-500 text-white rounded-lg '>{ApiError}</div> : null}
      <div className='my-8'>
        <h2 className='font-bold text-2xl text-emerald-600 mb-3'>Register Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto text-left">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="name" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
            {formik.errors.name && formik.touched.name ? (
              <span className=' text-red-500'>{formik.errors.name}</span>
            ): null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="tel"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="phone" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
            {formik.errors.phone && formik.touched.phone ? (
              <span className=' text-red-500'>{formik.errors.phone}</span>
            ): null}
          </div>
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
          <div className="relative z-0 w-full mb-5 group">
            <input type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="rePassword" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your RePassword</label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <span className=' text-red-500'>{formik.errors.rePassword}</span>
            ): null}
          </div>

          <div className=' flex gap-3 items-center'>
          <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
          <Link to={"/login"}><span className='text-blue-500 underline'>do you have an account? Login Now</span></Link>
          </div>
        </form>
      </div>
    </>
  )
}