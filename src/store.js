import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./features/job/jobSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: { user: userSlice, job: jobSlice },
});

export default store;
