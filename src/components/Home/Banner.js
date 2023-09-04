import React from 'react'
import banner from '../../images/full-slider-1.jpg'
import '../Home/Home.css'
import HomeSearch from './HomeSearch'
const Banner = () => {
  return (
    <div>
      <div className="hero  hero_height" style={{ backgroundImage: `url(${banner})` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="content_width">
      <h1 className="mb-5 text-5xl text-white font-bold">BOOK YOUR ROOM NOW</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <HomeSearch></HomeSearch>
    </div>
  </div>
</div>
    </div>
  )
}

export default Banner
