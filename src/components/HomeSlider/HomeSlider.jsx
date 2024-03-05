import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgSlid1 from '../../assets/images/slider-image-1.jpeg'
import imgSlid2 from '../../assets/images/slider-image-2.jpeg'
import imgSlid3 from '../../assets/images/slider-image-3.jpeg'
import imgSlid4 from '../../assets/images/slider-2.jpeg'
import imgSlid5 from '../../assets/images/blog-img-2.jpeg'
function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container mt-2 mb-5">
      <div className="container">
        <div className="row gy-5">
          <div className="col-md-8">
            <div>
                <Slider {...settings}>
                  <div>
                    <img style={{height: "450px"}} src={imgSlid2} className="w-100" alt="" />
                  </div>
                  <div>
                    <img style={{height: "450px"}} src={imgSlid3} className="w-100" alt="" />
                  </div>
                  <div>
                    <img style={{height: "450px"}} src={imgSlid4} className="w-100" alt="" />
                  </div>
                  <div>
                    <img style={{height: "450px"}} src={imgSlid1} className="w-100" alt="" />
                  </div>
                </Slider>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mx-2">
                  <img style={{height:"225px"}} className="w-100 pb-1" src={imgSlid5} alt="" />
                  <img style={{height:"225px"}} className="w-100 pt-1" src={imgSlid3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
