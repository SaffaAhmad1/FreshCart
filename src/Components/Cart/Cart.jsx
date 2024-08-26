import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { getLoggedUserCart, updateCartProductQuantity, removeSpecificCartItem,setcartItemsNum ,cartItemsNum} = useContext(CartContext)
  const [cartDetails, setcartDetails] = useState(null)
  const [loading,setloading] =useState(false)
  const [currentId , setcurrentId] = useState(0)


  async function getCartItems() {
    let response = await getLoggedUserCart()
    console.log(response);
    if (response.data.status == "success") {
      setcartDetails(response.data.data)
    }
  }

  async function updateProductQuantity(id, count) {
    setcurrentId(id)
    setloading(true)
    if(count == 0){
      deleteItem(id)
    } else{
      let response = await updateCartProductQuantity(id, count)
    console.log(response);
    if (response.data.status == "success") {
      setcartDetails(response.data.data)
      toast.success("Product Updated Succrssfully")
      setloading(false)
    } else {
      toast.error("Error")
      setloading(false)
    }
    }

  }

  async function deleteItem(id) {
    setloading(true)
    let response = await removeSpecificCartItem(id)
    console.log(response);
    if (response.data.status == "success") {
      setcartItemsNum(cartItemsNum -1)
      setcartDetails(response.data.data)
      setloading(false)
    }


  }



  useEffect(() => {
    getCartItems()
  }, [])


  return (
    <>
      
        {cartDetails != null ?
        <>
        {cartDetails?.products.length > 0 ? <>
          <h2 className='font-bold capitalize text-2xl text-emerald-600 py-6 my-5'> total price : {cartDetails?.totalCartPrice} EGP</h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
              <thead className="text-xs text-gray-700 uppercase bg-emerald-100 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => <tr key={product.product.id} className="bg-white border-b  hover:bg-emerald-100  ">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900  ">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-emerald-500 bg-white border border-emerald-300 rounded-full focus:outline-none hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-200  " type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                      {loading && currentId == product.product.id ? <i className='fas fa-spinner fa-spin'></i>: product.count}
                        
                      </div>
                      <button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} className="inline-flex items-center justify-center p-1 ms-3 text-sm font-medium h-6 w-6 text-emerald-500 bg-white border border-emerald-300 rounded-full focus:outline-none hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-200 " type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span onClick={() => deleteItem(product.product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">
                    <i className="fa fa-trash"></i> Remove
                    </span>
                  </td>
                </tr>)}
                <tr>
                  <td className="py-4 text-2xl text-center">Total Prise</td>
                  <td
                    colSpan={3}
                    className="py-4 text-2xl text-end text-mainColor"
                  >
                    {cartDetails?.totalCartPrice} EGP
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to={`/checkout`}>
            <button className='btn my-3'> Check Out</button>
            </Link>

          </div>
        </> :  <h3 className="text-3xl text-center font-bold text-red-700 my-36">Your Cart Is Empty</h3>}
        
        </>
        
        : <div className="spinner"></div>}
      
    </>
  )
}
