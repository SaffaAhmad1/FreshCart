import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";


export default function CategoriesSlider() {

  const [categories , setcategories] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed:1000,
  };

  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      setcategories(res.data.data)
      // console.log(res.data.data);
      
    })
    .catch((res)=>{})
  }

  useEffect(()=>{
    getCategories()
  } , [])

  return (
    <>
    <h2 className=' text-gray-600 font-bold my-4 capitalize text-left'>Shop Popular Categories</h2>
    <Slider {...settings}>
      {categories.map((category)=> <div key={category._id}>
        <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
        <h4 className='text-left'>{category.name}</h4>
      </div>)}
    </Slider>
    </>
  )
}
