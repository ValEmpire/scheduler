export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

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
