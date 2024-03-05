import React from 'react'

import Payment from '../../assets/images/Capture.PNG'
import appleStore from '../../assets/images/applestore.png'
import googleplay from '../../assets/images/googleplay.png'
export default function Footer() {
  return <footer className='bg-gray p-5'>
    
    <div className='container'>
    <h4 className='fw-bold h5'>Get The Fresh Cart App</h4>
    <p className=''>we will send you a link , open it on your phone to download the app</p>
        <div className="row gy-4 border-bottom border-1 border-success pb-3 border-opacity-50">
          <div className="col-md-8">
            <div>
              <input type="text" placeholder='Enter Your Email Hire' className='form-control inp' />
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <button className='w-100 btn bg-main text-white '>Send App Link</button>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className='d-flex align-items-center '>
              <p className=''>Payment Partner</p>
                  <img src={Payment} alt="Payment Partner" className='mix-blend' style={{width: '300px'}} />

            </div>
          </div>
          <div className="col-md-6">
            <div className='justify-content-lg-end d-flex align-items-center'>
                <p className='px-1'>Get Deliveries With Fresh Cart </p>
                  <img src={appleStore} alt="apple Store" className='w-25'  />
            </div>
          </div>
        </div>
    </div>
  </footer>
}
