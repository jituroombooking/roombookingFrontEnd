import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const addLabour = createAsyncThunk(
  "labour/addLabour",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addLabour,
      method: "post",
      data,
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const markAttendence = createAsyncThunk(
  "labour/markAttendence",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.markAttendence,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getLabourList = createAsyncThunk(
  "labour/getlabourlist",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getLabour,
      method: "get",
    };
    return onAuthenticated(payload, false)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getLabourPost = createAsyncThunk(
  "labour/getLabourPost",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getLabourPost,
      method: "get",
    };
    return onAuthenticated(payload, false)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const addLabourPost = createAsyncThunk(
  "labour/addLabourPost",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addLabourPost,
      method: "post",
      data,
    };
    return onAuthenticated(payload, false)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const deletePostItem = createAsyncThunk(
  "labour/deletePostItem",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.deleteLabourPost}/${data}`,
      method: "delete",
    };
    return onAuthenticated(payload, false)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const labourSlice = createSlice({
  name: "labour",
  initialState: {
    loading: false,
    labourPost: null,
    labourData: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLabour.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        labourData: payload.data,
      };
    });
    builder.addCase(addLabour.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addLabour.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(getLabourList.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        labourData: payload.data,
      };
    });
    builder.addCase(getLabourList.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getLabourList.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(markAttendence.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(markAttendence.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(markAttendence.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
      };
    });
    builder.addCase(getLabourPost.fulfilled, (state, { payload }) => {
      return {
        ...state,
        labourPost: payload.data,
        loading: false,
      };
    });
    builder.addCase(getLabourPost.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getLabourPost.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(addLabourPost.fulfilled, (state, { payload }) => {
      const existingArray = current(state);
      return {
        ...state,
        labourPost: existingArray.labourPost
          ? [...existingArray.labourPost, payload.data[0]]
          : payload.data,
        loading: false,
      };
    });
    builder.addCase(addLabourPost.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addLabourPost.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(deletePostItem.fulfilled, (state, { payload }) => {
      const existingArray = current(state);
      return {
        ...state,
        labourPost: existingArray.labourPost
          ? existingArray.labourPost.filter((f) => f._id !== payload.data)
          : null,
        loading: false,
      };
    });
    builder.addCase(deletePostItem.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deletePostItem.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
  },
});

export const LabourReducer = labourSlice.reducer;
