import React, { useContext, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../Context/WishlistContext'

export default function Products() {
  let {data , error , isError ,isLoading , isFetching} =useProducts()
  let {addProductToCart,setcartItemsNum } = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } =
    useContext(WishlistContext);
  const [loading,setloading] =useState(false)
  const [currentId , setcurrentId] = useState(0)

  async function addToCart(id){
    setcurrentId(id)
    setloading(true)
    let res = await addProductToCart(id);
    // console.log(res.data);

    if(res.data.status == "success"){
      setcartItemsNum(res.data.numOfCartItems)
      toast.success(res.data.message);
      setloading(false)
    } else{
      toast.error(res.data.message);
      setloading(false)
    }
    
  }




  if(isError){
    return <h3>{error}</h3>
  }
  if(isLoading){
    return <div className="spinner"></div>
  }
  

  // const [products, setproducts] = useState([])

  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       setproducts(res.data.data);

  //     })
  //     .catch((res) => { })
  // }

  // useEffect(() => {
  //   getProducts()
  // }, [])


  return (
    <>
      <div className='row'>
        {data?.data?.data.map((product) => (
          <div key={product.id} className=' sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'>
            <div className='product relative text-left my-2 p-2'>
            <i
            onClick={() => {
              wishlistCheck.some((i) => i === product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product.id);
            }}
            className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == product.id)
                ? "text-red-500 "
                : "hover:text-red-500"
              } absolute top-2 right-2 duration-300 opacity-0  text-2xl cursor-pointer`}
          ></i>

              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className='w-full' alt="" />
                <h3 className=' mt-2 text-emerald-600'>{product.category.name}</h3>
                <h3 className=' font-semibold mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className='flex justify-between p-3'>
                  <span>{product.price} EGP</span>
                  <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
                </div>
              </Link>

              <button onClick={()=>addToCart(product.id)} className='btn'>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i>: "Add To Cart"}</button>
            </div>
          </div>
        )) }
      </div>
    </>
  )
}
