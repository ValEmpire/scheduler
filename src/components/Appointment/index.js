import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {
  const renderBtn = props.interview ? <Show {...props.interview} /> : <Empty />;

  return (
    <article className="appointment">
      <Header time={props.time} />
      {renderBtn}
    </article>
  );
};

export default Appointment;
