import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthStore'
import { CartContext } from '../../Context/CartStore'
import { wishListStore } from '../../Context/WishlistStore'
export default function NavBar() {
   const myNav = useNavigate()
   const {token , setToken}=useContext(AuthContext)
   const {numOfCartItem}=useContext(CartContext)
   const {countWishList}=useContext(wishListStore)
   function logOut() {
      setToken(null) 
      localStorage.removeItem('tkn')
      myNav('/login')
   }
   const {pathname} = useLocation()
return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary py-4 fixed-top">
<div className="container">
   <Link className="navbar-brand" to="/">
      <img src={logo} alt="Fresh cart" />
   </Link>
   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon" />
   </button>
   <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token ?    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
         <Link className={pathname === '/' || pathname === '/home'  ? "nav-link active" : "nav-link"} to="/home">Home</Link>
      </li>
      <li className="nav-item">
         <Link className={pathname === '/Categories' ? "nav-link active" : "nav-link"} to="/Categories">Categories</Link>
      </li>
      <li className="nav-item">
         <Link className={pathname === '/Brands' ? "nav-link active" : "nav-link"} to="/Brands">Brands</Link>
      </li>
      <li className="nav-item">
         <Link className={pathname === '/allorders' ? "nav-link active" : "nav-link"} to="/allorders">Orders</Link>
      </li>
      <li className="nav-item">
         <Link className={pathname === '/cart' ? "nav-link active position-relative" : "nav-link  position-relative"} to="/cart">Cart
               <span className= {pathname === '/cart' ?"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " : "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main " } >
               {numOfCartItem ?  numOfCartItem : ""}
               </span>
         </Link>
      </li>
      <li className="nav-item">
         <Link className={pathname === '/WishList' ? "nav-link active position-relative" : "nav-link  position-relative"} to="/WishList">WishList
               <span className={pathname === '/WishList' ? "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" : "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main"}>
               {countWishList ?  countWishList : ""}
               </span>
         </Link>
      </li>
   </ul> : ""}
   <ul className="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center">
      <li className="nav-item mx-2">
         <ul className='list-unstyled d-flex gap-2'>
               <li>
                     <i className="fa-brands fa-facebook" />
               </li>

               <li className="nav-item">
                  <i className="fa-brands fa-x-twitter" />
               </li>

               <li className="nav-item">
                  <i className="fa-brands fa-linkedin" />
               </li>

               <li className="nav-item">
                  <i className="fa-brands fa-instagram" />
               </li>

               <li className="nav-item">
                  <i className="fa-brands fa-youtube" />
               </li>

         </ul>
      </li>
      { token ?      <li style={{"cursor": 'pointer'}} onClick={logOut} className="nav-item">
         <span className='nav-link'>logout</span>
      </li> : <>
            <li  className="nav-item">
         <Link className={pathname === '/Login' ? "nav-link active" : "nav-link"} to="/Login">Login</Link>
      </li>
      <li className="nav-item">
         <Link className={pathname === '/Register' ? "nav-link active" : "nav-link"} to="/Register">Register</Link>
      </li>
      </> }


   </ul>
   </div>
</div>
</nav>

</>
}
