import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const myNav = useNavigate()
  let userData = {
    name : "",
    email : "" , 
    phone : "", 
    password : "" , 
    rePassword : "",
  }

  const [logSuccsec, setLogSuccsec] = useState(false)
  const [logError, setLogError] = useState(false)
  const [loading, setLoading] = useState(false)
  function sendUserData(userData) {
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userData)
    .then( (res) => {
      setLoading(false)
      setLogSuccsec("Account Create Successful")
      setLogError(false)
      setTimeout( ()=> {
        
        myNav('/login' )
      } , 1000)
    })
    .catch( (err) => {
      setLoading(false)
      setLogSuccsec(false)
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
        const nameRegex = /^[A-Z][a-z]{2,15}$/
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[A-Za-z]+(\.[A-Za-z]+)*(\.[A-Za-z]{2,})$/;
        const phoneRegex = /^01(1|2|5|0)\d{8}$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if(!nameRegex.test(values.name)) {
          errors.name = "Name must be start with capital letter"
        }
        if(!emailRegex.test(values.email)) {
          errors.email = "inValid Email"
        }
        if(!phoneRegex.test(values.phone)) {
          errors.phone = "Phone must be Egyptian phone"
        }
        if(!passwordRegex.test(values.password)) {
          errors.password = "Password Minimum eight characters, at least one letter and one number and one Special characters:"
        }
        if(values.password !== values.rePassword) {
          errors.rePassword = "Password and RePassword not matched"
        }
      return errors
    }
  })

  return <>
      <Helmet>
    <title>Register</title>
    </Helmet>
  <div className='w-75 m-auto py-5'>
  <h2 className='mb-4'>Register Now</h2>

      { logSuccsec ?  <div className="alert alert-success text-center" role="alert">{logSuccsec}</div> : ""}
      { logError ?  <div className="alert alert-danger text-center" role="alert">{logError}</div> : ""}



  <form onSubmit={myFormik.handleSubmit}>

    <label htmlFor="name">Name:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text" placeholder='Your Name' className='mb-3 inp form-control' id='name' />
    {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger" role="alert">{myFormik.errors.name}</div> : ""}
    <label htmlFor="email">Email:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="text" placeholder='Your Email' className='mb-3 inp form-control' id='email' />
    {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger" role="alert">{myFormik.errors.email}</div> : ""}

    <label htmlFor="phone">Phone:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text" placeholder='Your Phone' className='mb-3 inp form-control' id='phone' />
    {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger" role="alert">{myFormik.errors.phone}</div> : ""}

    <label htmlFor="Password">Password:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" placeholder='Your Password' className='mb-3 inp form-control' id='password' />
    {myFormik.errors.password && myFormik.touched.password? <div className="alert alert-danger" role="alert">{myFormik.errors.password}</div> : ""}

    <label htmlFor="rePassword">Re password:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password" placeholder='Your Re password' className='mb-3 inp form-control' id='rePassword' />
    {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger" role="alert">{myFormik.errors.rePassword}</div> : ""}

    <button type='submit' className='btn bg-main text-white ms-auto d-block'>{loading ? <i className="fa-solid fs-3 fa-spinner fa-spin fa-flip-vertical"></i> : "Register"}</button>
  </form>
  </div>
  
  </>
}
