// slices/bookingsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Assuming you have a backend API endpoint to fetch bookings by email
export const fetchBookingsByEmail = createAsyncThunk(
    'bookings/fetchByEmail',
    async (email) => {
      const token = localStorage.getItem('accessToken'); // Get the JWT token from storage
  
      const response = await fetch(`http://localhost:5001/api/bookings/${email}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      const data = await response.json();
      console.log(data, "dt");
      return data;
    }
  );

  export const fetchAllBookings = createAsyncThunk('bookings/fetchAllBookings', async () => {
    try {
      const response = await fetch('http://localhost:5001/api/bookings/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching bookings');
    }
  });

  
  
  
  
  
  

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsByEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookingsByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;

    })
  },
});

export default bookingsSlice.reducer;











