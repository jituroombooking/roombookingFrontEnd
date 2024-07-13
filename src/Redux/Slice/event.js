import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { onAuthenticated } from "../../API/axios";
import { apiList } from "../../API/apiIndex";

export const addEvent = createAsyncThunk(
  "event/addEvent",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addEvent,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getEventData = createAsyncThunk(
  "event/getEventData",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getEventData,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.deleteEventData}/${data}`,
      method: "delete",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const editEvent = createAsyncThunk(
  "event/editEvent",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.editEventData,
      method: "put",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    eventData: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      const existingArray = current(state);
      return {
        ...state,
        eventData: !existingArray.eventData
          ? payload.data
          : [...existingArray.eventData, payload.data[0]],
        loading: false,
      };
    });
    builder.addCase(addEvent.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(addEvent.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getEventData.fulfilled, (state, { payload }) => {
      return {
        ...state,
        eventData: payload.data,
        loading: false,
      };
    });
    builder.addCase(getEventData.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(getEventData.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteEvent.fulfilled, (state, { payload }) => {
      const existingArray = current(state);
      return {
        ...state,
        eventData: existingArray.eventData.filter((f) => f._id != payload.data),
        loading: false,
      };
    });
    builder.addCase(deleteEvent.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(deleteEvent.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(editEvent.fulfilled, (state, { payload }) => {
      const existingArray = current(state);
      console.log(payload.data, " <>? SLICE");
      return {
        ...state,
        eventData: [
          ...existingArray.eventData.map((f) => {
            if (f._id === payload.data._id) {
              return payload.data;
            } else {
              return f;
            }
          }),
        ],
        loading: false,
      };
    });
    builder.addCase(editEvent.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(editEvent.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export const EventReducer = eventSlice.reducer;
