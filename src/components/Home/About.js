import React from 'react'
import '../Home/Home.css'
import about from '../../images/about1.jpg'
const About = () => {
  return (
    <div className='about_parant lg:max-w-[100%] md:max-w-[60%] ms-[30px] sm:ms-[5px] pt-[40px]'>
      <div className='about_text'>
        <h3>HOTEL ZANTE SINCE 1992</h3>
        <h5>High quality accommodation services</h5>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</p>
      </div>
      <div className='about_img'>
      <img src={about} alt="Girl in a jacket" />
      </div>
    </div>
  )
}

export default About
