import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { onAuthenticated } from "../../API/axios";
import { apiList } from "../../API/apiIndex";

export const addRoom = createAsyncThunk(
  "room/addRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addRoom,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  (data, { rejectWithValue, fulfillWithValue }) => {
    const payload = {
      url: apiList.updateRoom,
      method: "put",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getRooms = createAsyncThunk(
  "room/getRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getRoom,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getRoomCount = createAsyncThunk(
  "room/getRoomCount",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getRoomCount,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.deleteRoom}/${data}`,
      method: "delete",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const viewSingleRoom = createAsyncThunk(
  "room/viewSingleRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: `${apiList.viewSingleRoom}/${data}`,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomData: null,
    loading: false,
    singleRoomData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        // roomData: payload.data,
        loading: false,
        error: false,
      };
    });
    builder.addCase(addRoom.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: true,
        erromrMessage: payload.data,
      };
    });

    builder.addCase(getRooms.fulfilled, (state, { payload }) => {
      return {
        ...state,
        roomData: payload.data,
        loading: false,
        error: false,
      };
    });
    builder.addCase(getRooms.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getRooms.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        loading: false,
        erromrMessage: payload.data,
      };
    });
    builder.addCase(getRoomCount.fulfilled, (state, { payload }) => {
      return {
        ...state,
        roomData: payload.data,
        error: false,
      };
    });
    builder.addCase(getRoomCount.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        erromrMessage: payload.data,
      };
    });
    builder.addCase(updateRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        roomData: payload.data,
        error: false,
      };
    });
    builder.addCase(updateRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        erromrMessage: payload.data,
      };
    });
    builder.addCase(deleteRoom.fulfilled, (state, { payload }) => {
      const existingArray = current(state);
      return {
        ...state,
        roomData: existingArray.roomData.filter((f) => f._id !== payload.data),
        error: false,
        loading: false,
      };
    });
    builder.addCase(deleteRoom.pending, (state, { payload }) => {
      const existingArray = current(state);
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        erromrMessage: payload.data,
        loading: false,
      };
    });
    builder.addCase(viewSingleRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        singleRoomData: payload.data,
        loading: false,
        error: false,
      };
    });
    builder.addCase(viewSingleRoom.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(viewSingleRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        loading: false,
        erromrMessage: payload.data,
      };
    });
  },
});

export const RoomReducer = roomSlice.reducer;
