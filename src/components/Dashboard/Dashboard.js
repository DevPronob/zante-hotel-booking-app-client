import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import useAdmin from "../hooks/useAdmin";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
    // const [admin] =useAdmin(user)
  
    return (
//         <div>
//     <div class="drawer drawer-mobile">
// <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
// <div class="drawer-content ">

// <Outlet></Outlet>


// </div> 
// <div class="drawer-side">
// <label for="my-drawer-2" class="drawer-overlay"></label> 
// <ul class="menu p-4 overflow-y-auto w-80  text-base-content">

// <li><Link to="/dashboard">Purchase product </Link></li>
// {/* <li><Link to="/dashboard/servicelist">Service List</Link></li>
// <li><Link to="/dashboard/review">Review</Link></li>
// {user && <li><Link to="/dashboard/users">All Users</Link></li>} */}

// </ul>

// </div>
// </div>
// </div>
<div class="drawer lg:drawer-open mt-[80px]">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content ">
  <Outlet></Outlet>
  
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-80  text-base-content">

     <li><Link to="/dashboard">All Bookings</Link></li>
     <li><Link to="/dashboard/users">All Users</Link></li>
     <li><Link to="/dashboard/add-room">Add Room</Link></li>
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;