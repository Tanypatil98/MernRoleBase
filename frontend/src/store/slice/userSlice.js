import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authHeaders } from "../../helpers/axios";

export const login = createAsyncThunk(
  "login",
  async (data,thunkAPI) => {
    try {
      const response = await Axios.post('/users/login',data.data, authHeaders());
      console.log("getCartResponse", response.data);
      data.cb(null, response.data)
      localStorage.setItem("user",JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.log("getCartError", error.response);
      data.cb(error, null);
    }
  }
);

const initialState = {
  user: {},
  loader: false,
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loader = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
