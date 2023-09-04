import axios from 'axios';
import { signOut } from 'firebase/auth';
import React,{useState} from 'react'
import toast from 'react-hot-toast';
import auth from '../../Firebase/Firebase.init';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [services, setServices] = useState('');
  const navigate = useNavigate() 
  
    const handleInputChange = (event) => {
      setServices(event.target.value);
    };

    const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files);
    setSelectedImages(imageArray);
  };
    const handleSubmit = async(event) => {
        event.preventDefault();
 // Accessing form data using the name attribute

 const name = event.target.name.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const startDate = event.target.startingDate.value; // corrected attribute name
    const endDate = event.target.endDate.value;
    const adults = event.target.adults.value;
    const children = event.target.child.value;
//  const child = event.target.child.value;

const imageUrls = await Promise.all(
    selectedImages.map(async (image) => {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('https://api.imgbb.com/1/upload?key=3865938eefff3a14cd02acc91c1d32e1', formData);
      return response.data.data.url;
    })
  );

  // Do something with the image URLs, such as storing them or using them in your app
  console.log('Image URLs:', imageUrls);


//  console.log('Child:', child);
        // Create an object to hold the form data
        const servicesArray = services.split('\n');
        const formData = {
            name,
            description,
            roomServices: servicesArray,
            price,
            maxGuests: { Adults: adults, Children: children },
            date: { startingDate: startDate, endDate: endDate },
            images: imageUrls,
          };

          try {
            const token = 'your_jwt_token_here'; // Replace with your actual JWT token
            const response = await fetch('https://zante-hotel-booking-app-server-devpronob.vercel.app/api/add-room', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
              body: JSON.stringify(formData),
            });
        
            if (response.status === 401 || response.status === 500) {
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/');
            }
        
            const data = await response.json();
            console.log('data', data);
            toast.success('Room added successfully');
          } catch (error) {
            console.error('Error adding room:', error);
            toast.error('Error adding room');
          }
      };
  return (
    
    <div className='px-[40px]'>
     
<form onSubmit={handleSubmit}>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input name='name' type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
            rows="5" // Set the number of rows you want
            cols="40"
             type="text" name='description' id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" ></textarea>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">price</label>
            <input name='price' type="number" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>  
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting Date</label>
            <input name='startingDate' type="date" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" />
        </div>
        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
            <input name='endDate' type="date" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="23-45-678" />
        </div>
        <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adults</label>
            <input name='adults' type="number" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>
        <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Children</label>
            <input name='child' type="number" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
        </div>
        <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Services</label>
        <textarea
        className='class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
        id="services"
        name="services"
        value={services}
        onChange={handleInputChange}
        rows="5" // Set the number of rows you want
        cols="30" // Set the number of columns you want
       
      />
       </div>
       <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Images</label>
            <input
            type="file"
            id="images"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <ul>
          {selectedImages.map((image, index) => (
            <li key={index}>{image.name}</li>
          ))}
        </ul>
        </div>
      
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  )
}

export default AddRoom
