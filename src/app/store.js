import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../slices/roomSlices';
import paymentReducer from '../slices/paymentSlices';
import bookingsReducer from '../slices/bookingsSlice';
import reservationReducer from '../slices/dateSlice';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    payment: paymentReducer,
    bookings: bookingsReducer,
    reservation: reservationReducer,
  },
});