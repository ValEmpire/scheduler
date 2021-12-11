import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

const InterviewerList = (props) => {
  // map the interviewers from props
  const mapInterviewerListItem = () => {
    return props.interviewers.map((interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value} // compare id and the value to know which is selected
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    ));
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mapInterviewerListItem()}</ul>
    </section>
  );
};

export default InterviewerList;
