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
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const unAlottedMember = createAsyncThunk(
  "booking/unAlottedMember",
  (data, { rejectWithValue, fulfillWithValue }) => {
    const payload = {
      url: `${apiList.unAlottedMember}/${data.currentPage}/${data.pageSize}`,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const editRoom = createAsyncThunk(
  "booking/editRoom",
  (data, { rejectWithValue, fulfillWithValue }) => {
    const payload = {
      url: apiList.editRoom,
      method: "put",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const uploadBulkUpload = createAsyncThunk(
  "booking/uploadBulkUpload",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.bulkUpload,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const boookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    booking: null,
    unAlottedMember: null,
    error: null,
    unAllottedPagination: {
      currentPage: 1,
      totalDocument: 0,
      lastPage: 0,
    },
    allottedPagination: {
      currentPage: 1,
      totalDocument: 0,
      lastPage: 0,
    },
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
    builder.addCase(unAlottedMember.fulfilled, (state, { payload }) => {
      const { data, lastPage, currentPage, totalDocument } = payload.data;
      return {
        ...state,
        loading: false,
        unAlottedMember: data,
        unAllottedPagination: {
          lastPage,
          currentPage: parseInt(currentPage),
          totalDocument,
        },
      };
    });
    builder.addCase(unAlottedMember.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(unAlottedMember.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(editRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        unAlottedMember: payload.data,
      };
    });
    builder.addCase(editRoom.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(editRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(uploadBulkUpload.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        // unAlottedMember: payload.data,
      };
    });
    builder.addCase(uploadBulkUpload.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(uploadBulkUpload.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
  },
});

export const BookingReducer = boookingSlice.reducer;
