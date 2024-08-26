import React, { useContext } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from "../Context/WishlistContext";

export default function Navbar() {


  let { userLogin, setuserLogin } = useContext(UserContext)
  let { cartItemsNum , setTokenStatus, tokenStatus} = useContext(CartContext)
  let { wishlistCount } = useContext(WishlistContext);
  const navigate = useNavigate()

  function signOut() {
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")
  }

  return (
    <>
      <nav className="bg-slate-100 border-gray-200 fixed z-[999] top-0 right-0 left-0 ">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className='flex items-center gap-5'>
            <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} width={"120px"} className="h-8" alt="Flowbite Logo" />
            </Link>

            {userLogin != null ? <>
              <ul className='flex gap-4'>
                <li><Link to="">Home</Link></li>
                <li><Link to="cart" className=' relative'>Cart
                  <div className=' absolute top-[-13px] right-[-13px] size-5 bg-emerald-600 text-white rounded-full flex justify-center items-center '>{cartItemsNum}</div>
                </Link></li>
                <li><Link to="products">Products</Link></li>
                <li><Link to="categories">Categories</Link></li>
                <li><Link to="brands">Brands</Link></li>
              </ul>
            </> : null}
          </div>


          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="icons flex  gap-4">
              <a target='blank' href="https://www.facebook.com/saffa.ahmed.505?mibextid=ZbWKwL">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a target="blank" href="https://github.com/SaffaAhmad1">
                  <i className="fab fa-github "></i>
                </a>

                <a target="blank" href="https://www.linkedin.com/in/saffa-ahmed">
                <i className="fa-brands fa-linkedin"></i>
                </a>

              <a target="blank" href="https://www.instagram.com/saffa.ahmed.505/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a target="blank"
                  href="https://youtube.com/@saffatolba3184?si=GSDUtv_jCI_NJ2vq"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              
            </div>
            <Link to={`/wishlist`}>
                      <i className="fa-solid fa-heart text-red-500 text-3xl relative">
                        <span className="absolute top-[9px] left-1/2 -translate-x-1/2 text-xs text-white ">
                        {wishlistCount }
                        </span>
                      </i>
                    </Link>
            <div className="links flex gap-4">

              {userLogin != null ? <span onClick={signOut} className="text-sm cursor-pointer">SignOut</span> : <>
                <Link to="login" className="text-sm">Login</Link>
                <Link to="register" className="text-sm">Register</Link>
              </>

              }

            </div>
          </div>
        </div>
      </nav>


    </>
  )
}
