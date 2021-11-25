export function getAppointmentsForDay(state, day) {
  let res = [];

  if (state.days.length === 0) return res;

  const findDay = state.days.find((d) => d.name === day);

  if (!findDay) return res;

  const findDayAppointments = findDay.appointments;

  for (const key of findDayAppointments) {
    res.push(state.appointments[key]);
  }

  return res;
}

export function getInterview(state, interview) {
  let res = interview;

  if (!interview) return null;

  const interviewerId = interview.interviewer;

  const interviewer = state.interviewers[interviewerId];

  res.interviewer = interviewer;

  return res;
}

export function getInterviewersForDay(state, day) {
  let res = [];

  if (state.days.length === 0) return res;

  const findDay = state.days.find((d) => d.name === day);

  if (!findDay) return res;

  const findDayInterviewers = findDay.interviewers;

  for (const key of findDayInterviewers) {
    res.push(state.interviewers[key]);
  }

  return res;
}
