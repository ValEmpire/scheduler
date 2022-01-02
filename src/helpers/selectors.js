// this will return all the apoints of that day
export function getAppointmentsForDay(state, day) {
  // initial response
  let res = [];

  if (state.days.length === 0) return res;

  // find the day with the same name of arg
  const findDay = state.days.find((d) => d.name === day);

  // if no day found
  if (!findDay) return res;

  const findDayAppointments = findDay.appointments;

  // console.log(state.appointments);

  // console.log(findDayAppointments[1]);

  // loop all the found appointments as array
  for (const key of findDayAppointments) {
    // console.log(state.appointments[key]);
    res.push(state.appointments[key]);
  }

  if (Object.keys(state.appointments).length > 0) {
    // console.log(state.appointments[1].interview.interviewer);
  }

  return res;
}

// this will return interview from the state
export function getInterview(state, interview) {
  let res = interview;

  if (!interview) return null;

  const interviewerId = interview.interviewer.id
    ? interview.interviewer.id
    : interview.interviewer;

  // get the interviewerId key from state.interviewers
  const interviewer = state.interviewers[interviewerId];

  // set it as another key then return
  res.interviewer = interviewer;

  return res;
}

// this will return all the available interviewers for that day
export function getInterviewersForDay(state, day) {
  let res = [];

  if (state.days.length === 0) return res;

  // find the day in state where name is day
  const findDay = state.days.find((d) => d.name === day);

  if (!findDay) return res;

  const findDayInterviewers = findDay.interviewers;

  // lop[ all the interviewers return as array
  for (const key of findDayInterviewers) {
    res.push(state.interviewers[key]);
  }

  return res;
}
