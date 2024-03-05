import React, { useContext } from 'react'
import { wishListStore } from '../../Context/WishlistStore'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartStore'
import { Helmet } from 'react-helmet'

export default function WishList() {
  const {countWishList , productWish , deleteProduct} = useContext(wishListStore)
  const {addProductToCart} = useContext(CartContext)

  if( productWish === null) {
    return <Loader/>
  }
      function addToCart(id) {
      toast.promise( addProductToCart(id), {
      loading: 'Loading',
      success: 'Product added to cart successfully',
      error: 'Error in add Product try again ',
      });
    }
      function deleteFromWishlist(id) {
      toast.promise( deleteProduct(id), {
      loading: 'Loading',
      success: 'Product Deleted successfully',
      error: 'Error in Delete Product try again ',
      });
      }
  return <section className='min-100vh '>
    <Helmet>
      <title>WishList ({countWishList.toString()})</title>
    </Helmet>
  <div className='container py-3'>
    <h2 className='border-bottom fw-bold border-5 py-2 h4 mb-4'>WishList({countWishList})</h2>
    <div className="row gy-4">
          {productWish.map(function( product , index) {
            return  <div key={index} className=" col-sm-6 col-md-4 col-lg-3 col-xl-2 ">

                
            <div  className='product position-relative p-1'>
                <Link to={`/productDetails/${product.id}`}>
                    <div className="p-3 position-relative bg-gray mb-2 ">
                      <img src={product.imageCover} className='w-100 ' alt={product.title} />

                      {product.priceAfterDiscount ? <span className='discount'>-{100-(product.priceAfterDiscount/product.price * 100).toFixed(0)}%</span> : ""}
                    </div>
                    <h2 className='fs-6 fw-bold text-main'>{product.category.name}</h2>
                    <h3 className='fs-5'>{product.title.split(' ').slice(0 , 2).join(" ")}</h3>
                    <div className="info d-flex justify-content-between px-1">
                      
                      {product.priceAfterDiscount? <p data-dis={product.price } className=' dis position-relative'>{product.priceAfterDiscount}EGP</p> :<p>{product.price}EGP</p> }
                      
                      <p> <i style={{color : 'gold'}} className="fa-solid fa-star"></i> {product.ratingsAverage}</p>
                    </div>
                </Link>
                    <div className="d-flex justify-content-between">
                      <span onClick={() => addToCart(product.id)} className=' cursor-pointer p-2 rounded-1  bg-sec text-white fs-6 shadow shop'>
                        <i  className="fa-solid fa-cart-plus"></i> Add To Cart
                      </span>
                        <i  onClick={()=> deleteFromWishlist(product.id)} className="fa-solid fa-heart p-2 rounded-1 text-red bg-sec text-white fs-5 shadow heart"></i>

                    </div>
        </div>
      </div>
          })}
    </div>
  </div>
  </section>
}
