import React, {useState, useRef,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchFilteredRooms, fetchRooms } from '../../slices/roomSlices';
import toast from 'react-hot-toast';
import './HotelRooms.css'
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { format } from 'date-fns';
import axios from 'axios';
import Footer from '../Shared/Footer/Footer';
const HotelRooms = () => {


  const location = useLocation();
  let roomData = location.state?.room;


  const processedRoomData = roomData
    ? roomData
    : {
        startDate: 0,
        endDate: 0,
        adults: 0,
        child: 0,
      };

    //   search functionality
const [startDate,setStartDate] =useState(0)
const [endDate,setEndDate] =useState(0)
    const [rangeValue, setRangeValue] = useState(70);
const [adults, setAdults] = useState(0);
const [child, setChild] = useState(0);
const [isGuestBarOpen,setIsGuestBarOpen] =useState(false)
const guestBarRef = useRef(null);
const [selectedDateRange, setSelectedDateRange] = useState(null);

// ranger
const [price, setPrice] = useState('');
let [roomsALL, setRoomsALL] = useState([]);

  const [calculatedValue, setCalculatedValue] = useState(null);

// useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);


  

   //   search functionality
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector((state) => state.rooms.rooms);

    // const [error, setError] = useState(null);
    const isError = useSelector((state) => state.rooms.rejected);
    if(isError){
      toast.error(isError.message)
    }
    const handleIncrement = () => {
      setAdults(adults + 1);
    };
    const handleDecrement = () => {
      if (adults > 1) {
        setAdults(adults - 1);
      }
    };
    
    const handleIncrementChild =() =>{
      setChild(child+1);
    }
    const handleDecrementChild = () => {
      if (child > 1) {
        setChild(child - 1);
      }
    };
    // useEffect(() => {
    //   dispatch(fetchRooms());
    // }, [dispatch]);

    const isLoading = useSelector((state) => state.rooms.loading);
    console.log(rooms)
    // const { filteredRooms, loading, error } = useSelector((state) => state.room);
    
    useEffect(() => {
      dispatch(fetchRooms());
      // dispatch(fetchFilteredRooms({ startDate, endDate, adults, children:child }));
    }, [dispatch]);

   
    // console.log(room.startDate,"rooooooom")

    // let roomsALL;
    // Declare roomsALL in an accessible scope
   
    // if (!roomData) {
    //   // return <p>No room data available</p>;
      
    //     roomData.startDate=0
    //     roomData.endDate=0
    //    roomData.adults=0
    //     roomData.child=0
     
    // }


    useEffect(() =>{
      axios.get(`https://zante-hotel-booking-app-server-devpronob.vercel.app/api/rooms`, {
        params: {
          startDate: processedRoomData.startDate,
          endDate: processedRoomData.endDate,
          adults: processedRoomData.adults,
          children: processedRoomData.child,
        },
      })
        .then(response => {
          setRoomsALL(response.data); // This is your retrieved data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },[])
    //  let roomsALL=  axios.get(`https://zante-hotel-booking-app-server-devpronob.vercel.app/api/rooms?startDate=${room.startDate}&endDate=${room.endDate}&adults=${room.adults}&children=${room.child}`);
      const handleFilter =async() =>{
   const response = await axios.get(`https://zante-hotel-booking-app-server-devpronob.vercel.app/api/rooms?startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${child}`);
   setRoomsALL(response.data);
        //   dispatch(fetchFilteredRooms({ startDate, endDate, adults, children:child }));
       

        console.log(adults,child,startDate,endDate,"all ok")
        
       
      // }, [dispatch]);
      }
    //   const  filteredRoomsr = useSelector((state) => state.rooms.rooms);
    //   //  const rooms = useSelector((state) => state.rooms.rooms);
    // console.log(filteredRoomsr,"filtered data")
     
    
    if (isLoading) {
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

    const handleNavigate = (id) =>{
      navigate(`/room/${id}`);
  }

  function truncateText(text) {
    if (text.length <= 50) {
      return text;
    } else {
      return text.substring(0, 80 - 3) + '...';
    }
  }



const handleClickOutside = (event) => {
  if (guestBarRef.current && !guestBarRef.current.contains(event.target)) {
    setIsGuestBarOpen(false);
    console.log(guestBarRef.current)
  }
};


console.log(roomsALL,"roomalllllll")




const handleDateChange = (newDateRange) => {
  setSelectedDateRange(newDateRange);
  const convertToFormattedDate = (inputDate) => {
    const date = new Date(inputDate);
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
return formattedDate;
  };

  const formattedDate1 = convertToFormattedDate(newDateRange[0]?.$d);
   const formattedDate2 = convertToFormattedDate(newDateRange[1]?.$d); 
   const parts1 = formattedDate1.split('/');
   const formattedDate11 = `${parts1[2]}-${parts1[0]}-${parts1[1]}`;
   const parts2 = formattedDate2.split('/');
   const formattedDate12 = `${parts2[2]}-${parts2[0]}-${parts2[1]}`;
       console.log(formattedDate11,"d11",formattedDate12)
       setStartDate(formattedDate11)
       setEndDate(formattedDate12)
  // if (newDateRange) {
  //   const startDateFormatted = format(newDateRange.start, 'yyyy-MM-dd');
  //   const endDateFormatted = format(newDateRange.end, 'yyyy-MM-dd');

  //   console.log('Start Date:', startDateFormatted);
  //   console.log('End Date:', endDateFormatted);
  // } else {
  //   console.log('No date range selected');
  // }

 



};

 const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    const parsedPrice = parseFloat(newPrice);
    if (!isNaN(parsedPrice)) {
      const calculated = parsedPrice * 2; // Example calculation, replace with your logic
      setCalculatedValue(calculated);
    }
  };

 

  console.log("range",price)


  // fetching redux toolkit

  return (
    <>
    <div className='parant mt-[80px] h-full mb-[100px]'>
    

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="col-span-1 form_part  lg:h-screen height__part pt-[40px] ps-[40px]">
    {/* Content for the 30% column */}
    <div className='searchBar_parant_two'>
      <div class="search-bar_two">
        <h6 className='py-3'>Check In/Out</h6>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateRangePicker
    slots={{ field: SingleInputDateRangeField }}
    slotProps={{ textField: { InputProps: {} } }} 
    onChange={handleDateChange}
  />
</LocalizationProvider>
        {/* <input placeholder='Check In   →   Check Out'  type="text" class="input date_input"
      
      /> */}
      <h6 className='py-3'>Guests</h6>
        <input value={adults+child}  onClick={() => setIsGuestBarOpen(!isGuestBarOpen)} type="number" placeholder="Guests" class="input mt-3 mb-3" />
        
      </div>
      <button onClick={handleFilter} class="search-button">Search</button>


{
  isGuestBarOpen &&
  <div className='guest'>
<div className='guestPicker'>
  <div class="description">
  <label>Adults</label>
  <div class="ages">Ages 18+ </div>
  </div>
  <div  class="guests-button">
  <span className="minus" onClick={handleDecrement}>-</span>
            <input type="text" id="eagle_booking_adults" name="eb_adults" class="booking-guests" value={adults}
            readOnly data-min="1" data-max="4" />
            <span className="plus" onClick={handleIncrement}>+</span>
  </div>
</div>

<div className='guestPicker'>
  <div class="description">
  <label>Adults</label>
  <div class="ages">Ages 18+ </div>
  </div>
  <div  class="guests-button">
  <span onClick={handleDecrementChild} class="minus">-</span>
            <input value={child}
            readOnly type="text" id="eagle_booking_adults" name="eb_adults" class="booking-guests" data-min="1" data-max="4" />
   <span onClick={handleIncrementChild} class="plus">+</span>
  </div>
</div>
</div>
}
      
<div className='price me-4'>
<h6 className='py-3'>Price</h6>
 <input
        type="range"
        id="price"
        min="0"
        max="250"
        step="0.01"
        value={price}
        onChange={handlePriceChange}
        className="w-full price_input appearance-none bg-gray-300 h-2 rounded-full focus:outline-none focus:shadow-outline"
      />
{/* <input type="range" min={0} max="100" value="40" className="range" />
<input onChange={handleRangeChange} type="range" min={0} max="300" value="40" className="range range-xs" /> */}
</div>





    </div>


  </div>
  <div className="col-span-2 p-10  sm:grid-cols-1 md:grid-cols-1  xl:grid-cols-3 gap-5">
    {/* Content for the 70% column */}

    {
  roomsALL?.map(items => (
  <div onClick={() => handleNavigate(items._id)} className='my-4 cursor-pointer w-[19rem] md:max-w-[601px] sm:w-auto'>
    <div className="w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${items.images[0]})` }}>
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{items.name}</div>
          <p className="text-gray-700 text-base">{truncateText(items.description)}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">${items.price}</p>
            {/* <p className="text-gray-600">Aug 10</p> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  ))
}
  </div>
</div>

    </div>
    <Footer></Footer>
    </>
  )
}

export default HotelRooms



{/* <div class="w-full lg:max-w-full lg:flex">
      
      </div>



<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${items.images[0]})`>
      <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <p class="text-sm text-gray-600 flex items-center">
            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">{items.name}</div>
          <p class="text-gray-700 text-base">{truncateText(items?.description)}</p>
        </div> */}



