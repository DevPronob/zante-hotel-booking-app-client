import React from 'react'
import { Gallery } from "react-grid-gallery";
import g1 from '../../images/Gallery/1-1.jpg'
import g2 from '../../images/Gallery/2.jpg'
import g3 from '../../images/Gallery/3.jpg'
import g4 from '../../images/Gallery/6.jpg'
const GalleryList = () => {
  const images = [
    {
       src: g1,
       width: 320,
       height: 174,
       isSelected: true,
    },
    {
       src: g2,
       width: 320,
       height: 212,
    },
  
    {
       src: g3,
       width: 320,
       height: 212,
    },
    {
      src: g4,
      width: 320,
      height: 212,
   },
 ];
  return (
    <div className='pt-12'>
       <div className='hotel_text'>
        <h3>ZANTE GALLERY</h3>
        <p>Hotel Zante image gallery</p>
      </div>
      <div className='pt-6 gallery-container'>
      <Gallery images={images} />
      <style jsx>{`
        .gallery-container {
          /* Adjust overall container styles */
          padding: 20px;
        

        }

        @media (max-width: 768px) {
          .gallery-container {
            /* Adjust container styles for tablet */
            padding: 10px;
          }
        }

        @media (max-width: 480px) {
          .gallery-container {
            /* Adjust container styles for mobile */
            padding: 5px;
            display:flex;
            flex-direction: column;
          }
        }
      `}</style>
      </div>
      
    </div>
  )
}

export default GalleryList
