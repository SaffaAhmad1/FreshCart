import React from 'react'
import style from './MainSlider.module.css'
import Slider from 'react-slick';
import slide1 from '../../assets/WhatsApp Image 2024-08-03 at 15.04.44_f954c4a2.jpg'
import slide2 from '../../assets/WhatsApp Image 2024-08-03 at 15.04.43_7a1cb72e.jpg'
import slide3 from '../../assets/WhatsApp Image 2024-08-03 at 15.04.42_d04244fc.jpg'
import slide4 from '../../assets/WhatsApp Image 2024-08-03 at 15.04.44_804f469a.jpg'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
  };


  return (
    <>
    <div className='row my-5'>
    
      <div className=' w-3/4'>
      <Slider {...settings}>
      <img src={slide3} className='w-full h-[400px] object-cover' alt="" />
      <img src={slide4} className='w-full h-[400px] object-cover' alt="" />
      <img src={slide1} className='w-full h-[400px] object-cover' alt="" />
      </Slider>
      </div>
      <div className=' w-1/4'>
      <img src={slide2} className='w-full h-[200px]' alt="" />
      <img src={slide3} className='w-full h-[200px]' alt="" />
      </div>
    </div>
    </>
  )
}
