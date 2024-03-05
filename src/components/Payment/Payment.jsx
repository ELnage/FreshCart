import axios from 'axios'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartStore'
import { Helmet } from 'react-helmet'

export default function Payment() {
  const {cartId , getCartItems} = useContext(CartContext)
  function createCashOrder() {
      const userData = {
        "shippingAddress":{
        "details": document.getElementById('details').value,
        "phone": document.getElementById('phone').value,
        "city": document.getElementById('city').value
        }
  }
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , userData , {
    headers: {
      token: localStorage.getItem('tkn')
    }
  }).then((ree)=> {
    
    getCartItems()
  })
  .catch((err)=> {
    console.log("err" , err);
  })
  }
  function createOnlineOrder() {
      const userData = {
        "shippingAddress":{
        "details": document.getElementById('details').value,
        "phone": document.getElementById('phone').value,
        "city": document.getElementById('city').value
        }
  }
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , userData , {
    headers: {
      token: localStorage.getItem('tkn')
    },
    params: {
      url: `https://elnage.github.io/FreshCart/#`
    }
  }).then((ree)=> {
    window.open(ree.data.session.url , '_self')
    getCartItems()
  })
  .catch((err)=> {
    console.log("err" , err);
  })
  }
  return <>
    <Helmet>
    <title>Payment</title>
  </Helmet>
  <div className='container'>
    <div className='p-4 pb-2 w-75 mx-auto rounded-4 form-bg bg-opacity-25 shadow my-4'>
      <label className='fw-bold' htmlFor="phone">Your Phone:</label>
      <input id='phone' type="tel" maxLength={11} placeholder='Enter Your Phone Here'  className='form-control my-2 inp'/>
      <label className='fw-bold' htmlFor="city">Your City:</label>
      <input id='city' type="text" placeholder='Enter Your City Here'  className='form-control my-2 inp'/>
      <label className='fw-bold' htmlFor="details">Your Address Deteils :</label>
      <textarea name="" id="details" cols="30" rows="10" placeholder='Enter Your Address Deteils' className='form-control my-2 inp'></textarea>
        <div className='text-center' >
            <button onClick={createCashOrder} className='btn btn-outline-success  fs-5 mt-3 mx-2'><i className="fa-solid fa-money-bill"></i> Cash Payment</button>
            <button onClick={createOnlineOrder} className='btn btn-success  fs-5 mt-3 mx-2'> <i className="fa-brands fa-cc-visa"></i> Online Payment</button>
        </div>
    </div>
  </div>
  
  </>
}
