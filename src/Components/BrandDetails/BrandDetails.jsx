import React, { useEffect, useState } from 'react'
import style from './BrandDetails.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function BrandDetails() {
  const [brand, setBrand] = useState(null);
  const [product, setproduct] = useState(null)
  let { id } = useParams()

  async function getSpecificBrand(brandId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
      );
      console.log(data.data);
      
      setBrand(data.data);
    } catch (error) {
      console.log(error);
    } 
  }

  
  useEffect(()=>{
    getSpecificBrand(id)
  },[id])
  return (
    <>
    {brand != null ?<>
      <div className="flex justify-center items-center flex-col md:flex-row">
              <div className="p-3 w-1/4">
                <h2 className="text-3xl text-green-600 font-semibold">{brand?.name}</h2>
                <p className="text-lg text-gray-500">{brand?.slug}</p>
              </div>
              <div className='w-3/4'>
              <img src={brand?.image} className=" w-3/4" alt="" /></div>
            </div>
    </> : <div className="spinner"></div>}
    
    </>
  )
}
