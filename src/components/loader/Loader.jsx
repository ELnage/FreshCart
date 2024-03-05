import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export default function Loader() {
  return <div className='loaderScreen vh-100 bg-opacity-75 bg-main d-flex justify-content-center align-items-center'>
  
  <InfinitySpin
  visible={true}
  width="200"
  color="#fff"
  ariaLabel="infinity-spin-loading"
  />

  </div>
}
