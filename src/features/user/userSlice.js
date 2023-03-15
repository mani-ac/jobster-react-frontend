import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const initialState = {
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success("Logging out...");
      }
    },
  },
  // extraReducers: {
  //   [registerUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [registerUser.fulfilled]: (state, { payload }) => {
  //     const { user } = payload;
  //     state.isLoading = false;
  //     state.user = user;
  //     addUserToLocalStorage(user);
  //     toast.success(`Hello there ${user.name}`);
  //   },
  //   [registerUser.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     toast.error(payload);
  //   },
  //   [loginUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [loginUser.fulfilled]: (state, { payload }) => {
  //     const { user } = payload;
  //     state.isLoading = false;
  //     state.user = user;
  //     addUserToLocalStorage(user);
  //     toast.success(`Welcome back ${user.name}`);
  //   },
  //   [loginUser.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     toast.error(payload);
  //   },
  //   [updateUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [updateUser.fulfilled]: (state, { payload }) => {
  //     const { user } = payload;
  //     state.user = user;
  //     state.isLoading = false;
  //     addUserToLocalStorage(user);
  //     toast.success("user updated");
  //   },
  //   [updateUser.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     toast.error(payload);
  //   },
  //   [clearStore.rejected]: () => {
  //     toast.error("There was an error...");
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = user;
        state.isLoading = false;
        addUserToLocalStorage(user);
        toast.success("user updated");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error...");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
