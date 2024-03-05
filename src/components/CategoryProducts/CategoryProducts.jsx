import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../loader/Loader'
import { CartContext } from '../../Context/CartStore'
import { wishListStore } from '../../Context/WishlistStore'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function CategoryProducts() {
    const {addProductToCart} = useContext(CartContext)
    const {addToWishlist , productWish , productWishIds , deleteProduct} = useContext(wishListStore)
    
  const nav = useNavigate()
  const {CategoryId} = useParams()
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${CategoryId}`)
  }
  const {isLoading , isError , data} = useQuery(`CategoriesProducts-${CategoryId}` , getAllProducts)
  if(isLoading) {
    return <Loader/>
  }
  if(isError) {
      nav('/Categories')
  }
  if(data.data.results === 0) {
    nav('/Categories')
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
        
        <title>{data.data.data[0]?.category.name}</title>
  </Helmet>
  <div className="container py-4">
    <div className="row">
          <div className="row g-2">
          {data.data.data.map(function( product , index) {
            return  <div key={index} className=" col-sm-6 col-md-4 col-lg-3 col-xl-2 ">

            <div  className='product position-relative p-1'>
              {productWishIds.includes(product.id) ? <i onClick={()=>deleteFromWish(product.id)} className="fa-solid text-red fa-heart p-2 rounded-1 position-absolute   bg-sec text-white fs-5 shadow heart"></i> : <i onClick={()=>addToWish(product.id)} className="fa-regular fa-heart p-2 rounded-1 position-absolute   bg-sec text-white fs-5 shadow heart"></i>}
              

              <i onClick={() => addToCart(product.id)} className="fa-solid fa-cart-plus p-2 rounded-1 position-absolute  bg-sec text-white fs-5 shadow shop"></i>
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
        </div>
      </div>
          })}
    </div>
    </div>
  </div>
  </>
}
