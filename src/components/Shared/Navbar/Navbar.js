import React from 'react'
import '../Navbar/Navbar.css'
import { Link, Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';
import { signOut } from 'firebase/auth';
import useAdmin from '../../hooks/useAdmin ';
const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin)
  if (isAdminLoading) {
    return <div className='text-center mt-[200px]'>Loading...</div>;
  }
    const logout = () => {
        signOut(auth);
        localStorage.removeitem("accessToken")
        Navigate("/")
      };
  return (
    <div className='navbar_parant'>
      <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li
          class="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
          data-te-nav-item-ref>
          
          <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/">Home</Link>
        </li>
        {/* <!-- Features link --> */}
        <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/rooms">Rooms</Link>
        </li>
        <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/bookings">Bookings</Link>
        </li>
        {
          isAdmin &&
          <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/dashboard">Dashboard</Link>
        </li>
        }
        
        {/* <!-- Pricing link --> */}
        <li class=" text-purple-600 mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">{user?<button onClick={logout} class="btn btn-active btn-primary pt-[14px] mt-[-5px]">SignOut</button>:<Link className='text-neutral-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200' to="/login">Login</Link>}</li>
        {/* <!-- About link --> */}
        <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/about">About</Link>
        </li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">ZANTE</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li
          class="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
          data-te-nav-item-ref>
          
          <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/">Home</Link>
        </li>
        {/* <!-- Features link --> */}
        <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/rooms">Rooms</Link>
        </li>
        <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/bookings">Bookings</Link>
        </li>
        {
          isAdmin &&
          <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/dashboard">Dashboard</Link>
        </li>
        }
        
        {/* <!-- Pricing link --> */}
        <li class=" text-purple-600 mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">{user?<button onClick={logout} class="btn btn-active btn-primary pt-[15px] mt-[-9px]">SignOut</button>:<Link className='text-neutral-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200' to="/login">Login</Link>}</li>
        {/* <!-- About link --> */}
        <li
          class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
          data-te-nav-item-ref>
           <Link  class="text-purple-600 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 [&.active]:text-neutral-200"
             to="/about">About</Link>
        </li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default Navbar


