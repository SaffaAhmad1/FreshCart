import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import UserContextProvider from './Components/Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Components/Context/CartContext'
import  { Toaster } from 'react-hot-toast';
import BrandDetails from './Components/BrandDetails/BrandDetails'
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './Components/Context/WishlistContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import EnterNewPassword from './Components/EnterNewPassword/EnterNewPassword';


let query = new QueryClient()


let x = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /> </ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      {path:"branddetails/:id" , element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "enternewpassword", element: <EnterNewPassword /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ]
  }

])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster/>
            </WishlistContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </UserContextProvider>

    </>
  )
}

export default App
