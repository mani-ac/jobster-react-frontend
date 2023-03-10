import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkApi) => {
    try {
      const res = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(clearValues());
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkApi.dispatch(logoutUser());
        return thunkApi.rejectWithValue("Unauthorized! Logging out...");
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkApi) => {
    thunkApi.dispatch(showLoading());
    try {
      const res = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(getAllJobs());
      return res.data.msg;
    } catch (error) {
      thunkApi.dispatch(hideLoading());
      thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
