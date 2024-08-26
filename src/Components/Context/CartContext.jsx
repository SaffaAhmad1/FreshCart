import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export let CartContext = createContext();

export default function CartContextProvider(props) {


    let headers = {token: localStorage.getItem("userToken")};
    const [tokenStatus, setTokenStatus] = useState(false);
    const [cartId,setcartId] = useState(0)
    const [cartItemsNum,setcartItemsNum] = useState(0)


    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId: productId
            },
            {
                headers,
            }
        ).then((res) => res)
            .catch((err) => err)
    }

    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((res) =>{
            // console.log(res.data.numOfCartItems);
            setcartItemsNum(res.data.numOfCartItems)
            setcartId(res.data.data._id)
            
            return res
        })
        .catch((err) => err)
    }
    function updateCartProductQuantity(productId , newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:newCount
        } , {
            headers
        }).then((res) => res)
        .catch((err) => err)
    }

    function removeSpecificCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((res) => res)
        .catch((err) => err)
    }
    function checkout(cartId,url,formdata){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress: formdata
        },
    {
        headers
    })
        .then((res) => res)
        .catch((err) => err)
    }

    


    useEffect(()=>{
        getLoggedUserCart()
    },[])

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
          setTokenStatus(true);
        } else {
          setTokenStatus(false);
          setcartItemsNum(0);
        }
    
        if (tokenStatus) {
            getLoggedUserCart();
        }
      }, [tokenStatus]);

    return <CartContext.Provider value={{ addProductToCart  , getLoggedUserCart , updateCartProductQuantity,removeSpecificCartItem, checkout ,cartId,cartItemsNum,setcartItemsNum}}>
        {props.children}
    </CartContext.Provider>
}