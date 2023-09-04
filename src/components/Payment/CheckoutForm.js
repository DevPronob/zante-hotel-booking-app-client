import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState,useEffect } from 'react'
import './CheckoutForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../../slices/paymentSlices';
import auth from '../../Firebase/Firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
const CheckoutForm = ({price,cart}) => {
    const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()
//   const [axiosSecure] = useAxiosSecure()
  const [cardError, setCardError] = useState('');
//   const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [user, loading, error] = useAuthState(auth);


  const clientSecret = useSelector((state) => state.payment.clientSecrete);
  const status = useSelector((state) => state.payment.status);

  console.log(cart.date,"myn base thing")

  useEffect(() => {
    dispatch(createPaymentIntent(price));
  }, [dispatch, price]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
        return
    }

    const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card
    })

    if (error) {
        console.log('error', error)
        setCardError(error.message);
    }
    else {
        setCardError('');
        // console.log('payment method', paymentMethod)
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.displayName || 'anonymous'
                },
            },
        },
    );

    if (confirmError) {
        console.log(confirmError);
    }

    console.log('payment intent', paymentIntent)
    setProcessing(false)
    if (paymentIntent) {
        setTransactionId(paymentIntent.id);
        // save payment information to the server
        const payment = {
            email: user?.email,
            transactionId: paymentIntent.id,
            name:cart.name,
            date: new Date(),
            status: 'service pending',
            startDate:cart.date.startingDate,
            endDate:cart.date.endDate,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content type
                // Add any other headers as needed
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Example authorization header
              },
              body: JSON.stringify(payment),
          };
          fetch('http://localhost:5001/payments', requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data) {
      // Display confirmation
      console.log(data)
    }
  })
  .catch((error) => {
    console.error('Error making POST request:', error);
    // Handle error
  });
    }
    console.log(clientSecret,"redux");
  }
  return (
    <>
    <form className='card' onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='pay_btn' type="submit" >
        {/* disabled={!stripe || !clientSecret || processing} */}
        Pay
      </button>
    </form>
    {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
    </>
  )
}

export default CheckoutForm
