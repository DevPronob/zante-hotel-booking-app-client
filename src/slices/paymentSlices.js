import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createPaymentIntent = createAsyncThunk(
  'pay/payment/createPaymentIntent',
  async (price) => {
    const response = await fetch('http://localhost:5001/create-payment-intent/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ price }),
    });
    const data = await response.json();
    return data.clientSecret;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    clientSecrete: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientSecrete = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;