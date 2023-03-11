import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../features/job/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) return;
    dispatch(handleChange({ name: "jobLocation", value: user.location }));
  }, [dispatch, user.location, isEditing]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };

  const jobInputChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={jobInputChangeHandler}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={jobInputChangeHandler}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={jobInputChangeHandler}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={jobInputChangeHandler}
            list={statusOptions}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            value={jobType}
            handleChange={jobInputChangeHandler}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={submitHandler}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
