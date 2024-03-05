import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthStore';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  const myNav = useNavigate()
  const {token , setToken} = useContext(AuthContext)
  let userData = {
    email : "" , 
  }

  const [logSuccsec, setLogSuccsec] = useState(false)
  const [logError, setLogError] = useState(false)
  const [loading, setLoading] = useState(false)
  function sendCode(userData) {
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , userData)
    .then( (res) => {
      if(res.data.statusMsg === "success") {
          myNav('/verifycode')
      }
      setLoading(false) 
      setLogError(false)
    })
    .catch( (err) => {
      setLogSuccsec(false)
      setLoading(false)
      setLogError(err.response.data.message)
      console.log("error", err);
    })
  }


  function formSubmit(values) {
    sendCode(values)
  }

  let myFormik = useFormik({
    initialValues: userData ,
    onSubmit: formSubmit,
    validate: function(values) {
      let errors = {}
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[A-Za-z]+(\.[A-Za-z]+)*(\.[A-Za-z]{2,})$/;

        if(!emailRegex.test(values.email)) {
          errors.email = "inValid Email"
        }
      return errors
    }
  })
  return <>
  <Helmet>
    <title>Forget Password</title>
  </Helmet>
  <div className='w-75 m-auto py-5'>
  <h2 className='mb-4'>Forget Password</h2>

      { logSuccsec ?  <div className="alert alert-success text-center" role="alert">{logSuccsec}</div> : ""}
      { logError ?  <div className="alert alert-danger text-center" role="alert">{logError}</div> : ""}



  <form className='' onSubmit={myFormik.handleSubmit}>

    <label htmlFor="email">Email:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="text" placeholder='Your Email' className='mb-3 inp form-control' id='email' />
    {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger" role="alert">{myFormik.errors.email}</div> : ""}

    <button type='submit' className='btn bg-main text-white ms-auto d-block'>{loading ? <i className="fa-solid fs-3 fa-spinner fa-spin fa-flip-vertical"></i> : "Send Code"}</button>
  </form>
  </div>
  
  </>
}
