import axios from "axios";
import React, { Component } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function CategoriesSlider() {
    var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
      autoplay: true,
  speed: 10000,
  autoplaySpeed: 10000,
  cssEase: "linear" ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const {isLoading , data} = useQuery('AllCategories' , getAllCategories )

  if( isLoading) {
    return <>
    <h1>test</h1>
    </>
  }
  return (
    <div className="slider-container px-4">
      <Slider {...settings}>
        {data.data.data.map(function(cat , index) {
            return <Link key={index} to={`/Categories/${cat._id}`}>
                  <div className="text-center text-main fw-bold p-1 cursor-pointer" >
                  <img style={{height: '200px'}} src={cat.image} className="w-100 rounded-2" alt="" />
                  <p>{cat.name}</p>
                  </div>
            
            </Link>
        })}
      </Slider>
    </div>
  );
}

export default CategoriesSlider;
