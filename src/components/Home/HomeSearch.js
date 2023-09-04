import React, { useEffect, useRef, useState } from 'react'
import '../Home/Home.css'
import { useNavigate } from 'react-router-dom';
import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { parse, format } from 'date-fns';
import axios from 'axios';

const HomeSearch = () => {
  const navigate = useNavigate();
  const [startDate,setStartDate] =useState(0)
  const [endDate,setEndDate] =useState(0)
  const [adults, setAdults] = useState(0);
  const [child, setChild] = useState(0);
  const [isGuestBarOpen,setIsGuestBarOpen] =useState(false)
  const guestBarRef = useRef(null);
  const handleClickOutside = (event) => {
    if (guestBarRef.current && !guestBarRef.current.contains(event.target)) {
      setIsGuestBarOpen(false);
      console.log(guestBarRef.current)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

  const [selectedDateRange, setSelectedDateRange] = useState(null);

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
   
    // const parts = formattedDate1.split("/");
    // const year = parts[2];
    // const month = parts[0];
    //        const day = parts[1];

    //   const convertedDate1 = `${year}-${month}-${day}`;
    // setStartDate(convertedDate1)
    // const parts2 = formattedDate2.split("/");
    // const year2 = parts2[2];
    // const month2 = parts2[0];
    //        const day2 = parts[1];

    //   const convertedDate2 = `${year2}-${month2}-${day2}`;
    // setEndDate(convertedDate1,convertedDate2,"dates")
    // if (newDateRange) {
    //   const startDateFormatted = format(newDateRange.start, 'yyyy-MM-dd');
    //   const endDateFormatted = format(newDateRange.end, 'yyyy-MM-dd');

    //   console.log('Start Date:', startDateFormatted);
    //   console.log('End Date:', endDateFormatted);
    // } else {
    //   console.log('No date range selected');
    // }

   



  };

const handleFilter =async() =>{
  console.log(startDate,endDate,adults,child,"up")
  // const response = await axios.get(`http://localhost:5001/api/rooms?startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${child}`);
  //   console.log(`http://localhost:5001/api/rooms?startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${child}`,"url")
    // Redirect to Rooms page with filtered results
    const dataAll ={
      startDate,
      endDate,
      adults,
      child,
    }
    navigate('/rooms', { state: { room: dataAll } });
}

  return (
    <div className='searchBar_parant'>
      <div class="search-bar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateRangePicker
    slots={{ field: SingleInputDateRangeField }}
    slotProps={{ textField: { InputProps: {} } }} 
    onChange={handleDateChange}
  />
</LocalizationProvider>
        {/* <input placeholder='Check In   →   Check Out'  type="text" class="input date_input"
      
      /> */}
        <input value={adults+child}  onClick={() => setIsGuestBarOpen(!isGuestBarOpen)} type="number" placeholder="Guests" class="input" />
        <button onClick={handleFilter} class="search-button">Check Availability</button>
      </div>


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
      



    </div>
  )
}

export default HomeSearch
