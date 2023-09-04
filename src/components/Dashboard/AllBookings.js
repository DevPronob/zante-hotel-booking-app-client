import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings } from '../../slices/bookingsSlice';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';

const AllBookings = () => {
    const dispatch = useDispatch();
    const [user, loading, error2] = useAuthState(auth);
  const bookings = useSelector((state) => state.bookings.bookings);
  const status = useSelector((state) => state.bookings.status);
  const error = useSelector((state) => state.bookings.error);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  if (status === 'loading') {
    return  <div class="text-center">
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
    return  toast.error(`data ${status}`);
  }
console.log(bookings)
  return (
    <div cl>
      <div className="w-full">
            {/* <Helmet>
                <title>Bistro Boss | All users</title>
            </Helmet> */}
            <h3 className="text-3xl font-semibold my-4 text-center">All Bookings</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>email</th>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?bookings.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.status}</td>
                            </tr>):<h4 className='text-2xl  my-4 text-center'>No Bookings Found</h4>
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div> 
    </div>
  )
}

export default AllBookings
