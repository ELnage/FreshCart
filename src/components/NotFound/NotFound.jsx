import React from 'react'
import notFound from '../../assets/images/error.svg'
export default function NotFound() {
  return <div className='vh-100 d-flex justify-content-center align-items-center'>
    <img src={notFound} className='w-50' alt="" />
  </div>
}
