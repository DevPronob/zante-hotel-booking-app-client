import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms, postRoom } from '../../slices/roomSlices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const FavouriteRooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state) => state.rooms.rooms);
  // const [error, setError] = useState(null);
  const isError = useSelector((state) => state.rooms.rejected);
  if(isError){
    toast.error(isError.message)
  }

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.rooms.loading);
  console.log(rooms)
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

  return (
    <div className='rooms_parant py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24'>
    <div className='hotel_text text-center'>
      <h3 className='text-2xl md:text-3xl lg:text-4xl'>OUR FAVORITE ROOMS</h3>
      <p className='text-sm md:text-base lg:text-lg'>Check out our best rooms</p>
    </div>
    <div className='rooms_container pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {rooms.slice(0, 3).map(items => (
        <div class="group my-10 flex w-full max-w-xs md:max-w-[40rem] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img class="peer absolute top-0 right-0 h-full w-full object-cover" src={items.images[0]} alt="product image" />
          <svg class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
        </a>
        <div class="mt-4 px-5 pb-5">
          <a>
            <h5 class="text-xl tracking-tight text-slate-900">{items.name}</h5>
          </a>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">${items.price}</span>
            </p>
          </div>
          <a onClick={() => handleNavigate(items._id)}  class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Details</a
          >
        </div>
      </div>
      
      ))}
    </div>
  </div>
  )
}

export default FavouriteRooms
