import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick';
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../Context/WishlistContext';

export default function ProductDetails() {


  const [product, setproduct] = useState(null)
  const [relatedProduct, setrelatedProduct] = useState([])
  let { id, category } = useParams()
  let { addProductToCart, setcartItemsNum} = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } =
    useContext(WishlistContext);
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)

  async function addToCart(id) {
    setcurrentId(id)
    setloading(true)
    let res = await addProductToCart(id);
    // console.log(res.data);

    if (res.data.status == "success") {
      setcartItemsNum(res.data.numOfCartItems)
      toast.success(res.data.message);
      setloading(false)
    } else {
      toast.error(res.data.message);
      setloading(false)
    }

  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data)
        // console.log(res.data.data);

      })
      .catch((res) => { })
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res.data.data);

        let related = res.data.data.filter((product) => product.category.name == category)
        setrelatedProduct(related)

      })
      .catch((res) => { res })
  }
  useEffect(() => {
    getProduct(id)
    getAllProducts()
  }, [id, category])


  return (
    <>
      {product != null ? <div className='row  items-center'>
        <div className=' w-1/4'>
          <Slider {...settings}>
            {product?.images.map((src) => <img key={product.id} src={src} />)}
          </Slider>
        </div>
        <div className=' w-3/4 relative text-left p-4 '>
          <i
            onClick={() => {
              wishlistCheck.some((i) => i === product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product.id);
            }}
            className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == product.id)
                ? "text-red-500 "
                : "hover:text-red-500"
              } absolute top-2 right-2 duration-300 text-2xl cursor-pointer`}
          ></i>
          <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
          <h4 className='text-gray-600 my-4'>{product?.description}</h4>
          <h3 className='mt-4'>{product?.category.name}</h3>
          <div className='flex justify-between p-3 mb-5'>
            <span>{product?.price} EGP</span>
            <span><i className='fas fa-star text-yellow-400'></i>{product?.ratingsAverage}</span>
          </div>

          <button onClick={() => addToCart(product.id)} className='btn'>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
        </div>
      </div> : <div className="spinner"></div>}

      <div className='row '>
        {relatedProduct.length > 0 ? relatedProduct.map((product) => (
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
              } absolute top-2 right-2 duration-300 opacity-0 text-2xl cursor-pointer`}
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

              <button onClick={() => addToCart(product.id)} className='btn'>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
            </div>
          </div>
        )) : <div className="spinner"></div>}
      </div>
    </>
  )
}
