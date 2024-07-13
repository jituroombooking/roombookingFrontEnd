import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addStaff,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getStaff = createAsyncThunk(
  "staff/getStaff",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getStaff,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.deleteStaff}/${data}`,
      method: "delete",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    error: "",
    staffData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addStaff.fulfilled, (state, { payload }) => {
      const existingState = current(state);
      return {
        ...state,
        staffData: !existingState.staffData
          ? payload.data
          : [...existingState.staffData, payload.data[0]],
        loading: false,
      };
    });
    builder.addCase(addStaff.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(addStaff.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getStaff.fulfilled, (state, { payload }) => {
      return {
        ...state,
        staffData: payload.data,
        loading: false,
      };
    });
    builder.addCase(getStaff.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(getStaff.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteStaff.fulfilled, (state, { payload }) => {
      const existingState = current(state);
      return {
        ...state,
        staffData: existingState.staffData.filter((f) => f._id != payload.data),
        loading: false,
      };
    });
    builder.addCase(deleteStaff.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(deleteStaff.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export const StaffReducer = staffSlice.reducer;
