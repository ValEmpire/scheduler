import { useState, useEffect } from "react";

import axios from "axios";

import update from "immutability-helper";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));

  const setInterviewers = (interviewers) => {
    setState((prev) => ({ ...prev, interviewers }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/interviewers"),
      axios.get("/api/appointments"),
    ]).then((all) => {
      setDays(all[0].data);
      setInterviewers(all[1].data);
      setAppointments(all[2].data);
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const dayIndex = state.days.findIndex((el) => el.name === state.day);

  const newDay = (operation) => {
    if (operation === "bookInterview") {
      return {
        ...state.days[dayIndex],
        spots: state.days[dayIndex].spots - 1,
      };
    }

    return {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1,
    };
  };

  const cancelInterview = (id, cb) => {
    axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        const newDays = update(state.days, {
          $splice: [[dayIndex, 1, newDay("cancelInterview")]],
        });

        setState({
          ...state,
          days: newDays,
        });

        cb();
      })
      .catch((error) => {
        cb(error);
      });
  };

  const bookInterview = (id, interview, cb) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const newDays = update(state.days, {
          $splice: [[dayIndex, 1, newDay("bookInterview")]],
        });

        setState({
          ...state,
          appointments,
          days: newDays,
        });

        cb();
      })
      .catch((error) => {
        cb(error);
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
