import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const bookRoom = createAsyncThunk(
  "booking/bookRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.roomBooking,
      method: "post",
      data,
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getBookedRooms = createAsyncThunk(
  "booking/getBookedRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getBookedRooms,
      method: "get",
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const deleteBookedRoom = createAsyncThunk(
  "booking/deleteBooking",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.deleteBooking}/${data}`,
      method: "delete",
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const boookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    booking: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(bookRoom.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(bookRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getBookedRooms.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        booking: payload.data,
      };
    });
    builder.addCase(getBookedRooms.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getBookedRooms.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(deleteBookedRoom.fulfilled, (state, { payload }) => {
      const existingState = current(state);
      return {
        ...state,
        loading: false,
        booking: existingState.booking.filter((f) => f._id !== payload.data),
      };
    });
    builder.addCase(deleteBookedRoom.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteBookedRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
  },
});

export const BookingReducer = boookingSlice.reducer;
