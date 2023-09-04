import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: null,
  endDate: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservationDates: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setReservationDates } = reservationSlice.actions;

export default reservationSlice.reducer;