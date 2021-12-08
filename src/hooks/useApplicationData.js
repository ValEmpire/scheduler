import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
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

  const cancelInterview = (id, cb) => {
    axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
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
        setState({
          ...state,
          appointments,
        });

        cb();
      })
      .catch((error) => {
        cb(error);
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
