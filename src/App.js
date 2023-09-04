import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Shared/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import { Toaster } from 'react-hot-toast';
import RoomsDetails from './components/rooms/RoomsDetails';
import HotelRooms from './components/HotelRooms/HotelRooms';
import Payment from './components/Payment/Payment';
import Bookings from './components/Bookings/Bookings';
import Dashboard from './components/Dashboard/Dashboard';
import AllBookings from './components/Dashboard/AllBookings';
import AllUser from './components/Dashboard/AllUser';
import AddRoom from './components/Dashboard/AddRoom';
import useAdmin from './components/hooks/useAdmin ';
import PrivateAuth from './components/PrivateAuth/PrivateAuth';


function App() {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <div className='text-center mt-[200px]'>Loading...</div>;
  }

  return (
    <div className="app overflow-y-auto">
      <Navbar></Navbar>

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms" element={<PrivateAuth><HotelRooms></HotelRooms></PrivateAuth>} />
        <Route path="/room/:id" element={<PrivateAuth><RoomsDetails></RoomsDetails></PrivateAuth>} />
        <Route path="/payment/:id" element={<Payment></Payment>} />
        <Route path="/bookings" element={<PrivateAuth><Bookings></Bookings></PrivateAuth>} />
        {
          isAdmin &&
          <Route  path="/dashboard" element={
        
            <Dashboard></Dashboard>
       
         }>
          
          <Route index element ={<AllBookings></AllBookings>}></Route>
            <Route path="users" element={<AllUser></AllUser>}></Route>
            <Route path="add-room" element={<AddRoom></AddRoom>}></Route>
           </Route>
        }
        


      </Routes>
       
      <Toaster />
    </div>
  );
}

export default App;
