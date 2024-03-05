import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import Loader from '../loader/Loader'
import './ProductDetails.css'
import { CartContext } from '../../Context/CartStore'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { wishListStore } from '../../Context/WishlistStore'

export default function ProductDetails() {
  const {id} = useParams()
      const {addProductToCart} = useContext(CartContext)
      const {addToWishlist , productWishIds , deleteProduct} = useContext(wishListStore)

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const {isError , isLoading , data} = useQuery(`ProductDetails-${id}` , getProductDetails )
  if(isLoading) {
    return <Loader/> 
  }
  if(isError) {
    return <Navigate to={'/home'}/>
  }
  function changeImg(e) {
      document.getElementById('mainImg').src = e.target.src
  }
    async function addToCart(id) {
      toast.promise( addProductToCart(id), {
      loading: 'Loading',
      success: 'Product added to cart successfully',
      error: 'Error in add Product try again ',
      });
    }
    function addToWish (id){
    toast.promise( addToWishlist(id), {
      loading: 'Loading',
      success: 'Product added to WishList successfully',
      error: 'Error in add Product try again ',
      });
    }
    function deleteFromWish(id) {
    toast.promise( deleteProduct(id), {
      loading: 'Loading',
      success: 'Product Deleted From WishList successfully',
      error: 'Error in Delete Product try again ',
      });
    }
  return <>
    <Helmet>
    <title>{data.data.data.title}</title>
    </Helmet>
  <div className='container py-4'>
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="row align-items-center imgs-row">
          <div className="col-md-2">
            <div className="imgs ">
              {data.data.data.images.map(function(img , index ) {
                return <div key={index} className='product-img main-border rounded-3 overflow-hidden shadow mb-3 '>
                  <img onClick={changeImg} src={img} className='w-100 cursor-pointer ' alt="" />
                </div>
              })}
        </div>
          </div>
          <div className="col-md-8">
          <div className='main-img mb-3'>
            <img id='mainImg' className='w-100 cursor-pointer rounded-3 main-border shadow' src={data.data.data.imageCover} alt={data.data.data.title} />
          </div>
          </div>
        </div>

      </div>
      <div className="col-md-6">
        <div>
          <h3 className='mb-1 text-main fw-bolder'>{data.data.data.title}</h3>
          <p className=''>{data.data.data.description}</p>
          <span>{data.data.data.category.name}</span>
          <div className='d-flex justify-content-between m-2'>
            <span>{data.data.data.price} EGP</span>
            <span><i style={{color : 'gold'}} className="fa-solid fa-star"></i> {data.data.data.ratingsAverage}</span>
          </div>
              <div className="d-flex gap-2">
                <button onClick={() => addToCart(data.data.data.id)} className='w-75 bg-main text-white btn fw-bold'> <i className="fa-solid fa-plus"></i> Add to cart</button>
                {productWishIds.includes(data.data.data.id) ?  <button onClick={()=>deleteFromWish(data.data.data.id)} className='w-25 bg-sec text-white btn '><i className="fa-solid fa-heart text-red "></i> Remove From wishlist</button> :    <button onClick={()=>addToWish(data.data.data.id)} className='w-25 bg-sec text-white btn '><i className="fa-solid fa-heart "></i> Add to wishlist</button>}
              </div>
        </div>
      </div>
    </div>
  </div>
  
  </>
}
