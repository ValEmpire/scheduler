import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {
  const listClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={listClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
};

export default InterviewerListItem;
