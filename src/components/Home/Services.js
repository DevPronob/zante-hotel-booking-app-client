import React from 'react'
import servicer from '../../images/Services/restaurant.jpg'
import { BiRestaurant } from 'react-icons/bi';
import { RiMentalHealthLine } from 'react-icons/ri';
import { FcConferenceCall } from 'react-icons/fc';
import { FaSwimmingPool } from 'react-icons/fa';
import '../Home/Home.css'
const Services = () => {
    const service =[
        {
            text:"Restaurant",
            dec:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
            icon:<BiRestaurant></BiRestaurant>
        },
        {
            text:"Spa - Beauty & Health",
            dec:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
            icon:<RiMentalHealthLine/>
        },
        {
            text:"Conference Room",
            dec:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
            icon:<FcConferenceCall/>
        },
        {
            text:"Swimming Pool",
            dec:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
            icon:<FaSwimmingPool />
        },
    ]
  return (
    <div className='services_parant lg:max-w-[100%] md:max-w-[63%] pt-10 py-16'>
      <div className='hotel_text'>
        <h3>OUR AWESOME SERVICES</h3>
        <p>Check out our awesome services</p>
      </div>
      <div className='services_content pt-5'>
        <div className='services_text'>
        <img src={servicer} alt="Shoes" />
        </div>
        <div className='services_media'>
            {
                service.map(items =>{
                    return <div className='media_content'>
                       <span>{items.icon}</span>
                       <div className='content'>
                       <h4>{items.text}</h4>
                       <p>{items.dec}</p>
                       </div>
                        </div>
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Services
