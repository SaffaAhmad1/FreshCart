import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function getBrands() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );

      setBrands(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getSpecificBrand(brandId) {
    try {
      setBrandLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
      );
      console.log(data.data);
      
      setBrand(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setBrandLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
    
      <h2 className="font-bold capitalize text-3xl text-emerald-600 my-5">All Brands</h2>
      
      {
      loading ? (
        <div className="spinner"></div>
      ): brands ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 ">
          {brands.map((brand) => (
            <div onClick={() => { onOpenModal(); getSpecificBrand(brand._id); }}
              key={brand._id}
              className="w-full bg-white border cursor-pointer border-emerald-200 rounded-lg shadow hover:shadow-2xl hover:scale-[1.02] duration-500 dark:bg-emerald-800 dark:border-emerald-700"
            >
              <Link to={`/branddetails/${brand._id}`}>
              <div>
                <img
                  loading="lazy"
                  className="rounded-t-lg w-full"
                  src={brand.image}
                  alt="product image"
                />
              </div>
              <div className="p-5">
                <h5 className="text-xl font-semibold tracking-tight text-black  dark:text-white text-center">
                  {brand.name}
                </h5>
              </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      
      {/* {brand ? (
        <Modal
          open={open}
          onClose={onCloseModal}
          showCloseIcon={true}
          blockScroll={false}
          animationDuration={500}
          center
        >
           (
            <div className="flex justify-center items-center flex-col md:flex-row">
              <div className="p-5">
                <h2 className="text-3xl text-green-600 font-semibold">{brand.name}</h2>
                <p className="text-lg text-gray-500">{brand.slug}</p>
              </div>
              <img src={brand.image} className=" w-full" alt="" />
            </div>
          )
        </Modal>
      ) : (
        ""
      )} */}
    </>
  );
}
