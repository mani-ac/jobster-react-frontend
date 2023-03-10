import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </Wrapper>
  );
};

export default JobInfo;
