import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { CartContext } from '../Context/CartContext'



export default function Checkout() {
  let {checkout,cartId} = useContext(CartContext)
  


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city:"",
    },
    onSubmit: ()=> handleCheckout(cartId, `http://localhost:5173`)
  })

  async function handleCheckout(cartId,url){
    let {data}= await checkout(cartId,url, formik.values)
    // console.log(data.session.url);
    window.location.href = data.session.url;
    

  }



  return (
    <>
      <div className='my-8'>
        <h2 className='font-bold text-2xl text-emerald-600 mb-3'>Checkout Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto text-left">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="details" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details</label>
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
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
            <label htmlFor="city" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
          </div>
          
          <div className=' flex gap-3 items-center'>
          <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Checkout</button>
          </div>
        </form>
      </div>
    </>
  )
}
