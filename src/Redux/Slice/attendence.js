import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const getAttendence = createAsyncThunk(
  "attendence/getAttendence",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.getAttendence}/${data.id}/${data.firstDay}/${data.lastDay}`,
      method: "get",
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const markAsPaid = createAsyncThunk(
  "attendence/markAdPaid",
  (data, { rejectWithValue, fulfillWithValue }) => {
    const payload = {
      url: apiList.markAsPaid,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const attendenceSlice = createSlice({
  name: "attendence",
  initialState: {
    loading: false,
    attendenceData: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAttendence.fulfilled, (state, { payload }) => {
      return {
        ...state,
        attendenceData: payload.data,
        loading: false,
      };
    });
    builder.addCase(getAttendence.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(getAttendence.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(markAsPaid.fulfilled, (state, { payload }) => {
      return {
        ...state,
        attendenceData: payload.data,
        loading: false,
      };
    });
    builder.addCase(markAsPaid.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(markAsPaid.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export const AttendenceReducer = attendenceSlice.reducer;
