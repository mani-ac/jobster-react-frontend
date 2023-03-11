import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkApi) => {
  try {
    const res = await customFetch.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue("Unauthorized! Logging out...");
    }
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);
    thunkApi.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error) {
    thunkApi.dispatch(hideLoading());
    thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};
