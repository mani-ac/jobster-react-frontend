import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkApi) => {
  try {
    const res = await customFetch.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
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
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};
