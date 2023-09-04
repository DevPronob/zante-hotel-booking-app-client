import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoomById } from '../../slices/roomSlices';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import './room.css'
import ImageGallery from "react-image-gallery";
import { setReservationDates } from '../../slices/dateSlice';
const RoomsDetails = () => {
    const params =useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector(state => state.reservation);
    const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
    const status = useSelector((state) => state.rooms.status);
    const error = useSelector((state) => state.rooms.error);
    const img1 =selectedRoom?.images[0]
    const img2 =selectedRoom?.images[1]
    const img3 =selectedRoom?.images[2]
    const img4 =selectedRoom?.images[3]
    const sliderImages =[img1,img2,img3,img4]
    console.log(startDate, endDate,"reserve")
    const images = [
      {
        original: img1,
        thumbnail: img1,
      },
      {
        original: img2,
        thumbnail: img2,
      },
      {
        original: img3,
        thumbnail: img3,
      },
      {
        original: img4,
        thumbnail: img4,
      },
    ];

    useEffect(() => {
        dispatch(fetchRoomById(params.id));
      }, [dispatch, params.id]);
      if (status === 'loading') {
        return <div class="text-center">
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
      }
    
      if (status === 'failed') {
        return toast.error(error)
      }

      const handleNavigate = () =>{
        navigate("/");
    }
    const handlePay =(id) =>{
      console.log(id)
      // navigate("/payment")
      // dispatch(setReservationDates({ startDate: newStartDate, endDate }));
      // dispatch(setReservationDates({ startDate, endDate: newEndDate }));
      navigate(`/payment/${id}`);
    }
      
  return (
    <div className='mt-[80px] room_contant'>
    <div className='roomDetails_container'>
        {/* leftside */}
     <div>
        <h3 className='pb-5'>{selectedRoom?.name}</h3>
        
<nav class="flex mt-[100]" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <a onClick={()=>handleNavigate()} href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
      </a>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Room</a>
      </div>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{selectedRoom?.name}</span>
      </div>
    </li>
  </ol>
</nav>

<div className='py-3 mt-4 sm:text-center'>
<p className='text-sm font-medium text-gray-700'>Starting Date {selectedRoom?.date.startingDate}</p>
<p className='py-2 text-sm font-medium text-gray-700'>Starting Date {selectedRoom?.date.endDate}</p>
</div>

     </div>
     {/* rightside */}
     <div>
        <h5>${selectedRoom?.price} Per Night</h5>
        <button onClick={()=>handlePay(selectedRoom?._id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-5 rounded-full">
  Book Now
</button>
     </div>

    </div>
    {/* content part */}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 parant">
  <div class="col-span-5 ">
  <div className="details_slider pt-10">
  <ImageGallery items={images} />;
      </div>
      <div className='details_content'>
        <p>{selectedRoom?.description}</p>
        <div className='room_service_items py-8'>
          <h4 className="font-bold">Room Services</h4>
          <div className="grid grid-cols-3 gap-4 sm:text-xs">
      {/* Map over the data array and generate grid items */}
      {selectedRoom?.roomServices.map((item, index) => (
        <div key={index} className="bg-blue-200 p-4">{item}</div>
      ))}
    </div>

        </div>
      </div>
    {/* slider end */}
    <div className='review py-8'>
    <h4 className="font-bold py-5">Customer Review</h4>
    
<div class="flex items-center mb-5">
    <p class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">8.7</p>
    <p class="ml-2 font-medium text-gray-900 dark:text-white">Excellent</p>
    <span class="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">376 reviews</p>
    <a href="#" class="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read all reviews</a>
</div>
<div class="gap-8 sm:grid sm:grid-cols-2 review__contant">
    <div>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Staff</dt>
            <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '88%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.8</span>
            </dd>
        </dl>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Comfort</dt>
            <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '89%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
            </dd>
        </dl>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Free WiFi</dt>
            <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '87%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.8</span>
            </dd>
        </dl>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Facilities</dt>
            <dd class="flex items-center">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '68%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">5.4</span>
            </dd>
        </dl>
    </div>
    <div>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Value for money</dt>
            <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '92%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
            </dd>
        </dl>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Cleanliness</dt>
            <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"style={{ width: '70%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">7.0</span>
            </dd>
        </dl>
        <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
            <dd class="flex items-center">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '89%' }}></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
            </dd>
        </dl>
    </div>
</div>

    </div>


  </div>
  <div class="col-span-2 ">
  <img src="https://demo.zantetheme.com/wp-content/uploads/2018/07/banner.jpg" alt="Banner" className="sticky-image" />
  </div>
</div>
    </div>
  )
}

export default RoomsDetails
