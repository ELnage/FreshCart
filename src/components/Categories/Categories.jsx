import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Categories() {

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  const {isLoading , data , isError} = useQuery('Categories' , getAllCategories)
  if(isLoading) {
    return <Loader/>
  }
  const CategoriesArry = data.data.data
  return <>
      <Helmet>
    <title>Categories</title>
    </Helmet>
  <div className='container py-4'>
    <div className="row gy-4">
        {CategoriesArry.map((category , index)=> {
          return <div key={index} className=" col-md-4 col-lg-3">
              <Link to={`${category._id}`}>
                  <div className='bg-gray shadow main-border rounded-2 p-2 cursor-pointer'>
                        <img style={{height: '350px'}} src={category.image} alt={category.name} className='w-100 rounded-2' />
                        <h3 className='text-main text-center pt-2 fw-bold'>{category.name} </h3>
                  </div>
              
              </Link>
      </div>
        })}
    </div>
  </div>
  </>
}
