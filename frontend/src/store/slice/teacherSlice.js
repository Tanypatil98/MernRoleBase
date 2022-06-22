import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios, { authHeaders } from "../../helpers/axios";

export const getTeacherList = createAsyncThunk(
  "getTeacherList",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get("/users",authHeaders());
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

export const addTeacher = createAsyncThunk(
  "addTeacher",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.post("/users/addTeacher", data.data, authHeaders());
      console.log("response", response);
      if(response.status === 200){
        data.cb(null,response);
      }
      return response.message;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "deleteTeacher",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.post(`/users/deleteTeacher/${data.id}`, authHeaders());
      console.log("response", response);
      if(response.status === 200){
        data.cb(null,response);
      }
      return response.message;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

const productSlice = createSlice({
  name: "teacher",
  initialState: {
    lists: [],
    error: null,
    loader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeacherList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getTeacherList.fulfilled, (state, action) => {
      state.loader = false;
      state.lists = action.payload.data;
    });
    builder.addCase(getTeacherList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(addTeacher.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTeacher.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
