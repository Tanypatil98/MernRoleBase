import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import teacherSlice from "./slice/teacherSlice";

const store = configureStore({
  reducer: {
    teacher: teacherSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
