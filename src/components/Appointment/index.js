import React from "react";
import "./styles.scss";

const Appointment = (props) => {
  const appointment = props.time
    ? `Appointment at ${props.time}`
    : "No appointments";

  return <article className="appointment">{appointment}</article>;
};

export default Appointment;
