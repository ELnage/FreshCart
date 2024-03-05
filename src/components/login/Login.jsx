import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthStore';
import { Helmet } from 'react-helmet';

export default function Login() {
  const myNav = useNavigate()
  const {token , setToken} = useContext(AuthContext)
  let userData = {
    email : "" , 
    password : "" , 
  }

  const [logSuccsec, setLogSuccsec] = useState(false)
  const [logError, setLogError] = useState(false)
  const [loading, setLoading] = useState(false)
  function sendUserData(userData) {
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userData)
    .then( (res) => {
      setToken(res.data.token)
      localStorage.setItem('tkn' , res.data.token )
      setLoading(false) 
      setLogSuccsec("welcome back")
      setLogError(false)
      setTimeout( ()=> {
        
        myNav('/home' )
      } , 200)
    })
    .catch( (err) => {
      setLogSuccsec(false)
      setLoading(false)
      setLogError(err.response.data.message)
      console.log("error", err);
    })
  }


  function formSubmit(values) {
    console.log("submitted" ,values);
    sendUserData(values)
  }

  let myFormik = useFormik({
    initialValues: userData ,
    onSubmit: formSubmit,
    validate: function(values) {
      let errors = {}
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[A-Za-z]+(\.[A-Za-z]+)*(\.[A-Za-z]{2,})$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


        if(!emailRegex.test(values.email)) {
          errors.email = "inValid Email"
        }

        if(!passwordRegex.test(values.password)) {
          errors.password = "Password Minimum eight characters, at least one letter and one number and one Special characters:"
        }
      return errors
    }
  })

  return <>
  <Helmet>
    <title>LogIn</title>
  </Helmet>
  <div className='w-75 m-auto py-5'>
  <h2 className='mb-4'>Login Now</h2>

      { logSuccsec ?  <div className="alert alert-success text-center" role="alert">{logSuccsec}</div> : ""}
      { logError ?  <div className="alert alert-danger text-center" role="alert">{logError}</div> : ""}



  <form className='' onSubmit={myFormik.handleSubmit}>


    <label htmlFor="email">Email:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="text" placeholder='Your Email' className='mb-3 inp form-control' id='email' />
    {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger" role="alert">{myFormik.errors.email}</div> : ""}

    <label htmlFor="Password">Password:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" placeholder='Your Password' className='mb-3 inp form-control' id='password' />
    {myFormik.errors.password && myFormik.touched.password? <div className="alert alert-danger" role="alert">{myFormik.errors.password}</div> : ""}

  <Link to={'/ForgetPassword'} className='fw-bold text-main'>
  Forget Password ?
  </Link>
    <button type='submit' className='btn bg-main text-white ms-auto d-block'>{loading ? <i className="fa-solid fs-3 fa-spinner fa-spin fa-flip-vertical"></i> : "Login"}</button>
  </form>
  </div>
  
  </>
}
