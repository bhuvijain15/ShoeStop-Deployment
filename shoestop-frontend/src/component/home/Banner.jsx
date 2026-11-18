
import React from 'react'
import './home.css'
import banner from '../../assets/2.jpg'
import { Button } from 'react-bootstrap'

const Banner = () => {

  const handleShopNow = () => {
    document.getElementById('products')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className='banner'>
      <div className="overlay"></div>
      <img src={banner} alt="" className='banner-img'/>

      <div className="content">
        <h3>Fly Like A Bird</h3>
        <Button variant='light px-4' onClick={handleShopNow}>
          Shop Now
        </Button>
      </div>
    </div>
  )
}

export default Banner
