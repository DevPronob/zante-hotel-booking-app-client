import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../Firebase/Firebase.init';

const AllUser = () => {
    const[users,setUser] =useState([])
    // const [user, loading, error2] = useAuthState(auth);
// Make a GET request to fetch the data
useEffect(() =>{
    fetch('https://zante-hotel-booking-app-server-devpronob.vercel.app/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched data:', data);
          setUser(data)
          // Use the fetched data in your component
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
},[])
      

        const handleMakeAdmin = user =>{
            const headers = new Headers({
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              });
            fetch(`https://zante-hotel-booking-app-server-devpronob.vercel.app/api/user/users/admin/${user._id}`, {
                method: 'PATCH',
                headers
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data){
                    
                    toast.success(data.message)
                }
            })
        }
    
  return (
    <div className='mt-[80px]'>
     <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                           
                            <th>Email</th>
                            <th>Role</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                
                                <td>{user.email}</td>
                                <td>{ user.role === 'admin' ? 'admin' :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600  text-white">Make Admin</button> 
                                    }</td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default AllUser
