import React from 'react'
import Banner from './Banner'
import FavouriteRooms from './FavouriteRooms'
import '../Home/Home.css'
import About from './About'
import Services from './Services'
import GalleryList from './GalleryList'
import Reviews from './Reviews'
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className='parant'>
      <FavouriteRooms></FavouriteRooms>
      <About></About>
      <Services></Services>
      <GalleryList></GalleryList>
      <Reviews></Reviews>
      </div>
      
    </div>
  )
}

export default Home
