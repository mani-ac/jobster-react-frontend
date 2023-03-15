import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkApi) => {
  try {
    const { page, search, searchType, searchStatus, sort } =
      thunkApi.getState().allJobs;

    let url = `/jobs?page=${page}&jobType=${searchType}&status=${searchStatus}&sort=${sort}`;
    if (search) {
      url += `&search=${search}`;
    }

    const res = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const showStatsThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get("/jobs/stats");
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};
