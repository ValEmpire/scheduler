import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

const InterviewerList = (props) => {
  const mapInterviewerListItem = () => {
    return props.interviewers.map((interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        id={interviewer.id}
        setInterviewer={props.setInterviewer}
        selected={interviewer.id === props.interviewer}
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
