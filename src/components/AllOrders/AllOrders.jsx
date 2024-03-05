import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loader from '../loader/Loader'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Helmet } from 'react-helmet'

export default function AllOrders() {
  const nav = useNavigate()
  const {id} = jwtDecode(localStorage.getItem('tkn'))

  function getOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
  const {data , isLoading , isError} = useQuery('orders' , getOrders)
  if(isLoading) {
    return <Loader/>
  }
  if(isError) {
      nav('/home')
  }
    return <section className='min-100vh '>
        <Helmet>
        <title>OrderS</title>
        </Helmet>
  <div className='container py-4'>
    <div className="row gy-4">
        {data.data.map(function(order , index){
          return  <div key={index} className=" col-md-6 col-lg-4">
        <div className='order cursor-pointer bg-gray fw-bold p-3 shadow main-border rounded-2'>

            <div className='d-flex mb-2   justify-content-between'>
              <span>Order Id :</span>
              <span className='fw-bolder'><i className="fa-solid fa-key text-main"></i> {order.id}</span>
            </div>
            <div className='d-flex mb-2 justify-content-between'>
              <span>Total Price:</span>
              <span className='fw-bolder'><i className="fa-solid fa-sack-dollar text-main"></i> {order.totalOrderPrice + "EGP"}</span>
            </div>
            <div className='d-flex mb-2 justify-content-between'>
              <span>Payment Method :</span>
              <span className='fw-bolder'>{order.paymentMethodType === "cash" ? <i className="fa-solid fa-money-bill text-main"></i> : <i className="fa-brands fa-cc-visa text-main"></i>} {order.paymentMethodType}</span>
            </div>
            <div className='d-flex mb-2 justify-content-between'>
              <span>is paid :</span>
              {order.isPaid ? <span className='fw-bolder'> <i className="fa-solid fa-check text-main"></i>  Yes </span>: <span className='fw-bolder'> <i className="fa-solid fa-xmark text-danger "></i> No</span> }
              
            </div>
            <div  className='d-flex mb-2 justify-content-between'>
              <span>Delivered To:</span>
              <span className='fw-bolder'><i className="fa-solid fa-city  text-main "></i> {order.shippingAddress.city}</span>
            </div>
            <div  className='d-flex  justify-content-between'>
              <span>is delivered : </span>
              {order.isDelivered ? <span className='fw-bolder'> <i className="fa-solid fa-check text-main"></i>  Yes </span>: <span className='fw-bolder'> <i className="fa-solid fa-xmark text-danger "></i> Not Yet</span>}
            </div>
        
        </div>
      </div>
        })}
    </div>
  </div>
  </section>
}
