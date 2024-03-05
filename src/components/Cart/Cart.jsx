import React, { useContext } from 'react'
import { CartContext } from './../../Context/CartStore';
import Loader from './../loader/Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {
  const {totelPriceOfCartItem , numOfCartItem , allProduct , UpdateCartItems , deleteCartItem ,clearUserCart} = useContext(CartContext)
if(allProduct == null) {
return <> 

<Loader/>
</>
}
async function updateCart(id , newCount) {
    // const flag = await UpdateCartItems(id , newCount)
    // if(flag) {
    //   toast.success('Successfully Updated!')
    // } else {
    //   toast.error('error!!!')
    // }
    // console.log(flag);
    toast.promise( UpdateCartItems(id , newCount), {
      loading: 'Loading',
      success: 'Product Updated successfully',
      error: 'Error in Update Product try again ',
      });
}
async function deleteItem(id) {
      toast.promise( deleteCartItem(id ), {
      loading: 'Loading',
      success: 'Product Deleted successfully',
      error: 'Error in Delete Product try again ',
      });
}
async function clearCart() {
      toast.promise( clearUserCart(), {
      loading: 'Loading',
      success: 'Cart Cleaned successfully',
      error: 'Error in Clean Cart try again ',
      });
}
  return <section className='min-100vh '>
  <Helmet>
    <title>User Cart ({numOfCartItem.toString()})</title>
  </Helmet>
  <div className='container py-2'>
    <div className="row justify-content-between">
      <div className="col-lg-8">
        <div className='products bg-white p-3'>
            <h2 className='border-bottom fw-bold border-5 py-2 h4'>Cart ({numOfCartItem})</h2>
              {allProduct.map( (product , index)=> {
                return <div key={index} className="row border-bottom border-2 py-2 border-success align-items-center">
              <div className="col-lg-3">
                <div>
                  <img src={product.product.imageCover} className='w-100' alt="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <h3 className='h6'>{product.product.brand.name}</h3>
                  <p className='h3'>{product.product.title}</p>
                </div>
              </div>
              <div className="col-lg-3">
                <p className='text-center fw-bolder text-main'>{product.price} EGP</p>
                <div className='d-flex justify-content-around align-items-center'>
                  <button onClick={()=> updateCart(product.product.id , product.count - 1)} disabled={product.count == 1}  className='btn bg-main text-white'><i className="fa-solid fa-minus"></i></button>
                  <span>{product.count}</span>
                  <button onClick={()=> updateCart(product.product.id , product.count + 1)} className='btn bg-main text-white'><i className="fa-solid fa-plus"></i></button>
                </div>
                <button onClick={()=> deleteItem(product.product.id)} className='btn btn-danger mx-auto d-block mt-3'><i className="fa-solid fa-trash-can"></i> Remove</button>
              </div>
            </div>
              })}
        </div>
      </div>
      <div className="col-lg-3">
        <div className='CART-SUMMARY bg-white py-4'>
          <h3 className='border-bottom border-3 py-2 h5'>CART SUMMARY</h3>
          <div className='d-flex justify-content-around border-bottom border-3 py-1'>
            <span className='fw-semibold '>Total Price :</span>
            <span className='fw-semibold fs-5 text-main'>{totelPriceOfCartItem} EGP</span>
          </div>
          {totelPriceOfCartItem ? <Link to={"/payment"}><button className='btn bg-main text-white w-100 my-2 shadow'>CheckOut ({totelPriceOfCartItem})</button></Link> : <button disabled className='btn bg-main text-white w-100 my-2 shadow'>CheckOut ({totelPriceOfCartItem})</button>}
          <button disabled={numOfCartItem ? false : true} onClick={()=> clearCart()} className='btn btn-outline-danger d-block mx-auto mt-2'><i className="fa-solid fa-broom"></i> Clear Cart</button>
        </div>
      </div>
    </div>
  </div>
  </section>
}
