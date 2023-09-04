// src/features/roomsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await fetch('https://zante-hotel-booking-app-server-devpronob.vercel.app/api/hotel', {
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  const data = await response.json();
  return data;
});

export const fetchRoomById = createAsyncThunk('rooms/fetchRoomById', async (roomId) => {
  const response = await fetch(`https://zante-hotel-booking-app-server-devpronob.vercel.app/api/hotel/${roomId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  const data = await response.json();
  return data;
});

  // filter data
  export const fetchFilteredRooms = createAsyncThunk(
    'rooms/fetchFiltered',
    async ({ startDate, endDate, adults, children }) => {
      console.log(startDate,endDate,adults,children,"redux")
      // try {
      //   const response = await fetch(
      //     `/api/filterRooms?startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}`
      //   );
      //   const data = await response.json();
      //   return data;
      // } catch (error) {
      //   throw new Error('Error fetching filtered rooms');
      // }
    }
  );
  
export const postRoom = createAsyncThunk('rooms/postRoom', async (roomData) => {
  const response = await fetch('your-api-endpoint-for-posting-room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });
  const data = await response.json();
  return data;
});

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
      rooms: [],
      filteredRoomsr: [], // Added this property to hold filtered rooms
      selectedRoom: null,
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRooms.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchRooms.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.rooms = action.payload;
        })
        .addCase(fetchRooms.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(postRoom.fulfilled, (state, action) => {
          state.rooms.push(action.payload); // Assuming payload is the new room data
        })
        .addCase(fetchRoomById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchRoomById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.selectedRoom = action.payload;
        })
        .addCase(fetchRoomById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchFilteredRooms.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchFilteredRooms.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.filteredRooms = action.payload;
        })
        .addCase(fetchFilteredRooms.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
        
    },
  });
  
  export default roomsSlice.reducer;