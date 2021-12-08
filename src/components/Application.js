import React from "react";

import "./Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment, i) => {
          return (
            appointment && (
              <Appointment
                bookInterview={bookInterview}
                deleteInterview={cancelInterview}
                key={`${i}${appointment.id}`}
                id={appointment.id}
                time={appointment.time}
                interview={getInterview(state, appointment.interview)}
                interviewers={interviewers}
              />
            )
          );
        })}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
