import { loadStripe } from '@stripe/stripe-js';
import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { fetchRoomById } from '../../slices/roomSlices';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './CheckoutForm.css'
const stripePromise = loadStripe("pk_test_51HVdTWBLa4QtAMbzJF8fESJt8K44YI2RpHvgDeomDGPXujOgO65ZODQda0qJjd7KiMCyuKPq1NpAfrpXYhaw5VTG00f5DSaCaY");
const Payment = () => {
    const params =useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRoomById(params.id));
      }, [dispatch, params.id]);

    
    const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
   const priceOld = selectedRoom?.price;
     let price = parseInt(priceOld);
//      if (!isNaN(number)) {
//        console.log(number); // This will log the number 189
//      } else {
//        console.log("Number extraction failed.");
//      }
//    } else {
//      console.log("Text format not recognized.");
//    }
//  console.log(number,"price")
   
   
   
   
  return (
    <div className='mt-[100px] payment_parant'>
    <div subHeading="please process" heading="Payment"></div>
    <h2 className="text-3xl py-4 text-center"> Payment</h2>
    <Elements stripe={stripePromise}>
        <CheckoutForm cart={selectedRoom} price={price}></CheckoutForm>
    </Elements>
</div>
  )
}

export default Payment
